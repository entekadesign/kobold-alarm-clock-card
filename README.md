<br><br>
<div align="center">
    <img src="./assets/kobold-logo.svg" alt="Kobolt Logo" width="50%" align="center" />
</div>
<br><br>

# Kobold: A multi-alarm clock for Home Assistant

Install the Kobold custom card on your Home Assistant (HA) instance to turn almost any device running HA Companion or a web browser into a customizable alarm clock.

## Features:

- **Multi-alarm clock**
    - Set a schedule of alarm times, one for each day of the week
    - Set a new alarm at any time, temporarily overriding scheduled alarm
    - Set unscheduled alarm *X* minutes in future using nap dialog
    - Set alarm times easily using sliders in a dialog or directly on main view
- **Integration with HA**
    - Set one or more HA entities to be triggered by alarm
    - Set one or more additional HA entities to activate *X* minutes before or after alarm
    - Add other HA cards to be displayed or hidden with a tap
- **Customize appearance and function**
    - Set 12-hour or 24-hour time display format
    - Set time display font to system or any of three presets
    - Set default durations of snooze and undismissed alarm
- **Optional enhanced reliability**
    - Set HA entities to ping connection and to sound a device-hosted alarm

<br>

|||
| :---: | :---: |
| <figure><img src="./assets/main-view.jpg" alt="Main view, 24-hour" width="100%" align="" /><figcaption>**Main view: 24-hour format**</figcaption></figure> | <figure><img src="./assets/main-editing.jpg" alt="Main view, alternative font" width="100%" align="" /><figcaption>**Main view: 12-hour format, editing next alarm**</figcaption></figure> |
|||
| <figure><img src="./assets/settings.jpg" alt="Settings dialog" width="100%" align="" /><figcaption>**Settings dialog**</figcaption></figure> | <figure><img src="./assets/nap.jpg" alt="Nap dialog" width="100%" align="" /><figcaption>**Nap dialog**</figcaption></figure> |
|||
| <figure><img src="./assets/schedule.jpg" alt="Alarm schedule dialog" width="100%" align="" /><figcaption>**Alarm schedule dialog: editing alarm**</figcaption></figure> | <figure><img src="./assets/show-cards.jpg" alt="Main view, showing cards" width="100%" align="" /><figcaption>**Main view: showing added HA cards, alternate font**</figcaption></figure> |
|||

<br>

## Prerequisites:

1. [Home Assistant](https://www.home-assistant.io/installation/)
2. [*Input boolean helper* integration](https://www.home-assistant.io/integrations/input_boolean/)
3. [*HACS* integration](https://www.hacs.xyz/docs/use/download/prerequisites/)
4. [*Variables+History* integration](https://github.com/enkama/hass-variables)

## Installation:

```yaml
type: custom:kobold-alarm-clock
```

## Configuration:


## Development:

If you notice an error or have a feature suggestion that would benefit many users, [send me a note](mailto:marco@entekadesign.com) or [open a pull request](https://codeberg.org/entekadesign/kobold-alarm-clock/pulls).

If you want to build your own card but you're not sure how to start, [check out this tutorial](https://github.com/home-assistant-tutorials).

<br>

---

Kobold is adapted from Ronald Dehuysser's [Lovelace Alarm Clock Card](https://github.com/rdehuyss/homeassistant-lovelace-alarm-clock-card).