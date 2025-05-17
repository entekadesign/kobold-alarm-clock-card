import { AlarmConfiguration } from './alarm-controller';

import { LitElement, html, css } from 'lit';
import { property, state, customElement, query } from "lit/decorators.js";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import type { TimeObject } from './types';

@customElement('alarm-picker')
class AlarmPicker extends LitElement {

    private _injectStylesDone: boolean;

    @state() private _displayedValueH: string;
    @state() private _displayedValueM: string;

    @property({ reflect: false }) alarmConfiguration: AlarmConfiguration;
    @property({ reflect: false }) alarm: TimeObject;
    @property({ reflect: false }) time: string;
    @property({ reflect: false }) disabled: boolean;
    // @property({ reflect: false }) showToggleButton: boolean;

    @query('div#alarmPicker.alarm ha-switch') _alarmPickerSwitchQ;
    @query('div#alarmPicker.alarm ha-textfield#alarmTimeInput', true) _alarmTimeInputQ;
    @query('ha-icon.button') _iconButtonQ;
    @query('#alarmPicker', true) _alarmPickerQ;

    render() {
        // let _alarmTimeInputClasses = '';
        // let _alarmEnabledToggleClasses = '';
        // if (this.id === 'alarmpicker') {
        //     // _alarmEnabledToggleClasses = _alarmTimeInputClasses = 'picker';
        //     _alarmTimeInputClasses += this.alarmConfiguration.nextAlarm.overridden ? ' overridden' : '';
        // }
        // if (this.showToggleButton === 'false') {
        //     _alarmEnabledToggleClasses += ' hidden';
        // }

        return html`
            <div class="alarm" id="alarmPicker">
                ${this.getAttribute('show-icon') ? html`
                    <ha-icon icon=${this._getAlarmPickerIcon(this.alarm)} @click=${this.openSchedule} class="button"></ha-icon>
                ` : ''}

                <slot></slot>
                <div class=${this.id === 'alarmpicker' ? 'sliders picker' : 'sliders'}>
                    <ha-slider
                        id="hoursSlider"
                        labeled
                        min=${this.id === 'napTimePicker' || this.id === 'snoozeDurationPicker' || this.id === 'alarmDurationPicker' ? 0 : 1}
                        max=${this.id === 'napTimePicker' || this.id === 'snoozeDurationPicker' || this.id === 'alarmDurationPicker' ? 23 : 24}
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
                <div class=${this.id === 'snoozeDurationPicker' || this.id === 'alarmDurationPicker' ? 'row-options settings-picker' : 'row-options'}
                >
                    <ha-textfield
                        id="alarmTimeInput"
                        pattern="([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]( AM| PM|)"
                        maxlength="8"
                        ?disabled=${this.disabled}
                        .value=${!this.alarm ? '' : dayjs(this.alarm.time, 'HH:mm').format(this._alarmTimeFormat())}
                        ?overridden=${this.id === 'alarmpicker' && this.alarmConfiguration.nextAlarm.overridden}
                        @click=${this._clickHandler}
                        readonly
                        >
                    </ha-textfield>
                </div>

                <ha-switch id="alarmEnabledToggleButton" ?checked=${!this.alarm ? false : this.alarm.enabled} @change=${this.toggleAlarmEnabled} ?disabled=${this.disabled} class></ha-switch>

            </div>
        `;
    }

    static styles = css`
        @media (max-width: 600px), (max-height: 600px) {
            div#alarmPicker.alarm {
                height: 2rem;
            }
        }

        .alarm {
            display:inline-flex;
            justify-content: space-between;
            align-items: center;
            height: 4rem;
        }

        div#alarmPicker.alarm.open {
            height: 10rem;
        }

        div#alarmPicker .row-options.settings-picker {
            width: 22em;
            text-align: left;
            transition: width 120ms;
        }

        div#alarmPicker.alarm.open .row-options.settings-picker {
            width: 7rem;
        }

        #alarmTimeInput {
            width: 5.1em;
            margin: 0 1em;
        }

        /*#alarmTimeInput.picker {
            filter: invert(1);
            margin: 0 0.5em;
        }*/
        :host([id="alarmpicker"]) #alarmTimeInput {
            filter: invert(1);
            margin: 0 0.5em;
        }

        /*#alarmTimeInput.picker.overridden {
            border: 1px dotted black;
            padding: 1px;
        }*/
        #alarmTimeInput[overridden] {
            border: 1px dotted black;
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
        }
        :host([id="alarmpicker"]) .alarm > .sliders {
            padding-top: 6rem; backdrop-filter: blur(10px);
        }

        @keyframes delay-overflow {
            from { overflow: hidden; }
        }

        .button {
            cursor: pointer;
        }

        :host([id="alarmpicker"]) #alarmEnabledToggleButton {
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
            let allStyle = '.mdc-text-field--filled { padding: 0 !important; } .mdc-text-field__input { font-size: inherit !important; }';
            let pickerStyle = '';
            let pickerOrOptionsDialogStyle = '';
            let myStyle: HTMLElement;
            if (this.id == 'alarmpicker') {
                pickerStyle = ' .mdc-text-field__input { color: #969696 !important; } .mdc-line-ripple::before, .mdc-line-ripple::after { border-bottom-width: 0 !important; } .mdc-text-field--filled { height: 2em !important; background-color: white !important; }';
                myStyle = document.createElement('style');
                // const switchHost = this.shadowRoot.querySelector('div#alarmPicker.alarm').querySelector('ha-switch');
                let switchStyle = 'div.mdc-switch__thumb { box-shadow: 0 0 15px 2px; }';
                myStyle.innerHTML = switchStyle;
                // switchHost.shadowRoot.appendChild(myStyle);
                this._alarmPickerSwitchQ.shadowRoot.appendChild(myStyle);
                myStyle = document.createElement('style');
                // const iconHost = this.shadowRoot.querySelector('ha-icon.button');
                let iconStyle = 'ha-svg-icon { height: calc(1.5rem + 1vh); width: calc(1.5rem + 1vh); }';
                myStyle.innerHTML = iconStyle;
                // iconHost.shadowRoot.appendChild(myStyle);
                this._iconButtonQ.shadowRoot.appendChild(myStyle);
            }
            if ((this.parentElement.parentElement.id === 'alarm-picker-dialog-content') || (this.parentElement.parentElement.parentElement.parentElement.id === 'settingsDialog')) {
                pickerOrOptionsDialogStyle = ' .mdc-text-field--filled { height: 2em !important; }';
            }
            // const textfieldHost = this.shadowRoot.querySelector('div#alarmPicker.alarm').querySelector('ha-textfield#alarmTimeInput');
            myStyle = document.createElement('style');
            myStyle.innerHTML = allStyle + pickerStyle + pickerOrOptionsDialogStyle;
            // textfieldHost.shadowRoot.appendChild(myStyle);
            this._alarmTimeInputQ.shadowRoot.appendChild(myStyle);
        }
    }

    _clickHandler() {
        // const myTarget = this.shadowRoot.querySelector('#alarmPicker');
        let timeArray: Array<string>;
        if (this.id === 'alarmpicker') {
            // if (!myTarget.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
            if (!this._alarmPickerQ.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
            const isEnabled = this.alarm.enabled;
            const isOverridden = this.alarmConfiguration.nextAlarm.overridden;
            if (isEnabled && !isOverridden || !isEnabled && !isOverridden) {
                // set sliders to current time
                timeArray = dayjs(this.time, 'h:mm A').format('HH:mm').split(':');
            } else {
                // set sliders to nextAlarm time
                timeArray = this.alarm.time.split(':');
            }
        } else {
            // set sliders to nextAlarm time
            timeArray = this.alarm.time.split(':');
        }
        this._displayedValueH = timeArray[0];
        this._displayedValueM = timeArray[1];
        // myTarget.classList.add('open');
        this._alarmPickerQ.classList.add('open');
        document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
        document.addEventListener('click', (e) => { this._clickOutsideAlarmTimeInput(e) }, false);
    };

    _clickOutsideAlarmTimeInput(event) {
        // const myTarget = this.shadowRoot.querySelector('#alarmPicker');
        // if (typeof event.composedPath === 'function' && !event.composedPath().includes(myTarget)) {
        if (typeof event.composedPath === 'function' && !event.composedPath().includes(this._alarmPickerQ)) {
            // if (this.id === 'alarmpicker' && myTarget.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
            if (this.id === 'alarmpicker' && this._alarmPickerQ.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
            this._alarmPickerQ.classList.remove('open');
            document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
        }
    }

    _alarmTimeFormat() {
        return (this.alarmConfiguration['timeFormat'] === '24hr' || this.id === 'napTimePicker' || this.id === 'snoozeDurationPicker' || this.id === 'alarmDurationPicker') ? 'HH:mm' : 'h:mm A';
    }

    _updateValue(e) {
        const value = (e.target).value;  //Number((e.target).value);
        e.target.id === 'hoursSlider' ? this._displayedValueH = value : this._displayedValueM = value;
        this._onTimeChanged(this._displayedValueH + ':' + this._displayedValueM);
    }

    _getAlarmPickerIcon(alarm) {
        if (!alarm.enabled) {
            return 'mdi:alarm-off';
        } else if (alarm.snooze) {
            return 'mdi:alarm-snooze';
        }
        return 'mdi:alarm';
    }

    _onTimeChanged(timeStr) {
        this.alarm.time = dayjs(timeStr, 'HH:mm').format('HH:mm');
        this.alarm.enabled = true;
        // listener for this event is on #alarmpicker element, so only received when "this" used here is #alarmpicker element
        this.dispatchEvent(new CustomEvent('alarm-changed', { detail: { alarm: this.alarm } }));
    }

    toggleAlarmEnabled(event) {
        this.alarm.enabled = event.target.checked;
        this.requestUpdate('alarm'); //necessary because lit does not mutate reactive object properties
        this.dispatchEvent(new CustomEvent('alarm-changed', { detail: { alarm: { time: this.alarm.time, enabled: this.alarm.enabled } } }));
    }

    openSchedule() {
        this.dispatchEvent(new CustomEvent('alarm-button-clicked'));
    }

    get value() {
        return this.alarm;
    }
}

// customElements.define('alarm-picker', AlarmPicker);
