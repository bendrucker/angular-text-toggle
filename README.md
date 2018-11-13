angular-text-toggle [![Build Status](https://travis-ci.org/bendrucker/angular-text-toggle.svg?branch=v1.0.2)](https://travis-ci.org/bendrucker/angular-text-toggle) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/angular-text-toggle.svg)](https://greenkeeper.io/)
===================

A simple boolean text control with undo support. [Try it!](http://embed.plnkr.co/OtDkEj/preview)

## Installing

```bash
# npm
$ npm install angular-text-toggle
# bower
$ bower install angular-text-toggle
```

## Setup

```js
// node module exports the string 'text-toggle' for convenience
angular.module('myApp', [
  require('angular-text-toggle')
]);
// otherwise, include the code first then the module name
angular.module('myApp', [
  'angular-text-toggle'
]);
```

## API

text-toggle provides 3 directives for composing toggle controls.

##### `textToggle`

Set the attribute `toggle` to the property that will be toggled by the control.

<hr>

##### `toggleAction`

The contents of the `<toggle-action>` tag will be initial, clickable state of the control.

<hr>

##### `toggleConfirmation`

The contents of the `<toggle-confirmation>` tag will be displayed when the toggle value is `true`. Set the `undo` attribute to a string to change the undo text (defaults to "Undo").

## Examples

##### Normal

<text-toggle toggle="condition">
  <toggle-action>Switch me on</toggle-action>
  <toggle-confirmation>I am on</toggle-confirmation>
</text-toggle>

##### Custom Undo

<text-toggle toggle="toggled">
  <toggle-action>Switch me on</toggle-action>
  <toggle-confirmation undo="Turn me back off!">I am on</toggle-confirmation>
</text-toggle>
