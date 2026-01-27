<br><br>
<div align="center">
    <img src="https://codeberg.org/entekadesign/kobold-alarm-clock-card/media/branch/main/assets/kobold-logo.svg" alt="Kobold Logo" width="50%" align="center" />
</div>
<br><br>

# Kobold: A multi-alarm clock for Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
[![Home Assistant Community Forum](https://img.shields.io/badge/Home%20Assistant-Community%20Forum-blue?logo=home-assistant)](https://community.home-assistant.io/t/kobold-turn-an-old-device-into-a-multi-alarm-clock)


Install the Kobold custom card on your Home Assistant (HA) instance to turn almost any device running HA Companion or a web browser into a customizable alarm clock.

## Features

- **Multi-alarm clock**
    - Set a schedule of alarm times, one for each day of the week
    - Set a new alarm at any time, temporarily overriding scheduled alarm
    - Set unscheduled alarm *X* minutes in future using **nap dialog**
    - Set alarm times easily using sliders directly on main view or in a dialog
- **Integrate with HA**
    - Set one or more HA entities to be triggered:
        - when alarm rings
        - *X* minutes before or after alarm
        - when dismissing a ringing alarm, or when tapping/clicking snooze button
    - Use [Workday integration](https://www.home-assistant.io/integrations/workday/) to automatically disable scheduled alarms on holidays
    - Add other HA cards to be displayed or hidden with a tap/click
- **Customize appearance and function**
    - Set 12-hour or 24-hour time display format
    - Set time display font to system or any of three presets
    - Set default duration of snooze or undismissed alarm
    - Set HA's language and view Kobold in that language

<br>

|||
| :---: | :---: |
| <figure><img src="https://codeberg.org/entekadesign/kobold-alarm-clock-card/media/branch/main/assets/main-view.jpg" alt="Main view, 24-hour" width="100%" /><figcaption>**Main view: 24-hour format**</figcaption></figure> | <figure><img src="https://codeberg.org/entekadesign/kobold-alarm-clock-card/media/branch/main/assets/main-editing.jpg" alt="Main view, alternative font" width="100%" /><figcaption>**Main view: 12-hour format, editing next alarm**</figcaption></figure> |
|||
| <figure><img src="https://codeberg.org/entekadesign/kobold-alarm-clock-card/media/branch/main/assets/settings.jpg" alt="Settings dialog" width="100%" /><figcaption>**Settings dialog**</figcaption></figure> | <figure><img src="https://codeberg.org/entekadesign/kobold-alarm-clock-card/media/branch/main/assets/nap.jpg" alt="Nap dialog" width="100%" /><figcaption>**Nap dialog**</figcaption></figure> |
|||
| <figure><img src="https://codeberg.org/entekadesign/kobold-alarm-clock-card/media/branch/main/assets/schedule.jpg" alt="Schedule dialog" width="100%" /><figcaption>**Schedule dialog: editing alarm**</figcaption></figure> | <figure><img src="https://codeberg.org/entekadesign/kobold-alarm-clock-card/media/branch/main/assets/show-cards.jpg" alt="Main view, showing cards" width="100%" /><figcaption>**Main view: HA dark mode, added HA cards,<br>alternate font**</figcaption></figure> |
|||

<br>

## Prerequisites

- [Home Assistant](https://www.home-assistant.io/installation/)
- [*Input boolean helper* integration](https://www.home-assistant.io/integrations/input_boolean/)

Note that alarms can only be triggered while Kobold is running in the foreground.

## Installation

Kobold can be installed in any of four ways:

- If you have installed the [Home Assistant Community Store (HACS) integration](https://hacs.xyz/docs/use/), then search for "Kobold Alarm Clock" in HACS and click **Download**.

- Install as an [HACS custom repository](https://hacs.xyz/docs/faq/custom_repositories/) using "Dashboard" as the type and the following URL:

    ```bash
    https://github.com/entekadesign/kobold-alarm-clock-card.git
    ```

- If you have [My Home Assistant](https://my.home-assistant.io) configured and HACS installed, just click below:

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=entekadesign&repository=kobold-alarm-clock-card&category=dashboard)

- Finally, Kobold can be installed manually by copying the [latest release of `kobold-alarm-clock-card.js`](https://codeberg.org/entekadesign/kobold-alarm-clock-card/releases) to the `www` directory inside the `config` directory of your HA instance:

    ```bash
    <config>/www/kobold-alarm-clock-card.js
    ```

Manual installation further requires two configuration steps:

1. Register Kobold on the [resources page of your HA dashboard](https://developers.home-assistant.io/docs/frontend/custom-ui/registering-resources/) by adding the following as a javascript module:

    ```
    /local/kobold-alarm-clock-card.js
    ```

2. Add the following to your dashboard's [lovelace configuration](https://www.home-assistant.io/dashboards/dashboards/#using-yaml-for-the-overview-dashboard):

    ```yaml
    - type: custom:kobold-alarm-clock-card
      alarm_entities:
        - input_boolean.kobold_clock
    ```

## Upgrading from v1.nn
Delete your lovelace configuration except for the minimal configuration shown in manual configuration step 2 above. Kobold should immediately rebuild your configuration, at which point you may restore any settings you choose to preserve. If a setting you want to restore is available in the visual editor of the **settings dialog**, using it can help ensure that the configuration's [YAML](https://www.home-assistant.io/docs/configuration/yaml/) structure remains valid.

## Usage

Set an alarm for each day of the week in the **schedule dialog**. The next alarm time will be displayed at the upper right corner of the main view. A toggle switch indicates whether the next alarm is enabled. To override the scheduled alarm, tap/click on the next alarm display or enter a value in the **nap dialog**. A dotted border around next alarm time indicates that the scheduled alarm is overridden. To clear the override and return to the scheduled alarm, disable the nap duration in the **nap dialog**.

## Localization

If your HA instance's preferred language is German, French, Spanish, or Russian, Kobold should automatically present its main view, menus and messages in that language. Unfortunately, most of the translation was not done by a native speaker, so if you would like to help improve the available translations, or to add a new language, please [send me a note](mailto:marco@entekadesign.com).

## Settings

### Alarm ringer entities

An *input boolean helper* entity should already be configured as one of Kobold's alarm ringer entities, but you can employ it as an [automation trigger](https://www.home-assistant.io/docs/automation/trigger/) to cause other events when an alarm rings, or you can add new alarm ringer entities using the entity selector in the **settings dialog**.

### Workday sensor entity

By installing HA's [Workday integration](https://www.home-assistant.io/integrations/workday/), you make a *workday sensor* entity avaiable, which can be selected using the entity selector in the **settings dialog**. Enable or disable the sensor using the "Disable alarm on non-workdays" toggle switch. A dotted border around the next alarm toggle switch indicates that the scheduled next alarm is disabled because it is not scheduled on a workday; the effect of the workday sensor can be overridden by tapping the next alarm toggle switch on the main view, or enabling a nap duration in the **nap dialog**.

### Alarm actions

You can instruct Kobold to activate an HA integration at times other than when an alarm rings by adding an "Alarm Action" in the **settings dialog**. A pop-up dialog will allow you to select the entity to activate and when activation should occur: when hitting the snooze button, when dismissing a ringing alarm, or at a time before or after a ringing alarm. To choose a time one minute before the alarm rings, for example, enter "1" in the minute field of the "Offset Duration" selector, then enable the "Offset Negative" toggle switch.

Note that alarm actions are not executed for override alarms, only for scheduled alarms.

### Cards display

Display HA cards in an area along lower edge of main view by adding a "Card to Display" in the **settings dialog**. A pop-up dialog provides an entity selector and an area to enter the card's [YAML](https://www.home-assistant.io/docs/configuration/yaml/) configuration, which must include the card's `type`, but which can also include any other settings, such as the usually optional `name`.

To customize the appearance of the cards, install Thomas Lovén's outstanding  [*Card-Mod* integration](https://github.com/thomasloven/lovelace-card-mod). If you have many cards to display in the small space available, Lovén has an integration to help with that, too: [*Auto-Entities*](https://github.com/thomasloven/lovelace-auto-entities).

### Kiosk mode

If you would like to eliminate the HA header and sidebar from the Kobold main view, do the following:

1. On your device, install a kiosk browser, such as [*Kiosk+* for iOS](https://apps.apple.com/us/app/kiosk/id1239509744) or [*Fully-Kiosk Browser* for Android](https://www.fully-kiosk.com) or [*OpenKiosk* for other platforms](https://openkiosk.mozdevgroup.com/download.html).

2. In HA, install Lovén's excellent [*Browser-Mod* integration](https://github.com/thomasloven/hass-browser_mod) and configure it by registering the browser you installed and adjusting the settings for header and sidebar. You can also configure *Browser_Mod* to automatically switch to the Kobold dashboard when the browser logs into HA.

### Browser audio

Another feature of *Browser_Mod* is its ability to allow a browser to serve as a media player. Configuring HA to use your browser to sound alarms requires two elements: (1) an [HA *script*](https://www.home-assistant.io/integrations/script/) and (2) an [HA *template switch helper*](https://www.home-assistant.io/integrations/switch.template/).

1. Create a script (HA -> Settings -> Automations -> Scripts). Choose an action whose target is your browser; for example, "Media player: Play media," with content ID "https://fm939.wnyc.org/wnycfm" and media type "music".

2. Create a template switch (HA -> Settings -> Devices -> Helpers) whose turn-on action is "Script: Turn on" targeting your script, and whose turn-off action is "Media Player: Turn off" targeting your browser's media player.

Now, configure Kobold by adding the switch as an alarm ringer entity in the **settings dialog**.

If you want an alarm ringer entity to play an audio file [hosted by the HA server](https://www.home-assistant.io/more-info/local-media/setup-media/):

1. Create a script whose [YAML configuration](https://www.home-assistant.io/integrations/script/#configuration) is similar to the following, replacing `media_player.my_browser` with the entity ID of your browser's media player, and `alarm_sound.mp3` with the filename of your alarm sound:

    ```yaml
    alias: Ring Alarm Bell
    sequence:
      - repeat:
          until:
            - condition: state
              entity_id: media_player.my_browser
              state: "off"
          sequence:
            - target:
                entity_id: media_player.my_browser
              data:
                media_content_id: media-source://media_source/local/alarm_sound.mp3
                media_content_type: music
              metadata: {}
              action: media_player.play_media
            - wait_template: "{{ is_state( \"media_player.my_browser\", \"idle\") }}"
              enabled: true
    icon: mdi:cast-audio
    mode: single
    description: ""
    ```

2. Create a switch in the same way as above, this time associating it with the script just created, and add the switch as an alarm ringer entity in the **settings dialog**.

### Debug

Some debugging information can be logged in the HA system log by enabling "Debug Mode" in the **settings dialog**.

## Development

If you notice an error, [open an issue](https://codeberg.org/entekadesign/kobold-alarm-clock-card/issues). If you have a feature suggestion that would benefit many users, [send me a note](mailto:marco@entekadesign.com) or [open a pull request](https://codeberg.org/entekadesign/kobold-alarm-clock-card/pulls).

The best place for discussion about this card is the [Home Assistant Community Forum](https://community.home-assistant.io/t/kobold-turn-an-old-device-into-a-multi-alarm-clock/).

If you want to build your own card but you're not sure how to start, [check out this tutorial](https://github.com/home-assistant-tutorials).

---

Kobold is adapted from Ronald Dehuysser's [Lovelace Alarm Clock Card](https://github.com/rdehuyss/homeassistant-lovelace-alarm-clock-card).