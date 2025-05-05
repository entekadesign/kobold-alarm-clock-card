// HA types
import type { LovelaceCardConfig } from "custom-card-helpers";

export interface CardConfig extends LovelaceCardConfig {
    type: string;
    name?: string;
    alarm_entities: Array<string>;
    alarm_actions?: Array<Record<'entity' | 'when', string>>;
    ping_entity?: string;
    alarm_entity_local?: string;
    cards?: Array<Record<string, string>>;
    debug?: boolean;
}

export interface TimeObject {
    enabled: boolean;
    time: string;
}

export interface NextAlarmObject extends TimeObject {
    date: string;
    dateTime: string;
    snooze?: boolean;
    nap?: boolean;
    overridden?: boolean;
}