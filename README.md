<br><br>
<div align="center">
    <img src="./assets/kobold-logo.svg" alt="Kobolt Logo" width="50%" align="center" />
</div>
<br><br>

# Kobold: A feature-rich alarm clock for Home Assistant

Turn almost any device running Home Assistant Companion or a web browser into a multi-alarm clock by installing the Kobold custom card on your Home Assistant (HA) instance.

## Features:

- Set a schedule of alarm times, one for each day of the week
- Set one or more HA entities to be triggered by alarm
- Set one or more additional HA entities to activate X minutes before or after alarm
- Add other HA cards to be displayed or hidden when screen tapped
- Set an unscheduled alarm time easily while scheduled alarm remains enabled
- Set 12-hour or 24-hour time display format
- Set time display font to system or any of three presets
- Set duration of snooze before alarm becomes active again
- Set duration of triggered alarm before it becomes inactive
- Improve reliability by setting HA entities for ping and locally-hosted alarm

```yaml
type: custom:kobold-alarm-clock
```

Kobold is adapted from Ronald Dehuysser's [Lovelace Alarm Clock Card](https://github.com/rdehuyss/homeassistant-lovelace-alarm-clock-card).