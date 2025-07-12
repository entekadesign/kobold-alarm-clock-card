// import { AlarmController, AlarmConfiguration, Helpers } from './alarm-controller';
import { AlarmController, Helpers } from './alarm-controller';
import './alarm-picker';

import { LitElement, html, css } from 'lit';
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

import type { CardConfig, NextAlarmObject, TimeObject, RingerEntity } from './types';

// HA types
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";

declare global {
  interface Window {
    hassConnection?: Promise<any>;
    loadCardHelpers(): Promise<void>;
    // customCards: Array<LovelaceCardConfig>;
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

// Add our card to the list of custom cards for the card picker
window.customCards = window.customCards || []; // Create the list if it doesn't exist. Careful not to overwrite it
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
  // private _snoozeDurationDefault: TimeObject;
  // private _alarmDurationDefault: TimeObject;
  // private _alarmConfiguration: AlarmConfiguration;
  // private _alarmConfiguration: any;

  @state() _alarmsEnabled: boolean;
  @state() _nextAlarm: NextAlarmObject;
  @state() _alarmPickerMo: TimeObject;
  @state() _alarmPickerTu: TimeObject;
  @state() _alarmPickerWe: TimeObject;
  @state() _alarmPickerTh: TimeObject;
  @state() _alarmPickerFr: TimeObject;
  @state() _alarmPickerSa: TimeObject;
  @state() _alarmPickerSu: TimeObject;
  @state() _napTime: TimeObject;
  @state() _timeFormat: string;
  @state() _clockDefaultFullscreen: boolean;
  @state() _clockFontFace: string;
  @state() _hass: HomeAssistant;
  @state() _ringerEntities: Array<{ enabled: boolean, entity_id: string }>;
  @state() _alarmClockClasses: { [key: string]: boolean };
  @state() _alarmButtonsClasses: { [key: string]: boolean };
  @state() _footClasses: { [key: string]: boolean };
  @state() _clockClasses: { [key: string]: boolean };
  @state() _koboldEditor: any; //TODO: better type

  @query('#clock', true) _clockQ: HTMLElement;
  @query('#date', true) _dateQ: HTMLElement;
  @query('ha-card', true) _haCardQ: HTMLElement;
  @queryAll('div.optionButtons ha-icon') _optionButtonsHostsQ: NodeListOf<HTMLElement>;
  @queryAll('dialog#settingsDialog #alarm-settings-dialog-content .radio-row ha-formfield') _formfieldHostsQ: NodeListOf<HTMLElement>;
  @queryAll('dialog#settingsDialog #alarm-settings-dialog-content .switches-group-table ha-textfield') _textfieldHostsQ: NodeListOf<HTMLElement>;
  @queryAll('dialog#settingsDialog #alarm-settings-dialog-content .switches-group-table ha-switch') _switchHostsQ: NodeListOf<HTMLElement>;
  @query('#extraInfo', true) _rootQ: HTMLElement;
  @query('#napTimePicker', true) _napTimePickerQ: HTMLInputElement;
  @query('#alarm-picker-dialog-title ha-switch', true) _haSwitchQ: HTMLInputElement;
  @query('#alarmPickerMo', true) _alarmPickerMoQ: HTMLInputElement;
  @query('#alarmPickerTu', true) _alarmPickerTuQ: HTMLInputElement;
  @query('#alarmPickerWe', true) _alarmPickerWeQ: HTMLInputElement;
  @query('#alarmPickerTh', true) _alarmPickerThQ: HTMLInputElement;
  @query('#alarmPickerFr', true) _alarmPickerFrQ: HTMLInputElement;
  @query('#alarmPickerSa', true) _alarmPickerSaQ: HTMLInputElement;
  @query('#alarmPickerSu', true) _alarmPickerSuQ: HTMLInputElement;
  @query('#timeFormat ha-radio[checked]') _timeFormatQ: HTMLInputElement;
  @query('#clockFontFace ha-radio[checked]') _clockFontFaceQ: HTMLInputElement;
  @query('#clockDefaultFullscreen', true) _clockDefaultFullscreenQ: HTMLInputElement;
  @query('#snoozeDurationPicker', true) _snoozeDurationPickerQ: HTMLInputElement;
  @query('#alarmDurationPicker', true) _alarmDurationPickerQ: HTMLInputElement;
  @query('#scheduleDialog', true) _scheduleDialogQ: HTMLDialogElement;
  @query('#napDialog', true) _napDialogQ: HTMLDialogElement;
  @query('#settingsDialog', true) _settingsDialogQ: HTMLDialogElement;
  @query('#alarm-top div#clockLogo', true) _clockLogoQ: HTMLElement;

  connectedCallback() {
    super.connectedCallback();

    if (this._config.debug) {
      this._hass.callService('system_log', 'write', { 'message': '*** connectedCallback(); _cardID: ' + this._cardId, 'level': 'info' });
      console.warn('*** connectedCallback(); _cardID: ' + this._cardId);
    };

    // recover from disconnect, e.g., HA restart
    window.addEventListener('connection-status', this._connectionStatusEvent);
    // console.log('*** adding kobold-editor event listener');
    Helpers.getHa().addEventListener('kobold-editor', this._koboldEditorEvent);
    // Helpers.getHa().addEventListener('kobold-editor', (event) => { this.koboldEditorEvent(event) });
    Helpers.getHa().addEventListener('dialog-closed', this._dialogClosedEvent); //TODO: replace with custom event that sends card id so that closing editor only applies to kobold editor
    // function setMyEditMode(mode = true) {
    window.setMyEditMode = (mode = true) => {
      const ll = Helpers.getLovelace();
      if (ll && ll.lovelace.editMode !== mode) {
        ll.lovelace.setEditMode(mode);
        // if (!mode) ll.requestUpdate();
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
            }, 1000 * 5);
          }, 1000 * 2);
        }, 'homeassistant_started');
      });
    }
  }

  _dialogClosedEvent = (event: CustomEvent) => {
    if (event.detail.dialog === 'hui-dialog-edit-card') {
      window.setMyEditMode(false);
      window.setTimeout(() => {
        // replace browser history using path without edit parameter
        // see _handleClosed https://github.com/home-assistant/frontend/blob/f3380891486c01f2a75c83524578b5aeed85f114/src/dialogs/make-dialog-manager.ts
        const base = window.location.pathname;
        window.history.replaceState(null, '', base);
      }, 500);
    }
  }

  _koboldEditorEvent = (event: CustomEvent) => {
    this._koboldEditor = event.detail.editorEl;
    // console.log('*** kobold-editor event received: ', this._koboldEditor);
  }

  static getConfigElement() {
    // Create and return an editor element
    return document.createElement("kobold-card-editor");
  }

  static getStubConfig() {
    // Return a minimal configuration that will result in a working card configuration
    return {
      ...Helpers.defaultConfig,
      // entity: "",
      // enabled: false,
    };
  }

  render() {
    // this._alarmConfiguration = this._alarmController.controllersAlarmConfig;
    this._nextAlarm = this._alarmController.nextAlarm;
    // console.log('*** render(); this._nextAlarm: ', this._nextAlarm);

    this._ringerEntities = this._ringerEntities || [];
    const alarmEntities = [];
    const ringerEntitiesIds = this._ringerEntities.map(item => item.entity_id);

    if (this._config.alarm_entities) {
      // add any alarm_entities that are not already members of ringerEntities
      this._config.alarm_entities.forEach((item) => { if (ringerEntitiesIds.indexOf(item) < 0) alarmEntities.push({ enabled: true, entity_id: item }); if (!this._hass.states[item]) console.warn(`*** render(); Entity ${item} does not exist in HA`) });
    } else {
      if (!this._config.alarm_entity_local) alert('No alarm_entities and no alarm_entity_local in YAML configuration. One is required for alarm');
    }

    // add alarm_entity_local if not already member of ringerEntities
    if (this._config.alarm_entity_local) {
      if (ringerEntitiesIds.indexOf(this._config.alarm_entity_local) < 0) alarmEntities.push({ enabled: false, entity_id: this._config.alarm_entity_local });
    }

    this._ringerEntities = [...alarmEntities, ...this._ringerEntities];

    this._alarmClockClasses = this._alarmClockClasses || {};
    this._alarmButtonsClasses = this._alarmButtonsClasses || {};
    this._footClasses = this._footClasses || {};
    this._clockClasses = this._clockClasses || { clock: true };

    const isAlarmRinging = this._alarmController.isAlarmRinging();
    if (isAlarmRinging && !this._ringingBegun) {
      this._ringingBegun = true;
      this._alarmClockClasses = { fullscreen: false };
      this._alarmButtonsClasses = { showButtons: true };
      this._footClasses = { hideFoot: false };
    } else if (!isAlarmRinging && this._ringingBegun) {
      this._ringingBegun = false;
      this._alarmButtonsClasses = { showButtons: false };
    }

    return html`
        <ha-card>
          <div>

            <div id="alarmclock" class=${classMap(this._alarmClockClasses)}>
              <div id="alarm-top" class="meta">
                <div id="clockLogo"></div>
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
              <div id="clock" class=${classMap(this._clockClasses)} @click=${this._toggleAlarmFullscreen}>TIME</div>
            </div>
          </div>
        </ha-card>

        <div id="foot" class=${classMap(this._footClasses)}>
          <div id="alarmButtons" class=${classMap(this._alarmButtonsClasses)}>
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
      #alarm-top div#clockLogo {
        display: none;
      }
    }

    #alarmclock {
      padding: 1.5rem;
      height: 65vh;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: height 240ms;
    }

    #alarmclock.fullscreen {
      height: 100vh;
    }

    #alarmclock.fullscreen #clock {
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

    #alarm-top div#clockLogo {
      background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27750%27%20height%3D%27175%27%20viewBox%3D%270%200%20198.437%2046.302%27%3E%3Cdefs%3E%3Cpath%20id%3D%27a%27%20d%3D%27M134.532%20279.996h1013.197v243.84H134.532z%27%2F%3E%3C%2Fdefs%3E%3Cg%20aria-label%3D%27KOBOLD%27%20style%3D%27font-size%3A192px%3Bline-height%3A1.25%3Bwhite-space%3Apre%3Bshape-inside%3Aurl%28%23a%29%27%20transform%3D%27translate%28-39.822%2011.568%29%20scale%28.26458%29%27%3E%3Cpath%20d%3D%27M297.007%20381.147v7.723l-36.756%2043.764q9.01%2010.87%2018.307%2022.025%209.439%2011.013%2018.45%2021.739v7.723h-23.17l-33.753-40.331H219.92v40.331h-22.311V381.147h22.31v40.331h20.166q3.29-3.718%206.436-7.58%203.147-3.861%206.436-7.723l20.881-25.028zm232.264%2040.474q0%204.005-1%206.58%202.144%202.717%203.575%206.292%201.43%203.433%201.43%207.151v21.31q0%204.434-1.716%208.295-1.717%203.862-4.577%206.722-2.86%202.86-6.722%204.577-3.861%201.573-8.295%201.573h-81.664V381.147h77.802q4.291%200%208.153%201.716%203.861%201.573%206.721%204.434%203.004%202.86%204.577%206.722%201.716%203.861%201.716%208.295zM452.47%20461.81h58.352v-18.879H452.47Zm0-41.19h54.347v-17.162H452.47Zm222.958-39.616h22.168v80.806h80.807v22.311H675.428Zm193.22.143q4.434%200%208.295%201.716%203.862%201.573%206.722%204.434%202.86%202.86%204.577%206.722%201.716%203.861%201.716%208.295v60.64q0%204.434-1.716%208.295-1.717%203.862-4.577%206.722-2.86%202.86-6.722%204.577-3.861%201.573-8.295%201.573h-81.664V381.147Zm-59.496%2080.663h58.352v-58.352h-58.352z%27%20style%3D%27font-family%3AOrbitron%3B-inkscape-font-specification%3AOrbitron%3Bstroke-width%3A.744895%27%20transform%3D%27translate%28-33.794%20-401.053%29%20scale%281.02854%29%27%2F%3E%3Cpath%20d%3D%27M419.64%20675.367A117.536%20117.536%200%200%200%20302.101%20792.9%20117.536%20117.536%200%200%200%20419.64%20910.437%20117.536%20117.536%200%200%200%20537.172%20792.9%20117.536%20117.536%200%200%200%20419.64%20675.367Zm-.71%2012.63%203.237%2036.913%203.195%2036.426h.043l-.032.141.032.346h-.106l-3.132%2014.648-3.237%2015.135-3.237-15.135-3.135-14.648h-.102l.028-.346-.028-.14h.042l3.195-36.427zm-1.728%20106.955-5.173%208.6-5.007%208.322.078.138-.194.06-.05.081-.031-.056-20.703%206.41-20.977%206.496%2016.118-14.916%2015.9-14.722-.032-.057h.095l.148-.14.082.137%209.71-.173z%27%20style%3D%27fill%3A%23000%3Bstroke-width%3A.999999%27%20transform%3D%27translate%2895.652%20-407.931%29%20scale%28.56969%29%27%2F%3E%3Cpath%20d%3D%27M705.391%20675.367A117.536%20117.536%200%200%200%20587.855%20792.9%20117.536%20117.536%200%200%200%20705.39%20910.437%20117.536%20117.536%200%200%200%20822.925%20792.9%20117.536%20117.536%200%200%200%20705.39%20675.367Zm.54%2012.63%203.237%2036.913%203.195%2036.426h.042l-.032.141.032.346h-.106l-3.131%2014.648-3.237%2015.135-3.24-15.135-3.132-14.648h-.102l.028-.346-.028-.14h.042l3.191-36.427zm1.57%20106.856%2010.035.18%209.715.173.077-.138.152.141h.091l-.031.057%2015.9%2014.722%2016.118%2014.916-20.978-6.495-20.699-6.411-.031.056-.05-.08-.197-.06.077-.138-5.007-8.322z%27%20style%3D%27fill%3A%23000%3Bstroke-width%3A.999999%27%20transform%3D%27translate%28185.991%20-407.931%29%20scale%28.56969%29%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");

      height: calc(0.55em + 1vh);
      width: 100%;
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
    #clock .colonKern {
      margin-left: -0.1em !important;
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
    #clock.fontFace2 .colonKern {
      margin-left: -0.05em !important;
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
    #clock.fontFace3 .colonKern {
      margin-left: 0 !important;
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

  firstUpdated(changedProperties: Map<string, any>): void {
    super.firstUpdated(changedProperties);

    // this._timeFormat = this._alarmConfiguration['timeFormat'];
    this._timeFormat = this._config.time_format;
    // this._clockFontFace = this._alarmConfiguration['clockFontFace'];
    this._clockFontFace = this._config.clock_display_font;
    // this._toggleAlarmFullscreen(this._alarmConfiguration['clockDefaultFullscreen']);
    this._toggleAlarmFullscreen(this._config.hide_cards_default);
    this._updateTime();
    this._updateLoop();

    if (this._haCardQ) {
      this._buildCard();
    } else {
      console.warn('*** firstUpdated(); Missing <ha-card> in shadowRoot')
    }

    if (!this._alarmController.isSafetyConfigSet()) {
      if (this._config.debug) {
        this._hass.callService('system_log', 'write', { 'message': '*** Safety config not set: install (1) binary sensor entity from ping integration, and (2) LAN-accessible alarm entity', 'level': 'info' });
      }
      console.warn('*** Safety config not set: install (1) binary sensor entity from ping integration, and (2) LAN-accessible alarm entity');
    }

    // this._alarmsEnabled = this._alarmConfiguration.alarmsEnabled;
    this._alarmsEnabled = this._config.alarms_enabled;

    // this.addEventListener("kobold-card-editor-tab", (event: CustomEvent) => {
    //   console.log('*** kobold-card-editor-tab event received; tab: ', event.detail.tab);
    //   Helpers.fireEvent('ll-edit-card', { path: event.detail.path }, this);
    //   // if (event.detail.dialog === 'hui-dialog-edit-card') {
    //   // }
    // });
    // console.log('*** firstUpdated(); lovelace: ', Helpers.getLovelace());
  }

  // updated(changedProperties: Map<string, any>): void {
  updated(): void {

    if (!this._injectStylesDone) {
      this._injectStylesDone = true;

      // hide visible line separating sidebar from main view on iOS
      document.querySelector('home-assistant').shadowRoot.querySelector('home-assistant-main').shadowRoot.querySelector('ha-drawer').shadowRoot.querySelector('aside').style.borderRightStyle = 'unset';

      // prevent scrolling
      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('body').style.position = 'fixed';
      document.querySelector('body').style.width = '100%';

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

      // settings dialog styles
      if (this._switchHostsQ) {
        let settingsDialogStyle = '.mdc-switch{ margin: auto 0 !important; }';
        this._switchHostsQ.forEach((switchHost) => {
          myStyle = document.createElement('style');
          myStyle.innerHTML = settingsDialogStyle;
          switchHost.shadowRoot.appendChild(myStyle);
        });
      }
      if (this._textfieldHostsQ) {
        let settingsDialogStyle = '.mdc-text-field--filled { height: 2em !important; }';
        this._textfieldHostsQ.forEach((textfieldHost) => {
          myStyle = document.createElement('style');
          myStyle.innerHTML = settingsDialogStyle;
          textfieldHost.shadowRoot.appendChild(myStyle);
        });
      }
      if (this._formfieldHostsQ) {
        let settingsDialogStyle = '.mdc-form-field > label { margin-left: -0.5em !important } .mdc-form-field { color: #000000 !important; gap: 0 !important }';
        this._formfieldHostsQ.forEach((formfieldHost) => {
          myStyle = document.createElement('style');
          myStyle.innerHTML = settingsDialogStyle;
          formfieldHost.shadowRoot.appendChild(myStyle);
        });
      }
    }
  }

  setConfig(config: CardConfig) {

    if (!config) {
      alert('Card config incorrectly formatted or missing.');
    }

    // console.log('*** setting config on card: ', config);

    if (!config.cards || !Array.isArray(config.cards)) {
      console.warn('*** setConfig(); No HA cards available to configure');
    }

    // these settings can be overridden by including them in card's yaml config
    this._config = {
      name: 'alarm_clock',
      ...config
    };

    // NOTE: Some cards call setConfig() multiple times during life of card
    if (!this._alarmController) this._alarmController = new AlarmController(this._config, this._cardId);
  }

  set hass(hass: HomeAssistant) {

    this._hass = hass;
    this._alarmController.hass = hass;

    dayjs.locale(hass.language);

    if (this._elements) {
      this._elements.forEach((element) => {
        // console.log('*** TEMP: setConfig element: ', element);
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
            HeightUpdater.updateHeight(element);
            if (this._hass) {
              element.hass = this._hass;
            } else {
              console.warn('*** _buildCard(); No hass object available for config');
            }
          });
        });
    }

    if (!this._alarmController.isConfigCorrect()) {
      alert(`Card requires two integration entities: input boolean helper and Variables+History whose entity IDs are: sensor.${config.name} and input_boolean.${config.name}`);
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
    // const fontNum = (!this._alarmController.alarmClockPingEntity || this._alarmController.alarmClockPingEntity.state === 'off' || !this._alarmConfiguration['clockFontFace']) ? '0' : this._alarmConfiguration['clockFontFace'];
    const fontNum = (!this._alarmController.alarmClockPingEntity || this._alarmController.alarmClockPingEntity.state === 'off' || !this._config.clock_display_font) ? '0' : this._config.clock_display_font;
    const fontFaceClass = 'fontFace' + fontNum;
    this._clockClasses = fontNum === '0' ? { clock: true } : { clock: true, [fontFaceClass]: true };
    // const time = dayjs().format(this._alarmConfiguration['timeFormat'] === '24hr' ? 'HH:mm' : 'h:mm A');
    const time = dayjs().format(this._config.time_format === '24hr' ? 'HH:mm' : 'h:mm A');
    const isAlarmRinging = this._alarmController.isAlarmRinging();

    if (this._clockQ &&
      (force
        || this._time !== time
        || this._ringing !== isAlarmRinging
        // || this._controllersAlarmConfigLastUpdate !== this._alarmConfiguration.lastUpdated)) {
        // TODO: test if it is possible for these lastupdated variables to come apart now
        || this._controllersAlarmConfigLastUpdate !== this._config.last_updated)) {
      this._time = time;
      this._ringing = isAlarmRinging;
      this._controllersAlarmConfigLastUpdate = this._config.last_updated;

      let timeDisplay: string;

      // if (this._alarmConfiguration['timeFormat'] === '24hr') {
      if (this._config.time_format === '24hr') {
        timeDisplay = time;
      } else {
        const [timeNum, timeTxt] = time.split(' ');
        let periodKern = '';
        if (timeNum.slice(-1) === '1' || timeNum.slice(-1) === '7') periodKern = ' periodKern';
        timeDisplay = timeNum + '<span class="periodName' + periodKern + '">' + timeTxt + '</span>';
      }

      const [timeHr, timeMn] = timeDisplay.split(':');
      let colonKern = '';
      if (timeHr.slice(-1) === '1') colonKern = ' colonKern';
      timeDisplay = timeHr + '<span class="colon' + colonKern + '">:</span>' + timeMn;

      this._clockQ.innerHTML = `
        <div class="clock-display">
          ${timeDisplay}
        </div>
      `;
      // const dateFormat = this._alarmConfiguration['timeFormat'] === '24hr' ? 'dddd, D MMMM' : 'dddd, MMMM D';
      const dateFormat = this._config.time_format === '24hr' ? 'dddd, D MMMM' : 'dddd, MMMM D';
      this._dateQ.innerHTML = dayjs().format(dateFormat);
    }
  }

  // _setAlarm() {
  //   console.log('*** _setAlarm fired on card');
  //   const alarm: TimeObject = JSON.parse(JSON.stringify((this._napTimePickerQ).value));
  //   const alarmTime = dayjs().add(dayjs.duration(Helpers.convertToMinutes(alarm.time)));
  //   this._alarmController.nextAlarm = {
  //     ...this._alarmController.nextAlarm,
  //     enabled: true,
  //     time: alarmTime.format('HH:mm'),
  //     nap: true,
  //     overridden: true
  //   }
  // }

  _areAlarmsEnabled() {
    // return this._alarmConfiguration.alarmsEnabled || !!this._alarmController.nextAlarm.nap;
    return this._config.alarms_enabled || !!this._alarmController.nextAlarm.nap; //TODO: shouldn't this be !!this._alarmConfiguration.nextAlarm.nap? (not according to dehuyss clock).

    // console.log("*** this config: ", this._config);


    // return this._config?.alarms_enabled || this._config.nextAlarm?.overridden; //TODO: should be accessors on alarmcontroller; why overridden and not nap?
  }

  _onAlarmChanged(event: CustomEvent) {
    // this not triggered by snooze or alarm picker dialogs; only fires for changes to nextalarm in #alarmpicker element html of kobold-alarm-clock-card.js
    if (!event.detail.alarm.enabled) {
      this._alarmController.nextAlarm = {
        // ...this._alarmConfiguration.nextAlarm,
        ...this._alarmController.nextAlarm,
        enabled: false,
        overridden: true
      }
    } else {
      this._alarmController.nextAlarm = event.detail.alarm;
    }
  }

  _handleAlarmButtonsClick(event: Event) {
    this._alarmController[(<HTMLInputElement>event.target).id]();
  }

  _handleRadioValueTimeFormat(event: Event) {
    this._timeFormat = (<HTMLInputElement>event.target).value;
  }

  _handleRadioValueClockFontFace(event: Event) {
    this._clockFontFace = (<HTMLInputElement>event.target).value;
  }

  _handleSwitchRingerEntity(event: Event) {
    const entityIndex = (<HTMLInputElement>event.target).id.split('-').pop();
    this._ringerEntities[entityIndex].enabled = (<HTMLInputElement>event.target).checked;
  }

  _toggleAlarmFullscreen(force: boolean) {
    if (!this._alarmController.isAlarmRinging()) {
      if (this._alarmClockClasses.fullscreen || !force) {
        this._alarmClockClasses = { fullscreen: false };
        this._footClasses = { hideFoot: false };
      } else {
        this._alarmClockClasses = { fullscreen: true };
        this._footClasses = { hideFoot: true };
      }
    }
  }

  // _getDayOfWeek(days: number) {
  //   // returns day of week in language set in set hass() method
  //   return dayjs('2018-08-27').add(days, 'days').format('dddd');
  // }

  // saveAndCloseAlarmPicker() {
  //   const controllersAlarmConfig = Object.assign(new AlarmConfiguration, {
  //     ...this._alarmConfiguration,
  //     alarmsEnabled: (this._haSwitchQ).checked,
  //     mo: (this._alarmPickerMoQ).value,
  //     tu: (this._alarmPickerTuQ).value,
  //     we: (this._alarmPickerWeQ).value,
  //     th: (this._alarmPickerThQ).value,
  //     fr: (this._alarmPickerFrQ).value,
  //     sa: (this._alarmPickerSaQ).value,
  //     su: (this._alarmPickerSuQ).value,
  //   });

  //   controllersAlarmConfig.dismiss();
  //   this._alarmController.saveControllersAlarmConfig(controllersAlarmConfig);
  //   this.closeDialog('#scheduleDialog');
  // }

  // saveAndCloseSettings() {
  //   const controllersAlarmConfig = Object.assign(new AlarmConfiguration, {
  //     ...this._alarmConfiguration,
  //     ringerEntities: JSON.stringify(this._ringerEntities),
  //     timeFormat: (this._timeFormatQ).value,
  //     clockFontFace: (this._clockFontFaceQ).value,
  //     clockDefaultFullscreen: (this._clockDefaultFullscreenQ).checked,
  //     snoozeDurationDefault: (this._snoozeDurationPickerQ).value,
  //     alarmDurationDefault: (this._alarmDurationPickerQ).value,
  //   });

  //   this._alarmController.saveControllersAlarmConfig(controllersAlarmConfig);
  //   if (this._alarmClockClasses.fullscreen !== this._clockDefaultFullscreen) this._toggleAlarmFullscreen(this._clockDefaultFullscreen);
  //   this.closeDialog('#settingsDialog');
  // }

  // saveAndCloseNap() {
  //   this._setAlarm();
  //   const controllersAlarmConfig = Object.assign(new AlarmConfiguration, {
  //     ...this._alarmConfiguration,
  //     napDurationDefault: (this._napTimePickerQ).value,
  //   });

  //   this._alarmController.saveControllersAlarmConfig(controllersAlarmConfig);
  //   this.closeDialog('#napDialog');
  // }

  // clearAndCloseNap() {
  //   this._alarmController.nextAlarmReset();
  //   this.closeDialog('#napDialog');
  // }

  // _editorSaveEvent = (event: CustomEvent) => {
  //   console.log('*** editor-save event received: ', event.detail);
  // }

  async _showEditor(event) {
    event.stopPropagation();
    let tabNo = parseInt(event.target.id.slice(4));
    // console.log('*** tab: ', tabNo);
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

        // this._koboldEditor.getRootNode().host.closest('hui-card-element-editor').addEventListener('editor-save', this._editorSaveEvent);
        // console.log('*** get editor', this._koboldEditor.getRootNode().host.closest('hui-card-element-editor'));
        this._koboldEditor = undefined;

        // console.log('*** config: ', this._config);
      }
    }
  }

  // _showAlarmPicker() {
  //   this._alarmsEnabled = this._alarmConfiguration.alarmsEnabled;
  //   this._alarmPickerMo = JSON.parse(JSON.stringify(this._alarmConfiguration['mo']));
  //   this._alarmPickerTu = JSON.parse(JSON.stringify(this._alarmConfiguration['tu']));
  //   this._alarmPickerWe = JSON.parse(JSON.stringify(this._alarmConfiguration['we']));
  //   this._alarmPickerTh = JSON.parse(JSON.stringify(this._alarmConfiguration['th']));
  //   this._alarmPickerFr = JSON.parse(JSON.stringify(this._alarmConfiguration['fr']));
  //   this._alarmPickerSa = JSON.parse(JSON.stringify(this._alarmConfiguration['sa']));
  //   this._alarmPickerSu = JSON.parse(JSON.stringify(this._alarmConfiguration['su']));
  //   this._scheduleDialogQ.show();
  //   this._scheduleDialogQ.classList.add('open');
  // }

  // _showNapDialog() {
  //   this._napTime = JSON.parse(JSON.stringify(this._alarmConfiguration['napDurationDefault']));
  //   this._napDialogQ.show();
  //   this._napDialogQ.classList.add('open');
  // }

  // _showSettingsDialog() {
  //   this._timeFormat = this._alarmConfiguration['timeFormat'];
  //   // this._clockDefaultFullscreen = this._alarmConfiguration['clockDefaultFullscreen'];
  //   this._clockDefaultFullscreen = this._config['hide_cards_default'];
  //   this._clockFontFace = this._alarmConfiguration['clockFontFace'];
  //   this._snoozeDurationDefault = JSON.parse(JSON.stringify(this._alarmConfiguration['snoozeDurationDefault']));
  //   this._alarmDurationDefault = JSON.parse(JSON.stringify(this._alarmConfiguration['alarmDurationDefault']));
  //   const alarmEntities = [];
  //   const ringerEntitiesIds = this._ringerEntities.map(item => item.entity_id);
  //   const ringerEntitiesConfig = this._alarmConfiguration['ringerEntities'] ? JSON.parse(this._alarmConfiguration['ringerEntities']) : [];

  //   ringerEntitiesConfig.forEach((item: RingerEntity) => { if (ringerEntitiesIds.indexOf(item.entity_id) >= 0) alarmEntities.push(item) });
  //   this._ringerEntities = alarmEntities;
  //   this._settingsDialogQ.show();
  //   this._settingsDialogQ.classList.add('open');
  // }

  closeDialog(target: string) {
    const dialogElement: HTMLDialogElement = this.shadowRoot.querySelector(target);
    dialogElement.classList.remove('open');
    setTimeout(() => { dialogElement.close() }, 120);
  }

  _toggleLogoVisibility() {
    if (this._clockLogoQ) {
      if (this._clockLogoQ.style.display !== 'none') {
        this._clockLogoQ.style.display = 'none';
      } else {
        this._clockLogoQ.style.display = 'block';
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
      name: "alarm_entity_local",
      label: "Local Alarm Ringer Entity",
      selector: { entity: { filter: { domain: ["input_boolean", "switch", "media_player"] } } },
    },
    {
      name: "ping_entity",
      label: "Ping Entity",
      selector: { entity: { filter: { domain: "binary_sensor" } } },
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
    // {
    //   type: "grid",
    //   name: "",
    //   schema: [
    //     {},
    //     {
    //       name: "snooze_duration_default2",
    //       label: "Snooze Duration",
    //       selector: { duration: {} },
    //     },
    //   ],
    // },
    {
      name: "alarm_duration_default",
      label: "Alarm Duration Default",
      selector: { duration: {} },
    },
    // {
    //   name: "alarm_triggers",
    //   label: "Alarm Triggers",
    //   selector: { trigger: {} },
    // },
    // {
    //   name: "alarm_conditions",
    //   label: "Alarm Conditions",
    //   selector: { condition: {} },
    // },
    // {
    //   name: "alarm_actions_new",
    //   label: "Alarm Actions",
    //   selector: { select: { multiple: true, custom_value: true, options: [] } },
    // },
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
    // {
    //   name: "alarm_actions_newer_still",
    //   label: "Alarm Actions 3",
    //   selector: { action: {} },
    // },
  ]

  private _configSchemaSchedule = (alarms_disabled?: boolean) => [
    {
      name: "alarms_enabled",
      label: "Alarms Schedule Enabled",
      selector: { boolean: {} },
      // default: false,
    },
    {
      type: "grid",
      name: "mo",
      schema: [
        {
          name: "enabled",
          label: "Monday",
          selector: { boolean: {} },
          // default: false,
          disabled: alarms_disabled,
        },
        {
          name: "time",
          label: "",
          selector: { time: {} },
          // default: "07:00:00",
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
          label: "Tuesday",
          selector: { boolean: {} },
          // default: false,
          disabled: alarms_disabled,
        },
        {
          name: "time",
          label: "",
          selector: { time: {} },
          // default: '07:00:00',
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
          label: "Wednesday",
          selector: { boolean: {} },
          // default: false,
          disabled: alarms_disabled,
        },
        {
          name: "time",
          label: "",
          selector: { time: {} },
          // default: '07:00:00',
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
          label: "Thursday",
          selector: { boolean: {} },
          // default: false,
          disabled: alarms_disabled,
        },
        {
          name: "time",
          label: "",
          selector: { time: {} },
          // default: '07:00:00',
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
          label: "Friday",
          selector: { boolean: {} },
          // default: false,
          disabled: alarms_disabled,
        },
        {
          name: "time",
          label: "",
          selector: { time: {} },
          // default: '07:00:00',
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
          label: "Saturday",
          selector: { boolean: {} },
          // default: false,
          disabled: alarms_disabled,
        },
        {
          name: "time",
          label: "",
          selector: { time: {} },
          // default: '07:00:00',
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
          label: "Sunday",
          selector: { boolean: {} },
          // default: false,
          disabled: alarms_disabled,
        },
        {
          name: "time",
          label: "",
          selector: { time: {} },
          // default: '07:00:00',
          disabled: alarms_disabled,
        },
      ],
    },
  ]

  private _configSchemaNap = [
    // {
    //   type: "grid",
    //   name: "",
    //   schema: [
    //     {
    //       name: "nap_duration",
    //       label: "Nap Duration",
    //       selector: { duration: {} },
    //       // default: { hours: 0, minutes: 7, seconds: 0 },
    //       // default: nap_duration_default,
    //     },
    //     {
    //       name: "schedule_override",
    //       label: "Schedule Override",
    //       selector: { boolean: {} },
    //       // default: false,
    //     },
    //   ],
    // },
    // {
    //   name: "nap_duration",
    //   label: "Nap Duration",
    //   selector: { duration: {} },
    //   // default: { hours: 0, minutes: 7, seconds: 0 },
    //   // default: nap_duration_default,
    // },
    // {
    //   type: "grid",
    //   name: "next_alarm",
    //   schema: [
    //     // {
    //     //   name: "enabled",
    //     //   label: "Next Alarm Enabled",
    //     //   selector: { boolean: {} },
    //     //   // default: false,
    //     // },
    //     // {
    //     //   name: "time",
    //     //   label: "Time",
    //     //   selector: { time: {} },
    //     // },
    //     // {
    //     //   name: "date",
    //     //   label: "Date",
    //     //   selector: { date: {} },
    //     // },
    //     // {
    //     //   name: "datetime",
    //     //   label: "Date Time",
    //     //   selector: { datetime: {} },
    //     // },
    //     {
    //       name: "overridden",
    //       label: "Override Schedule",
    //       selector: { boolean: {} },
    //       // default: override_default,
    //     },
    //   ],
    // },
    {
      type: "grid",
      name: "",
      schema: [
        {
          type: "grid",
          name: "next_alarm",
          schema: [
            {
              name: "overridden",
              label: "Nap Duration",
              selector: { boolean: {} },
            },
          ],
        },
        {
          name: "nap_duration",
          label: "",
          selector: { duration: {} },
        },
      ]
    }

  ]

  // private _alarmController: AlarmController;
  // private _alarmConfiguration: AlarmConfiguration;
  // private _config: CardConfig;
  private _oldConfig: CardConfig;
  // private _allConfigChanges: CardConfig;

  @state() _hass: HomeAssistant;
  @state() _config: CardConfig;
  @state() _selectedTab = 0;
  @state() _alarmsEnabled: boolean;
  @state() _nextAlarmConfig: CardConfig;

  // @state() _napDurationData = { nap_duration: { hours: 0, minutes: 0, seconds: 0 } };

  constructor() {
    super();
    // console.log('*** initializing editor');
    // document.querySelector('home-assistant').addEventListener('kobold-tab', (event: CustomEvent) => {
    //   console.log('*** kobold-tab event received; tab: ', event.detail.tab);
    //   this._selectedTab = event.detail.tab;
    //   // if (event.detail.dialog === 'hui-dialog-edit-card') {
    //   // }
    // });
    Helpers.fireEvent('kobold-editor', { editorEl: this }, Helpers.getHa());
    // Helpers.getHa().addEventListener('kobold-editor-save', this._editorSave);
    // Helpers.getEditor().addEventListener('click', this._clickEvent);
    // add listener to second button (save button)
    // Helpers.getEditorButtons().querySelectorAll('mwc-button')[1].addEventListener('click', this._savePreprocessing(this._nextAlarmChange));
    Helpers.getEditorButtons().querySelectorAll('mwc-button')[1].addEventListener('click', (event) => this._saveNextAlarm(event, this._nextAlarmConfig));
    // this._selectedTab = 0;

    // this._napDurationData = { nap_duration: { hours: 0, minutes: 0, seconds: 0 } };
  }

  // static get properties() {
  //   return {
  //     hass: {},
  //     _config: {},
  //     _selectedTab: { type: Number },
  //   };
  // }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    // console.log('*** hass fired');
    // this._alarmController.hass = hass;
  }

  // setConfig works the same way as for the card itself
  setConfig(config) {
    // this._config = config;

    // console.log('*** config deepmerged with default config: ', Helpers.deepMerge(Helpers.defaultConfig, config));

    this._config = Helpers.deepMerge(Helpers.defaultConfig, config);

    if (!this._oldConfig) this._oldConfig = this._config;
    // this._config = {
    //   // ...Helpers.defaultConfig,
    //   ...config
    // };
    // console.log('*** config on editor: ', config);
    // console.log('*** setting config on editor: ', this._config);
    // if (!this._alarmController) this._alarmController = new AlarmController(this._config);
  }

  firstUpdated() {
    // console.log('*** this._alarmConfiguration: ', this._alarmConfiguration);
    // this._alarmsEnabled = this._alarmConfiguration.alarmsEnabled;
    // console.log('*** selectedTab: ', this._selectedTab);
    // console.log('*** selectedTab: ', this.tabTest);
    // console.log('*** adding listener now');
  }
  updated() {
    // console.log('*** selectedTab: ', this.tabTest);
  }
  // // This function is called when the input element of the editor loses focus
  // configUpdated(ev) {

  //   // We make a copy of the current config so we don't accidentally overwrite anything too early
  //   const _config = Object.assign({}, this._config); //nb: not a deep copy
  //   // Then we update the entity value with what we just got from the input field
  //   // console.log('*** config update event: ', ev);
  //   // console.log('*** config update target id: ', (ev.target).id);
  //   // console.log('*** config update target value: ', (ev.target).value);
  //   // console.log('*** config update target checked: ', (ev.target).checked);
  //   const [snPrefix, settingName] = (ev.target).id.split('_');
  //   if (snPrefix === 'c') {
  //     // console.log('*** settingName: ', settingName);
  //     // console.log('*** target.checked: ', (ev.target).checked);
  //     // console.log('*** ev.type: ', (ev.type));
  //     if (ev.type === 'focusout') {
  //       // console.log('*** focusout detected');
  //       _config[settingName] = (ev.target).value;
  //     } else {
  //       _config[settingName] = (ev.target).checked;
  //     }
  //     // _config.entity = ev.target.value;
  //     // And finally write back the updated configuration all at once
  //     this._config = _config;

  //     // A config-changed event will tell lovelace we have made changed to the configuration
  //     // this make sure the changes are saved correctly later and will update the preview
  //     Helpers.fireEvent("config-changed", { config: _config });
  //     // const event = new CustomEvent("config-changed", {
  //     //     detail: { config: _config },
  //     //     bubbles: true,
  //     //     composed: true,
  //     // });
  //     // this.dispatchEvent(event);
  //   }
  // }

  // _clickEvent(event) {
  //   console.log('*** click detected. target: ', event.target);
  // }

  //TODO: can we eliminate date_time property anywhere/everywhere?
  _setNextAlarm(nextAlarmTime?, snooze?, nap?) {
    // console.log('*** setting nextAlarm; arguments: nextAlarm: ' + nextAlarmTime + '; snooze: ' + snooze + '; nap: ' + nap);
    // console.log('*** nextalarm is type: ', typeof nextAlarmTime);
    if (nap) {
      console.log('*** nap fired');
      this._config.next_alarm = {
        ...this._config.next_alarm,
        enabled: true,
        nap: true,
        time: nextAlarmTime.format('HH:mm:ss'),
        date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss'),
        date: nextAlarmTime.format('YYYY-MM-DD'),
        overridden: true
      }
    }
    if (snooze) {
      console.log('*** snooze fired');
      const nextAlarmTime = dayjs(this._config.next_alarm.time, 'HH:mm:ss').add(dayjs.duration(Helpers.convertToMinutes(this._config.snooze_duration_default.time))); // this won't work: snooze_duration_default is a duration
      this._config.next_alarm = {
        ...this._config.next_alarm,
        enabled: true,
        snooze: true,
        time: nextAlarmTime.format('HH:mm:ss'),
        date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss')
      }
    }
    if (nextAlarmTime && !snooze && !nap) {
      console.log('*** nextAlarm fired');
      const alarm = { enabled: true, time: nextAlarmTime }; // is enabled necessarily true?
      const forToday = true;
      this._config.next_alarm = {
        ...AlarmController.createNextAlarmNew(alarm, forToday),
        overridden: true
      };
    }
    if (!nextAlarmTime && !snooze) {
      console.log('*** reset nextalarm fired');
      // nextalarmreset
      // console.log('*** next alarm before: ', this._config.next_alarm);
      const momentTomorrow = dayjs().add(1, 'day');
      const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()];
      // console.log('*** alarmTomorrow: ', alarmTomorrow);
      // this._config.next_alarm = {
      //   ...Helpers.defaultConfig.next_alarm,
      //   ...AlarmController.createNextAlarmNew(alarmTomorrow),
      // }
      this._config.next_alarm = {
        ...this._config.next_alarm,
        ...AlarmController.createNextAlarmNew(alarmTomorrow),
      }
      // this._config.next_alarm = AlarmController.createNextAlarmNew(alarmTomorrow);
      // console.log('*** set next alarm: ', this._config.next_alarm);
      // console.log('*** create next alarm: ', AlarmController.createNextAlarmNew(alarmTomorrow));
    }
    // Helpers.fireEvent('config-changed', { config: this._config }, this); // will be saved in _valueChanged method
  }

  // _valueChanged(event: CustomEvent) {
  _valueChanged(event) {
    event.stopPropagation();
    if (!this._config) return;
    // console.log('*** alarmsEnabled: ', event.detail.value.alarms_enabled);
    // console.log('*** value changed');

    // console.log('*** event: ', event);
    // if (myValue.nap_duration && Object.values(myValue.nap_duration).every((value) => value === 0)) {
    //   delete myValue.nap_duration;
    // }

    // this._alarmsEnabled = event.detail.value.alarms_enabled;

    const configChanges = Helpers.deepCompareObj(this._oldConfig, event.detail.value);

    // console.log('*** configChanges: ', configChanges);

    if (!configChanges) return;

    // nap tab
    // if (this._allConfigChanges.nap_duration) {
    if (configChanges.nap_duration || (configChanges.next_alarm && configChanges.next_alarm.overridden)) {
      // console.log('*** nap duration: ', configChanges.nap_duration);
      // console.log('*** nap duration: ', this._config.nap_duration);
      // console.log('*** next_alarm.overridden: ', configChanges.next_alarm.overridden);
      // console.log('*** next_alarm: ', configChanges.next_alarm);
      // console.log('*** nap_duration: ', this._config.nap_duration);
      // const nextAlarmTime = dayjs().add(dayjs.duration(this._config.nap_duration));
      const nextAlarmTime = dayjs().add(dayjs.duration(event.detail.value.nap_duration));
      // console.log('*** nextAlarmTime: ', nextAlarmTime.format('HH:mm:ss'));
      // params = [nextAlarmTime.format('HH:mm:ss'), false, true];
      // this._setNextAlarm(nextAlarmTime, false, true);
      // this._config.next_alarm = {
      const nextAlarm = {
        ...event.detail.value.next_alarm,
        enabled: true,
        nap: true,
        time: nextAlarmTime.format('HH:mm:ss'),
        date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss'),
        date: nextAlarmTime.format('YYYY-MM-DD'),
        overridden: true
      }

      this._nextAlarmConfig = Helpers.deepMerge(Helpers.defaultConfig, event.detail.value);
      this._nextAlarmConfig.next_alarm = nextAlarm;
      this._nextAlarmConfig.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');

      // console.log('*** config: ', this._config);
      // Helpers.fireEvent('config-changed', { config: this._config }, this);
      return;
      // console.log('*** alarmTime: ', alarmTime.format('HH:mm:ss'));
    }

    this._config = Helpers.deepMerge(Helpers.defaultConfig, event.detail.value);

    this._config.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');

    // const configChanges = Helpers.deepCompareObj(this._oldConfig, this._config);

    // this._allConfigChanges = { ...this._allConfigChanges, ...configChanges };

    // let params = [];


    // if (this._allConfigChanges.next_alarm && !this._allConfigChanges.next_alarm.overridden) {
    // if (configChanges.next_alarm && !configChanges.next_alarm.overridden) {
    //   // console.log('*** reset alarm; nextAlarm: ', configChanges.next_alarm);
    //   this._setNextAlarm();
    // }

    // console.log('*** _allConfigChanges: ', this._allConfigChanges);
    // this._config = {
    //   // ...Helpers.defaultConfig,
    //   ...event.detail.value,

    // };
    // console.log('*** _config: ', this._config);

    // const hasProp = (json: CardConfig, prop: string, wildcard: boolean) =>
    //   Object.values(json)
    //     .flatMap(item => Object.keys(item)
    //       .filter(key => wildcard ? key.includes(prop) : key === prop)
    //   )

    // // Prevent empty values in config
    // // schedule tab
    // const dayNames = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
    // // // const test = (json: CardConfig) =>
    // // // Object.keys(json).filter(
    // // //   (item) => (dayItems.indexOf(item) > -1 && (json[item].time === undefined || json[item].enabled === undefined)));
    // Object.keys(configChanges).forEach(
    //   (item) => {
    //     if (dayNames.indexOf(item) > -1) {
    //       console.log('*** configChanges contains: ', item);
    //     }
    //   }
    // );

    // console.log('*** test: ', test(this._config));
    // console.log('*** hasprop: ', hasProp(this._config, 'time', false));

    // const momentTomorrow = dayjs().add(1, 'day');
    // const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()]; //create accessor?
    // // TODO: arent the following two the same?
    // // this._setNextAlarm(AlarmController.createNextAlarmNew(alarmTomorrow));
    // this._setNextAlarm(alarmTomorrow);

    // console.log('*** this._selectedTab: ', this._selectedTab);
    // if (params.length > 0) {
    //   // console.log('*** params: ', params);
    //   this._setNextAlarm(params[0], params[1], params[2]);
    // }

    // this._setNextAlarm();
    const momentTomorrow = dayjs().add(1, 'day');
    const dayTomorrow = momentTomorrow.format('dd').toLowerCase();
    Object.keys(configChanges).forEach(
      (item) => {
        if (item === dayTomorrow || item === 'alarms_enabled' || item === 'next_alarm') {
          // console.log('*** reset nextalarm');
          // change made to tomorrow's scheduled alarm
          const alarmTomorrow = this._config[dayTomorrow];
          // this._config.next_alarm = {
          //   ...this._config.next_alarm,
          //   ...AlarmController.createNextAlarmNew(alarmTomorrow),
          //   nap: false,
          //   overridden: false,
          // }
          this._config.next_alarm = AlarmController.createNextAlarmNew(alarmTomorrow);
        }
      });

    this._oldConfig = this._config;
    Helpers.fireEvent('config-changed', { config: this._config }, this);
    // this.dispatchEvent(
    //     new CustomEvent("config-changed", { detail: { config: this._config } })
    // );
  }

  // _napDurationChanged(event) {
  //   event.stopPropagation();
  //   // TODO: handle clear button
  //   // console.log('*** event: ', event);
  //   // const myValue = event.detail.value;
  //   // this._napDurationData = myValue;
  //   this._napDurationData = event.detail.value;
  //   // console.log('*** event.detail: ', this._napDurationData);
  //   // console.log('*** myValue.nap_duration: ', myValue.nap_duration);
  //   // if (myValue.nap_duration && Object.values(myValue.nap_duration).every((value) => value === 0)) {
  //   //     delete myValue.nap_duration;
  //   //     console.log('*** deleting');
  //   // }
  //   // console.log('*** napDurationData: ', this._napDurationData);
  //   // HelpersTest.fireEvent("value-changed", { value: myValue }, this);
  // }

  // _revertNap(event) {
  //   event.stopPropagation();
  //   // console.log('*** event: ', event);
  //   this._setNextAlarm();
  //   // Helpers.fireEvent('dialog-closed', { dialog: Helpers.getEditor().localName }, this);
  //   // () => { Helpers.getEditor().closeDialog(); }
  //   Helpers.getEditor().closeDialog();
  //   // Helpers.fireEvent('dialog-closed', { dialog: 'hui-card-options' }, this);

  //   // console.log('*** this.localName: ', Helpers.getEditor().localName);
  // }


  // _editorSave() {
  //   // console.log('*** save config: ', this._config);
  //   // console.log('*** this: ', this);
  //   console.log('*** kobold Editor: ', this._koboldEditor);
  // }

  _saveNextAlarm(event, nextAlarmConfig) {
    event.stopPropagation();
    // not working; this fires AFTER config already saved
    // this._config = {
    //   ...this._config,
    //   chump: true,
    // }
    // console.log('*** savePreprocessing: ', event);
    console.log('*** nextAlarm: ', nextAlarmConfig);
    // console.log('*** lovelace config: ', Helpers.getLovelace().lovelace.config.views[0].cards[0].cards[0]);
    // console.log('*** lovelace config nextAlarm: ', Helpers.getLovelace().lovelace.config.views[0].cards[0].cards[0].next_alarm);
    // console.log('*** lovelace config nap duration: ', Helpers.getLovelace().lovelace.config.views[0].cards[0].cards[0].nap_duration);
    // console.log('*** this: ', this); // this = 'mwc-button' on hui-dialog-edit-card; _config is on kobold-card-editor
    // Helpers.fireEvent('config-changed', { config: Helpers.getLovelace().lovelace.config }, this);
    // console.log('*** lovelace.config: ', Helpers.getLovelace().lovelace.config);

    // Helpers.fireEvent('config-changed', { Helpers.getLovelace().lovelace.config }, this);
    // Helpers.getLovelace().lovelace.saveConfig(Helpers.getLovelace().lovelace.config);
    // Helpers.fireEvent('kobold-editor-save', null, Helpers.getHa());
  }

  _handleSwitchTab(event) {
    // console.log('*** handleSwitchTab');
    // this._selectedTab = ev.detail.name === "settings" ? 0 : 1;

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
      // console.log('*** exiting render. _hass: ' + this._hass + '; _config: ' + this._config);
      return html``;
    }

    // console.log('*** render(); _config: ', this._config);
    // this._alarmConfiguration = this._alarmController.controllersAlarmConfig;

    // @focusout below will call entityChanged when the input field loses focus (e.g. the user tabs away or clicks outside of it)
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
    // console.log('*** rendering settings editor');
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
    return html`
      <div class="box">
        <ha-form
            .hass=${this._hass}
            .data=${this._config}
            .schema=${this._configSchemaNap}
            .computeLabel=${(s) => s.label ?? s.name}
            @value-changed=${this._valueChanged}
        ></ha-form>

        <ha-duration-input
          .data=${null}
          @value-changed=${null}
        ></ha-duration-input>

      </div>`;
  }

  // <br>
  // <mwc-button
  //     .title=${"Revert to scheduled alarms and exit without saving"}
  //     @click=${this._revertNap}
  // >
  // REVERT TO SCHEDULE
  // </mwc-button>

  _renderScheduleEditor() {
    // console.log('*** alarmsEnabled: ', this._alarmsEnabled);
    // this._alarmsEnabled = this._config.alarms_enabled; //TODO: move to _showEditor(), where default data logic should go?
    return html`<div class="box">
          <ha-form
            .hass=${this._hass}
            .data=${this._config}
            .schema=${this._configSchemaSchedule(!this._config.alarms_enabled)}
            .computeLabel=${(s) => s.label ?? s.name}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>`;
  }

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

class HeightUpdater {
  static updateHeight(element: LovelaceCard): boolean {
    if (this._updateHeightOnNormalCard(element)) return true;
    if (this._updateHeightOnNestedCards(element)) return true;
    if (this._updateHeightOnMediaControlCards(element)) return true;
    return false;
  }
  static _updateHeightOnNormalCard(element: LovelaceCard) {
    if (element.shadowRoot) {
      let cardTag: LovelaceCard = element.shadowRoot.querySelector('ha-card');
      if (cardTag) {
        cardTag.style.height = "100%";
        cardTag.style.boxSizing = "border-box";
        return true;
      }
    }
    return false;
  }

  static _updateHeightOnNestedCards(element: LovelaceCard) {
    if (element.firstChild && element.children[0].shadowRoot) {
      let cardTag: LovelaceCard = element.children[0].shadowRoot.querySelector('ha-card');
      if (cardTag) {
        cardTag.style.height = "100%";
        cardTag.style.boxSizing = "border-box";
        return true;
      }
    }
    return false;
  }

  static _updateHeightOnMediaControlCards(element: LovelaceCard) {
    if (!element.getAttribute('type-media-control')) return; // TODO: could not find this attribute anywhere in github for HA frontend; eliminate, modify?
    if (element.children[0] && element.children[0].shadowRoot) {
      (element.children[0] as LovelaceCard).style.height = '100%';
      let bannerTag: LovelaceCard = element.children[0].shadowRoot.querySelector('div.banner');
      if (bannerTag) {
        bannerTag.style.boxSizing = "border-box";
        bannerTag.style.height = "calc(100% - 72px)";
        return true;
      }
    }
    return false;
  }
}
