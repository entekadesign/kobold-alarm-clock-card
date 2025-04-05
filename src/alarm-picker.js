import { LitElement, html, css } from 'lit';
// import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.2.1/index.js/+esm';
import dayjs from 'dayjs';
// import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/dayjs.min.js/+esm';
import customParseFormat from 'dayjs/plugin/customParseFormat';
// import customParseFormat from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/plugin/customParseFormat.js/+esm';
dayjs.extend(customParseFormat);

class AlarmPicker extends LitElement {

    static properties = {
        showIcon: { type: Boolean, attribute: 'show-icon' },
        showToggleButton: { type: String, attribute: 'show-toggle-button' }, //why: https://lit.dev/docs/components/properties/#boolean-attributes
        disabled: { type: Boolean },
        alarm: {},
        alarmConfiguration: {},
        _alarmEnabledToggleStyles: { type: Object, state: true },
        _displayedValueH: { type: Number, state: true },
        _displayedValueM: { type: Number, state: true },
    }

    render() {
        let _alarmTimeInputClasses = '';
        let _alarmEnabledToggleClasses = '';
        if (this.id === 'alarmpicker') {
            _alarmEnabledToggleClasses = _alarmTimeInputClasses = 'picker';
            _alarmTimeInputClasses += this.alarmConfiguration.nextAlarm.overridden ? ' overridden' : '';
        }
        if (this.showToggleButton === 'false') {
            _alarmEnabledToggleClasses += ' hidden';
        }

        return html`
            <div class="alarm" id="alarmPicker">
                ${this.showIcon ? html`
                    <ha-icon icon=${this._getAlarmPickerIcon(this.alarm)} @click=${this.openSchedule} class="button"></ha-icon>
                ` : '' }

                <slot></slot>
                <div class=${this.id === 'alarmpicker' ? 'sliders picker' : 'sliders'}
                >
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
                        class=${_alarmTimeInputClasses}
                        @click=${this._clickHandler}
                        readonly
                        >
                    </ha-textfield>
                </div>

                <ha-switch id="alarmEnabledToggleButton" ?checked=${!this.alarm ? false : this.alarm.enabled} @change=${this.toggleAlarmEnabled} ?disabled=${this.disabled} class=${_alarmEnabledToggleClasses}></ha-switch>

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

        #alarmTimeInput.picker {
            filter: invert(1);
            margin: 0 0.5em;
        }

        #alarmTimeInput.picker.overridden {
            border: 1px dotted black;
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

        .alarm > .sliders.picker {
            padding-top: 6rem; backdrop-filter: blur(10px);
        }

        @keyframes delay-overflow {
            from { overflow: hidden; }
        }

        .button {
            cursor: pointer;
        }

        #alarmEnabledToggleButton.picker {
            filter: invert(1);
            scale: 1.25;
            margin: 0 0.5rem;
        }

        #alarmEnabledToggleButton.hidden {
            display: none;
        }
    `;

    updated() {
        if (!this.injectStylesDone) {
            this.injectStylesDone = true;
            // inject style into mdc text field, switch, icon
            let allStyle = '.mdc-text-field--filled { padding: 0 !important; } .mdc-text-field__input { font-size: inherit !important; }';
            let pickerStyle = '';
            let pickerOrOptionsDialogStyle = '';
            let myStyle = '';
            if (this.id == 'alarmpicker') {
                pickerStyle = ' .mdc-text-field__input { color: #969696 !important; } .mdc-line-ripple::before, .mdc-line-ripple::after { border-bottom-width: 0 !important; } .mdc-text-field--filled { height: 2em !important; }';
                myStyle = document.createElement( 'style' );
                const switchHost = this.renderRoot.querySelector('div#alarmPicker.alarm').querySelector('ha-switch');
                let switchStyle = 'div.mdc-switch__thumb { box-shadow: 0 0 15px 2px; }';
                myStyle.innerHTML = switchStyle;
                switchHost.renderRoot.appendChild( myStyle );
                myStyle = document.createElement( 'style' );
                const iconHost = this.renderRoot.querySelector('ha-icon.button');
                let iconStyle = 'ha-svg-icon { height: calc(1.5rem + 1vh); width: calc(1.5rem + 1vh); }';
                myStyle.innerHTML = iconStyle;
                iconHost.renderRoot.appendChild( myStyle );
            }
            if (this.parentNode.parentNode.id === 'alarm-picker-dialog-content' || this.parentNode.parentNode.parentNode.parentNode.id === 'alarmSettingsDialog') {
                pickerOrOptionsDialogStyle = ' .mdc-text-field--filled { height: 2em !important; }';
            }
            const textfieldHost = this.renderRoot.querySelector('div#alarmPicker.alarm').querySelector('ha-textfield#alarmTimeInput');
            myStyle = document.createElement( 'style' );
            myStyle.innerHTML = allStyle + pickerStyle + pickerOrOptionsDialogStyle;
            textfieldHost.shadowRoot.appendChild( myStyle );
        }
    }

    _clickHandler() {
        const [timeHr, timeMn] = this.alarm.time.split(':');
        this._displayedValueH = timeHr;
        this._displayedValueM = timeMn;
        const myTarget = this.renderRoot.querySelector('#alarmPicker');
                if (this.id === 'alarmpicker' && !myTarget.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
        myTarget.classList.add('open');
        document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
        document.addEventListener('click', (e) => { this._clickOutsideAlarmTimeInput(e) }, false);
    };

    _clickOutsideAlarmTimeInput(event) {
        const myTarget = this.renderRoot.querySelector('#alarmPicker');
        if (typeof event.composedPath === 'function' &&  !event.composedPath().includes(myTarget)) {
                        if (this.id === 'alarmpicker' && myTarget.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
            myTarget.classList.remove('open');
            document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
        }
    }

    _alarmTimeFormat() {
        return (this.alarmConfiguration['timeFormat'] === '24hr' || this.id === 'napTimePicker' || this.id === 'snoozeDurationPicker' || this.id === 'alarmDurationPicker') ? 'HH:mm' : 'h:mm A';
    }

    _updateValue(e) {
        const value = Number((e.target).value);
        e.target.id === 'hoursSlider' ? this._displayedValueH = value : this._displayedValueM = value;
        this._onTimeChanged(this._displayedValueH + ':' + this._displayedValueM);
    }

    _getAlarmPickerIcon(alarm) {
        if(!alarm.enabled) {
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
        this.dispatchEvent(new CustomEvent('alarm-changed', {detail: {alarm: this.alarm}}));
    }

    toggleAlarmEnabled(event) {
        this.alarm.enabled = event.target.checked;
        this.requestUpdate('alarm'); //necessary because lit does not mutate reactive object properties
        this.dispatchEvent(new CustomEvent('alarm-changed', {detail: {alarm: {time: this.alarm.time, enabled: this.alarm.enabled}}}));
    }

    openSchedule() {
        this.dispatchEvent(new CustomEvent('alarm-button-clicked'));
    }

    get value() {
        return this.alarm;
    }
}

customElements.define('alarm-picker', AlarmPicker);
