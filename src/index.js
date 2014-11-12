'use strict';

var directives = require('./directives');

angular.module('text-toggle', [])
  .directive('textToggle', directives.control)
  .directive('toggleAction', directives.action)
  .directive('toggleConfirmation', directives.confirmation);

module.exports = 'text-toggle';
