import { Helpers } from './helpers';
import { AlarmController } from './alarm-controller';
import { LitElement, html, css, PropertyValues } from 'lit';
import { state, customElement, property } from "lit/decorators.js";
import type { CardConfig, NextAlarmConfig, Duration } from './types';
// HA types
import type { HomeAssistant } from "custom-card-helpers";

import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// import relativeTime from 'dayjs/plugin/relativeTime';
// dayjs.extend(customParseFormat);
// dayjs.extend(relativeTime);

@customElement('kobold-card-editor')
class KoboldCardEditor extends LitElement {

    private _configSchemaSettings = [
        {
            name: "alarm_entities",
            label: "Alarm Ringer Entities",
            selector: { entity: { multiple: true, filter: { domain: Helpers.DOMAINS_ALARM_ENTITIES } } },
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
    // private _injectStylesDone: boolean;

    @state() _hass: HomeAssistant;
    @state() _config: CardConfig;
    @state() _selectedTab = 0;
    @state() _nextAlarmConfig: NextAlarmConfig;

    // @property({ attribute: false }) controller;
    @property({ attribute: false, reflect: false }) alarmController;

    // @query('hui-dialog-edit-card', true) _editorQ: HTMLElement;
    // @query('div#editor') _editorQ: HTMLElement;

    constructor() {
        super();
        Helpers.fireEvent('kobold-editor', { editorEl: this }, Helpers.getHa());
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass;
    }

    setConfig(config) {
        // console.log('*** Editor setConfig(); config: ', config);
        // console.log('*** Editor setConfig; config nextAlarm overridden: ', config.next_alarm.overridden);
        this._config = Helpers.deepMerge(Helpers.defaultConfig(AlarmController.createNextAlarm({ enabled: false, time: "07:00:00" })), config);
        const configChanges = Helpers.deepCompareObj(this._config, config);
        if (!configChanges) return;
        // if (configChanges) {
        //   // console.log('*** Editor setConfig(); changes v default: ', Helpers.deepCompareObj(configChanges, Helpers.defaultConfig));
        //   // console.log('*** Editor setConfig(); changes v config: ', Helpers.deepCompareObj(configChanges, config));
        //   console.log('*** Editor setConfig(); configChanges: ', configChanges);
        //   // console.log('*** Editor setConfig(); config: ', config);
        //   console.log('*** Editor setConfig(); this._config: ', Helpers.defaultConfig);

        // }
        // this._config.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
        // console.log('*** setConfig on card(); last_updated: ', this._config.last_updated);
        this._config.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
        Helpers.fireEvent('config-changed', { config: this._config }, this); //updates lovelace.config
        if (!this._oldConfig) this._oldConfig = this._config;
    }

    // // TODO: docs say this method should be present in editor; how might this help? doesn't event bubble up anyway?
    // configChanged(newConfig) {
    //     const event = new CustomEvent("config-changed", {
    //         bubbles: true,
    //         composed: true,
    //         detail: { config: newConfig },
    //     });
    //     this.dispatchEvent(event);
    // }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        // console.log('*** this._nextAlarmConfig: ', this._nextAlarmConfig);
        // const saveButton = Helpers.getEditorButtons().querySelectorAll('mwc-button')[1];
        // if (saveButton) {
        //   saveButton.addEventListener('click', () => {
        //     if (this._nextAlarmConfig) {
        //       const nextAlarmDiff = Helpers.deepCompareObj(this._nextAlarmConfig.next_alarm, this._config.next_alarm);
        //       if (nextAlarmDiff) {
        //         this._saveNextAlarm(this._nextAlarmConfig);
        //       }
        //     }
        //   });
        // } else {
        //   console.error(`*** Save button not found`);
        // }

        // console.log('*** editor: ', Helpers.getEditor().shadowRoot.querySelector('hui-card-element-editor').shadowRoot.querySelector('hui-stack-card-editor').shadowRoot.querySelector('hui-card-element-editor').shadowRoot.querySelector('kobold-card-editor').shadowRoot.querySelector('#kobold-card-config'));
        // console.log('*** this: ', this.shadowRoot);//.querySelector('*'));

        const editorStyleTag = Helpers.getLovelace().shadowRoot ? Helpers.getLovelace().shadowRoot.querySelector('div > style') : undefined;

        const myDialog = Helpers.getEditor().shadowRoot.querySelector('ha-dialog');
        if (myDialog) {
            myDialog.addEventListener('keydown', (event) => {
                //https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event#keydown_events_with_ime
                if (event.isComposing || event.keyCode === 229) {
                    // console.log('*** ignorable key event fired; returning');
                    return;
                }
                // console.log('*** key hit: ', event.key);
                if (event.key === 'Enter') {
                    // console.log('*** saving after key event.');
                    if (editorStyleTag) editorStyleTag.remove();
                    this._handleSaveButton();
                }
            });
        } else {
            console.error('*** firstUpdated(); Editor dialog not found. Refresh browser');
            // if (editorStyleTag) editorStyleTag.remove();
        }

        const cancelButton = Helpers.getHa().shadowRoot.querySelector('hui-dialog-edit-card').shadowRoot.querySelector('ha-icon-button[dialogaction=cancel]');
        if (cancelButton) {
            cancelButton.addEventListener('click', (event) => {
                // console.log('*** event: ', event);
                if (editorStyleTag) editorStyleTag.remove();
            });
        } else {
            console.error('*** firstUpdated(); Cancel button not found. Refresh browser');
            // if (editorStyleTag) editorStyleTag.remove();
        }

        let editButtons = Helpers.getEditorButtons().querySelectorAll('ha-button');
        if (editButtons.length === 0) editButtons = Helpers.getEditorButtons().querySelectorAll('mwc-button');
        // console.log('*** editButtons: ', editButtons);
        if (editButtons.length > 0) {
            editButtons.forEach(
                (button, index) => {
                    // ['click', 'keypress'].forEach(event => {
                    //   button.addEventListener(event, function (e, myNextAlarmConfig) {
                    //     if (event === 'click' || e.keyCode === 13) {
                    //       if (Helpers.getLovelace().shadowRoot) {
                    //         Helpers.getLovelace().shadowRoot.querySelector('div > style').remove();
                    //       }

                    //       if (index === 1) {
                    //         // console.log('*** this._nextAlarmConfig: ', this._nextAlarmConfig);
                    //         // console.log('*** this._nextAlarmConfig: ', myNextAlarmConfig);
                    //         if (this._nextAlarmConfig) {
                    //           const nextAlarmDiff = Helpers.deepCompareObj(this._nextAlarmConfig.next_alarm, this._config.next_alarm);
                    //           if (nextAlarmDiff) {
                    //             this._saveNextAlarm(this._nextAlarmConfig);
                    //           }
                    //         }
                    //       }
                    //     }
                    //   });
                    // });

                    button.addEventListener('click', () => {
                        if (editorStyleTag) editorStyleTag.remove();

                        if (index === 1) {
                            // console.log('*** saving after click event');
                            this._handleSaveButton();
                            // if (this._nextAlarmConfig) {
                            //   const nextAlarmDiff = Helpers.deepCompareObj(this._nextAlarmConfig.next_alarm, this._config.next_alarm);
                            //   if (nextAlarmDiff) {
                            //     this._saveNextAlarm(this._nextAlarmConfig);
                            //   }
                            // }
                        }
                    })
                }
            );
        } else {
            console.error('*** firstUpdated(); Editor buttons not found. Refresh browser');
            // if (editorStyleTag) editorStyleTag.remove();
        }

        //   if (Helpers.getPreview()) {
        //     let myStyle;
        //     console.log('*** firstUpdated; preview: ', Helpers.getPreview());
        //     const clockStyle = '#clock { background-color: green !important}; }';
        //     myStyle = document.createElement('style');
        //     myStyle.innerHTML = clockStyle;
        //     let card = Helpers.getPreview().querySelector('kobold-alarm-clock-card');
        //     if (!card) {
        //       card = Helpers.getPreview().shadowRoot?.querySelector('kobold-alarm-clock-card');
        //       if (!card) {
        //         console.warn('*** firstUpdated(); No card found for preview');
        //         Helpers.getPreview().style.visibility = 'hidden';
        //       }
        //     }
        //     if (card) card.appendChild(myStyle);
        //   }
    }

    protected updated(_changedProperties: PropertyValues): void {
        //   // console.log('*** updated; changed properties: ', _changedProperties);
        // if (!this._injectStylesDone) {
        const formRootHost = this.shadowRoot.querySelector('#schedule')?.querySelector('ha-form')?.shadowRoot;
        // console.log('*** formRootHost: ', formRootHost);

        if (formRootHost) {
            if (!formRootHost.querySelector('style#formRoot')) {
                // if (formRootHost.style.contains('ha-form-grid')) {
                // console.log('*** style already added');
                // console.log('*** style: ', formRootHost.querySelector('style'));
                // this._injectStylesDone = true;
                // const formStyle = 'ha-form-grid { grid-template-columns: repeat(2, calc(50% - 4px)) !important; }';
                // const formStyle = 'ha-form-grid { grid-template-columns: auto auto !important; justify-content: end; }';
                // const formStyle = 'ha-form-grid { grid-template-columns: auto calc(60% - 4px) !important; justify-content: end; }';
                const formStyle = 'ha-form-grid { grid-template-columns: auto 65% !important; justify-content: end; }';
                let myStyle = document.createElement('style');
                myStyle.setAttribute('id', 'formRoot');
                myStyle.innerHTML = formStyle;
                formRootHost.appendChild(myStyle);
            }
        }
    }

    _handleSaveButton() {
        // console.log('*** _handlSaveButton; _nextAlarmConfig: ', this._nextAlarmConfig);
        // console.log('*** _handlSaveButton; _config.nap_duration: ', this._config.nap_duration);
        // nextAlarmConfig undefined unless nap settings tab was visited
        if (this._nextAlarmConfig) {
            const nextAlarmDiff = Helpers.deepCompareObj(this._nextAlarmConfig.next_alarm, this._config.next_alarm);
            const napDurationDiff = Helpers.deepCompareObj(this._nextAlarmConfig.nap_duration, this._config.nap_duration);
            // console.log('*** handleSaveButton; napDurationDiff: ', napDurationDiff);
            // console.log('*** handleSaveButton; nextAlarmConfig.nap_duration: ', this._nextAlarmConfig.nap_duration);
            // console.log('*** handleSaveButton; config.nap_duration: ', this._config.nap_duration);
            if (nextAlarmDiff || napDurationDiff) {
                // console.log('*** _handlSaveButton; nextAlarmDiff: ', nextAlarmDiff);
                // console.log('*** _handlSaveButton; napDurationDiff: ', napDurationDiff);
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
        // console.log('*** value: ', event.detail.value);
        const configChanges = Helpers.deepCompareObj(this._oldConfig, event.detail.value);
        if (!configChanges) return;
        // console.log('*** valueChanged(); configChanges: ', configChanges);
        // console.log('*** valueChanged(); oldConfig: ', this._oldConfig);
        // console.log('*** valueChanged(); event value: ', event.detail.value);
        // console.log('*** before: config.snooze_duration_default: ', this._config.snooze_duration_default);
        // this._config = Helpers.deepMerge(Helpers.defaultConfig, event.detail.value);
        // this._config.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
        // console.log('*** valueChanged(); new config: ', this._config);
        // const momentTomorrow = dayjs().add(1, 'day');
        // const dayTomorrow = momentTomorrow.format('dd').toLowerCase();
        const dayTomorrow = dayjs().add(1, 'day').format('dd').toLowerCase();
        const dayToday = dayjs().format('dd').toLowerCase();

        Object.keys(configChanges).forEach(
            (item) => {
                // console.log('*** item: ', item);
                // console.log('*** item.time: ', event.detail.value[item]?.time);
                // console.log('*** undefined. value: ' + event.detail.value[item] + '; value.time: ' + (event.detail.value[item].time && !event.detail.value[item].time));
                if (event.detail.value[item] === undefined || (event.detail.value[item].hasOwnProperty('time') && event.detail.value[item].time === undefined)) {
                    // event.detail.value[item] = this._oldConfig[item];
                    // event.detail.value[item] = this._config[item];
                    // console.log('*** undefined item: ' + item + '; new value: ' + JSON.stringify(Helpers.defaultConfig[item]));
                    event.detail.value[item] = Helpers.defaultConfig(AlarmController.createNextAlarm({ enabled: false, time: "07:00:00" }))[item];
                    // console.log('*** undefined item: ' + item + '; new value: ' + JSON.stringify(this._oldConfig[item]));
                    // console.log('*** undefined item: ' + item + '; new value: ' + JSON.stringify(this._config[item]));
                }
                // update nextAlarm
                if (item === dayTomorrow || item === dayToday || item === 'alarms_enabled' || item === 'next_alarm') {
                    // console.log('*** changed item: ', item);
                    // const alarmTomorrow = this._config[dayTomorrow];
                    // const alarmTomorrow = event.detail.value[dayTomorrow];

                    const forToday = item === dayToday && dayjs().format('HH:mm:ss') < event.detail.value[item].time;
                    // console.log('*** now: ' + dayjs().add(1, 'minute').format('HH:mm:ss') + ' < ' + event.detail.value[item].time);
                    // console.log('*** forToday: ', forToday);
                    const newAlarm = forToday ? event.detail.value[dayToday] : event.detail.value[dayTomorrow];
                    // this._config.next_alarm = AlarmController.createNextAlarm(alarmTomorrow); // sometimes undesired: resets overridden, etc
                    // this._config.next_alarm = {
                    event.detail.value.next_alarm = {
                        ...this._config.next_alarm,
                        // ...AlarmController.createNextAlarm(alarmTomorrow),
                        ...AlarmController.createNextAlarm(newAlarm, forToday),
                    }
                    // console.log('*** new next_alarm.enabled: ', event.detail.value.next_alarm);
                }
            });

        // this.requestUpdate();
        // console.log('*** before value.next_alarm: ', event.detail.value.next_alarm);
        // console.log('*** before value.alarms_enabled: ', event.detail.value.alarms_enabled);
        // console.log('*** before value: ', event.detail.value);
        // console.log('*** before config.next_alarm: ', this._config.next_alarm);
        this._config = Helpers.deepMerge(Helpers.defaultConfig(AlarmController.createNextAlarm({ enabled: false, time: "07:00:00" })), event.detail.value);
        // console.log('*** after value.alarms_enabled: ', event.detail.value.alarms_enabled);
        // console.log('*** after value: ', event.detail.value);
        // console.log('*** after config.next_alarm: ', this._config.next_alarm);
        this._config.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
        // console.log('*** valueChanged(); last_updated: ', this._config.last_updated);

        this._oldConfig = this._config;
        // console.log('*** after: config.snooze_duration_default: ', this._config.snooze_duration_default);
        // console.log('*** config: ', this._config);
        Helpers.fireEvent('config-changed', { config: this._config }, this);
    }

    _valueChangedNap(event) {
        event.stopPropagation();
        // console.log('*** value: ', event.detail.value);
        if (event.detail.value === undefined) {
            // event.detail.value = this._config.nap_duration;
            // event.detail.value = Helpers.defaultConfig.nap_duration;
            // this._nextAlarmConfig.nap_duration = event.detail.value;
            this._nextAlarmConfig.nap_duration = Helpers.defaultConfig().nap_duration;
            this._nextAlarmConfig.next_alarm.overridden = false;
            this.requestUpdate();
            // console.log('*** this._nextAlarmConfig.next_alarm.overridden: ', this._nextAlarmConfig.next_alarm.overridden);
            // console.log('*** this._config.next_alarm.overridden: ', this._config.next_alarm.overridden);
            // console.log('*** nap undefined: ');
            return;
        }

        // // same as set nextAlarm() in controller (except overridden)? use _setNextalarm below?
        // const nextAlarmTime = dayjs().add(dayjs.duration(event.detail.value));
        // const nextAlarm = {
        //   ...this._nextAlarmConfig.next_alarm,
        //   enabled: true,
        //   nap: true,
        //   time: nextAlarmTime.format('HH:mm:ss'),
        //   date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss'),
        //   date: nextAlarmTime.format('YYYY-MM-DD'),
        //   overridden: true
        // }

        // this._nextAlarmConfig.next_alarm = nextAlarm;

        this._nextAlarmConfig.next_alarm.overridden = true;
        this._nextAlarmConfig.nap_duration = event.detail.value;

        this.requestUpdate();
        // console.log('*** value: ', event.detail.value);
    }

    // // fires *after* save button pressed in order to avoid alarm ringing during setting of nextAlarm in nap settings
    // async _saveNextAlarm(nextAlarmConfig) {
    //     // console.log('*** saveNextAlarm; alarmController: ', this.alarmController);
    //     // console.log('*** saveNextAlarm; overridden: ', nextAlarmConfig.next_alarm.overridden);
    //     // console.log('*** saveNextAlarm called');
    //     try {
    //         const lovelace = Helpers.getLovelace().lovelace;
    //         const newConfig = structuredClone(lovelace.config);
    //         const tabGroupArry = [...Helpers.getLovelace().shadowRoot.querySelectorAll('sl-tab-group sl-tab')];
    //         const viewIndex = tabGroupArry.findIndex((tab) => { return tab.hasAttribute('active') });
    //         const cardConfig = Helpers.findNested(newConfig.views[viewIndex > -1 ? viewIndex : 0], 'type', 'custom:kobold-alarm-clock-card');
    //         if (cardConfig && cardConfig.next_alarm && cardConfig.nap_duration) {

    //             if (nextAlarmConfig.next_alarm.overridden) {
    //                 // console.log('*** saveNextAlarm; overridden is true');
    //                 const nextAlarmTime = dayjs().add(dayjs.duration(nextAlarmConfig.nap_duration));
    //                 const nextAlarm = {
    //                     ...this._nextAlarmConfig.next_alarm,
    //                     enabled: true,
    //                     // nap: true,
    //                     time: nextAlarmTime.format('HH:mm:ss'),
    //                     date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss'),
    //                     date: nextAlarmTime.format('YYYY-MM-DD'),
    //                     // overridden: true
    //                 }
    //                 cardConfig.next_alarm = nextAlarm;
    //                 console.log('*** _saveNextAlarm; nextAlarm: ', nextAlarm);
    //                 // console.log('*** _saveNextAlarm; alarmController.nextAlarm: ', this.alarmController.nextAlarmObj({ enabled: true, time: nextAlarmTime.format('HH:mm:ss') }));
    //                 console.log('*** _saveNextAlarm; alarmController.nextAlarm: ', AlarmController.createNextAlarm({ enabled: true, time: nextAlarmTime.format('HH:mm:ss') }, true, true));
    //                 // console.log('*** _saveNextAlarm; createNextAlarm: ', AlarmController.createNextAlarm({ enabled: true, time: nextAlarmTime.format('HH:mm:ss') }, true)); // missing overridden property
    //                 // this.alarmController.nextAlarm = nextAlarm;
    //             } else {
    //                 //overridden is switched to false: nextAlarmReset
    //                 // console.log('*** reset alarm');

    //                 const dayTomorrow = dayjs().add(1, 'day').format('dd').toLowerCase();
    //                 const dayToday = dayjs().format('dd').toLowerCase();
    //                 const forToday = dayjs().format('HH:mm:ss') < this._config[dayToday].time;
    //                 const newAlarm = forToday ? this._config[dayToday] : this._config[dayTomorrow];
    //                 cardConfig.next_alarm = AlarmController.createNextAlarm(newAlarm, forToday);

    //                 // this.alarmController.nextAlarmReset();

    //                 // const momentTomorrow = dayjs().add(1, 'day');
    //                 // const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()];
    //                 // // cardConfig.next_alarm = AlarmController.createNextAlarm(alarmTomorrow);
    //                 // cardConfig.next_alarm = {
    //                 //   ...AlarmController.createNextAlarm(alarmTomorrow),
    //                 //   // overridden: false
    //                 // };
    //             }
    //             cardConfig.nap_duration = nextAlarmConfig.nap_duration; //TODO: move this to nextAlarm (e.g., nextAlarm.nap_duration) so only one save needed here

    //             // const newNextAlarmConfig = { next_alarm: cardConfig.next_alarm, nap_duration: cardConfig.nap_duration };
    //             // console.log('*** saveNextAlarm(); newNextAlarmConfig: ', newNextAlarmConfig)
    //             // // console.log('*** saveNextAlarm(); cardConfig: ', cardConfig)
    //             // console.log('*** saveNextAlarm(); nextAlarmConfig: ', nextAlarmConfig)
    //             // const configChanges = Helpers.deepCompareObj(newNextAlarmConfig, nextAlarmConfig);
    //             // console.log('*** saveNextAlarm(); configChanges: ', configChanges)

    //             cardConfig.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss'); // controller save includes last_updated
    //             // console.log('*** saveNextAlarm(); saving: ', dayjs().format('YYYY-MM-DD HH:mm:ss'));

    //             await lovelace.saveConfig(newConfig);
    //             // Override HA refresh dashboard notification
    //             window.setTimeout(() => {
    //                 Helpers.fireEvent('hass-notification', { message: 'Successfully saved' }, Helpers.getHa());
    //             }, 50);
    //         } else {
    //             throw { message: 'Unable to find Kobold card in lovelace configuration or kobold card config is corrupt' };
    //         };
    //     } catch (err: any) {
    //         alert(`Saving failed: ${err.message}.`);
    //         // Override HA successful save notification
    //         window.setTimeout(() => {
    //             Helpers.fireEvent('hass-notification', { message: 'Saving failed' }, Helpers.getHa());
    //         }, 50);
    //     }
    // }

    // fires *after* save button pressed in order to avoid alarm ringing during setting of nextAlarm in nap settings
    async _saveNextAlarm(nextAlarmConfig) {
        // console.log('*** saveNextAlarm; alarmController: ', this.alarmController);
        // console.log('*** saveNextAlarm; overridden: ', nextAlarmConfig.next_alarm.overridden);
        // console.log('*** saveNextAlarm called');
        try {
            // const lovelace = Helpers.getLovelace().lovelace;
            // const newConfig = structuredClone(lovelace.config);
            // const tabGroupArry = [...Helpers.getLovelace().shadowRoot.querySelectorAll('sl-tab-group sl-tab')];
            // const viewIndex = tabGroupArry.findIndex((tab) => { return tab.hasAttribute('active') });
            // const cardConfig = Helpers.findNested(newConfig.views[viewIndex > -1 ? viewIndex : 0], 'type', 'custom:kobold-alarm-clock-card');
            // if (cardConfig && cardConfig.next_alarm && cardConfig.nap_duration) {

            let nextAlarm;
            if (nextAlarmConfig.next_alarm.overridden) {
                // // console.log('*** saveNextAlarm; overridden is true');
                const nextAlarmTime = dayjs().add(dayjs.duration(nextAlarmConfig.nap_duration));
                // const nextAlarm = {
                //     ...this._nextAlarmConfig.next_alarm,
                //     enabled: true,
                //     // nap: true,
                //     time: nextAlarmTime.format('HH:mm:ss'),
                //     date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss'),
                //     date: nextAlarmTime.format('YYYY-MM-DD'),
                //     // overridden: true
                // }
                // cardConfig.next_alarm = nextAlarm;
                // console.log('*** _saveNextAlarm; nextAlarm: ', nextAlarm);
                // // console.log('*** _saveNextAlarm; alarmController.nextAlarm: ', this.alarmController.nextAlarmObj({ enabled: true, time: nextAlarmTime.format('HH:mm:ss') }));
                // console.log('*** _saveNextAlarm; alarmController.nextAlarm: ', AlarmController.createNextAlarm({ enabled: true, time: nextAlarmTime.format('HH:mm:ss') }, true, true));
                // // console.log('*** _saveNextAlarm; createNextAlarm: ', AlarmController.createNextAlarm({ enabled: true, time: nextAlarmTime.format('HH:mm:ss') }, true)); // missing overridden property
                // this.alarmController.nextAlarm = AlarmController.createNextAlarm({ enabled: true, time: nextAlarmTime.format('HH:mm:ss') }, true, true);
                nextAlarm = AlarmController.createNextAlarm({ enabled: true, time: nextAlarmTime.format('HH:mm:ss') }, true, true);
            } else {
                //overridden is switched to false: nextAlarmReset
                // console.log('*** reset alarm');

                const dayTomorrow = dayjs().add(1, 'day').format('dd').toLowerCase();
                const dayToday = dayjs().format('dd').toLowerCase();
                const forToday = dayjs().format('HH:mm:ss') < this._config[dayToday].time;
                const newAlarm = forToday ? this._config[dayToday] : this._config[dayTomorrow];
                nextAlarm = AlarmController.createNextAlarm(newAlarm, forToday);


                // const momentTomorrow = dayjs().add(1, 'day');
                // const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()];
                // // cardConfig.next_alarm = AlarmController.createNextAlarm(alarmTomorrow);
                // cardConfig.next_alarm = {
                //   ...AlarmController.createNextAlarm(alarmTomorrow),
                //   // overridden: false
                // };
            }
            // cardConfig.nap_duration = nextAlarmConfig.nap_duration; //TODO: move this to nextAlarm (e.g., nextAlarm.nap_duration) so only one save needed here
            // this.alarmController.napDuration = nextAlarmConfig.nap_duration;
            this.alarmController.configEntries = { nap_duration: nextAlarmConfig.nap_duration, next_alarm: nextAlarm };

            // const newNextAlarmConfig = { next_alarm: cardConfig.next_alarm, nap_duration: cardConfig.nap_duration };
            // console.log('*** saveNextAlarm(); newNextAlarmConfig: ', newNextAlarmConfig)
            // // console.log('*** saveNextAlarm(); cardConfig: ', cardConfig)
            // console.log('*** saveNextAlarm(); nextAlarmConfig: ', nextAlarmConfig)
            // const configChanges = Helpers.deepCompareObj(newNextAlarmConfig, nextAlarmConfig);
            // console.log('*** saveNextAlarm(); configChanges: ', configChanges)

            // cardConfig.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss'); // controller save includes last_updated
            // console.log('*** saveNextAlarm(); saving: ', dayjs().format('YYYY-MM-DD HH:mm:ss'));

            // await lovelace.saveConfig(newConfig);
            // Override HA refresh dashboard notification
            window.setTimeout(() => {
                Helpers.fireEvent('hass-notification', { message: 'Successfully saved' }, Helpers.getHa());
            }, 50);
            // } else {
            //     throw { message: 'Unable to find Kobold card in lovelace configuration or kobold card config is corrupt' };
            // };
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
        // console.log('*** when: ', this._config.alarm_actions);
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
            // console.log('*** rederNapEditor; nextAlarmConfig undefined');
            // this._nextAlarmConfig = { nap_duration: null, next_alarm: null };
            // if (this._config.next_alarm.overridden) {
            //     // var duration = dayjs.duration(dayjs().diff(this._config.next_alarm.date_time));
            //     const dayDur = dayjs.duration(dayjs(this._config.next_alarm.date_time).diff(dayjs()));
            //     // console.log('*** rederNapEditor(); overridden. dayDur: ', dayDur);
            //     const myDur: Duration = { hours: parseInt(dayDur.format('HH')), minutes: parseInt(dayDur.format('mm')), seconds: parseInt(dayDur.format('ss')) };
            //     // console.log('*** rederNapEditor(); overridden. duration: ', myDur);
            //     this._nextAlarmConfig.nap_duration = myDur;
            // } else {
            //     this._nextAlarmConfig.nap_duration = structuredClone(this._config.nap_duration);
            // }

            // this._nextAlarmConfig.next_alarm = structuredClone(this._config.next_alarm);
            // } else {
            // console.log('*** renderNapEditor: nextAlarmConfig: ', this._nextAlarmConfig);

            this._nextAlarmConfig = {
                next_alarm: structuredClone(this._config.next_alarm),
                nap_duration: structuredClone(this._config.nap_duration),
            }
        }

        // console.log('*** renderNapEditor; _nextAlarmConfig: ', this._nextAlarmConfig);
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
        // console.log('*** alarms_enabled: ', this._config.alarms_enabled);
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

          /*.kobold-nap-form .ha-form {
            display: inline-block !important;
            vertical-align: top;
            width: calc(50% - 4px);
            margin: 0 0 24px 0;
          }*/

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