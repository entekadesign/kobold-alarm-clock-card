import { Helpers } from './helpers';
import { AlarmController } from './alarm-controller';
import { LitElement, html, css, PropertyValues } from 'lit';
import { state, customElement, property } from "lit/decorators.js";
import type { CardConfig, NextAlarmConfig, Duration } from './types';
// HA types
import type { HomeAssistant } from "custom-card-helpers";

import dayjs from 'dayjs';

@customElement('kobold-card-editor')
class KoboldCardEditor extends LitElement {

    private _configSchemaSettings = [
        {
            name: "alarm_entities",
            label: "Alarm Ringer Entities",
            selector: { entity: { multiple: true, filter: { domain: AlarmController.DOMAINS_ALARM_ENTITIES } } },
        },
        {
            name: "time_format",
            label: "Time Format",
            selector: { select: { options: [{ label: "12-Hour", value: "12hr" }, { label: "24-Hour", value: "24hr" }] } },
        },
        {
            name: "clock_display_font",
            label: "Clock Display Font",
            selector: { select: { options: [{ label: "System", value: 0 }, { label: "Noto Sans", value: 1 }, { label: "Oswald", value: 2 }, { label: "IBM Plex Sans", value: 3 }] } },
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
            selector: {
                object: {
                    label_field: "entity",
                    description_field: "when",
                    multiple: true,
                    fields: {
                        entity: {
                            label: "Alarm Action Entity",
                            selector: { entity: {} },
                            required: true,
                        },
                        when: {
                            label: "Activate Action",
                            selector: { select: { options: [{ label: "On Snooze", value: "on_snooze" }, { label: "On Dismiss", value: "on_dismiss" }, { label: "At Time Offset from Alarm", value: "offset" }] } },
                            required: true,
                        },
                        offset: {
                            label: "Offset Duration",
                            selector: { duration: {} },
                        },
                        negative: {
                            label: "Offset Negative",
                            selector: { boolean: {} },
                        },
                    }
                }
            },
        },
        {
            name: "cards",
            label: "Cards to Display",
            selector: {
                object: {
                    label_field: "entity",
                    multiple: true,
                    reorder: true,
                    fields: {
                        entity: {
                            label: "Card Entity",
                            selector: { entity: {} },
                            required: true,
                        },
                        "": {
                            label: "Card Configuration",
                            selector: { object: {} },
                        }
                    }
                },
            }
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

    @property({ attribute: false, reflect: false }) alarmController;

    constructor() {
        super();
        Helpers.fireEvent('kobold-editor', { editorEl: this }, Helpers.getHa());
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass;
    }

    // connectedCallback() {
    //     super.connectedCallback();
    // }

    disconnectedCallback() {
        super.disconnectedCallback();
        const editorStyleTag = Helpers.getLovelace().shadowRoot ? Helpers.getLovelace().shadowRoot.querySelector('div > style') : undefined;
        if (editorStyleTag) editorStyleTag.remove();
    }

    setConfig(config) {
        this._config = Helpers.deepMerge(AlarmController.defaultConfig, config);
        const configChanges = Helpers.deepCompareObj(this._config, config);
        if (!configChanges) return;
        this._config.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
        Helpers.fireEvent('config-changed', { config: this._config }, this); //updates lovelace.config
        if (!this._oldConfig) this._oldConfig = this._config;
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        const myDialog = Helpers.getEditor().shadowRoot.querySelector('ha-dialog');
        if (myDialog) {
            myDialog.addEventListener('keydown', (event) => {
                //https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event#keydown_events_with_ime
                if (event.isComposing || event.keyCode === 229) {
                    return;
                }
                if (event.key === 'Enter') {
                    this._handleSaveButton();
                }
            });
        } else {
            console.error('*** firstUpdated(); Editor dialog not found. Refresh browser');
        }

        let editButtons = Helpers.getEditorButtons().querySelectorAll('ha-button');
        if (editButtons.length === 0) editButtons = Helpers.getEditorButtons().querySelectorAll('mwc-button');
        if (editButtons.length > 0) {
            editButtons.forEach(
                (button, index) => {
                    button.addEventListener('click', () => {

                        if (index === 1) {
                            this._handleSaveButton();
                        }
                    })
                }
            );
        } else {
            console.error('*** firstUpdated(); Editor buttons not found. Refresh browser');
        }
    }

    protected updated(_changedProperties: PropertyValues): void {
        const formRootHost = this.shadowRoot.querySelector('#schedule')?.querySelector('ha-form')?.shadowRoot;

        if (formRootHost) {
            if (!formRootHost.querySelector('style#formRoot')) {
                const formStyle = 'ha-form-grid { grid-template-columns: auto 65% !important; justify-content: end; }';
                let myStyle = document.createElement('style');
                myStyle.setAttribute('id', 'formRoot');
                myStyle.innerHTML = formStyle;
                formRootHost.appendChild(myStyle);
            }
        }
    }

    _handleSaveButton() {
        // nextAlarmConfig undefined unless nap settings tab was visited
        if (this._nextAlarmConfig) {
            const nextAlarmDiff = Helpers.deepCompareObj(this._nextAlarmConfig.next_alarm, this._config.next_alarm);
            const napDurationDiff = Helpers.deepCompareObj(this._nextAlarmConfig.nap_duration, this._config.nap_duration);
            if (nextAlarmDiff || napDurationDiff) {
                this._saveNextAlarm(this._nextAlarmConfig);
            }
        }
    }

    _getDayOfWeek(days: number) {
        // returns day of week in language set in set hass() method of card
        return dayjs('2018-08-27').add(days, 'days').format('dddd');
    }

    _valueChanged(event: CustomEvent) {
        event.stopPropagation();
        if (!this._config) return;
        const configChanges = Helpers.deepCompareObj(this._oldConfig, event.detail.value);
        if (!configChanges) return;
        const dayTomorrow = dayjs().add(1, 'day').format('dd').toLowerCase();
        const dayToday = dayjs().format('dd').toLowerCase();

        Object.keys(configChanges).forEach(
            (item) => {
                if (event.detail.value[item] === undefined || (event.detail.value[item].hasOwnProperty('time') && event.detail.value[item].time === undefined)) {
                    event.detail.value[item] = AlarmController.defaultConfig[item];
                }
                // update nextAlarm
                if (item === dayTomorrow || item === dayToday || item === 'alarms_enabled' || item === 'next_alarm') {

                    const forToday = item === dayToday && dayjs().format('HH:mm:ss') < event.detail.value[item].time;
                    const newAlarm = forToday ? event.detail.value[dayToday] : event.detail.value[dayTomorrow];
                    event.detail.value.next_alarm = {
                        ...this._config.next_alarm,
                        ...AlarmController.createNextAlarm(newAlarm, forToday),
                    }
                }
            });

        this._config = Helpers.deepMerge(AlarmController.defaultConfig, event.detail.value);
        this._config.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
        this._oldConfig = this._config;
        Helpers.fireEvent('config-changed', { config: this._config }, this);
    }

    _valueChangedNap(event) {
        event.stopPropagation();
        if (event.detail.value === undefined) {
            this._nextAlarmConfig.nap_duration = AlarmController.defaultConfig.nap_duration;
            this._nextAlarmConfig.next_alarm.overridden = false;
            this.requestUpdate();
            return;
        }

        this._nextAlarmConfig.next_alarm.overridden = true;
        this._nextAlarmConfig.nap_duration = event.detail.value;

        this.requestUpdate();
    }

    // fires *after* save button pressed in order to avoid alarm ringing during setting of nextAlarm in nap settings
    async _saveNextAlarm(nextAlarmConfig) {
        try {
            let nextAlarm;
            if (nextAlarmConfig.next_alarm.overridden) {
                const nextAlarmTime = dayjs().add(dayjs.duration(nextAlarmConfig.nap_duration));
                nextAlarm = AlarmController.createNextAlarm({ enabled: true, time: nextAlarmTime.format('HH:mm:ss') }, true, true);
            } else {
                //overridden is switched to false: nextAlarmReset
                const dayTomorrow = dayjs().add(1, 'day').format('dd').toLowerCase();
                const dayToday = dayjs().format('dd').toLowerCase();
                const forToday = dayjs().format('HH:mm:ss') < this._config[dayToday].time;
                const newAlarm = forToday ? this._config[dayToday] : this._config[dayTomorrow];
                nextAlarm = AlarmController.createNextAlarm(newAlarm, forToday);
            }
            this.alarmController.configEntries = { nap_duration: nextAlarmConfig.nap_duration, next_alarm: nextAlarm };

            // Override HA refresh dashboard notification
            window.setTimeout(() => {
                Helpers.fireEvent('hass-notification', { message: 'Successfully saved' }, Helpers.getHa());
            }, 50);
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
            this._nextAlarmConfig = { nap_duration: null, next_alarm: null };
            if (this._config.next_alarm.overridden) {
                const dayDur = dayjs.duration(dayjs(this._config.next_alarm.date_time).diff(dayjs()));
                const myDur: Duration = { hours: parseInt(dayDur.format('HH')), minutes: parseInt(dayDur.format('mm')), seconds: parseInt(dayDur.format('ss')) };
                this._nextAlarmConfig.nap_duration = myDur;
            } else {
                this._nextAlarmConfig.nap_duration = structuredClone(this._config.nap_duration);
            }
            this._nextAlarmConfig.next_alarm = structuredClone(this._config.next_alarm);
        }

        return html`
      <div class="box">
        <div class="kobold-nap-form">
          <div class="ha-form-grid">
            <div class="ha-form">
              <div class="ha-formfield">
                <span><p>Nap Duration</p></span>
                <ha-switch ?checked=${this._nextAlarmConfig.next_alarm.overridden} @change=${() => { this._nextAlarmConfig.next_alarm.overridden = !this._nextAlarmConfig.next_alarm.overridden; this.requestUpdate() }}></ha-switch>
              </div>
            </div>
            <div class="ha-form">
              <ha-duration-input
                .data=${this._nextAlarmConfig.nap_duration}
                @value-changed=${this._valueChangedNap}
              ></ha-duration-input>
            </div>
          </div>
        </div>
      </div>`;
    }

    _renderScheduleEditor() {
        return html`<div class="box" id="schedule">
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

          .kobold-nap-form .ha-form-grid {
            display: grid !important;
            /*grid-template-columns: repeat(var(--form-grid-column-count, auto-fit), minmax(var(--form-grid-min-width, 200px), 1fr));*/
            /*grid-template-columns: repeat(2, calc(50% - 4px));*/
            /*grid-template-columns: auto auto;*/
            grid-template-columns: auto 50%;
            /*grid-template-columns: calc(35% - 4px) auto;*/
            grid-column-gap: 8px;
            grid-row-gap: 24px;
            justify-content: end;
          }

          .kobold-nap-form .ha-form {
            display: block;
          }

          .kobold-nap-form .ha-formfield {
            justify-content: space-between;
            align-items: var(--ha-formfield-align-items, center);
            gap: 4px;
            width: 100%;
            display: flex;
            min-height: 56px;
            align-items: center;
            --mdc-typography-body2-font-size: 1em;
          }

          .kobold-nap-form p {
            margin: 0;
          }
        `;
    }
}