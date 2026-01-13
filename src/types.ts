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
    overridden?: boolean;
    holiday?: boolean;
}

export interface Duration { hours: number; minutes: number; seconds: number; }

export interface CardConfig extends LovelaceCardConfig {
    type: string;
    name: string;
    alarm_entities?: Array<string>;
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

export type TranslationKey =
    | 'config.settings'
    | 'config.nap'
    | 'config.schedule'
    | 'config.alarm_entities'
    | 'config.period_icon'
    | 'config.clock_display_font'
    | 'config.snooze_duration_default'
    | 'config.alarm_duration_default'
    | 'config.alarm_actions'
    | 'config.cards'
    | 'config.debug'
    | 'config.nap_duration'
    | 'config.alarms_enabled'
    | 'config.selector.alarm_actions.alarm_action_entity'
    | 'config.selector.alarm_actions.activate_action'
    | 'config.selector.alarm_actions.offset_duration'
    | 'config.selector.alarm_actions.offset_negative'
    | 'config.selector.alarm_actions.selector.activate_action.options.on_snooze'
    | 'config.selector.alarm_actions.selector.activate_action.options.on_dismiss'
    | 'config.selector.alarm_actions.selector.activate_action.options.offset'
    | 'config.selector.cards.card_entity'
    | 'notification.successfully_saved'
    | 'notification.configuration_updated'
    | 'notification.connection_lost'
    | 'error.config_incorrect'
    | 'error.no_alarm_entities'
    | 'error.saving_failed';
