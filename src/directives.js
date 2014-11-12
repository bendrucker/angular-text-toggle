'use strict';

var angular = require('angular');

exports.control = function () {
  return {
    require: 'textToggle',
    restrict: 'AE',
    controller: Controller,
    link: function ($scope, element, $attributes, toggle) {
      $scope.$watch($attributes.toggle, function (value) {
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

function Controller ($scope, $attributes) {
  function set (value) {
    $scope.$apply(function () {
      $scope[$attributes.toggle] = value;
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
      element.contents().wrap('<a></a>')
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
