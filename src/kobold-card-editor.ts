// node module dependencies:
// https://github.com/KipK/load-ha-components/tree/main

import { Helpers } from './helpers';
import { AlarmController } from './alarm-controller';
import { LitElement, html, css, PropertyValues } from 'lit';
import { state, customElement, property } from "lit/decorators.js";
import { localize } from './localize';

import type { CardConfig, NextAlarmConfig, Duration } from './types';
// HA types
import type { HomeAssistant } from "custom-card-helpers";

import dayjs from 'dayjs';

@customElement('kobold-card-editor')
class KoboldCardEditor extends LitElement {

    private _configSchemaSettings = (time_format_12hr?: boolean, workday_sensor?: boolean) => [
        {
            name: "alarm_entities",
            label: localize('config.alarm_entities'),
            selector: { entity: { multiple: true, filter: { domain: AlarmController.DOMAINS_ALARM_ENTITIES } } },
        },
        {
            type: "grid",
            name: "",
            schema: [
                {
                    name: "time_format",
                    label: this._hass.localize('ui.panel.lovelace.editor.card.clock.time_format'),
                    selector: { select: { options: [{ label: this._hass.localize('ui.panel.lovelace.editor.card.clock.time_formats.12'), value: "12hr" }, { label: this._hass.localize('ui.panel.lovelace.editor.card.clock.time_formats.24'), value: "24hr" }] } },
                },
                {
                    name: "period_icon",
                    label: localize('config.period_icon'),
                    selector: { boolean: {} },
                    disabled: !time_format_12hr,
                },
            ],
        },
        {
            name: "clock_display_font",
            label: localize('config.clock_display_font'),
            selector: { select: { options: [{ label: "System", value: 0 }, { label: "Noto Sans", value: 1 }, { label: "Oswald", value: 2 }, { label: "IBM Plex Sans", value: 3 }] } },
        },
        {
            type: "grid",
            name: "",
            schema: [
                {
                    name: "snooze_duration_default",
                    label: localize('config.snooze_duration_default'),
                    selector: { duration: {} },
                },
                {
                    name: "alarm_duration_default",
                    label: localize('config.alarm_duration_default'),
                    selector: { duration: {} },
                },
            ],
        },
        {
            name: "workday_sensor",
            label: localize('config.workday_sensor_entity'),
            selector: { entity: { filter: { integration: 'workday', domain: 'binary_sensor' } } },
        },
        {
            name: "workday_enabled",
            label: localize('config.alarm_on_non_workdays'),
            selector: { boolean: {} },
            disabled: workday_sensor,
        },
        {
            name: "alarm_actions",
            label: localize('config.alarm_actions'),
            selector: {
                object: {
                    label_field: "entity",
                    description_field: "when",
                    multiple: true,
                    fields: {
                        entity: {
                            label: localize('config.selector.alarm_actions.alarm_action_entity'),
                            selector: { entity: {} },
                            required: true,
                        },
                        when: {
                            label: localize('config.selector.alarm_actions.activate_action'),
                            selector: { select: { options: [{ label: localize('config.selector.alarm_actions.selector.activate_action.options.on_snooze'), value: "on_snooze" }, { label: localize('config.selector.alarm_actions.selector.activate_action.options.on_dismiss'), value: "on_dismiss" }, { label: localize('config.selector.alarm_actions.selector.activate_action.options.offset'), value: "offset" }] } },
                            required: true,
                        },
                        offset: {
                            label: localize('config.selector.alarm_actions.offset_duration'),
                            selector: { duration: {} },
                        },
                        negative: {
                            label: localize('config.selector.alarm_actions.offset_negative'),
                            selector: { boolean: {} },
                        },
                    }
                }
            },
        },
        {
            name: "cards",
            label: localize('config.cards'),
            selector: {
                object: {
                    label_field: "entity",
                    multiple: true,
                    reorder: true,
                    fields: {
                        entity: {
                            label: localize('config.selector.cards.card_entity'),
                            selector: { entity: {} },
                            required: true,
                        },
                        "": {
                            label: this._hass.localize('ui.panel.lovelace.editor.edit_card.header'),
                            selector: { object: {} },
                        }
                    }
                },
            }
        },
        {
            name: "debug",
            label: localize('config.debug'),
            selector: { boolean: {} },
        },
    ]

    private _configSchemaNap = [
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
                            label: localize('config.nap_duration'),
                            selector: { boolean: {} },
                        },
                    ]
                },
                {
                    name: "nap_duration",
                    label: "",
                    selector: { duration: {} },
                },
            ],
        },
    ]

    private _configSchemaSchedule = (alarms_disabled?: boolean) => [
        {
            name: "alarms_enabled",
            label: localize('config.alarms_enabled'),
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
    private _configChanges: Object;
    // private _injectStylesDone: boolean;

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

    setConfig(config: CardConfig) {
        this._config = Helpers.deepMerge(AlarmController.defaultConfig, config);
        if (!this._oldConfig) this._oldConfig = this._config;
        const configChanges = Helpers.deepCompareObj(this._config, config);
        if (!configChanges) return;
        this._config.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
        Helpers.fireEvent('config-changed', { config: this._config }, this); //updates lovelace.config
        // if (!this._oldConfig) this._oldConfig = this._config;
        if (this._config.workday_sensor && !this._hass.states[this._config.workday_sensor]) {
            console.error('*** Workday sensor not available');
        }
    }

    // firstUpdated(_changedProperties: PropertyValues): void {
    // }

    // updated(_changedProperties: PropertyValues): void {
    // }


    _injectStyles() {
        // console.log('*** this._selectedTab: ' + this._selectedTab);
        let rounds = 0;
        let componentHosts: Array<ShadowRoot> = [];
        let componentStyles: Array<string> = [];
        let componentHostsPromise = new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                switch (this._selectedTab) {
                    case 1:
                        componentHosts = [this.shadowRoot.querySelector('#nap')?.querySelector('ha-form')?.shadowRoot.querySelector('ha-form-grid')?.shadowRoot.querySelector('ha-form')?.shadowRoot,
                        this.shadowRoot.querySelector('#nap')?.querySelector('ha-form')?.shadowRoot
                        ];
                        componentStyles = ['ha-form-grid { grid-template-columns: auto 0 !important; justify-content: end; }',
                            'ha-form-grid { grid-template-columns: auto 60% !important; justify-content: end; }'
                        ];
                        break;
                    case 2:
                        componentHosts = [this.shadowRoot.querySelector('#schedule')?.querySelector('ha-form')?.shadowRoot];
                        componentStyles = ['ha-form-grid { grid-template-columns: auto 65% !important; justify-content: end; }'];
                        break;
                    default:
                    //
                }

                if (rounds >= 2) {
                    // console.log('*** rejecting round: ' + rounds);
                    clearInterval(interval);
                    reject(new Error('timeout'));
                };
                if (componentHosts !== undefined) {
                    // console.log('*** resolving round:', rounds);
                    resolve(interval);
                }
                rounds++;
            }, 10);
        });
        componentHostsPromise
            .catch((error) => {
                if (!error.message || error.message !== 'timeout')
                    throw (error);
                if (error.message === 'timeout') console.error('*** Attempt to inject styles into HA components of editor dialog timed out');
                return null;
            })
            .then((interval: ReturnType<typeof setInterval>) => {
                if (interval && componentHosts) {
                    clearInterval(interval);
                    const myStyle = [];
                    componentStyles.forEach((style) => { myStyle.push(document.createElement('style').innerHTML = style); });
                    componentHosts.forEach((host, index) => {
                        const myStyle = document.createElement('style');
                        myStyle.innerHTML = componentStyles[index];
                        host.appendChild(myStyle)
                    });
                }
            });

    }

    _getDayOfWeek(days: number) {
        // returns day of week in language set in hass.lanaguage
        return dayjs('2018-08-27').add(days, 'days').format('dddd');
    }

    _valueChanged(event: CustomEvent) {
        event.stopPropagation();
        // const el = event.target;
        // console.log('*** target: ', el);
        // element.setAttribute('tabindex', '-1');
        if (!this._config) return;
        // const configChanges = Helpers.deepCompareObj(this._oldConfig, event.detail.value);
        this._configChanges = Helpers.deepCompareObj(this._oldConfig, event.detail.value);
        // console.log('*** configChanges: ', configChanges);
        // console.log('*** this._oldConfig: ', this._oldConfig);
        // console.log('*** event.detail.value: ', event.detail.value);
        // if (!configChanges) return;
        if (!this._configChanges) return;
        const dayTomorrow = dayjs().add(1, 'day').format('dd').toLowerCase();
        const dayToday = dayjs().format('dd').toLowerCase();

        // Object.keys(configChanges).forEach(
        Object.keys(this._configChanges).forEach(
            (item) => {
                // console.log('*** item: ' + item + '; value: ' + JSON.stringify(event.detail.value[item]));
                if (event.detail.value[item] === undefined || (event.detail.value[item].hasOwnProperty('time') && event.detail.value[item].time === undefined)) {
                    event.detail.value[item] = AlarmController.defaultConfig[item];
                }
                if (item === dayTomorrow || item === dayToday || item === 'alarms_enabled') {

                    const interveningAlarm = item === dayTomorrow && dayjs().format('HH:mm:ss') < this._oldConfig[dayToday].time;

                    if (!interveningAlarm) {
                        const forToday = item === dayToday && dayjs().format('HH:mm:ss') < event.detail.value[item].time;
                        const newAlarm = forToday ? event.detail.value[dayToday] : event.detail.value[dayTomorrow];
                        // console.log('*** item: ' + item + '; newAlarm: ' + JSON.stringify(newAlarm));
                        event.detail.value.next_alarm = {
                            ...this._config.next_alarm,
                            ...AlarmController.createNextAlarm(newAlarm, forToday),
                        }
                        // if (event.detail.value.next_alarm.holiday && event.detail.value.next_alarm.enabled) {
                        //     console.log('*** holiday is true');
                        //     // event.detail.value.next_alarm.enabled = false;
                        // } else if (!event.detail.value.next_alarm.holiday) {
                        //     console.log('*** holiday false: reset alarm');
                        // }
                    }
                }
                if (item === 'nap_duration') {
                    event.detail.value.next_alarm.overridden = true;
                }
                if (event.detail.value.next_alarm.overridden) {
                    // console.log('*** overridden is made true. item: ', item);
                    const nextAlarmTime = dayjs().add(dayjs.duration(event.detail.value.nap_duration));
                    // console.log('*** nextAlarmTime: ', nextAlarmTime);
                    event.detail.value.next_alarm = AlarmController.createNextAlarm({ enabled: true, time: nextAlarmTime.format('HH:mm:ss') }, true, true);
                } else if (item === 'next_alarm') {
                    // console.log('*** nextAlarmReset. item: ', item);
                    //overridden is switched to false: nextAlarmReset
                    // this code from controller's nextAlarmReset // TODO: refactor?
                    const dayTomorrow = dayjs().add(1, 'day').format('dd').toLowerCase();
                    const dayToday = dayjs().format('dd').toLowerCase();
                    const forToday = dayjs().format('HH:mm:ss') < this._config[dayToday].time;
                    const newAlarm = forToday ? this._config[dayToday] : this._config[dayTomorrow];
                    // if (event.detail.value.next_alarm.holiday) {
                    //     console.log('*** holiday is true');
                    //     event.detail.value.next_alarm.enabled = false;
                    // }
                    event.detail.value.next_alarm = AlarmController.createNextAlarm(newAlarm, forToday);
                }
            });

        this._config = Helpers.deepMerge(AlarmController.defaultConfig, event.detail.value);
        this._config.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
        this._oldConfig = this._config;
        Helpers.fireEvent('config-changed', { config: this._config }, this);
    }

    _handleSwitchTab(event) {
        switch (event.detail.name) {
            case 'settings':
                this._selectedTab = 0;
                break;
            case 'nap':
                // this._injectStylesDone = undefined;
                this._selectedTab = 1; this._injectStyles();
                break;
            case 'schedule':
                this._selectedTab = 2; this._injectStyles();
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
        @kobold-tab=${(event) => { this._selectedTab = event.detail.tab; this._injectStyles(); }}
    >
        <div class="toolbar">
            ${AlarmController.oldTabs ? html`
                <sl-tab-group
                    @sl-tab-show=${this._handleSwitchTab}
                >
                    <sl-tab slot="nav" .panel=${"settings"} .active=${this._selectedTab === 0}>${localize('config.settings')}</sl-tab>
                    <sl-tab slot="nav" .panel=${"nap"} .active=${this._selectedTab === 1}>${localize('config.nap')}<</sl-tab>
                    <sl-tab slot="nav" .panel=${"schedule"} .active=${this._selectedTab === 2}>${localize('config.schedule')}</sl-tab>
                </sl-tab-group>
                ` : html`
                <ha-tab-group
                    @wa-tab-show=${this._handleSwitchTab}
                >
                    <ha-tab-group-tab slot="nav" .panel=${"settings"} .active=${this._selectedTab === 0}>${localize('config.settings')}</ha-tab-group-tab>
                    <ha-tab-group-tab slot="nav" .panel=${"nap"} .active=${this._selectedTab === 1}>${localize('config.nap')}</ha-tab-group-tab>
                    <ha-tab-group-tab slot="nav" .panel=${"schedule"} .active=${this._selectedTab === 2}>${localize('config.schedule')}</ha-tab-group-tab>
                </ha-tab-group>
                `
            }
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
        return html`
    <div class="box">
      <ha-form
          .hass=${this._hass}
          .data=${this._config}
          .schema=${this._configSchemaSettings(this._config.time_format === "12hr", this._config.workday_sensor === undefined || (this._config.workday_sensor && !this._hass.states[this._config.workday_sensor]))}
          .computeLabel=${(s) => s.label ?? s.name}
          @value-changed=${this._valueChanged}
      ></ha-form>
    </div>`;
    }

    _renderNapEditor() {

        // if configChanges is undefined, or if configChanges has no nap_duration or overridden property, then populate nap_duration with difference between now and nextAlarm
        // console.log('*** configchanges doenst contain nap duration: ', this._configChanges ? !this._configChanges.hasOwnProperty('nap_duration') : true);
        // TODO: is detecting overridden property here necessary?
        if (this._config.next_alarm.overridden && (this._configChanges ? (!this._configChanges.hasOwnProperty('nap_duration') && !this._configChanges['next_alarm'].overridden) : true)) {
            const dayDur = dayjs.duration(dayjs(this._config.next_alarm.date_time).diff(dayjs()));
            const myDur: Duration = { hours: parseInt(dayDur.format('HH')), minutes: parseInt(dayDur.format('mm')), seconds: parseInt(dayDur.format('ss')) };
            this._config.nap_duration = myDur;
        }

        return html`
    <div class="box" id="nap">
      <ha-form
        .hass=${this._hass}
        .data=${this._config}
        .schema=${this._configSchemaNap}
        .computeLabel=${(s) => s.label ?? s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    </div>`;
    };

    _renderScheduleEditor() {
        return html`
    <div class="box" id="schedule">
      <ha-form
        .hass=${this._hass}
        .data=${this._config}
        .schema=${this._configSchemaSchedule(!this._config.alarms_enabled)}
        .computeLabel=${(s) => s.label ?? s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    </div>`;
    };

    static styles = css`
        sl-tab-group, ha-tab-group {
            margin-bottom: 16px;
        }

        sl-tab, ha-tab-group-tab {
            flex: 1;
        }

        sl-tab::part(base), ha-tab-group-tab::part(base) {
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

        /*
        .kobold-nap-form .ha-form-grid {
            display: grid !important;
            grid-template-columns: auto 50%;
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
        */
    `;
}