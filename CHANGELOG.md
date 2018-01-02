# Change Log

## Version 1.3.0 _(2018-01-02)_

* Added GitHub corner

## Version 1.2.0 _(2018-01-02)_

* Removed default Meetup name
* Added preservation of Meetup name in `LocalStorage`

## Version 1.1.3 _(2018-01-02)_

* Added "Deploy to now" button to README
* Added pointer cursor style to advanced options toggle
* Added missing development dependency
* Simplified/reduced deployment related npm scripts

## Version 1.1.2 _(2018-01-01)_

* Fixed core functionality in IE/Edge (ditched `lib-js`)
* Fixed advanced options in IE/Edge/Safari (ditched `<details>` and `<summary>`
  elements)
* Added loading text as the SVG animation doesn't work in IE/Edge

## Version 1.1.1 _(2017-12-31)_

* Fixed a bug that was causing invalid
  [`meetup-raffle-stdlib`][meetup-raffle-stdlib] requests in the scenario where
  a Meetup API key had never been set
* Embedded SVGs to disguise image load times
* Normalized input colors for consistency
* Tweaked winner layout
* Adjusted vertical spacing of various elements

## Version 1.1.0 _(2017-12-30)_

* Added advanced options (Meetup.com API key and specific event ID support)
* Tweaked winner layout

## Version 1.0.0 _(2017-12-29)_

* Initial release

[meetup-raffle-stdlib]: https://github.com/wKovacs64/meetup-raffle-stdlib
