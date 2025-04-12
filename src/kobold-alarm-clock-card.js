import { LitElement, html, css } from 'lit';
// import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.2.1/index.js/+esm';
import { classMap } from 'lit/directives/class-map.js';
// import { classMap } from 'https://cdn.jsdelivr.net/npm/lit@3.2.1/directives/class-map.js/+esm';
import dayjs from 'dayjs';
// import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/dayjs.min.js/+esm';
import customParseFormat from 'dayjs/plugin/customParseFormat';
// import customParseFormat from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/plugin/customParseFormat.js/+esm';
import relativeTime from 'dayjs/plugin/relativeTime';
// import relativeTime from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/plugin/relativeTime.js/+esm';
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

import { AlarmController, AlarmConfiguration, Helpers } from './alarm-controller.js';
import './alarm-picker.js';

function loadCSS(url) {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

loadCSS('https://fonts.googleapis.com/css2?family=Noto+Sans:wdth,wght@87.5,600&display=swap');
loadCSS('https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap');
loadCSS('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@600&display=swap');

class KoboldAlarmClockCard extends LitElement {

  constructor() {
    super();
    this.cardID = Math.random().toString(36).substr(2, 9) + ', ' + new Date().toJSON();
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.config.debug) {
      this._hass.callService('system_log', 'write', { 'message': '*** connectedCallback(); cardID: ' + this.cardID, 'level': 'info'} );
    };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.updateLoop);
    // if (this._alarmController) Object.keys(this._alarmController).forEach(myKey => delete this._alarmController[myKey]);
    if (this.config.debug) {
      this._hass.callService('system_log', 'write', { 'message': '*** disconnectedCallback(); cardID: ' + this.cardID, 'level': 'info'} );
    };
  }

  static properties = {
    _hass: { type: Object, state: true },
    _alarmButtonsClasses: { type: Object, state: true },
    _alarmClockClasses: { type: Object, state: true },
    _footClasses: { type: Object, state: true },
    _clockClasses: { type: Object, state: true },
    _ringerEntities: { type: Array, state: true },
    alarmsEnabled: { type: Boolean },
    nextAlarm: {},
    alarmPickerMo: {},
    alarmPickerTu: {},
    alarmPickerWe: {},
    alarmPickerTh: {},
    alarmPickerFr: {},
    alarmPickerSa: {},
    alarmPickerSu: {},
    alarmNap: {},
    snoozeDurationDefault: {},
    alarmDurationDefault: {},
    napDurationDefault: {},
    timeFormat: { type: String },
    clockDefaultFullscreen: { type: Boolean },
    clockFontFace: { type: Number },
  }

  render() {
    // TODO: change any/all assignments to connectedCallback()?
    this.alarmConfiguration = this._alarmController.alarmClockConfiguration;
    this.nextAlarm = this._alarmController.nextAlarm;

    this._ringerEntities = this._ringerEntities || [];
    const alarmEntities = [];
    const ringerEntitiesIds = this._ringerEntities.map(item => item.entity_id);

    if (this.config.alarm_entities) {
      // add any alarm_entities that are not already members of ringerEntities
      this.config.alarm_entities.forEach( (item) => { if(ringerEntitiesIds.indexOf(item) < 0) alarmEntities.push({enabled: true, entity_id: item}); if(!this._hass.states[item]) console.warn(`*** Entity ${item} does not exist in HA`) });
    } else {
      if (!this.config.alarm_entity_local) alert('No alarm_entities and no alarm_entity_local in YAML configuration. One is required for alarm');
    }

    // add alarm_entity_local if not already member of ringerEntities
    if (this.config.alarm_entity_local) {
      if(ringerEntitiesIds.indexOf(this.config.alarm_entity_local) < 0) alarmEntities.push({enabled: false, entity_id: this.config.alarm_entity_local});
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

            <dialog id="alarmPickerScheduleDialog" class="mdc-dialog alarm-picker-dialog"
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
                            <ha-icon .icon=${'mdi:close'} class="header-navigation-icon" @click=${() => this.closeDialog('#alarmPickerScheduleDialog')}></ha-icon>
                          </ha-icon-button>
                          <span class="header-title">Set Schedule</span>
                          <ha-switch ?checked=${this.alarmsEnabled} @change=${() => { this.alarmsEnabled = !this.alarmsEnabled }}></ha-switch>
                        </header>
                        <div id="alarm-picker-dialog-content" class="mdc-dialog__content alarm-picker-dialog-content">
                          <div class="workweek">
                              <alarm-picker id="alarmPickerMo" .alarm=${this.alarmPickerMo} ?disabled=${!this.alarmsEnabled} .alarmConfiguration=${this.alarmConfiguration}><span>${this._getDayOfWeek(0)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerTu" .alarm=${this.alarmPickerTu} ?disabled=${!this.alarmsEnabled} .alarmConfiguration=${this.alarmConfiguration}><span>${this._getDayOfWeek(1)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerWe" .alarm=${this.alarmPickerWe} ?disabled=${!this.alarmsEnabled} .alarmConfiguration=${this.alarmConfiguration}><span>${this._getDayOfWeek(2)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerTh" .alarm=${this.alarmPickerTh} ?disabled=${!this.alarmsEnabled} .alarmConfiguration=${this.alarmConfiguration}><span>${this._getDayOfWeek(3)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerFr" .alarm=${this.alarmPickerFr} ?disabled=${!this.alarmsEnabled} .alarmConfiguration=${this.alarmConfiguration}><span>${this._getDayOfWeek(4)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerSa" .alarm=${this.alarmPickerSa} ?disabled=${!this.alarmsEnabled} .alarmConfiguration=${this.alarmConfiguration}><span>${this._getDayOfWeek(5)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerSu" .alarm=${this.alarmPickerSu} ?disabled=${!this.alarmsEnabled} .alarmConfiguration=${this.alarmConfiguration}><span>${this._getDayOfWeek(6)}: </span></alarm-picker>
                          </div>
                          <div class="alarm-picker-dialog-buttons dialog-buttons">
                            <ha-button @click=${this.saveAndCloseAlarmPicker} raised>Save</ha-button>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="mdc-dialog__scrim" @click=${() => this.closeDialog('#alarmPickerScheduleDialog')}></div>
            </dialog>

            <dialog id="alarmNapDialog" class="mdc-dialog alarm-nap-dialog"
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
                            <ha-icon .icon=${'mdi:close'} class="header-navigation-icon" @click=${() => this.closeDialog('#alarmNapDialog')}></ha-icon>
                          </ha-icon-button>
                          <span class="header-title">Set Nap Length</span>
                        </header>
                        <div id="alarm-nap-dialog-content" class="mdc-dialog__content alarm-nap-dialog-content">
                          <alarm-picker id="napTimePicker" .alarm=${this.alarmNap} show-toggle-button="false" .alarmConfiguration=${this.alarmConfiguration}>
                              <span>Nap Duration: </span>
                          </alarm-picker>
                          <div class="alarm-nap-dialog-buttons dialog-buttons">
                              <ha-button @click=${this.saveAndCloseNap} raised>Save</ha-button>
                              <ha-button @click=${this.clearAndCloseNap} raised>Clear</ha-button>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="mdc-dialog__scrim" @click=${() => this.closeDialog('#alarmNapDialog')}></div>
            </dialog>

            <dialog id="alarmSettingsDialog" class="mdc-dialog alarm-settings-dialog"
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
                      <ha-icon .icon=${'mdi:close'} class="header-navigation-icon" @click=${() => this.closeDialog('#alarmSettingsDialog')}></ha-icon>
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
                                ?checked=${this.timeFormat === '24hr'}
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
                                ?checked=${this.timeFormat === '12hr'}
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
                                ?checked=${this.clockFontFace === '0'}
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
                                ?checked=${this.clockFontFace === '1'}
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
                                ?checked=${this.clockFontFace === '2'}
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
                                ?checked=${this.clockFontFace === '3'}
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
                                            ?checked=${this.clockDefaultFullscreen}
                                            @change=${(e) => {this.clockDefaultFullscreen = e.target.checked}}>
                                        </ha-switch>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <alarm-picker id="snoozeDurationPicker" .alarm=${this.snoozeDurationDefault} show-toggle-button="false" .alarmConfiguration=${this.alarmConfiguration}>
                      <span>Snooze Duration: </span>
                    </alarm-picker>
                    <alarm-picker id="alarmDurationPicker" .alarm=${this.alarmDurationDefault} show-toggle-button="false" .alarmConfiguration=${this.alarmConfiguration}>
                      <span>Alarm Duration: </span>
                    </alarm-picker>
                    <div class="alarm-settings-dialog-buttons dialog-buttons">
                      <ha-button @click=${this.saveAndCloseSettings} raised>Save</ha-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mdc-dialog__scrim" @click=${() => this.closeDialog('#alarmSettingsDialog')}></div>
            </dialog>

            <div id="alarmclock" class=${classMap(this._alarmClockClasses)}>
              <div id="alarm-top" class="meta">
                <div id="clockLogo"></div>
                <div id="date"></div>
                <div class="optionButtons">
                  <ha-icon id="alarmSettingsButton" class="button" icon="mdi:cog" @click=${this._showAlarmSettingsDialog}></ha-icon>
                  <ha-icon id="alarmNapButton" class="button" icon="mdi:sleep" @click=${this._showAlarmNapDialog}></ha-icon>
                </div>
                ${this._areAlarmsEnabled() ? html`
                    <alarm-picker id="alarmpicker" show-icon="true" .alarm=${this.nextAlarm}
                        .alarmConfiguration=${this.alarmConfiguration}
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
      /*font-size: 1rem;*/
      font-size: calc(1rem + 1vh);
      display: flex;
      justify-content: space-between;
      height: 4vh;
      white-space: nowrap;
      align-items: center;
      color: var(--secondary-text-color);
    }

    /*#alarm-top #date {
      font-size: 1.25rem;
    }*/

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
      padding-left: 0.45em;
      font-size: 31%;
      font-weight: 900;
      writing-mode: vertical-lr;
      text-orientation: upright;
      letter-spacing: -0.15em;
    }

    #clock .periodKern {
      padding-left: 0.25em !important;
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
      padding-left: 0.5em;
      letter-spacing: -0.4em;
    }

    #clock.fontFace2 {
      font-family: 'Oswald', sans-serif;
      font-optical-sizing: auto;
      font-weight: 600;
      font-style: normal;
      letter-spacing: 0;
    }
    #clock .colonKern {
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
      bottom: 4vh;
      letter-spacing: -0.2em;
      padding-left: 0.5em;
    }
    #clock.fontFace3 .periodKern {
      padding-left: 0.5em !important;
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

    #alarmSettingsButton {
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

  firstUpdated() {
    super.firstUpdated();

    this.clock = this.renderRoot.querySelector('#clock');
    this.date = this.renderRoot.querySelector('#date');
    this.timeFormat = this.alarmConfiguration['timeFormat'];
    this.clockFontFace = this.alarmConfiguration['clockFontFace'];
    this._toggleAlarmFullscreen(this.alarmConfiguration['clockDefaultFullscreen']);
    this._updateTime();
    this._updateLoop();

    if (this.renderRoot.querySelector('ha-card')) {
      this._buildConfig();
    } else {
      console.warn('*** Missing <ha-card> in renderRoot')
    }

    if(!this._alarmController.isSafetyConfigSet()) {
      if (this.config.debug) {
        this._hass.callService('system_log', 'write', { 'message': '*** Safety config not set: install (1) binary sensor entity from ping integration, and (2) LAN-accessible alarm entity', 'level': 'info'} );
      }
      console.warn('*** Safety config not set: install (1) binary sensor entity from ping integration, and (2) LAN-accessible alarm entity');
    }

    this.alarmsEnabled = this.alarmConfiguration.alarmsEnabled;
  }

  // willUpdate(changedProperties) {
  //   if (changedProperties.has('nextAlarm')) {
  //     // this is never getting called //TODO: delete me?
  //     console.log('*** willUpdate; getNextAlarm called cos nextAlarm changed; why not handled by _onAlarmChanged? this should never get called');
  //     this.nextAlarm = this._alarmController.nextAlarm;
  //   }
  // }

  updated() {
    if (!this.injectStylesDone) {
      this.injectStylesDone = true;
      // inject style into mdc form field

      // hide visible line separating sidebar from main view on iOS
      document.querySelector('home-assistant').renderRoot.querySelector('home-assistant-main').renderRoot.querySelector('ha-drawer').renderRoot.querySelector('aside').style.borderRightStyle = 'unset';

      // prevent scrolling
      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('body').style.position = 'fixed';
      document.querySelector('body').style.width = '100%';

      let myStyle = '';

      //  alarm-top styles
      const optionButtonsHosts = this.renderRoot.querySelectorAll('div.optionButtons ha-icon');

      if (optionButtonsHosts) {
        let optionButtonsStyle = 'ha-svg-icon { height: calc(1.5rem + 1vh); width: calc(1.5rem + 1vh); }';
        optionButtonsHosts.forEach( (optionButtonsHost) => {
          myStyle = document.createElement( 'style' );
          myStyle.innerHTML = optionButtonsStyle;
          optionButtonsHost.renderRoot.appendChild( myStyle );
        });
      }

      // settings dialog styles
      const formfieldHosts = this.renderRoot.querySelectorAll('dialog#alarmSettingsDialog #alarm-settings-dialog-content .radio-row ha-formfield');
      const textfieldHosts = this.renderRoot.querySelectorAll('dialog#alarmSettingsDialog #alarm-settings-dialog-content .switches-group-table ha-textfield');
      const switchHosts = this.renderRoot.querySelectorAll('dialog#alarmSettingsDialog #alarm-settings-dialog-content .switches-group-table ha-switch');

      if (switchHosts) {
        let settingsDialogStyle = '.mdc-switch{ margin: auto 0 !important; }';
        switchHosts.forEach( (switchHost) => {
          myStyle = document.createElement( 'style' );
          myStyle.innerHTML = settingsDialogStyle;
          switchHost.renderRoot.appendChild( myStyle );
        });
      }
      if (textfieldHosts) {
        let settingsDialogStyle = '.mdc-text-field--filled { height: 2em !important; }';
        textfieldHosts.forEach( (textfieldHost) => {
          myStyle = document.createElement( 'style' );
          myStyle.innerHTML = settingsDialogStyle;
          textfieldHost.renderRoot.appendChild( myStyle );
        });
      }
      if (formfieldHosts) {
        let settingsDialogStyle = '.mdc-form-field > label { margin-left: -0.5em !important } .mdc-form-field { color: #000000 !important; gap: 0 !important }';
        formfieldHosts.forEach( (formfieldHost) => {
          myStyle = document.createElement( 'style' );
          myStyle.innerHTML = settingsDialogStyle;
          formfieldHost.renderRoot.appendChild( myStyle );
        });
      }
    }
  }

  setConfig(config) {

    if (!config) {
      alert('Card config incorrect.');
    }

    if (!config.cards || !Array.isArray(config.cards)) {
      console.warn('*** No cards available for config');
    }

    // these settings can be overridden by including them in card's yaml config
    this.config = {
      name: 'alarm_clock',
      ...config
    };

    // NOTE: Some cards call setConfig() multiple times during life of card
    if (!this._alarmController) this._alarmController = new AlarmController(this.config, this.cardID);
  }

  set hass(hass) {
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

  _buildConfig() {
    const root = this.renderRoot.querySelector('#extraInfo');

    if (!root) console.warn('*** Cards root not available');

    while (root.lastChild) {
      root.removeChild(root.lastChild);
    }

    const config = this.config;

    if (config.cards) {
      const elements = this._elements = [];
      config.cards.forEach( async (card) => {
        const element = await this._createCardElement(card);
        elements.push(element);
        await root.appendChild(element);
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

    if(!this._alarmController.isConfigCorrect()) {
      alert(`Card requires two integration entities: input boolean helper and Variables+History whose entity IDs are: sensor.${config.name} and input_boolean.${config.name}`);
    }
  }

  async _createCardElement(card) {
    let element;
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
    this.updateLoop = setTimeout( () => { this._updateTime(); this._updateLoop(); }, 1000);
  }

  _updateTime(force = false) {
    this._alarmController.evaluateAlarms();
    const fontNum = (!this._alarmController.alarmClockPingEntity || this._alarmController.alarmClockPingEntity.state === 'off' || !this.alarmConfiguration['clockFontFace']) ? '0' : this.alarmConfiguration['clockFontFace'];
    const fontFaceClass = 'fontFace' + fontNum;
    this._clockClasses = fontNum === '0' ? { clock: true } : { clock: true, [fontFaceClass]: true };
    const time = dayjs().format(this.alarmConfiguration['timeFormat'] === '24hr' ? 'HH:mm' : 'h:mm A');
    const isAlarmRinging = this._alarmController.isAlarmRinging();

    if (this.clock && 
          (force 
            || this._time !== time 
            || this._ringing !== isAlarmRinging 
            || this._alarmClockConfigurationLastUpdate !== this.alarmConfiguration.lastUpdated)) {
      this._time = time;
      this._ringing = isAlarmRinging;
      this._alarmClockConfigurationLastUpdate = this.alarmConfiguration.lastUpdated;

      let timeDisplay;

      if (this.alarmConfiguration['timeFormat'] === '24hr') {
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

      this.clock.innerHTML = `
        <div class="clock-display">
          ${timeDisplay}
        </div>
      `;
      const dateFormat = this.alarmConfiguration['timeFormat'] === '24hr' ? 'dddd, D MMMM' : 'dddd, MMMM D';
      this.date.innerHTML = dayjs().format(dateFormat);
    }
  }

  _setAlarm() {
      // set alarm time given nap duration
      const alarm = this.renderRoot.querySelector('#napTimePicker').value
      const alarmTime = dayjs().add(dayjs.duration(Helpers.convertToMinutes(alarm.time)));
      this._alarmController.nextAlarm = {
          ...alarm,
          time: alarmTime.format('HH:mm'),
          nap: true,
          overridden: true
      }
  }

  _areAlarmsEnabled() {
    return this.alarmConfiguration.alarmsEnabled || !!this._alarmController.nextAlarm.nap;
  }

  _onAlarmChanged(event) {
    // this not triggered by snooze or alarm picker dialogs; only fires for changes to nextalarm in #alarmpicker element html of kobold-alarm-clock-card.js
    if (!event.detail.alarm.enabled) {
      this._alarmController.nextAlarm = {
          ...this.alarmConfiguration.nextAlarm,
          enabled: false,
          overridden: true
      }
    } else {
      this._alarmController.nextAlarm = event.detail.alarm;
    }
  }

  _handleAlarmButtonsClick(event) {
    this._alarmController[event.target.id]();
  }

  _handleRadioValueTimeFormat(event) {
    this.timeFormat = event.target.value;
  }

  _handleRadioValueClockFontFace(event) {
    this.clockFontFace = event.target.value;
  }

  _handleSwitchRingerEntity(event) {
    const entityIndex = event.target.id.split('-').pop();
    this._ringerEntities[entityIndex].enabled = event.target.checked;
  }

  _toggleAlarmFullscreen(force) {
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

  _getDayOfWeek(days) {
    // returns day of week in language set in set hass() method
    return dayjs('2018-08-27').add(days,'days').format('dddd');
  }

  saveAndCloseAlarmPicker() {
    const alarmClockConfiguration = Object.assign(new AlarmConfiguration, {
      ...this.alarmConfiguration,
      alarmsEnabled: this.renderRoot.querySelector('#alarm-picker-dialog-title ha-switch').checked,
      mo: this.renderRoot.querySelector('#alarmPickerMo').value,
      tu: this.renderRoot.querySelector('#alarmPickerTu').value,
      we: this.renderRoot.querySelector('#alarmPickerWe').value,
      th: this.renderRoot.querySelector('#alarmPickerTh').value,
      fr: this.renderRoot.querySelector('#alarmPickerFr').value,
      sa: this.renderRoot.querySelector('#alarmPickerSa').value,
      su: this.renderRoot.querySelector('#alarmPickerSu').value,
    });

    alarmClockConfiguration.dismiss();
    this._alarmController.saveAlarmClockConfiguration(alarmClockConfiguration);
    this.closeDialog('#alarmPickerScheduleDialog');
  }

  saveAndCloseSettings() {
    const alarmClockConfiguration = Object.assign(new AlarmConfiguration, {
      ...this.alarmConfiguration,
      ringerEntities: JSON.stringify(this._ringerEntities),
      timeFormat: this.renderRoot.querySelector('#timeFormat ha-radio[checked]').value,
      clockFontFace: this.renderRoot.querySelector('#clockFontFace ha-radio[checked]').value,
      clockDefaultFullscreen: this.renderRoot.querySelector('#clockDefaultFullscreen').checked,
      snoozeDurationDefault: this.renderRoot.querySelector('#snoozeDurationPicker').value,
      alarmDurationDefault: this.renderRoot.querySelector('#alarmDurationPicker').value,
    });

    this._alarmController.saveAlarmClockConfiguration(alarmClockConfiguration);
    if (this._alarmClockClasses.fullscreen !== this.clockDefaultFullscreen) this._toggleAlarmFullscreen(this.clockDefaultFullscreen);
    this.closeDialog('#alarmSettingsDialog');
  }

  saveAndCloseNap() {
    this._setAlarm();
    const alarmClockConfiguration = Object.assign(new AlarmConfiguration, {
      ...this.alarmConfiguration,
      napDurationDefault: this.renderRoot.querySelector('#napTimePicker').value,
    });

    this._alarmController.saveAlarmClockConfiguration(alarmClockConfiguration);
    this.closeDialog('#alarmNapDialog');
  }

  clearAndCloseNap() {
    this._alarmController.nextAlarmReset();
    this.closeDialog('#alarmNapDialog');
  }

  _showAlarmPicker() {
    this.alarmsEnabled = this.alarmConfiguration.alarmsEnabled;
    this.alarmPickerMo = JSON.parse(JSON.stringify(this.alarmConfiguration['mo']));
    this.alarmPickerTu = JSON.parse(JSON.stringify(this.alarmConfiguration['tu']));
    this.alarmPickerWe = JSON.parse(JSON.stringify(this.alarmConfiguration['we']));
    this.alarmPickerTh = JSON.parse(JSON.stringify(this.alarmConfiguration['th']));
    this.alarmPickerFr = JSON.parse(JSON.stringify(this.alarmConfiguration['fr']));
    this.alarmPickerSa = JSON.parse(JSON.stringify(this.alarmConfiguration['sa']));
    this.alarmPickerSu = JSON.parse(JSON.stringify(this.alarmConfiguration['su']));
    const dialogElement = this.renderRoot.querySelector('#alarmPickerScheduleDialog');
    dialogElement.show();
    dialogElement.classList.add('open');
  }

  _showAlarmNapDialog() {
    this.alarmNap = JSON.parse(JSON.stringify(this.alarmConfiguration['napDurationDefault']));
    const dialogElement = this.renderRoot.querySelector('#alarmNapDialog');
    dialogElement.show();
    dialogElement.classList.add('open');
  }

  _showAlarmSettingsDialog() {
    const dialogElement = this.renderRoot.querySelector('#alarmSettingsDialog');
    this.timeFormat = this.alarmConfiguration['timeFormat'];
    this.clockDefaultFullscreen = this.alarmConfiguration['clockDefaultFullscreen'];
    this.clockFontFace = this.alarmConfiguration['clockFontFace'];
    this.snoozeDurationDefault = JSON.parse(JSON.stringify(this.alarmConfiguration['snoozeDurationDefault']));
    this.alarmDurationDefault = JSON.parse(JSON.stringify(this.alarmConfiguration['alarmDurationDefault']));
    const alarmEntities = [];
    const ringerEntitiesIds = this._ringerEntities.map(item => item.entity_id);
    const ringerEntitiesConfig = this.alarmConfiguration['ringerEntities'] ? JSON.parse(this.alarmConfiguration['ringerEntities']) : [];

    ringerEntitiesConfig.forEach( (item) => { if (ringerEntitiesIds.indexOf(item.entity_id) >= 0) alarmEntities.push(item) });
    this._ringerEntities = alarmEntities;
    dialogElement.show();
    dialogElement.classList.add('open');
  }

  closeDialog(target) {
    const dialogElement = this.renderRoot.querySelector(target);
    dialogElement.classList.remove('open');
    this.dialogTimeout = setTimeout(()=>{dialogElement.close()}, 120);
  }

  _toggleLogoVisibility() {
    const clockLogo = this.renderRoot.querySelector('#alarm-top div#clockLogo');
    if (clockLogo) {
      if (clockLogo.style.display !== 'none') {
        clockLogo.style.display = 'none';
      } else {
        clockLogo.style.display = 'block';
      }
    }
  }
}

class HeightUpdater {
  static updateHeight(card, element) {
    if(this._updateHeightOnNormalCard(card, element)) return;
    if(this._updateHeightOnNestedCards(card, element)) return;
    if(this._updateHeightOnMediaControlCards(card, element)) return;
  }
  static _updateHeightOnNormalCard(card, element) {
    if (element.renderRoot) {
      let cardTag = element.renderRoot.querySelector('ha-card');
      if (cardTag) {
        cardTag.style.height = "100%";
        cardTag.style.boxSizing = "border-box";
        return true;
      }
    }
    return false;
  }

  static _updateHeightOnNestedCards(card, element) {
    if (element.firstChild && element.firstChild.renderRoot) {
      let cardTag = element.firstChild.renderRoot.querySelector('ha-card');
      if (cardTag) {
        cardTag.style.height = "100%";
        cardTag.style.boxSizing = "border-box";
        return true;
      }
    }
    return false;
  }

  static _updateHeightOnMediaControlCards(card, element) {
    if(card.type !== 'media-control') {
      return;
    }
    if (element.firstChild && element.firstChild.renderRoot) {
      element.firstChild.style.height = '100%';
      let bannerTag = element.firstChild.renderRoot.querySelector('div.banner');
      if (bannerTag) {
        bannerTag.style.boxSizing = "border-box";
        bannerTag.style.height = "calc(100% - 72px)";
        return true;
      }
    }
    return false;
  }
}

customElements.define('kobold-alarm-clock-card', KoboldAlarmClockCard);
