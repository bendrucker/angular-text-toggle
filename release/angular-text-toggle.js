!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.angularTextToggle=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var directives = require('./directives');

module.exports = (typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null).module('text-toggle', [])
  .directive('textToggle', directives.control)
  .directive('toggleAction', directives.action)
  .directive('toggleConfirmation', directives.confirmation)
  .name;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./directives":2}],2:[function(require,module,exports){
(function (global){
'use strict';

var angular = (typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null);

exports.control = function () {
  return {
    require: 'textToggle',
    restrict: 'AE',
    transclude: true,
    template: '<ng-transclude></ng-transclude>',
    controller: Controller,
    scope: {
      toggle: '='
    },
    link: function ($scope, element, $attributes, toggle) {
      $scope.$watch('toggle', function (value) {
        if (value) {
          toggle.action.css('display', 'none');
          toggle.confirmation.css('display', '');
        }
        else {
          toggle.action.css('display', '');
          toggle.confirmation.css('display', 'none');
        }
      });
    }
  };
};

function Controller ($scope) {
  function set (value) {
    $scope.$apply(function () {
      $scope.toggle = value;
    });
  }
  this.on = angular.bind(null, set, true);
  this.off = angular.bind(null, set, false);
}
Controller.$inject = ['$scope', '$attrs'];

exports.action = function () {
  return {
    require: '^textToggle',
    restrict: 'AE',
    compile: function (element) {
      element.contents().wrap('<a></a>');
      return function ($scope, element, $attributes, toggle) {
        toggle.action = element;
        element.on('click', function () {
          toggle.on();
        });
      };
    } 
  };
};

exports.confirmation = function () {
  return {
    require: '^textToggle',
    restrict: 'AE',
    compile: function (element) {
      element
        .css('display', 'none')
        .contents()
        .wrap('<span></span>')
        .parent()
        .append('&nbsp;');
      return function ($scope, element, $attributes, toggle) {
        toggle.confirmation = element;
        var undo = angular.element('<undo><a>' + ($attributes.undo || 'Undo') + '</a></undo>');
        element.append(undo);
        undo.on('click', function () {
          toggle.off();
        });
      };
    }
  };
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});