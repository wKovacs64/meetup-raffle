# Change Log

## Version 2.3.0 _(2018-03-15)_

* Polyfilled `Object.entries`
* Replaced `Loading` component with `RingLoader` from
  [`react-spinners`][react-spinners]

## Version 2.2.0 _(2018-02-05)_

* Added a placeholder avatar for winners without a profile image

## Version 2.1.1 _(2018-01-17)_

* Returned control of the count stepper value to `react-stepper-primitive` now
  that it supports reinitialization of the `defaultValue` prop
  ([5307a3ae][5307a3ae])

## Version 2.1.0 _(2018-01-06)_

* Fixed/updated PWA assets and settings

## Version 2.0.0 _(2018-01-05)_

* Migrated project from `next.js` to `create-react-app`:

  Initially, this project started as a quick experiment with [Zeit's][zeit]
  [`next.js`][next.js] framework, their CSS-in-JS implementation
  ([`styled-jsx`][styled-jsx]), and their [`now`][now] platform. As it does not
  benefit much from SSR or some of the other major features of `next.js`, it is
  now based off the [`create-react-app`][cra] generator, uses
  [`emotion`][emotion] CSS, and is deployed as a static site on
  [Netlify][netlify].

## Version 1.4.0 _(2018-01-03)_

* Added preservation of winner count in `LocalStorage`
* Improved error handler to display friendly error message from API
* Darkened global background color
* Refactored code into smaller chunks

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
[zeit]: https://zeit.co/
[next.js]: https://github.com/zeit/next.js/
[styled-jsx]: https://github.com/zeit/styled-jsx
[now]: https://zeit.co/now
[cra]: https://github.com/facebookincubator/create-react-app
[emotion]: https://emotion.sh/
[netlify]: https://www.netlify.com/
[5307a3ae]: https://github.com/wKovacs64/meetup-raffle-web/commit/5307a3ae8b2af1beefc4fef30fd97e7f79e36676
[react-spinners]: https://github.com/davidhu2000/react-spinners
