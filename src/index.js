'use strict';

var directives = require('./directives');

module.exports = angular.module('text-toggle', [])
  .directive('textToggle', directives.control)
  .directive('toggleAction', directives.action)
  .directive('toggleConfirmation', directives.confirmation)
  .name;
