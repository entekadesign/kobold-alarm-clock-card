import { AlarmController, Helpers } from './alarm-controller';
import './alarm-picker';

import { LitElement, html, css, PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { state, customElement, query, queryAll } from "lit/decorators.js";

function loadCSS(url: string) {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}
loadCSS('https://fonts.googleapis.com/css2?family=Noto+Sans:wdth,wght@87.5,600&display=swap');
loadCSS('https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap');
loadCSS('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@600&display=swap');


import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

import type { CardConfig, NextAlarmObject, NextAlarmConfig } from './types';

// HA types
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";

declare global {
  interface Window {
    hassConnection?: Promise<any>;
    loadCardHelpers(): Promise<void>;
    customCards: Array<any>;
    setMyEditMode(parameter?: boolean): void;
  }
  interface Node {
    host: any;
  }
  interface HuiCardOptions extends LitElement {
    path: [number, number] | [number, number, number];
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "kobold-alarm-clock-card",
  name: "Kobold",
  description: "A multi-alarm clock for Home Assistant",
  // preview: true,
  documentationURL: "https://codeberg.org/entekadesign/kobold-alarm-clock-card#readme",
});

@customElement('kobold-alarm-clock-card')
class KoboldAlarmClockCard extends LitElement {

  private _cardId: string = Math.random().toString(36).slice(2, 9) + ', ' + new Date().toJSON();
  private _config: CardConfig;
  private _updateLoopId: number;
  private _alarmController: AlarmController;
  private _ringingBegun: boolean;
  private _elements: Array<LovelaceCard>;
  private _injectStylesDone: boolean;
  private _cardHelpers: any;
  private _time: string;
  private _ringing: boolean;
  private _controllersAlarmConfigLastUpdate: string;

  @state() _nextAlarm: NextAlarmObject;
  @state() _hass: HomeAssistant;
  // @state() _alarmClockClasses: { [key: string]: boolean };
  // @state() _alarmButtonsClasses: { [key: string]: boolean };
  // @state() _footClasses: { [key: string]: boolean };
  // @state() _clockClasses: { [key: string]: boolean };
  @state() _koboldEditor: any; //TODO: better type

  @query('#clock', true) _clockQ: HTMLElement;
  @query('#koboltClock', true) _koboltClockQ: HTMLElement;
  @query('#foot', true) _footQ: HTMLElement;
  @query('#alarmButtons', true) _alarmButtonsQ: HTMLElement;
  @query('#date', true) _dateQ: HTMLElement;
  @query('ha-card', true) _haCardQ: HTMLElement;
  @queryAll('div.optionButtons ha-icon') _optionButtonsHostsQ: NodeListOf<HTMLElement>;
  @query('#extraInfo', true) _rootQ: HTMLElement;
  @query('#alarm-top div#koboltLogo', true) _koboltLogoQ: HTMLElement;

  connectedCallback() {
    super.connectedCallback();

    this._updateLoop();

    if (this._config.debug) {
      this._hass.callService('system_log', 'write', { 'message': '*** connectedCallback(); _cardID: ' + this._cardId, 'level': 'info' });
      console.warn('*** connectedCallback(); _cardID: ' + this._cardId);
    };

    // recover from disconnect, e.g., HA restart
    window.addEventListener('connection-status', this._connectionStatusEvent);
    Helpers.getHa().addEventListener('kobold-editor', this._koboldEditorEvent);
    Helpers.getHa().addEventListener('dialog-closed', this._dialogClosedEvent); //TODO: can this be triggered by editing a different card?
    window.setMyEditMode = (mode = true) => {
      const ll = Helpers.getLovelace();
      if (ll && ll.lovelace.editMode !== mode) {
        ll.lovelace.setEditMode(mode);
      }
    };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._updateLoopId);
    if (this._config.debug) {
      this._hass.callService('system_log', 'write', { 'message': '*** disconnectedCallback(); _cardID: ' + this._cardId, 'level': 'info' });
      console.warn(' *** disconnectedCallback(); _cardID: ' + this._cardId);
    };
    window.removeEventListener('connection-status', this._connectionStatusEvent);
    Helpers.getHa().removeEventListener('kobold-editor', this._koboldEditorEvent);
    Helpers.getHa().removeEventListener('dialog-closed', this._dialogClosedEvent);
  }

  _connectionStatusEvent = (event: CustomEvent) => {
    if (event.detail === 'connected') {
      if (this._config.debug) {
        this._hass.callService('system_log', 'write', { 'message': '*** Recovering from disconnect', 'level': 'info' });
        console.warn('*** Recovering from disconnect');
      };

      // If temporarily disconnected, reload browser after 90-second delay
      // window.setTimeout(() => {
      //   location.reload();
      // }, 1000 * 90);

      // If HA restarts, reload browser
      window.hassConnection.then(({ conn }) => {
        conn.subscribeEvents(() => {
          window.setTimeout(() => {
            //TODO: test that logging works here; if not, see https://github.com/search?q=repo%3Ahome-assistant%2Ffrontend+system_log&type=code
            this._hass.callService('system_log', 'write', { 'message': '*** HA Restarted. Refreshing browser', 'level': 'info' });
            window.setTimeout(() => {
              location.reload();
            }, 1000 * 2);
          }, 1000 * 60);
        }, 'homeassistant_started');
      });
    }
  }

  _dialogClosedEvent = (event: CustomEvent) => {
    if (event.detail.dialog === 'hui-dialog-edit-card') {
      window.setMyEditMode(false);
      window.setTimeout(() => {
        // replace browser history with path lacking edit parameter
        // see _handleClosed https://github.com/home-assistant/frontend/blob/f3380891486c01f2a75c83524578b5aeed85f114/src/dialogs/make-dialog-manager.ts
        const base = window.location.pathname;
        window.history.replaceState(null, '', base);
      }, 100);
    }
  }

  _koboldEditorEvent = (event: CustomEvent) => {
    this._koboldEditor = event.detail.editorEl;
  }

  static getConfigElement() {
    return document.createElement("kobold-card-editor");
  }

  static getStubConfig() {
    // Return a minimal configuration that will result in a working card configuration
    return Helpers.defaultConfig;
  }

  render() {
    this._nextAlarm = this._alarmController.nextAlarm;
    // console.log('*** render(); alarmClockClasses: ', this._alarmClockClasses);
    // console.log('*** render(); alarmClock class: ', this._koboltClockQ?.classList.value);

    // this._alarmClockClasses = this._alarmClockClasses || {};
    // this._alarmButtonsClasses = this._alarmButtonsClasses || {};
    // this._footClasses = this._footClasses || {};
    // this._clockClasses = this._clockClasses || { clock: true };

    return html`
        <ha-card>
          <div>

            <div id="koboltClock">
              <div id="alarm-top" class="meta">
                <div id="koboltLogo"></div>
                <div id="date"></div>
                <div class="optionButtons">
                  <ha-icon id="tab-0" class="settingsButton button" icon="mdi:cog" @click=${this._showEditor}></ha-icon>
                  <ha-icon id="tab-1" class="napButton button" icon="mdi:sleep" @click=${this._showEditor}></ha-icon>
                </div>
                ${this._areAlarmsEnabled() ? html`
                    <alarm-picker id="tab-2" show-icon="true" .alarm=${this._nextAlarm}
                        .config=${this._config}
                        .time=${this._time}
                        @alarm-button-clicked=${this._showEditor}
                        @alarm-changed=${this._onAlarmChanged}
                        @toggle-logo-visibility=${this._toggleLogoVisibility}
                        ></alarm-picker>
                  ` : html`
                  <ha-icon id="tab-2" class="alarmpickerButton button" icon="mdi:alarm"
                                @click=${this._showEditor}></ha-icon>
                  ` }
              </div>
              <div id="clock" @click=${this._toggleClockFullscreen}>TIME</div>
            </div>
          </div>
        </ha-card>

        <div id="foot">
          <div id="alarmButtons">
            <div class="alarmButton button">
              <button id="snooze" @click=${this._handleAlarmButtonsClick}>Snooze</button>
            </div>
            <div class="alarmButton button">
              <button id="dismiss" @click=${this._handleAlarmButtonsClick}>Dismiss</button>
            </div>
          </div>

          <div id="extraInfo">
              <div style="text-align: center;">Loading cards...</div>
          </div>
        </div>
      `;
  }

  static styles = css`
    /* ************ */
    /* *** main *** */
    /* ************ */

    /* mobile screen sizes */
    @media (max-width: 900px) {
      #alarm-top div#koboltLogo {
        display: none;
      }
    }

    #koboltClock {
      padding: 1.5rem;
      height: 65vh;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: height 240ms;
    }

    #koboltClock.fullscreen {
      height: 100vh;
    }

    #koboltClock.fullscreen #clock {
      padding-top: 0;
    }

    #alarm-top {
      font-size: calc(1rem + 1vh);
      display: flex;
      justify-content: space-between;
      height: 4vh;
      white-space: nowrap;
      align-items: center;
      color: var(--secondary-text-color);
    }

    #alarm-top div#koboltLogo {
      background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27750%27%20height%3D%27175%27%20viewBox%3D%270%200%20198.437%2046.302%27%3E%3Cdefs%3E%3Cpath%20id%3D%27a%27%20d%3D%27M134.532%20279.996h1013.197v243.84H134.532z%27%2F%3E%3C%2Fdefs%3E%3Cg%20aria-label%3D%27KOBOLD%27%20style%3D%27font-size%3A192px%3Bline-height%3A1.25%3Bwhite-space%3Apre%3Bshape-inside%3Aurl%28%23a%29%27%20transform%3D%27translate%28-39.822%2011.568%29%20scale%28.26458%29%27%3E%3Cpath%20d%3D%27M297.007%20381.147v7.723l-36.756%2043.764q9.01%2010.87%2018.307%2022.025%209.439%2011.013%2018.45%2021.739v7.723h-23.17l-33.753-40.331H219.92v40.331h-22.311V381.147h22.31v40.331h20.166q3.29-3.718%206.436-7.58%203.147-3.861%206.436-7.723l20.881-25.028zm232.264%2040.474q0%204.005-1%206.58%202.144%202.717%203.575%206.292%201.43%203.433%201.43%207.151v21.31q0%204.434-1.716%208.295-1.717%203.862-4.577%206.722-2.86%202.86-6.722%204.577-3.861%201.573-8.295%201.573h-81.664V381.147h77.802q4.291%200%208.153%201.716%203.861%201.573%206.721%204.434%203.004%202.86%204.577%206.722%201.716%203.861%201.716%208.295zM452.47%20461.81h58.352v-18.879H452.47Zm0-41.19h54.347v-17.162H452.47Zm222.958-39.616h22.168v80.806h80.807v22.311H675.428Zm193.22.143q4.434%200%208.295%201.716%203.862%201.573%206.722%204.434%202.86%202.86%204.577%206.722%201.716%203.861%201.716%208.295v60.64q0%204.434-1.716%208.295-1.717%203.862-4.577%206.722-2.86%202.86-6.722%204.577-3.861%201.573-8.295%201.573h-81.664V381.147Zm-59.496%2080.663h58.352v-58.352h-58.352z%27%20style%3D%27font-family%3AOrbitron%3B-inkscape-font-specification%3AOrbitron%3Bstroke-width%3A.744895%27%20transform%3D%27translate%28-33.794%20-401.053%29%20scale%281.02854%29%27%2F%3E%3Cpath%20d%3D%27M419.64%20675.367A117.536%20117.536%200%200%200%20302.101%20792.9%20117.536%20117.536%200%200%200%20419.64%20910.437%20117.536%20117.536%200%200%200%20537.172%20792.9%20117.536%20117.536%200%200%200%20419.64%20675.367Zm-.71%2012.63%203.237%2036.913%203.195%2036.426h.043l-.032.141.032.346h-.106l-3.132%2014.648-3.237%2015.135-3.237-15.135-3.135-14.648h-.102l.028-.346-.028-.14h.042l3.195-36.427zm-1.728%20106.955-5.173%208.6-5.007%208.322.078.138-.194.06-.05.081-.031-.056-20.703%206.41-20.977%206.496%2016.118-14.916%2015.9-14.722-.032-.057h.095l.148-.14.082.137%209.71-.173z%27%20style%3D%27fill%3A%23000%3Bstroke-width%3A.999999%27%20transform%3D%27translate%2895.652%20-407.931%29%20scale%28.56969%29%27%2F%3E%3Cpath%20d%3D%27M705.391%20675.367A117.536%20117.536%200%200%200%20587.855%20792.9%20117.536%20117.536%200%200%200%20705.39%20910.437%20117.536%20117.536%200%200%200%20822.925%20792.9%20117.536%20117.536%200%200%200%20705.39%20675.367Zm.54%2012.63%203.237%2036.913%203.195%2036.426h.042l-.032.141.032.346h-.106l-3.131%2014.648-3.237%2015.135-3.24-15.135-3.132-14.648h-.102l.028-.346-.028-.14h.042l3.191-36.427zm1.57%20106.856%2010.035.18%209.715.173.077-.138.152.141h.091l-.031.057%2015.9%2014.722%2016.118%2014.916-20.978-6.495-20.699-6.411-.031.056-.05-.08-.197-.06.077-.138-5.007-8.322z%27%20style%3D%27fill%3A%23000%3Bstroke-width%3A.999999%27%20transform%3D%27translate%28185.991%20-407.931%29%20scale%28.56969%29%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");

      height: calc(0.55em + 1vh);
      width: 92%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      filter: invert(1) brightness(0.41); /* match --secondary-text-color */
      position: absolute;
    }

    #clock {
      transition: padding-top 240ms;
      padding-top: 0.15em;
      padding-right: 0.05em;
      display: flex;
      justify-content: center;
      height: 100%;
      font-size: 40vh;
      letter-spacing: -0.02em;
      font-weight: 500;
      align-items: center;
      white-space: nowrap;
      text-shadow: 0 0 0.04em var(--primary-text-color);
    }
    #clock .periodName {
      position: relative;
      bottom: 2.2vh;
      margin-left: -0.2em;
      font-size: 31%;
      font-weight: 900;
      writing-mode: vertical-lr;
      text-orientation: upright;
      letter-spacing: -0.15em;
    }
    #clock .periodKern {
      margin-left: -0.3em !important;
    }
    #clock .colonKernL {
      margin-left: -0.1em !important;
    }
    #clock .colonKernR {
      margin-right: -0.1em !important;
    }
    #clock .colon {
      position: relative;
      bottom: 3.3vh;
    }

    #clock.fontFace1 {
      font-family: 'Noto Sans', sans-serif;
      font-optical-sizing: auto;
      font-weight: 600;
      font-style: normal;
      font-variation-settings: 'wdth' 87.5;
      letter-spacing: 0;
    }
    #clock.fontFace1 .periodName {
      bottom: 5.2vh;
      letter-spacing: -0.4em;
    }
    #clock.fontFace1 .periodKern {
      margin-left: -0.3em !important;
    }

    #clock.fontFace2 {
      font-family: 'Oswald', sans-serif;
      font-optical-sizing: auto;
      font-weight: 600;
      font-style: normal;
      letter-spacing: 0;
    }
    #clock.fontFace2 .colonKernL {
      margin-left: -0.05em !important;
    }
    #clock.fontFace2 .colonKernR {
      margin-right: 0 !important;
    }
    #clock.fontFace2 .periodName {
      bottom: 5.4vh;
      letter-spacing: -0.4em;
    }

    #clock.fontFace3 {
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-style: normal;
      letter-spacing: 0;
    }
    #clock.fontFace3 .periodName {
      letter-spacing: -0.2em;
    }
    #clock.fontFace3 .colonKernL {
      margin-left: 0 !important;
    }
    #clock.fontFace3 .colonKernR {
      margin-right: 0 !important;
    }

    .optionButtons {
      text-align: right;
      width: 100%;
      margin-right: 1em;
      display: flex;
      justify-content: space-between;
    }

    .settingsButton.button {
      margin: 0 1em;
    }

    #foot {
      position: relative;
      height: 35vh;
      display: flex;
      transition: height 240ms;
    }

     #foot.hideFoot {
      height: 0;
      overflow: hidden;
    }

    #alarmButtons, #extraInfo {
      justify-content: space-between;
      box-sizing: border-box;
      height: 35vh;
      gap: 10px;
    }

    #extraInfo {
      display: flex;
      position: absolute;
      width: 100%;
      top: 0;
    }

    #alarmButtons {
      display: none;
      position: relative;
      z-index: 8;
      background: var(--ha-card-background,var(--card-background-color,#fff));
      flex: auto;
    }

    #alarmButtons.showButtons {
      display: flex;
    }

    #alarmButtons > *, #extraInfo > * {
      flex: 1 1 0;
    }

    .button {
      cursor: pointer;
    }

    .alarmButton {
      display: flex;
      justify-content: center;
      height: 100%;
    }

    .alarmButton button {
      color: black !important;
      background-color: white;
      font-size: 4em;
      font-weight: 900;
      width: 100%;
      border-radius: 12px;
      box-shadow: 0 0 5px -1px white;
      transition: background-color 120ms;
      text-shadow: 0 0 5px rgba(0,0,0,0.4);
    }

    .alarmButton button:hover {
      background-color: rgba(255,255,255,0.90);
    }
  `;

  protected willUpdate(_changedProperties: PropertyValues): void {
    // this._toggleClockFullscreen(this._config.hide_cards_default);
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this._toggleClockFullscreen(this._config.hide_cards_default);
    this._updateTime();

    if (this._haCardQ) {
      this._buildCard();
    } else {
      console.warn('*** firstUpdated(); Missing <ha-card> in shadowRoot')
    }
  }

  protected updated(_changedProperties: PropertyValues): void {
    if (!this._injectStylesDone) {
      this._injectStylesDone = true;

      // Is Kobold only card being displayed?
      if (this.offsetWidth === Helpers.getLovelace().offsetWidth) {

        // hide visible line separating sidebar from main view on iOS
        Helpers.getDrawer().style.borderRightStyle = 'unset';

        // prevent scrolling
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector('body').style.position = 'fixed';
        document.querySelector('body').style.width = '100%';
      }

      // inject style into mdc form fields
      let myStyle: HTMLElement;

      //  alarm-top styles
      if (this._optionButtonsHostsQ) {
        let optionButtonsStyle = 'ha-svg-icon { height: calc(1.5rem + 1vh); width: calc(1.5rem + 1vh); }';
        this._optionButtonsHostsQ.forEach((optionButtonsHost) => {
          myStyle = document.createElement('style');
          myStyle.innerHTML = optionButtonsStyle;
          optionButtonsHost.shadowRoot.appendChild(myStyle);
        });
      }
    }
  }

  setConfig(config: CardConfig) {

    if (!config) {
      alert('Card config incorrectly formatted or missing.');
    }

    if (!config.cards || !Array.isArray(config.cards)) {
      console.warn('*** setConfig(); No HA cards available to configure');
    }

    this._config = Helpers.deepMerge(Helpers.defaultConfig, config);
    Helpers.fireEvent('config-changed', { config: this._config }, this);

    // NOTE: Some cards call setConfig() multiple times during life of card
    if (!this._alarmController) this._alarmController = new AlarmController(this._config, this._cardId);
  }

  set hass(hass: HomeAssistant) {

    this._hass = hass;
    this._alarmController.hass = hass;

    dayjs.locale(hass.language);

    if (this._elements) {
      this._elements.forEach((element) => {
        element.hass = hass;
      });
    }
  }

  getCardSize() {
    return 3;
  }

  _buildCard() {
    if (!this._rootQ) console.warn('*** _buildCard(); Card root (element id extraInfo) not available');

    while (this._rootQ.lastChild) {
      this._rootQ.removeChild(this._rootQ.lastChild);
    }

    const config = this._config;

    if (config.alarm_entities) {
      config.alarm_entities.forEach((item) => { if (!this._hass.states[item]) console.warn(`*** _buildCard(); Entity ${item} does not exist in HA`) });
    } else {
      alert('No alarm_entities in card configuration. One is required for alarm.');
    }

    if (config.cards) {
      const elements = this._elements = [];
      Promise.all(config.cards.map(async (card: LovelaceCardConfig) => {
        const element = await this._createCardElement(card);
        if (card.type === 'media-control') element.setAttribute('type-media-control', 'true');
        elements.push(element);
        this._rootQ.appendChild(element);
      })).
        catch(error => {
          console.error('*** Error while creating card element: ', error.message);
        }).
        then(() => {
          this._elements = elements;
          this._elements.forEach((element) => {
            Helpers.updateHeight(element);
            if (this._hass) {
              element.hass = this._hass;
            } else {
              console.warn('*** _buildCard(); No hass object available for config');
            }
          });
        });
    }
  }

  async _createCardElement(card: LovelaceCardConfig) {
    let element: LovelaceCard;
    try {
      this._cardHelpers = await (window).loadCardHelpers();
      element = await this._cardHelpers.createCardElement(card);
      if (this._hass) {
        element.hass = this._hass;
      } else {
        console.warn(`*** _createCardElement(); Missing hass object for card ${card.type}`);
      }

    } catch (error) {
      console.warn(`*** Could not create card ${card.type}; ${error}`);
    }
    return element;
  }

  _updateLoop() {
    this._updateLoopId = setTimeout(() => { this._updateTime(); this._updateLoop(); }, 1000);
  }

  _updateTime(force = false) {

    this._alarmController.evaluateAlarms();
    const fontNum = (!this._config.clock_display_font) ? '0' : this._config.clock_display_font;
    const fontFaceClass = 'fontFace' + fontNum;
    // this._clockClasses = fontNum === '0' ? { clock: true } : { clock: true, [fontFaceClass]: true };
    this._clockQ.classList.value = fontFaceClass;

    const time = dayjs().format(this._config.time_format === '24hr' ? 'HH:mm:ss' : 'h:mm:ss A');
    const isAlarmRinging = this._alarmController.isAlarmRinging();

    if (isAlarmRinging && !this._ringingBegun) {
      this._ringingBegun = true;
      // this._alarmClockClasses = { fullscreen: false };
      // this._alarmButtonsClasses = { showButtons: true };
      this._alarmButtonsQ.classList.add('showButtons');
      // this._footClasses = { hideFoot: false };
      this._koboltClockQ.classList.remove('fullscreen');
      this._footQ.classList.remove('hideFoot');
    } else if (!isAlarmRinging && this._ringingBegun) {
      this._ringingBegun = false;
      // this._alarmButtonsClasses = { showButtons: false };
      this._alarmButtonsQ.classList.remove('showButtons');
    }

    if (this._clockQ &&
      (force
        || this._time !== time
        || this._ringing !== isAlarmRinging
        // TODO: test if it is possible for these lastupdated variables to come apart now
        || this._controllersAlarmConfigLastUpdate !== this._config.last_updated)) {
      this._time = time;
      this._ringing = isAlarmRinging;
      this._controllersAlarmConfigLastUpdate = this._config.last_updated;

      let timeDisplay: string;
      const showSeconds = false;
      const [timeHr, timeMn, timeSd] = time.split(':');
      let colon1Kern = '';
      let colon2Kern = '';
      if (timeHr.slice(-1) === '1') colon1Kern = ' colonKernL';
      if (timeMn.slice(0, 1) === '1') colon1Kern = colon1Kern + ' colonKernR';

      if (this._config.time_format === '24hr') {
        if (showSeconds) {
          if (timeMn.slice(-1) === '1') colon2Kern = ' colonKernL';
          if (timeSd.slice(0, 1) === '1') colon2Kern = colon2Kern + ' colonKernR';
          timeDisplay = timeHr + '<span class="colon' + colon1Kern + '">:</span>' + timeMn + '<span class="colon' + colon2Kern + '">:</span>' + timeSd;
        } else {
          timeDisplay = timeHr + '<span class="colon' + colon1Kern + '">:</span>' + timeMn;
        }
      } else {
        const [timeNum, timeTxt] = timeSd.split(' ');
        let periodKern = '';
        if (timeMn.slice(-1) === '1' || timeMn.slice(-1) === '7') periodKern = ' periodKern';
        if (showSeconds) {
          if (timeMn.slice(-1) === '1') colon2Kern = ' colonKernL';
          if (timeSd.slice(0, 1) === '1') colon2Kern = colon2Kern + ' colonKernR';
          timeDisplay = timeHr + '<span class="colon' + colon1Kern + '">:</span>' + timeMn + '<span class="colon' + colon2Kern + '">:</span>' + timeNum + '<span class="periodName' + periodKern + '">' + timeTxt + '</span>';
        } else {
          timeDisplay = timeHr + '<span class="colon' + colon1Kern + '">:</span>' + timeMn + '<span class="periodName' + periodKern + '">' + timeTxt + '</span>';
        }
      }

      this._clockQ.innerHTML = `
        <div class="clock-display">
          ${timeDisplay}
        </div>
      `;
      const dateFormat = this._config.time_format === '24hr' ? 'dddd, D MMMM' : 'dddd, MMMM D';
      this._dateQ.innerHTML = dayjs().format(dateFormat);
    }
  }

  _areAlarmsEnabled() {
    return this._config.alarms_enabled || !!this._alarmController.nextAlarm.nap; //TODO: shouldn't this be !!this._alarmConfiguration.nextAlarm.nap? (not according to dehuyss clock).
  }

  _onAlarmChanged(event: CustomEvent) {
    // this only fires for changes to nextalarm in #alarmpicker element html of kobold-alarm-clock-card.js
    if (!event.detail.alarm.enabled) {
      this._alarmController.nextAlarm = { enabled: false, time: event.detail.alarm.time };
    } else {
      this._alarmController.nextAlarm = event.detail.alarm;
    }
  }

  _handleAlarmButtonsClick(event: Event) {
    // console.log('*** click detected: ', event.target);
    this._alarmController[(<HTMLInputElement>event.target).id]();
  }

  // _toggleAlarmFullscreen(force: boolean) {
  //   if (!this._alarmController.isAlarmRinging()) {
  //     if (this._alarmClockClasses.fullscreen || !force) {
  //       this._alarmClockClasses = { fullscreen: false };
  //       this._footClasses = { hideFoot: false };
  //     } else {
  //       this._alarmClockClasses = { fullscreen: true };
  //       this._footClasses = { hideFoot: true };
  //     }
  //     if (force) {
  //       // TODO: save hide_cards_default(force) and remove obsolete option to configure in settings
  //     }
  //   }
  // }

  _toggleClockFullscreen(forceHide: boolean | PointerEvent) {
    // console.log('*** alarmClockClasses: ', this._alarmClockClasses);
    if (!this._alarmController.isAlarmRinging()) {
      // if ((!this._alarmClockClasses.fullscreen && forceHide instanceof PointerEvent) || forceHide === true) {
      if ((!this._koboltClockQ.classList.contains('fullscreen') && forceHide instanceof PointerEvent) || forceHide === true) {
        // this._alarmClockClasses = { fullscreen: true };
        this._koboltClockQ.classList.add('fullscreen');
        // this._footClasses = { hideFoot: true };
        this._footQ.classList.add('hideFoot');
      } else if ((this._koboltClockQ.classList.contains('fullscreen') && forceHide instanceof PointerEvent) || forceHide === false) {
        // } else if ((this._alarmClockClasses.fullscreen && forceHide instanceof PointerEvent) || forceHide === false) {
        // this._alarmClockClasses = { fullscreen: false };
        // this._footClasses = { hideFoot: false };
        this._koboltClockQ.classList.remove('fullscreen');
        this._footQ.classList.remove('hideFoot');
      }
    }
  }

  _toggleLogoVisibility() {
    if (this._koboltLogoQ) {
      if (this._koboltLogoQ.style.display !== 'none') {
        this._koboltLogoQ.style.display = 'none';
      } else {
        this._koboltLogoQ.style.display = 'block';
      }
    }
  }

  async _showEditor(event) {
    event.stopPropagation();
    let tabNo = parseInt(event.target.id.slice(4));
    window.setMyEditMode();

    let rounds = 0;
    // wait for availability of card-options; kobold card might be nested
    while (!this.closest('hui-card-options') && !this.getRootNode().host.closest('hui-card-options') && rounds++ < 5)
      await new Promise((r) => setTimeout(r, 100));
    if (rounds === 6) {
      console.warn('*** _showEditor(); Timed out waiting for edit mode');
    } else {
      const huiCardPath = this.closest<HuiCardOptions>('hui-card-options')?.path ?? this.getRootNode().host.closest('hui-card-options')?.path;
      Helpers.fireEvent('ll-edit-card', { path: huiCardPath }, this);

      let rounds = 0;
      while (!this._koboldEditor && rounds++ < 5)
        await new Promise((r) => setTimeout(r, 100));
      if (rounds === 6) {
        console.warn('*** _showEditor(); Timed out waiting for editor');
      } else {
        Helpers.fireEvent('kobold-tab', { tab: tabNo }, this._koboldEditor.shadowRoot.querySelector('#kobold-card-config'));
        this._koboldEditor = undefined;
      }
    }
  }
}

@customElement('kobold-card-editor')
class KoboldCardEditor extends LitElement {

  private _configSchemaSettings = [
    {
      name: "alarm_entities",
      label: "Alarm Ringer Entities",
      selector: { entity: { multiple: true, filter: { domain: ["input_boolean", "switch", "media_player"] } } },
    },
    {
      name: "time_format",
      label: "Time Format",
      selector: { select: { options: ["12hr", "24hr"] } },
    },
    {
      name: "clock_display_font",
      label: "Clock Display Font",
      selector: { select: { options: [{ label: "System", value: 0 }, { label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }] } },
    },
    {
      name: "hide_cards_default",
      label: "Hide Cards by Default",
      selector: { boolean: {} },
    },
    {
      name: "snooze_duration_default",
      label: "Snooze Duration Default",
      selector: { duration: {} },
    },
    {
      name: "alarm_duration_default",
      label: "Alarm Duration Default",
      selector: { duration: {} },
    },
    {
      name: "alarm_actions",
      label: "Alarm Actions",
      selector: { object: {} },
    },
    {
      name: "debug",
      label: "Debug Mode",
      selector: { boolean: {} },
    },
  ]

  private _configSchemaSchedule = (alarms_disabled?: boolean) => [
    {
      name: "alarms_enabled",
      label: "Alarms Schedule Enabled",
      selector: { boolean: {} },
    },
    {
      type: "grid",
      name: "mo",
      schema: [
        {
          name: "enabled",
          label: this._getDayOfWeek(0),
          selector: { boolean: {} },
          disabled: alarms_disabled,
        },
        {
          name: "time",
          label: "",
          selector: { time: {} },
          disabled: alarms_disabled,
        },
      ],
    },
    {
      type: "grid",
      name: "tu",
      schema: [
        {
          name: "enabled",
          label: this._getDayOfWeek(1),
          selector: { boolean: {} },
          disabled: alarms_disabled,
        },
        {
          name: "time",
          label: "",
          selector: { time: {} },
          disabled: alarms_disabled,
        },
      ],
    },
    {
      type: "grid",
      name: "we",
      schema: [
        {
          name: "enabled",
          label: this._getDayOfWeek(2),
          selector: { boolean: {} },
          disabled: alarms_disabled,
        },
        {
          name: "time",
          label: "",
          selector: { time: {} },
          disabled: alarms_disabled,
        },
      ],
    },
    {
      type: "grid",
      name: "th",
      schema: [
        {
          name: "enabled",
          label: this._getDayOfWeek(3),
          selector: { boolean: {} },
          disabled: alarms_disabled,
        },
        {
          name: "time",
          label: "",
          selector: { time: {} },
          disabled: alarms_disabled,
        },
      ],
    },
    {
      type: "grid",
      name: "fr",
      schema: [
        {
          name: "enabled",
          label: this._getDayOfWeek(4),
          selector: { boolean: {} },
          disabled: alarms_disabled,
        },
        {
          name: "time",
          label: "",
          selector: { time: {} },
          disabled: alarms_disabled,
        },
      ],
    },
    {
      type: "grid",
      name: "sa",
      schema: [
        {
          name: "enabled",
          label: this._getDayOfWeek(5),
          selector: { boolean: {} },
          disabled: alarms_disabled,
        },
        {
          name: "time",
          label: "",
          selector: { time: {} },
          disabled: alarms_disabled,
        },
      ],
    },
    {
      type: "grid",
      name: "su",
      schema: [
        {
          name: "enabled",
          label: this._getDayOfWeek(6),
          selector: { boolean: {} },
          disabled: alarms_disabled,
        },
        {
          name: "time",
          label: "",
          selector: { time: {} },
          disabled: alarms_disabled,
        },
      ],
    },
  ]

  private _oldConfig: CardConfig;

  @state() _hass: HomeAssistant;
  @state() _config: CardConfig;
  @state() _selectedTab = 0;
  @state() _nextAlarmConfig: NextAlarmConfig;

  constructor() {
    super();
    Helpers.fireEvent('kobold-editor', { editorEl: this }, Helpers.getHa());
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
  }

  setConfig(config) {
    this._config = Helpers.deepMerge(Helpers.defaultConfig, config);
    Helpers.fireEvent('config-changed', { config: this._config }, this); //updates lovelace.config
    if (!this._oldConfig) this._oldConfig = this._config;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    const saveButton = Helpers.getEditorButtons().querySelectorAll('mwc-button')[1];
    if (saveButton) {
      saveButton.addEventListener('click', () => {
        if (this._nextAlarmConfig) {
          const nextAlarmDiff = Helpers.deepCompareObj(this._nextAlarmConfig.next_alarm, this._config.next_alarm);
          if (nextAlarmDiff) {
            this._saveNextAlarm(this._nextAlarmConfig);
          }
        }
      });
    } else {
      console.error(`*** Save button not found`);
    }
  }

  _getDayOfWeek(days: number) {
    // returns day of week in language set in set hass() method of card
    return dayjs('2018-08-27').add(days, 'days').format('dddd');
  }

  // _valueChanged(event: CustomEvent) {
  _valueChanged(event) {
    event.stopPropagation();
    if (!this._config) return;
    const configChanges = Helpers.deepCompareObj(this._oldConfig, event.detail.value);
    if (!configChanges) return;
    this._config = Helpers.deepMerge(Helpers.defaultConfig, event.detail.value);
    this._config.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const momentTomorrow = dayjs().add(1, 'day');
    const dayTomorrow = momentTomorrow.format('dd').toLowerCase();
    Object.keys(configChanges).forEach(
      (item) => {
        if (item === dayTomorrow || item === 'alarms_enabled' || item === 'next_alarm') {
          const alarmTomorrow = this._config[dayTomorrow];
          this._config.next_alarm = AlarmController.createNextAlarm(alarmTomorrow);
        }
      });

    this._oldConfig = this._config;
    Helpers.fireEvent('config-changed', { config: this._config }, this);
  }

  _valueChangedNap(event) {
    if (!event.detail.value) {
      event.detail.value = this._config.nap_duration;
    }
    // console.log('*** valueChangedNap fired');

    // TODO: same as set nextAlarm() in controller? use _setNextalarm above?
    const nextAlarmTime = dayjs().add(dayjs.duration(event.detail.value));
    const nextAlarm = {
      ...this._nextAlarmConfig.next_alarm,
      enabled: true,
      nap: true,
      time: nextAlarmTime.format('HH:mm:ss'),
      date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss'),
      date: nextAlarmTime.format('YYYY-MM-DD'),
      overridden: true
    }

    this._nextAlarmConfig.next_alarm = nextAlarm;
    this._nextAlarmConfig.nap_duration = event.detail.value;

    this.requestUpdate();
  }

  async _saveNextAlarm(nextAlarmConfig) {
    try {
      const lovelace = Helpers.getLovelace().lovelace;
      const newConfig = structuredClone(lovelace.config);
      const cardConfig = Helpers.findNested(newConfig, 'type', 'custom:kobold-alarm-clock-card');
      if (cardConfig && cardConfig.next_alarm && cardConfig.nap_duration) {
        //TODO: echeck to ensure save only happens if a change?
        if (nextAlarmConfig.next_alarm.overridden) {
          // same as is valueChangedNap except overridden?; TODO: have both goto new _setNextAlarm() method?
          const nextAlarmTime = dayjs().add(dayjs.duration(nextAlarmConfig.nap_duration));
          const nextAlarm = {
            ...this._nextAlarmConfig.next_alarm,
            enabled: true,
            nap: true,
            time: nextAlarmTime.format('HH:mm:ss'),
            date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss'),
            date: nextAlarmTime.format('YYYY-MM-DD'),
            // overridden: true
          }
          cardConfig.next_alarm = nextAlarm;
        } else {
          // reset alarm
          const momentTomorrow = dayjs().add(1, 'day');
          const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()];
          cardConfig.next_alarm = AlarmController.createNextAlarm(alarmTomorrow);
        }
        cardConfig.nap_duration = nextAlarmConfig.nap_duration;
        await lovelace.saveConfig(newConfig);
        // Override HA refresh dashboard notification
        window.setTimeout(() => {
          Helpers.fireEvent('hass-notification', { message: 'Successfully saved' }, Helpers.getHa());
        }, 50);
      } else {
        throw { message: 'Unable to find kobold card in lovelace configuration or kobold card config is corrupt' };
      };
    } catch (err: any) {
      alert(`Saving failed: ${err.message}.`);
      // Override HA successful save notification
      window.setTimeout(() => {
        Helpers.fireEvent('hass-notification', { message: 'Saving failed' }, Helpers.getHa());
      }, 50);
    }
  }

  _handleSwitchTab(event) {
    switch (event.detail.name) {
      case 'settings':
        this._selectedTab = 0;
        break;
      case 'nap':
        this._selectedTab = 1;
        break;
      case 'schedule':
        this._selectedTab = 2;
        break;
      default:
        this._selectedTab = 0;
    }
  }

  render() {
    if (!this._hass || !this._config) {
      return html``;
    }

    return html`
    <div id="kobold-card-config" class="card-config"
        @kobold-tab=${(event) => { this._selectedTab = event.detail.tab }}
    >
        <div class="toolbar">
          <sl-tab-group
            @sl-tab-show=${this._handleSwitchTab}
          >
            <sl-tab slot="nav" .panel=${"settings"} .active=${this._selectedTab === 0}>Settings</sl-tab>
            <sl-tab slot="nav" .panel=${"nap"} .active=${this._selectedTab === 1}>Nap</sl-tab>
            <sl-tab slot="nav" .panel=${"schedule"} .active=${this._selectedTab === 2}>Schedule</sl-tab>
          </sl-tab-group>
        </div>
        <div id="editor">
          ${[this._renderSettingsEditor, this._renderNapEditor, this._renderScheduleEditor][
        this._selectedTab
      ].bind(this)()}
        </div>
    </div>
    `;
  }

  _renderSettingsEditor() {
    return html`<div class="box">
            <ha-form
                .hass=${this._hass}
                .data=${this._config}
                .schema=${this._configSchemaSettings}
                .computeLabel=${(s) => s.label ?? s.name}
                @value-changed=${this._valueChanged}
            ></ha-form>
        </div>`;
  }

  _renderNapEditor() {
    if (!this._nextAlarmConfig) {
      this._nextAlarmConfig = {
        next_alarm: structuredClone(this._config.next_alarm),
        nap_duration: structuredClone(this._config.nap_duration),
      }
    }
    return html`
      <div class="box">
        <div>
          Nap Duration
          <ha-switch ?checked=${this._nextAlarmConfig.next_alarm.overridden} @change=${() => { this._nextAlarmConfig.next_alarm.overridden = !this._nextAlarmConfig.next_alarm.overridden }}></ha-switch>
          <ha-duration-input
            .data=${this._nextAlarmConfig.nap_duration}
            @value-changed=${this._valueChangedNap}
          ></ha-duration-input>
        </div>

      </div>`;
  }

  _renderScheduleEditor() {
    return html`<div class="box">
          <ha-form
            .hass=${this._hass}
            .data=${this._config}
            .schema=${this._configSchemaSchedule(!this._config.alarms_enabled)}
            .computeLabel=${(s) => s.label ?? s.name}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>`;
  };

  static get styles() {
    return css`
          sl-tab-group {
            margin-bottom: 16px;
          }

          sl-tab {
            flex: 1;
          }

          sl-tab::part(base) {
            width: 100%;
            justify-content: center;
          }

          .box {
            margin-top: 8px;
            border: 1px solid var(--divider-color);
            padding: 12px;
          }
          .box .toolbar {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            gap: 8px;
          }
          .gui-mode-button {
            margin-right: auto;
          }
        `;
  }
}
