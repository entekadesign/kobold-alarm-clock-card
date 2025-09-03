// import { AlarmConfiguration } from './alarm-controller';
// import { AlarmController } from './alarm-controller';

import { LitElement, html, css } from 'lit';
import { property, state, customElement, query } from "lit/decorators.js";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import type { CardConfig, NextAlarmObject } from './types';

@customElement('alarm-picker')
class AlarmPicker extends LitElement {

    private _injectStylesDone: boolean;

    @state() private _displayedValueH: string;
    @state() private _displayedValueM: string;

    @property({ reflect: false }) config: CardConfig;
    // @property({ reflect: false }) alarmConfiguration: AlarmConfiguration;
    // @property({ reflect: false }) alarmController: AlarmController;
    @property({ reflect: false }) nextAlarm: NextAlarmObject;
    @property({ reflect: false }) time: string;
    @property({ reflect: false }) disabled: boolean;
    // @property({ reflect: false }) preview: boolean;

    @query('div#alarmPicker.alarm ha-switch') _alarmPickerSwitchQ: HTMLInputElement;
    @query('div#alarmPicker.alarm ha-textfield#alarmTimeInput', true) _alarmTimeInputQ: HTMLInputElement;
    @query('ha-icon.button') _iconButtonQ: HTMLElement;
    @query('#alarmPicker', true) _alarmPickerQ: HTMLElement;

    render() {
        // console.log('*** nextAlarm time: ', this.nextAlarm.time);
        return html`
            <div class="alarm" id="alarmPicker">
                ${this.getAttribute('show-icon') ? html`
                    <ha-icon icon=${this._getScheduleButtonIcon(this.nextAlarm)} @click=${this._openSchedule} class="button"></ha-icon>
                ` : ''}

                <slot></slot>
                <div class="sliders picker">
                    <ha-slider
                        id="hoursSlider"
                        labeled
                        min=1
                        max=24
                        .value=${this._displayedValueH}
                        @change=${this._updateValue}
                    ></ha-slider>
                    <ha-slider
                        id="minutesSlider"
                        labeled
                        min=0
                        max=59
                        .value=${this._displayedValueM}
                        @change=${this._updateValue}
                    ></ha-slider>
                </div>
                <div class="row-options"
                >
                    <ha-textfield
                        id="alarmTimeInput"
                        pattern="([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]( AM| PM|)"
                        maxlength="8"
                        ?disabled=${this.disabled}
                        .value=${!this.nextAlarm ? '' : dayjs(this.nextAlarm.time, 'HH:mm:ss').format(this._alarmTimeFormat())}
                        ?overridden=${this.config?.next_alarm.overridden}
                        @click=${this._clickHandler}
                        readonly
                        >
                    </ha-textfield>
                </div>

                <ha-switch id="alarmEnabledToggleButton" ?checked=${!this.nextAlarm ? false : this.nextAlarm.enabled} @change=${this._toggleAlarmEnabled} ?disabled=${this.disabled} class></ha-switch>

            </div>
        `;
    }

    static styles = css`
        @media (max-width: 600px), (max-height: 600px) {
            div#alarmPicker.alarm {
                height: 2rem;
            }
        }
        /*@container (width < 750px) {
            div#alarmPicker.alarm.open {
                height: 4rem;
            }
            div#alarmPicker.alarm.open > .sliders {
                margin-left: 0;
                width: 0;
                overflow: hidden;
            }
        }*/

        :host(.narrow) div#alarmPicker.alarm.open {
            height: 4rem;
        }

        :host(.narrow) div#alarmPicker.alarm.open > .sliders {
            margin-left: 0;
            width: 0;
            overflow: hidden;
        }

        .alarm {
            display:inline-flex;
            justify-content: space-between;
            align-items: center;
            height: 4rem;
        }

        #alarmPicker.alarm.open {
            height: 10rem;
        }

        /*div#alarmPicker .row-options.settings-picker {
            width: 22em;
            text-align: left;
            transition: width 120ms;
        }
        #alarmPicker.alarm.open .row-options.settings-picker {
            width: 7rem;
        }*/

        #alarmTimeInput {
            width: 5.1em;
            margin: 0 1em;
        }

        #alarmTimeInput {
            filter: invert(1);
            margin: 0 0.5em;
        }

        #alarmTimeInput[overridden] {
            border: 1px dotted #969696;
            padding: 1px;
        }

        .alarm.open > .sliders {
            margin-left: 1rem;
            width: 14rem;
            overflow: visible;
            animation: delay-overflow 120ms;
        }

        .alarm > .sliders {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            overflow: hidden;
            transition: width 120ms;
            width: 0;
            padding-top: 6rem; backdrop-filter: blur(10px);
        }

        @keyframes delay-overflow {
            from { overflow: hidden; }
        }

        .button {
            cursor: pointer;
        }

       #alarmEnabledToggleButton {
            filter: invert(1);
            scale: 1.25;
            margin: 0 0.5rem;
        }

        :host([hide-toggle-button]) #alarmEnabledToggleButton {
            display: none;
        }
    `;

    updated() {
        if (!this._injectStylesDone) {
            this._injectStylesDone = true;
            // inject style into mdc text field, switch, icon
            // let allStyle = '.mdc-text-field--filled { padding: 0 !important; } .mdc-text-field__input { font-size: inherit !important; }';
            // let pickerOrOptionsDialogStyle = '';
            let myStyle: HTMLElement;
            if (this._alarmPickerSwitchQ.shadowRoot) {
                myStyle = document.createElement('style');
                let switchStyle = 'div.mdc-switch__thumb { box-shadow: 0 0 15px 2px; } div.mdc-switch__track { background-color: #969696 !important; border-color: #969696 !important; }';
                myStyle.innerHTML = switchStyle;
                this._alarmPickerSwitchQ.shadowRoot.appendChild(myStyle);
            }
            // if (this.id === 'tab-2') {

            if (this._iconButtonQ.shadowRoot) {
                myStyle = document.createElement('style');
                // let iconStyle = 'ha-svg-icon { height: calc(1.5rem + 1vh); width: calc(1.5rem + 1vh); }';
                let iconStyle = 'ha-svg-icon { height: calc(1.25rem + 0.5cqw); width: calc(1.25rem + 0.5cqw); }';
                myStyle.innerHTML = iconStyle;
                this._iconButtonQ.shadowRoot.appendChild(myStyle);
            }

            // } else {
            //     console.log('*** id: ', this.id);
            // }
            // if ((this.parentElement.parentElement.id === 'alarm-picker-dialog-content') || (this.parentElement.parentElement.parentElement.parentElement.id === 'settingsDialog')) {
            //     pickerOrOptionsDialogStyle = ' .mdc-text-field--filled { height: 2em !important; }';
            // }
            if (this._alarmTimeInputQ.shadowRoot) {
                const allStyle = '.mdc-text-field--filled { padding: 0 !important; } .mdc-text-field__input { font-size: inherit !important; text-align: center; }';
                const pickerStyle = ' .mdc-text-field__input { color: #969696 !important; } .mdc-line-ripple::before, .mdc-line-ripple::after { border-bottom-width: 0 !important; } .mdc-text-field--filled { height: 1.75em !important; background-color: transparent !important; }';
                myStyle = document.createElement('style');
                myStyle.innerHTML = allStyle + pickerStyle;
                this._alarmTimeInputQ.shadowRoot.appendChild(myStyle);
            }
        }
    }

    _clickHandler() {
        let timeArray: Array<string>;
        // if (this.id === 'tab-2') {
        if (!this._alarmPickerQ.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
        const isEnabled = this.nextAlarm.enabled;
        // const isOverridden = this.alarmConfiguration.nextAlarm.overridden;
        const isOverridden = this.config.next_alarm.overridden;
        // console.log('*** isEnabled: ' + isEnabled + '; isOverridden: ' + isOverridden);
        if (isEnabled && !isOverridden || !isEnabled && !isOverridden) {
            // console.log('*** should be set to current time: ', this.time);
            // set sliders to current time
            // console.log('*** format: ', this._alarmTimeFormat());
            timeArray = dayjs(this.time, this._alarmTimeFormat()).format('HH:mm').split(':');
            // timeArray = dayjs(this.time, 'h:mm A').format('HH:mm').split(':');
            // console.log('*** this.time: ', this.time);
            // console.log('*** timeArray hh:mm A: ', dayjs(this.time, 'h:mm A').format('HH:mm').split(':'));
            // console.log('*** timeArray HH:mm: ', dayjs(this.time, 'HH:mm:ss').format('HH:mm').split(':'));
        } else {
            // set sliders to nextAlarm time
            timeArray = this.nextAlarm.time.split(':');
        }
        // console.log('*** timeArray: ', timeArray);
        // } else {
        //     // set sliders to nextAlarm time
        //     timeArray = this.alarm.time.split(':');
        // }
        this._displayedValueH = timeArray[0];
        this._displayedValueM = timeArray[1];
        this._alarmPickerQ.classList.add('open');
        document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
        document.addEventListener('click', (event) => { this._clickOutsideAlarmTimeInput(event) }, false);
    };

    _clickOutsideAlarmTimeInput(event: Event) {
        if (typeof event.composedPath === 'function' && !event.composedPath().includes(this._alarmPickerQ)) {
            if (this._alarmPickerQ.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
            this._alarmPickerQ.classList.remove('open');
            document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
        }
    }

    _alarmTimeFormat() {
        // return (this.alarmConfiguration['timeFormat'] === '24hr' || this.id === 'napTimePicker' || this.id === 'snoozeDurationPicker' || this.id === 'alarmDurationPicker') ? 'HH:mm' : 'h:mm A';
        return (this.config.time_format === '24hr') ? 'HH:mm' : 'h:mm A';
    }

    _updateValue(event: Event) {
        const value = (<HTMLInputElement>event.target).value;  //Number((e.target).value);
        (<HTMLInputElement>event.target).id === 'hoursSlider' ? this._displayedValueH = value : this._displayedValueM = value;
        // console.log('*** time: ', this._displayedValueH + ':' + this._displayedValueM);
        this._onTimeChanged(this._displayedValueH + ':' + this._displayedValueM);
        if (this._alarmPickerQ.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
        this._alarmPickerQ.classList.remove('open');
        document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
    }

    _getScheduleButtonIcon(nextAlarm: NextAlarmObject) {
        if (!nextAlarm.enabled) {
            return 'mdi:alarm-off';
        } else if (nextAlarm.snooze) {
            return 'mdi:alarm-snooze';
        }
        return 'mdi:alarm';
    }

    _onTimeChanged(timeStr: string) {
        this.nextAlarm.time = dayjs(timeStr, 'HH:mm').format('HH:mm:ss');
        // console.log('*** nextAlarm.time: ', this.nextAlarm.time);
        this.nextAlarm.enabled = true;
        // listener for this event is on #alarmpicker element, so only received when "this" used here is #alarmpicker element
        this.dispatchEvent(new CustomEvent('nextAlarm-changed', { detail: { nextAlarm: this.nextAlarm } }));
    }

    _toggleAlarmEnabled(event: Event) {
        // const alarm = Object.assign({}, this.alarm);
        this.nextAlarm.enabled = (<HTMLInputElement>event.target).checked;
        // alarm.enabled = (<HTMLInputElement>event.target).checked;
        this.requestUpdate('nextAlarm'); //necessary because lit does not mutate reactive object properties
        this.dispatchEvent(new CustomEvent('nextAlarm-changed', { detail: { nextAlarm: { time: this.nextAlarm.time, enabled: this.nextAlarm.enabled } } }));
        // this.dispatchEvent(new CustomEvent('alarm-changed', { detail: { alarm: { time: alarm.time, enabled: alarm.enabled } } }));
    }

    _openSchedule() {
        this.dispatchEvent(new CustomEvent('schedule-button-clicked'));
    }

    // get value() {
    //     console.log('*** get value on alarm-picker; returning nextalarm');
    //     return this.nextAlarm;
    // }
}
