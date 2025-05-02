export interface CardConfig {
    type: string;
    name?: string;
    alarm_entities: Array<Record<string, string>>;
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

// export interface AlarmConfig {
//     alarmsEnabled: boolean;
//     nextAlarm: NextAlarmObject;
//     mo: TimeObject;
//     tu: TimeObject;
//     we: TimeObject;
//     th: TimeObject;
//     fr: TimeObject;
//     sa: TimeObject;
//     su: TimeObject;
//     timeFormat: string;
//     clockFontFace: string;
//     clockDefaultFullscreen: boolean;
//     snoozeDurationDefault: TimeObject;
//     alarmDurationDefault: TimeObject;
//     napDurationDefault: TimeObject;
//     ringerEntities: Array<{ 'enabled': boolean, 'entity_id': string }>;
//     snooze(snoozeTime: TimeObject): void;
//     dismiss(): void;
//     createNextAlarm(alarm: string, forToday?: boolean): NextAlarmObject;
// }