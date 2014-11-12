'use strict';

describe('text-toggle', function () {

  var $compile, scope;
  beforeEach(angular.mock.module(require('../')));
  beforeEach(angular.mock.inject(function ($injector) {
    $compile = $injector.get('$compile');
    scope    = $injector.get('$rootScope').$new();
  }));

  var normal = require('./normal.html');
  var customUndo = require('./custom-undo.html');

  it('displays the action text when the condition is off', function () {
    scope.condition = false;
    var element = $compile(normal)(scope);
    expect(element.find('toggle-action').css('display')).to.be.empty;
  });

  it('hides the confirmation text when the condition is off', function () {
    scope.condition = false;
    var element = $compile(normal)(scope);
    expect(element.find('toggle-confirmation').css('display')).to.equal('none');
  });

  it('hides the action text when the condition is on', function () {
    scope.condition = true;
    var element = $compile(normal)(scope);
    scope.$digest();
    expect(element.find('toggle-action').css('display')).to.equal('none');
  });

  it('shows the confirmation text when the condition is on', function () {
    scope.condition = true;
    var element = $compile(normal)(scope);
    scope.$digest();
    expect(element.find('toggle-confirmation').css('display')).to.be.empty;
  });

  it('can be turned on via the action', function () {
    scope.condition = false;
    var element = $compile(normal)(scope);
    element.find('toggle-action').triggerHandler('click');
    scope.$digest();
    expect(scope.condition).to.be.true;  
  });

  it('can be turned off via an undo', function () {
    scope.condition = true;
    var element = $compile(normal)(scope);
    scope.$digest();
    element.find('toggle-confirmation').find('undo').triggerHandler('click');
    scope.$digest();
    expect(scope.condition).to.be.false;  
  });

  it('can use custom undo text', function () {
    scope.condition = true;
    var element = $compile(customUndo)(scope);
    scope.$digest();
    expect(element.find('toggle-confirmation').find('undo').text())
      .to.equal('REVERSE!');
  });

});
