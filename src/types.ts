// HA types
import type { LovelaceCardConfig } from "custom-card-helpers";
import { LitElement } from "lit";

export interface TimeObject {
    enabled: boolean;
    time: string;
}

export interface NextAlarmObject extends TimeObject {
    date: string;
    date_time: string;
    snooze?: boolean;
    // nap?: boolean;
    overridden?: boolean;
}

export interface Duration { hours: number; minutes: number; seconds: number; }

export interface CardConfig extends LovelaceCardConfig {
    type: string;
    name: string;
    alarm_entities?: Array<string>;
    // alarm_actions?: Array<Record<'entity' | 'when', string>>;
    alarm_actions?: Array<AlarmActionsObject>;
    alarms_enabled: boolean;
    next_alarm: NextAlarmObject;
    mo: TimeObject;
    tu: TimeObject;
    we: TimeObject;
    th: TimeObject;
    fr: TimeObject;
    sa: TimeObject;
    su: TimeObject;
    snooze_duration_default: Duration;
    alarm_duration_default: Duration;
    nap_duration: Duration;
    time_format: string;
    // dark_mode: boolean;
    clock_display_font: number;
    hide_cards_default: boolean;
    cards?: Array<LovelaceCardConfig>;
    debug: boolean;
}

export interface NextAlarmConfig {
    next_alarm: NextAlarmObject;
    nap_duration: Duration;
}

export interface AlarmActionsObject {
    entity: string;
    when: string;
    offset: Duration;
    negative: boolean;
}

export interface KoboldEditor extends LitElement {
    alarmController: any;
}

// export interface RingerEntity {
//     enabled: boolean;
//     entity_id: string;
// }