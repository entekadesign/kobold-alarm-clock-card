import { AlarmController, AlarmConfiguration, Helpers } from './alarm-controller';
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
  }
}

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
  private _snoozeDurationDefault: TimeObject;
  private _alarmDurationDefault: TimeObject;
  private _alarmConfiguration: AlarmConfiguration;

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
  // @state() _hassUpdatedTime: string;
  @state() _ringerEntities: Array<{ enabled: boolean, entity_id: string }>;
  @state() _alarmClockClasses: { [key: string]: boolean };
  @state() _alarmButtonsClasses: { [key: string]: boolean };
  @state() _footClasses: { [key: string]: boolean };
  @state() _clockClasses: { [key: string]: boolean };

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

    // window.hassConnection.then(({ conn }) => {
    //   let myId = ++conn.commandId;
    //   conn.socket.send(
    //     JSON.stringify({
    //       'id': myId,
    //       'type': 'subscribe_trigger',
    //       'trigger': {
    //         'platform': 'homeassistant',
    //         'event': 'shutdown'
    //       }
    //     })
    //   );

    //   conn.socket.onmessage = function (event) {
    //     const message = JSON.parse(event.data);
    //     if (message.type === 'trigger' && message.id === myId) {
    //       console.log('*** TEMP: HA shutdown recognized at ' + new Date().toJSON());
    //       // message.result.forEach((item) => {
    //       console.log('*** TEMP: result: ', message); //item);
    //       // });
    //     };
    //   };

    //   // conn.subscribeEvents(() => {
    //   //   console.log('*** TEMP: Homeassistant starting now.');
    //   //   // location.reload();
    //   // }, 'start');
    // });


    // console.log('*** TEMP: hass object: ', this._hass);
    // console.log('*** TEMP: variables sensor attributes: ', this._hass.states[`sensor.${this._config.name}`].attributes);
    // console.log('*** TEMP: variables sensor: ', this._hass.states[`sensor.${this._config.name}`]);
    // console.log('*** TEMP: hass states: ', this._hass.states);
    // console.log('*** TEMP: variables sensor.last_reported: ', this._hass.states[`sensor.${this._config.name}`].last_reported);

    // this.connect();
    if (this._config.debug) {
      this._hass.callService('system_log', 'write', { 'message': '*** connectedCallback(); _cardID: ' + this._cardId, 'level': 'info' });
      console.warn(' *** connectedCallback(); _cardID: ' + this._cardId);
    };

    // function handleReconnect() {
    //   // this.requestUpdate();
    //   window.setInterval(() => {
    //     console.log('*** TEMP: variables sensor attributes: ', this._hass.states[`sensor.${this._config.name}`].attributes.lastUpdated);
    //     // console.log('*** TEMP: hassUpdatedTime: ', this._hassUpdatedTime);
    //   }, 1000);
    // }

    // recover from disconnect, e.g., HA restart
    window.addEventListener("connection-status", (ev: CustomEvent) => {
      if (ev.detail === "connected") {
        if (this._config.debug) {
          this._hass.callService('system_log', 'write', { 'message': '*** Recovering from disconnect', 'level': 'info' });
          console.warn('*** Recovering from disconnect');
        };
        // location.reload();
        // window.setInterval(() => {
        //   // console.log('*** TEMP: variables sensor attributes: ', this._hass.states[`sensor.${this._config.name}`].attributes.lastUpdated);
        //   // console.log('*** TEMP: hassUpdatedTime: ', this._hassUpdatedTime);
        //   this.handleReconnect();
        // }, 1000);

        window.setTimeout(() => {
          // this.handleReconnect();
          // this._hass.callService('system_log', 'write', { 'message': '*** TEMP: Timer elapsed; Reload now?', 'level': 'info' });
          console.log('*** TEMP: Timer elapsed; Reload now?');
          // this.requestUpdate();
          // let hassDefined = await this.hass.states[`sensor.${this._config.name}`];
          // if (this?.hass?.states[`sensor.${this._config.name}`]) {
          //   console.log('*** TEMP: sensor: ', this.hass.states[`sensor.${this._config.name}`]);
          // } else {
          //   console.log('*** TEMP: sensor not found');
          // }
          // if (hassDefined) {
          // location.reload();
          // }
        }, 1000 * 90);

        window.hassConnection.then(({ conn }) => {
          // conn.socket.send(
          //   JSON.stringify({
          //     'id': 18,
          //     'type': 'subscribe_events',
          //     'event_type': 'homeassistant_started'
          //   })
          // );
          conn.subscribeEvents(() => {
            console.log('*** TEMP: Homeassistant started. Restart now?');
            // location.reload();
          }, 'homeassistant_started');
        });

      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._updateLoopId);
    if (this._config.debug) {
      this._hass.callService('system_log', 'write', { 'message': '*** disconnectedCallback(); _cardID: ' + this._cardId, 'level': 'info' });
      console.warn(' *** disconnectedCallback(); _cardID: ' + this._cardId);
    };
  }

  // handleReconnect() {
  //   // this.requestUpdate();
  //   // console.log('*** TEMP: hassUpdatedTime: ', this._hassUpdatedTime);
  //   // window.setInterval(() => {
  //   //   // console.log('*** TEMP: variables sensor attributes: ', this._hass.states[`sensor.${this._config.name}`].attributes.lastUpdated);
  //   //   console.log('*** TEMP: hassUpdatedTime: ', this._hassUpdatedTime);
  //   // }, 1000);
  //   if (this?.hass?.states[`sensor.${this._config.name}`]) {
  //     console.log('*** TEMP: sensor: ', this.hass.states[`sensor.${this._config.name}`]);
  //   } else {
  //     console.log('*** TEMP: sensor not found');
  //   }
  // };

  // async connect() {
  //   // const connn = (await this.getHass()).connection;
  //   // this.connection = connn;

  //   // console.log('*** TEMP: connection', await this.getHass());

  //   // conn.addEventListener("ready", () => {
  //   //   this._hass.callService('system_log', 'write', { 'message': '*** TEMP: received ready event', 'level': 'info' });
  //   // });
  //   // conn.addEventListener("homeassistant_started", () => {
  //   //   this._hass.callService('system_log', 'write', { 'message': '*** TEMP: received started event on connection', 'level': 'info' });
  //   // });

  //   // conn.socket.addEventListener("homeassistant_started", () => {
  //   //   this._hass.callService('system_log', 'write', { 'message': '*** TEMP: received started event on socket', 'level': 'info' });
  //   // });

  //   window.hassConnection.then(({ conn }) => {
  //     conn.socket.send(
  //       JSON.stringify({
  //         'id': 18,
  //         'type': 'subscribe_events',
  //         'event_type': 'homeassistant_started'
  //       })
  //     );
  //     // conn.socket.addEventListener('message', (e) => { eventHandler(e, 1) });
  //     // conn.subscribeEvents((e) => { eventHandler(e, 3) });
  //     conn.subscribeEvents((e) => { console.log('*** TEMP: Homeassistant started. Restart now: ', e) }, 'homeassistant_started');
  //     // conn.socket.addEventListener('message', (e) => { console.log('*** TEMP: message event on conn (1): ', e.data) });
  //   });

  //   // connn.socket.addEventListener('message', (e) => { eventHandler(e, 2) });
  //   // connn.socket.addEventListener('message', (e) => { console.log('*** TEMP: message event on conn (2): ', e.data) });
  //   // conn.subscribeEvents((e) => { this._hass.callService('system_log', 'write', { 'message': '*** TEMP: received started event: ' + e.toJSON(), 'level': 'info' }) });
  //   // conn.subscribeEvents((e) => { this._hass.callService('system_log', 'write', { 'message': '*** TEMP: received started event on connection: ' + e.toJSON(), 'level': 'info' }) }, 'homeassistant-started');
  //   // conn.subscribeEvents((e) => { this._hass.callService('system_log', 'write', { 'message': '*** TEMP: received ready event on connection: ' + e.toJSON(), 'level': 'info' }) }, 'ready');

  //   // function eventHandler(e, num) {
  //   //   let evt = JSON.parse(e.data);
  //   //   if (!Array.isArray(evt)) {
  //   //     evt = new Array(evt);
  //   //   }
  //   //   evt.forEach(e => {
  //   //     // if (e.type === 'event' && e.event.event_type === 'lovelace_updated') {
  //   //     if (e.type === 'event') {
  //   //       console.log('*** TEMP: message event ' + num + ': ' + JSON.stringify(e.event));
  //   //     }
  //   //   });
  //   // }

  // }

  // async getHass() {
  //   const base: any = await this.hass_base_el();
  //   while (!base.hass) await new Promise((r) => window.setTimeout(r, 100));
  //   return base.hass;
  // }

  // async hass_base_el() {
  //   await Promise.race([
  //     customElements.whenDefined("home-assistant"),
  //     customElements.whenDefined("hc-main"),
  //   ]);

  //   const element = customElements.get("home-assistant")
  //     ? "home-assistant"
  //     : "hc-main";

  //   while (!document.querySelector(element))
  //     await new Promise((r) => window.setTimeout(r, 100));
  //   return document.querySelector(element);
  // }

  render() {
    this._alarmConfiguration = this._alarmController.controllersAlarmConfig;
    this._nextAlarm = this._alarmController.nextAlarm;

    this._ringerEntities = this._ringerEntities || [];
    const alarmEntities = [];
    const ringerEntitiesIds = this._ringerEntities.map(item => item.entity_id);

    if (this._config.alarm_entities) {
      // add any alarm_entities that are not already members of ringerEntities
      this._config.alarm_entities.forEach((item) => { if (ringerEntitiesIds.indexOf(item) < 0) alarmEntities.push({ enabled: true, entity_id: item }); if (!this._hass.states[item]) console.warn(`*** Entity ${item} does not exist in HA`) });
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

            <dialog id="scheduleDialog" class="mdc-dialog alarm-picker-dialog"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="alarm-picker-dialog-title"
                aria-describedby="alarm-picker-dialog-content"
                >
                <div class="mdc-dialog__container">
                    <div class="mdc-dialog__surface">
                        <header id="alarm-picker-dialog-title" class="header-bar mdc-dialog__title">
                          <ha-icon-button
                          slot="navigationIcon"
                          dialogAction="cancel"
                          label="Close"
                          >
                            <ha-icon .icon=${'mdi:close'} class="header-navigation-icon" @click=${() => this.closeDialog('#scheduleDialog')}></ha-icon>
                          </ha-icon-button>
                          <span class="header-title">Set Schedule</span>
                          <ha-switch ?checked=${this._alarmsEnabled} @change=${() => { this._alarmsEnabled = !this._alarmsEnabled }}></ha-switch>
                        </header>
                        <div id="alarm-picker-dialog-content" class="mdc-dialog__content alarm-picker-dialog-content">
                          <div class="workweek">
                              <alarm-picker id="alarmPickerMo" .alarm=${this._alarmPickerMo} disabled=${!this._alarmsEnabled} .alarmConfiguration=${this._alarmConfiguration}><span>${this._getDayOfWeek(0)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerTu" .alarm=${this._alarmPickerTu} disabled=${!this._alarmsEnabled} .alarmConfiguration=${this._alarmConfiguration}><span>${this._getDayOfWeek(1)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerWe" .alarm=${this._alarmPickerWe} disabled=${!this._alarmsEnabled} .alarmConfiguration=${this._alarmConfiguration}><span>${this._getDayOfWeek(2)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerTh" .alarm=${this._alarmPickerTh} disabled=${!this._alarmsEnabled} .alarmConfiguration=${this._alarmConfiguration}><span>${this._getDayOfWeek(3)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerFr" .alarm=${this._alarmPickerFr} disabled=${!this._alarmsEnabled} .alarmConfiguration=${this._alarmConfiguration}><span>${this._getDayOfWeek(4)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerSa" .alarm=${this._alarmPickerSa} disabled=${!this._alarmsEnabled} .alarmConfiguration=${this._alarmConfiguration}><span>${this._getDayOfWeek(5)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerSu" .alarm=${this._alarmPickerSu} disabled=${!this._alarmsEnabled} .alarmConfiguration=${this._alarmConfiguration}><span>${this._getDayOfWeek(6)}: </span></alarm-picker>
                          </div>
                          <div class="alarm-picker-dialog-buttons dialog-buttons">
                            <ha-button @click=${this.saveAndCloseAlarmPicker} raised>Save</ha-button>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="mdc-dialog__scrim" @click=${() => this.closeDialog('#scheduleDialog')}></div>
            </dialog>

            <dialog id="napDialog" class="mdc-dialog alarm-nap-dialog"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="alarm-nap-dialog-title"
                aria-describedby="alarm-nap-dialog-content"
                >
                <div class="mdc-dialog__container">
                    <div class="mdc-dialog__surface">
                        <header id="alarm-nap-dialog-title" class="header-bar mdc-dialog__title">
                          <ha-icon-button
                          slot="navigationIcon"
                          dialogAction="cancel"
                          label="Close"
                          >
                            <ha-icon .icon=${'mdi:close'} class="header-navigation-icon" @click=${() => this.closeDialog('#napDialog')}></ha-icon>
                          </ha-icon-button>
                          <span class="header-title">Set Nap Length</span>
                        </header>
                        <div id="alarm-nap-dialog-content" class="mdc-dialog__content alarm-nap-dialog-content">
                          <alarm-picker id="napTimePicker" .alarm=${this._napTime} hide-toggle-button .alarmConfiguration=${this._alarmConfiguration}>
                              <span>Nap Duration: </span>
                          </alarm-picker>
                          <div class="alarm-nap-dialog-buttons dialog-buttons">
                              <ha-button @click=${this.saveAndCloseNap} raised>Save</ha-button>
                              <ha-button @click=${this.clearAndCloseNap} raised>Clear</ha-button>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="mdc-dialog__scrim" @click=${() => this.closeDialog('#napDialog')}></div>
            </dialog>

            <dialog id="settingsDialog" class="mdc-dialog alarm-settings-dialog"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="alarm-settings-dialog-title"
              aria-describedby="alarm-settings-dialog-content"
              >
              <div class="mdc-dialog__container">
                <div class="mdc-dialog__surface">
                  <header id="alarm-settings-dialog-title" class="header-bar mdc-dialog__title">
                    <ha-icon-button
                    slot="navigationIcon"
                    dialogAction="cancel"
                    label="Close"
                    >
                      <ha-icon .icon=${'mdi:close'} class="header-navigation-icon" @click=${() => this.closeDialog('#settingsDialog')}></ha-icon>
                    </ha-icon-button>
                    <span class="header-title">Set Preferences</span>
                  </header>
                  <div id="alarm-settings-dialog-content" class="mdc-dialog__content alarm-settings-dialog-content">
                    <div id="alarmRingers" class="switches-group-table">
                      <div class="switches-group-row">
                        <span>Alarm Ringers:</span>
                        <div class="switches-group-options">
                          ${this._ringerEntities.map((entity, i) =>
      html`
                              <div class="switch-row">
                                <div class="switch-row-group">
                                  <ha-textfield
                                    id="ringer-text-${i}"
                                    class="ringer-text"
                                    .value=${this._hass.states[entity.entity_id] ? this._hass.states[entity.entity_id].attributes.friendly_name : 'No ringer entity found'}
                                    readonly
                                    >
                                  </ha-textfield>
                                  <ha-switch id="ringer-switch-${i}" class="ringer-switch" ?checked=${entity.enabled} @change=${this._handleSwitchRingerEntity}></ha-switch>
                                </div>
                              </div>
                            `
    )}
                        </div>
                      </div>
                    </div>
                    <div id="timeFormat" class="radio-row">
                      <div class="radio-row-group">
                        <span>Time Format:</span>
                        <div class="radio-row-options">
                          <ha-formfield
                          label="24hr"
                          >
                            <ha-radio
                                @change=${this._handleRadioValueTimeFormat}
                                value="24hr"
                                name="24hr"
                                ?checked=${this._timeFormat === '24hr'}
                            >
                            </ha-radio>
                          </ha-formfield>
                          <ha-formfield
                          label="12hr"
                          >
                            <ha-radio
                                @change=${this._handleRadioValueTimeFormat}
                                value="12hr"
                                name="12hr"
                                ?checked=${this._timeFormat === '12hr'}
                            >
                            </ha-radio>
                          </ha-formfield>
                        </div>
                      </div>
                    </div>
                    <div id="clockFontFace" class="radio-row">
                      <div class="radio-row-group">
                        <span>Clock Display Font:</span>
                        <div class="radio-row-options">
                          <ha-formfield
                          label="System"
                          >
                            <ha-radio
                                @change=${this._handleRadioValueClockFontFace}
                                value="0"
                                name="0"
                                ?checked=${this._clockFontFace === '0'}
                            >
                            </ha-radio>
                          </ha-formfield>
                          <ha-formfield
                          label="1"
                          >
                            <ha-radio
                                @change=${this._handleRadioValueClockFontFace}
                                value="1"
                                name="1"
                                ?checked=${this._clockFontFace === '1'}
                            >
                            </ha-radio>
                          </ha-formfield>
                          <ha-formfield
                          label="2"
                          >
                            <ha-radio
                                @change=${this._handleRadioValueClockFontFace}
                                value="2"
                                name="2"
                                ?checked=${this._clockFontFace === '2'}
                            >
                            </ha-radio>
                          </ha-formfield>
                          <ha-formfield
                          label="3"
                          >
                            <ha-radio
                                @change=${this._handleRadioValueClockFontFace}
                                value="3"
                                name="3"
                                ?checked=${this._clockFontFace === '3'}
                            >
                            </ha-radio>
                          </ha-formfield>
                        </div>
                      </div>
                    </div>
                    <div class="switches-group-table">
                        <div class="switches-group-row fullscreen-row">
                        <span>Hide Cards Default:</span>
                            <div class="switches-group-options">
                                <div class="switch-row">
                                    <div class="switch-row-group">
                                        <ha-switch
                                            id="clockDefaultFullscreen"
                                            class="fullscreen-switch"
                                            ?checked=${this._clockDefaultFullscreen}
                                            @change=${(e: Event) => { this._clockDefaultFullscreen = (<HTMLInputElement>e.target).checked }}>
                                        </ha-switch>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <alarm-picker id="snoozeDurationPicker" .alarm=${this._snoozeDurationDefault} hide-toggle-button .alarmConfiguration=${this._alarmConfiguration}>
                      <span>Snooze Duration: </span>
                    </alarm-picker>
                    <alarm-picker id="alarmDurationPicker" .alarm=${this._alarmDurationDefault} hide-toggle-button .alarmConfiguration=${this._alarmConfiguration}>
                      <span>Alarm Duration: </span>
                    </alarm-picker>
                    <div class="alarm-settings-dialog-buttons dialog-buttons">
                      <ha-button @click=${this.saveAndCloseSettings} raised>Save</ha-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mdc-dialog__scrim" @click=${() => this.closeDialog('#settingsDialog')}></div>
            </dialog>

            <div id="alarmclock" class=${classMap(this._alarmClockClasses)}>
              <div id="alarm-top" class="meta">
                <div id="clockLogo"></div>
                <div id="date"></div>
                <div class="optionButtons">
                  <ha-icon id="settingsButton" class="button" icon="mdi:cog" @click=${this._showSettingsDialog}></ha-icon>
                  <ha-icon id="napButton" class="button" icon="mdi:sleep" @click=${this._showNapDialog}></ha-icon>
                </div>
                ${this._areAlarmsEnabled() ? html`
                    <alarm-picker id="alarmpicker" show-icon="true" .alarm=${this._nextAlarm}
                        .alarmConfiguration=${this._alarmConfiguration}
                        .time=${this._time}
                        @alarm-button-clicked=${this._showAlarmPicker}
                        @alarm-changed=${this._onAlarmChanged}
                        @toggle-logo-visibility=${this._toggleLogoVisibility}
                        ></alarm-picker>
                  ` : html`
                  <ha-icon id="alarmpickerButton" class="button" icon="mdi:alarm"
                                @click=${this._showAlarmPicker}></ha-icon>
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

    #settingsButton {
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

    /* *************** */
    /* *** dialogs *** */
    /* *************** */

    /* mobile screen sizes */
    @media (max-width: 600px), (max-height: 600px) {
      dialog {
        --dialog-surface-margin-top: 0px;
        --mdc-dialog-min-width: calc( 100vw - env(safe-area-inset-right) - env(safe-area-inset-left) );
        --mdc-dialog-max-width: calc( 100vw - env(safe-area-inset-right) - env(safe-area-inset-left) );
        --mdc-dialog-min-height: 100%;
        --mdc-dialog-max-height: 100%;
        --ha-dialog-border-radius: 0;
      }

      .mdc-dialog .mdc-dialog__content {
        padding-top: 0 !important;
      }

      #alarm-nap-dialog-content {
        padding-top: 25vh !important;
      }
      #alarm-nap-dialog-content .alarm-nap-dialog-buttons {
        padding-top: 10vh !important;
      }

      #alarm-settings-dialog-content div.radio-row span {
        line-height: 2em;
        display: block;
      }
      #alarm-settings-dialog-content div.radio-row .radio-row-group .radio-row-options {
        height: 2em;
      }

      #alarm-settings-dialog-content div.radio-row .radio-row-group .radio-row-options ha-radio {
        margin-left: 0;
      }

      #alarm-settings-dialog-content div.switch-row .switch-row-group {
        height: 2em;
      }
    }

    @media (min-width: 601px) and (min-height: 601px) {
      dialog {
        --mdc-dialog-min-width: 580px;
        --mdc-dialog-max-width: 580px;
        --mdc-dialog-max-height: calc(100% - 72px);
      }
    }

    dialog[open] {
      z-index: 99;
    }

    dialog {
      background: none;
      padding: 0;
      border: medium none;
    }

    .mdc-dialog, .mdc-dialog__scrim {
      background-color: var(--mdc-dialog-scrim-color,rgba(0,0,0,.32));
      position: fixed;
      top: 0px;
      left: 0px;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    .mdc-dialog__container {
      align-items: var(--vertical-align-dialog,center);
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      box-sizing: border-box;
      height: 100%;
    }

    .mdc-dialog__surface {
      border: 1px solid var(--primary-background-color);
      z-index: var(--dialog-z-index, 8);
      transform: scale(.8);
      opacity: 0;
      transition: opacity 120ms, transform 120ms;
      position: var(--dialog-surface-position, relative);
      top: var(--dialog-surface-top);
      margin-top: var(--dialog-surface-margin-top);
      min-height: var(--mdc-dialog-min-height, auto);
      min-width: var(--mdc-dialog-min-width,280px);
      border-radius: 28px;
      -webkit-backdrop-filter: var(--ha-dialog-surface-backdrop-filter, none);
      backdrop-filter: var(--ha-dialog-surface-backdrop-filter, none);
      background: var(
        --ha-dialog-surface-background,
        var(--mdc-theme-surface, #fff)
      );
      box-shadow: var(
        --mdc-dialog-box-shadow,0px 11px 15px -7px rgba(0,0,0,.2),0px 24px 38px 3px rgba(0,0,0,.14),0px 9px 46px 8px rgba(0,0,0,.12)
      );
    }

    .mdc-dialog.open .mdc-dialog__surface {
      transform: scale(1);
      opacity: 1;
    }

    .mdc-dialog.open {
      backdrop-filter: var(--ha-dialog-scrim-backdrop-filter,var(--dialog-backdrop-filter,none));
    }

    .mdc-dialog__content {
      padding: var(--dialog-content-padding,24px);
      position: var(--dialog-content-position,relative);
      text-align: center;
    }

    .mdc-dialog {
      --mdc-dialog-scroll-divider-color: var(
        --dialog-scroll-divider-color,
        var(--divider-color)
      );
      -webkit-backdrop-filter: var(
        --ha-dialog-scrim-backdrop-filter,
        var(--dialog-backdrop-filter, none)
      );
      backdrop-filter: var(
        --ha-dialog-scrim-backdrop-filter,
        var(--dialog-backdrop-filter, none)
      );
      --mdc-dialog-box-shadow: var(--dialog-box-shadow, none);
      --mdc-typography-headline6-font-weight: 400;
      --mdc-typography-headline6-font-size: 1.574rem;
    }

    .mdc-dialog__container {
      align-items: var(--vertical-align-dialog, center);
    }

    .header-bar {
      padding: 12px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      box-sizing: border-box;
    }

    .header-bar ha-switch {
      padding: 16px 12px 0 0;
    }

    .header-navigation-icon {
      flex: 0 0 auto;
      min-width: 8px;
      height: 100%;
      display: flex;
      flex-direction: row;
    }

    .header-title {
      flex: 1 1 0%;
      font-size: 22px;
      line-height: 28px;
      font-weight: 400;
      padding: 10px 4px;
      min-width: 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mdc-dialog__title {
      padding: 24px 24px 0 24px;
    }
    .mdc-dialog__actions {
      padding: 12px 24px 12px 24px;
    }
    .mdc-dialog__title::before {
      content: unset;
    }
    .mdc-dialog .mdc-dialog__content {
      position: var(--dialog-content-position, relative);
      padding: var(--dialog-content-padding, 24px);
    }

    .dialog-buttons {
      display: flex;
      padding: 16px;
      justify-content: space-between;
    }

    /* *************************** */
    /* *** alarm-picker-dialog *** */
    /* *************************** */

    .workweek {
      display: flex;
      flex-direction: column;
    }

    alarm-picker span {
      width: 6.5em;
      text-align: right;
    }

    /* ************************ */
    /* *** alarm-nap-dialog *** */
    /* ************************ */

    #napTimePicker > span {
      width: auto;
    }

    /* ***************************** */
    /* *** alarm-settings-dialog *** */
    /* ***************************** */

    div.radio-row, div.switch-row {
      display: block;
    }

    div.radio-row .radio-row-group, div.switch-row .switch-row-group {
      display: inline-flex;
    }

    div.switch-row .switch-row-group {
      width: 22em;
      height: 4em;
    }

    .radio-row .radio-row-group .radio-row-options {
      display: inline-flex;
      width: 22em;
      height: 4em;
    }

    div.switches-group-table {
      display: table;
      margin: 0 auto;
    }

    div.switches-group-table .ringer-text {
      width: 17em;
      margin: auto 1em;
    }

    div.switches-group-table .switches-group-row {
      display: table-row;
    }

    div.switches-group-table .switches-group-row.fullscreen-row {
      display: flex;
      align-items: center;
    }

    #clockDefaultFullscreen {
      margin: 0 0 0 2em;
    }

    div.switches-group-table .switches-group-row span, div.switches-group-table .switches-group-row .switches-group-options {
      display: table-cell;
    }

    div.switches-group-table .switches-group-row span {
      text-align: right;
      width: 10em;
    }

    .radio-row-group span {
      display: block;
      text-align: right;
      width: 10em;
      line-height: 4em;
    }

    ha-radio {
      margin-left: 1em;
    }

    alarm-picker#snoozeDurationPicker, alarm-picker#alarmDurationPicker {
      display: block;
    }

    alarm-picker#snoozeDurationPicker span, alarm-picker#alarmDurationPicker span {
      width: 10em;
      white-space: nowrap;
    }
  `;

  firstUpdated(changedProperties: Map<string, any>): void {
    super.firstUpdated(changedProperties);

    this._timeFormat = this._alarmConfiguration['timeFormat'];
    this._clockFontFace = this._alarmConfiguration['clockFontFace'];
    this._toggleAlarmFullscreen(this._alarmConfiguration['clockDefaultFullscreen']);
    this._updateTime();
    this._updateLoop();

    if (this._haCardQ) {
      this._buildCard();
    } else {
      console.warn('*** Missing <ha-card> in shadowRoot')
    }

    if (!this._alarmController.isSafetyConfigSet()) {
      if (this._config.debug) {
        this._hass.callService('system_log', 'write', { 'message': '*** Safety config not set: install (1) binary sensor entity from ping integration, and (2) LAN-accessible alarm entity', 'level': 'info' });
      }
      console.warn('*** Safety config not set: install (1) binary sensor entity from ping integration, and (2) LAN-accessible alarm entity');
    }

    this._alarmsEnabled = this._alarmConfiguration.alarmsEnabled;
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

    if (!config.cards || !Array.isArray(config.cards)) {
      console.warn('*** No cards available for config');
    }

    // these settings can be overridden by including them in card's yaml config
    this._config = {
      name: 'alarm_clock',
      ...config
    };

    // NOTE: Some cards call setConfig() multiple times during life of card
    if (!this._alarmController) this._alarmController = new AlarmController(this._config, this._cardId);
  }

  // TODO: test elimination of updateLoop by using reactive hass @property
  set hass(hass: HomeAssistant) {
    // this._hassUpdatedTime = new Date().toJSON();
    // console.log('*** TEMP: set hass() is called at ' + new Date().toJSON() + '; hassUpdatedTime is ' + this._hassUpdatedTime);
    // console.log('*** TEMP: hassUpdatedTime is ' + this._hassUpdatedTime);
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
    if (!this._rootQ) console.warn('*** Root of card not available now');

    while (this._rootQ.lastChild) {
      this._rootQ.removeChild(this._rootQ.lastChild);
    }

    const config = this._config;

    if (config.cards) {
      const elements = this._elements = [];
      config.cards.forEach(async (card: LovelaceCardConfig) => {
        const element = await this._createCardElement(card);
        elements.push(element);
        await this._rootQ.appendChild(element);  //TODO: why await has "no effect" on expression? wrong type?
        HeightUpdater.updateHeight(card, element);
      });

      this._elements = elements;

      if (this._hass) {
        this._elements.forEach((element) => {
          element.hass = this._hass;
        });
      } else {
        console.warn('*** No hass object available for config');
      }
    }

    if (!this._alarmController.isConfigCorrect()) {
      alert(`Card requires two integration entities: input boolean helper and Variables+History whose entity IDs are: sensor.${config.name} and input_boolean.${config.name}`);
    }
  }

  async _createCardElement(card: LovelaceCardConfig) {
    let element: LovelaceCard; // what is type that will preserve await in buildCard?
    try {
      this._cardHelpers = await (window).loadCardHelpers();
      element = await this._cardHelpers.createCardElement(card);
      if (this._hass)
        element.hass = this._hass;
    } catch (exc) {
      console.warn(`*** Could not create card ${card.type}; ${exc}`);
    }
    return element;
  }

  _updateLoop() {
    this._updateLoopId = setTimeout(() => { this._updateTime(); this._updateLoop(); }, 1000);
  }

  _updateTime(force = false) {
    this._alarmController.evaluateAlarms();
    const fontNum = (!this._alarmController.alarmClockPingEntity || this._alarmController.alarmClockPingEntity.state === 'off' || !this._alarmConfiguration['clockFontFace']) ? '0' : this._alarmConfiguration['clockFontFace'];
    const fontFaceClass = 'fontFace' + fontNum;
    this._clockClasses = fontNum === '0' ? { clock: true } : { clock: true, [fontFaceClass]: true };
    const time = dayjs().format(this._alarmConfiguration['timeFormat'] === '24hr' ? 'HH:mm' : 'h:mm A');
    const isAlarmRinging = this._alarmController.isAlarmRinging();

    if (this._clockQ &&
      (force
        || this._time !== time
        || this._ringing !== isAlarmRinging
        || this._controllersAlarmConfigLastUpdate !== this._alarmConfiguration.lastUpdated)) {
      this._time = time;
      this._ringing = isAlarmRinging;
      this._controllersAlarmConfigLastUpdate = this._alarmConfiguration.lastUpdated;

      let timeDisplay: string;

      if (this._alarmConfiguration['timeFormat'] === '24hr') {
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
      const dateFormat = this._alarmConfiguration['timeFormat'] === '24hr' ? 'dddd, D MMMM' : 'dddd, MMMM D';
      this._dateQ.innerHTML = dayjs().format(dateFormat);
    }
  }

  _setAlarm() {
    const alarm: TimeObject = JSON.parse(JSON.stringify((this._napTimePickerQ).value));
    const alarmTime = dayjs().add(dayjs.duration(Helpers.convertToMinutes(alarm.time)));
    this._alarmController.nextAlarm = {
      ...this._alarmController.nextAlarm,
      enabled: true,
      time: alarmTime.format('HH:mm'),
      nap: true,
      overridden: true
    }
  }

  _areAlarmsEnabled() {
    return this._alarmConfiguration.alarmsEnabled || !!this._alarmController.nextAlarm.nap;
  }

  _onAlarmChanged(event: CustomEvent) {
    // this not triggered by snooze or alarm picker dialogs; only fires for changes to nextalarm in #alarmpicker element html of kobold-alarm-clock-card.js
    if (!event.detail.alarm.enabled) {
      this._alarmController.nextAlarm = {
        ...this._alarmConfiguration.nextAlarm,
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

  _getDayOfWeek(days: number) {
    // returns day of week in language set in set hass() method
    return dayjs('2018-08-27').add(days, 'days').format('dddd');
  }

  saveAndCloseAlarmPicker() {
    const controllersAlarmConfig = Object.assign(new AlarmConfiguration, {
      ...this._alarmConfiguration,
      alarmsEnabled: (this._haSwitchQ).checked,
      mo: (this._alarmPickerMoQ).value,
      tu: (this._alarmPickerTuQ).value,
      we: (this._alarmPickerWeQ).value,
      th: (this._alarmPickerThQ).value,
      fr: (this._alarmPickerFrQ).value,
      sa: (this._alarmPickerSaQ).value,
      su: (this._alarmPickerSuQ).value,
    });

    controllersAlarmConfig.dismiss();
    this._alarmController.saveControllersAlarmConfig(controllersAlarmConfig);
    this.closeDialog('#scheduleDialog');
  }

  saveAndCloseSettings() {
    const controllersAlarmConfig = Object.assign(new AlarmConfiguration, {
      ...this._alarmConfiguration,
      ringerEntities: JSON.stringify(this._ringerEntities),
      timeFormat: (this._timeFormatQ).value,
      clockFontFace: (this._clockFontFaceQ).value,
      clockDefaultFullscreen: (this._clockDefaultFullscreenQ).checked,
      snoozeDurationDefault: (this._snoozeDurationPickerQ).value,
      alarmDurationDefault: (this._alarmDurationPickerQ).value,
    });

    this._alarmController.saveControllersAlarmConfig(controllersAlarmConfig);
    if (this._alarmClockClasses.fullscreen !== this._clockDefaultFullscreen) this._toggleAlarmFullscreen(this._clockDefaultFullscreen);
    this.closeDialog('#settingsDialog');
  }

  saveAndCloseNap() {
    this._setAlarm();
    const controllersAlarmConfig = Object.assign(new AlarmConfiguration, {
      ...this._alarmConfiguration,
      napDurationDefault: (this._napTimePickerQ).value,
    });

    this._alarmController.saveControllersAlarmConfig(controllersAlarmConfig);
    this.closeDialog('#napDialog');
  }

  clearAndCloseNap() {
    this._alarmController.nextAlarmReset();
    this.closeDialog('#napDialog');
  }

  _showAlarmPicker() {
    this._alarmsEnabled = this._alarmConfiguration.alarmsEnabled;
    this._alarmPickerMo = JSON.parse(JSON.stringify(this._alarmConfiguration['mo']));
    this._alarmPickerTu = JSON.parse(JSON.stringify(this._alarmConfiguration['tu']));
    this._alarmPickerWe = JSON.parse(JSON.stringify(this._alarmConfiguration['we']));
    this._alarmPickerTh = JSON.parse(JSON.stringify(this._alarmConfiguration['th']));
    this._alarmPickerFr = JSON.parse(JSON.stringify(this._alarmConfiguration['fr']));
    this._alarmPickerSa = JSON.parse(JSON.stringify(this._alarmConfiguration['sa']));
    this._alarmPickerSu = JSON.parse(JSON.stringify(this._alarmConfiguration['su']));
    this._scheduleDialogQ.show();
    this._scheduleDialogQ.classList.add('open');
  }

  _showNapDialog() {
    this._napTime = JSON.parse(JSON.stringify(this._alarmConfiguration['napDurationDefault']));
    this._napDialogQ.show();
    this._napDialogQ.classList.add('open');
  }

  _showSettingsDialog() {
    this._timeFormat = this._alarmConfiguration['timeFormat'];
    this._clockDefaultFullscreen = this._alarmConfiguration['clockDefaultFullscreen'];
    this._clockFontFace = this._alarmConfiguration['clockFontFace'];
    this._snoozeDurationDefault = JSON.parse(JSON.stringify(this._alarmConfiguration['snoozeDurationDefault']));
    this._alarmDurationDefault = JSON.parse(JSON.stringify(this._alarmConfiguration['alarmDurationDefault']));
    const alarmEntities = [];
    const ringerEntitiesIds = this._ringerEntities.map(item => item.entity_id);
    const ringerEntitiesConfig = this._alarmConfiguration['ringerEntities'] ? JSON.parse(this._alarmConfiguration['ringerEntities']) : [];

    ringerEntitiesConfig.forEach((item: RingerEntity) => { if (ringerEntitiesIds.indexOf(item.entity_id) >= 0) alarmEntities.push(item) });
    this._ringerEntities = alarmEntities;
    this._settingsDialogQ.show();
    this._settingsDialogQ.classList.add('open');
  }

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

// TODO: are these working?
class HeightUpdater {
  static updateHeight(card: LovelaceCardConfig, element: LovelaceCard) {
    if (this._updateHeightOnNormalCard(element)) return;
    if (this._updateHeightOnNestedCards(element)) return;
    if (this._updateHeightOnMediaControlCards(card, element)) return;
  }
  static _updateHeightOnNormalCard(element: LovelaceCard) {
    if (element.shadowRoot) {
      let cardTag: LovelaceCard = element.shadowRoot.querySelector('ha-card');
      // console.log('*** updateHeightOnNormalCard: ', cardTag);
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
      // console.log('*** updateHeightOnNestedCards');
      let cardTag: LovelaceCard = element.children[0].shadowRoot.querySelector('ha-card');
      if (cardTag) {
        cardTag.style.height = "100%";
        cardTag.style.boxSizing = "border-box";
        return true;
      }
    }
    return false;
  }

  static _updateHeightOnMediaControlCards(card: LovelaceCardConfig, element: LovelaceCard) {
    if (card.type !== 'media-control') {
      return;
    }
    // console.log('*** updateHeightOnMediaControlCards');
    // console.log('*** firstChild: ' + element.children[0] + '; firstChild.shadowRoot: ' + element.children[0]?.shadowRoot);
    if (element.children[0] && element.children[0].shadowRoot) {
      (element.children[0] as LovelaceCard).style.height = '50%';  // TEST
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
