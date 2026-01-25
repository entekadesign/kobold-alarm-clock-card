import { LitElement, html, css } from 'lit';
import { property, state, customElement, query, queryAll } from "lit/decorators.js";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import type { CardConfig, NextAlarmObject } from './types';

@customElement('alarm-picker')
class AlarmPicker extends LitElement {

    private _injectStylesDone: boolean;

    @state() private _displayedValueH: string;
    @state() private _displayedValueM: string;

    @property({ attribute: false, reflect: false }) config: CardConfig;
    @property({ attribute: false, reflect: false }) nextAlarm: NextAlarmObject;
    @property({ attribute: false, reflect: false }) time: string;
    @property({ attribute: false, reflect: false }) disabled: boolean;

    @queryAll('div#alarmPicker.alarm ha-slider') _alarmPickerSlidersQ: NodeListOf<HTMLElement>;
    @query('div#alarmPicker.alarm ha-switch') _alarmPickerSwitchQ: HTMLInputElement;
    @query('div#alarmPicker.alarm ha-textfield#alarmTimeInput', true) _alarmTimeInputQ: HTMLInputElement;
    @query('ha-icon.button') _iconButtonQ: HTMLElement;
    @query('#alarmPicker', true) _alarmPickerQ: HTMLElement;

    connectedCallback(): void {
        super.connectedCallback();
        document.addEventListener('click', (event) => { this._clickOutsideAlarmTimeInput(event) });
        // Update component styles after nextAlarm updates, etc
        this._injectStylesDone = undefined;
        this.requestUpdate();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
    }

    updated() {
        if (!this._injectStylesDone) {
            this._injectStylesDone = true;
            // inject style into mdc text field, switch, icon
            let myStyle: HTMLElement;

            if (this._alarmPickerSlidersQ) {
                // fix legacy Safari calc(), other bugs
                const sliderStyle = '#thumb { scale: 1.5; left: -webkit-calc(var(--position) - var(--thumb-width) / 2); } #indicator { right: -webkit-calc(100% - max(var(--start), var(--end))); left: min(var(--start), var(--end)); }';
                this._alarmPickerSlidersQ.forEach((slidersHost) => {
                    myStyle = document.createElement('style');
                    myStyle.innerHTML = sliderStyle;
                    slidersHost.shadowRoot.appendChild(myStyle);
                });
            }

            if (this._alarmPickerSwitchQ.shadowRoot) {
                myStyle = document.createElement('style');
                let switchStyle = '';
                if (!this.classList.contains('narrow')) {
                    switchStyle += 'div.mdc-switch { scale: 1.25; } ';
                }
                if (this.classList.contains('dark')) {
                    switchStyle += '.mdc-switch.mdc-switch--checked div.mdc-switch__thumb { box-shadow: 0 0 15px 2px; }';
                }
                myStyle.innerHTML = switchStyle;
                this._alarmPickerSwitchQ.shadowRoot.appendChild(myStyle);
            }

            if (this._iconButtonQ.shadowRoot) {
                myStyle = document.createElement('style');
                const iconStyle = 'ha-svg-icon { height: calc(1.5rem + 1vh); height: calc(1.25rem + 0.5cqw); width: calc(1.5rem + 1vh); width: calc(1.25rem + 0.5cqw); }';
                myStyle.innerHTML = iconStyle;
                this._iconButtonQ.shadowRoot.appendChild(myStyle);
            }

            if (this._alarmTimeInputQ.shadowRoot) {
                myStyle = document.createElement('style');
                const pickerStyle = ' .mdc-text-field__input { color: #696969 !important; font-size: inherit !important; text-align: center; } .mdc-line-ripple::before, .mdc-line-ripple::after { border-bottom-width: 0 !important; } .mdc-text-field--filled { height: 1.75em !important; background-color: transparent !important; padding: 0 !important; }';
                myStyle.innerHTML = pickerStyle;
                this._alarmTimeInputQ.shadowRoot.appendChild(myStyle);
            }
        }
    }

    _clickHandler() {
        let timeArray: Array<string>;
        if (!this._alarmPickerQ.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
        const isEnabled = this.nextAlarm.enabled;
        const isOverridden = this.config.next_alarm.overridden;
        // if (isEnabled && !isOverridden || !isEnabled && !isOverridden) {
        if (!isOverridden) {
            timeArray = dayjs(this.time, this._alarmTimeFormat()).format('HH:mm').split(':');
        } else {
            // set sliders to nextAlarm time
            timeArray = this.nextAlarm.time.split(':');
        }

        this._displayedValueH = timeArray[0];
        this._displayedValueM = timeArray[1];

        this._alarmPickerQ.classList.add('open');
        // document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
        // document.addEventListener('click', (event) => { this._clickOutsideAlarmTimeInput(event) }); // click event not detected if clicking near clock numerals so animation doesn't run; move these listeners to connectedcallback/disconnectedcallback
    };

    _clickOutsideAlarmTimeInput(event: Event) {
        // event.stopPropagation();
        // console.log('*** clicked; composed path includes alarmpicker: ', event.composedPath().includes(this._alarmPickerQ));
        // console.log('*** clicked; target: ', event.target);
        if (typeof event.composedPath === 'function' && !event.composedPath().includes(this._alarmPickerQ)) {
            // console.log('*** clicked outside slider');
            if (this._alarmPickerQ?.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
            this._alarmPickerQ?.classList.remove('open');
            if (this._displayedValueH !== undefined && this._displayedValueM !== undefined) {
                const sliderTime = this._displayedValueH + ':' + this._displayedValueM + ':00';
                if (sliderTime !== this.nextAlarm.time) {
                    // console.log('*** save slider time: ' + this._displayedValueH + ':' + this._displayedValueM);
                    this._onTimeChanged(this._displayedValueH + ':' + this._displayedValueM);
                }
                // console.log('*** slider time: ' + this._displayedValueH + ':' + this._displayedValueM);
                // console.log('*** nexrtAlarm time: ' + this.nextAlarm.time);
            }
            // document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
        }
    }

    _alarmTimeFormat() {
        return (this.config.time_format === '24hr') ? 'HH:mm' : 'h:mm A';
    }

    _updateValue(event: Event) {
        const value = (<HTMLInputElement>event.target).value;  //Number((e.target).value);
        (<HTMLInputElement>event.target).id === 'hoursSlider' ? this._displayedValueH = value : this._displayedValueM = value;
        // this._onTimeChanged(this._displayedValueH + ':' + this._displayedValueM);
        // if (this._alarmPickerQ.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
        // this._alarmPickerQ.classList.remove('open');
        // document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
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
        this.nextAlarm.enabled = true;
        // listener for this event is on #alarmpicker element, so only received when "this" used here is #alarmpicker element
        this.dispatchEvent(new CustomEvent('nextAlarm-changed', { detail: { nextAlarm: this.nextAlarm } }));
    }

    _toggleAlarmEnabled(event: Event) {
        this.nextAlarm.enabled = (<HTMLInputElement>event.target).checked;
        this.requestUpdate('nextAlarm'); //necessary because lit does not mutate reactive object properties
        // this.dispatchEvent(new CustomEvent('nextAlarm-changed', { detail: { nextAlarm: { time: this.nextAlarm.time, enabled: this.nextAlarm.holiday ? false : this.nextAlarm.enabled } } }));
        this.dispatchEvent(new CustomEvent('nextAlarm-changed', { detail: { nextAlarm: { time: this.nextAlarm.time, enabled: this.nextAlarm.enabled } } }));
    }

    _openSchedule() {
        this.dispatchEvent(new CustomEvent('schedule-button-clicked'));
    }

    render() {

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

                <ha-switch id="alarmEnabledToggleButton" ?holiday=${this.config?.next_alarm.holiday} ?checked=${!this.nextAlarm ? false : this.nextAlarm.enabled} @change=${this._toggleAlarmEnabled} ?disabled=${this.disabled} class></ha-switch>

            </div>
        `;
    }

    static styles = css`
        :host {
            --primary-color: var(--primary-text-color);
            --mdc-theme-primary: var(--primary-text-color);
            --switch-unchecked-button-color: #696969;
            --switch-checked-button-color: var(--primary-text-color);
            --switch-checked-track-color: #696969;
            --md-slider-inactive-track-color: #696969;
            --md-slider-label-text-color: var(--ha-card-background, var(--card-background-color));
            --wa-tooltip-content-color: var(--primary-text-color);
        }

        @media (max-width: 600px), (max-height: 600px) {
            div#alarmPicker.alarm {
                height: 2rem;
            }
        }

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

        #alarmTimeInput {
            width: 5.1em;
            margin: 0 1em;
        }

        #alarmTimeInput {
            margin: 0 0.5em;
        }

        #alarmTimeInput[overridden] {
            border: 2px dotted #696969;
            padding: 1px;
        }

        .alarm.open > .sliders {
            margin-left: 1rem;
            width: 14rem;
            overflow: visible;
            animation: delay-overflow 120ms;
        }

        .alarm > .sliders {
            z-index: 1;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            overflow: hidden;
            transition: width 120ms;
            width: 0;
            padding-top: 6rem;
            backdrop-filter: blur(10px);
        }

        .alarm > .sliders ha-slider:nth-child(1) {
            padding: 0 0.5rem 0 0.5rem;
        }
        .alarm > .sliders ha-slider:nth-child(2) {
            padding: 2rem 0.5rem 1rem 0.5rem;
        }

        @keyframes delay-overflow {
            from { overflow: hidden; }
        }

        .button {
            cursor: pointer;
        }

        #alarmEnabledToggleButton {
            margin: 0 0.5rem;
            height: 1.25em;
            padding-top: 0.6em;
        }
        #alarmEnabledToggleButton[holiday] {
            border: 2px dotted #696969;
            /* padding: 8px; */
            padding: 0.6em 0.6em 0 0.6em;
        }
        /*:host(:not(.narrow)) #alarmEnabledToggleButton {
            scale: 1.25;
        }*/

        :host([hide-toggle-button]) #alarmEnabledToggleButton {
            display: none;
        }
    `;
}
