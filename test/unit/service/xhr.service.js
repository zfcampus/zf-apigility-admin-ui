/*global describe, it, expect, should, inject, before, beforeEach, after, afterEach */
'use strict';

describe('XHR Service', function () {
  var httpBackend;

  beforeEach(function() {
    module('apigility.service');
    module(function($provide) {
      $provide.value('agApiPath', 'http://localhost:8181/api');
    });
    inject(function ($httpBackend) {
      httpBackend = $httpBackend;
    });
  });

  it('should be an available service', inject(function($injector) {
    $injector.has('xhr');
  }));

  it('should contain an http function', inject(function(xhr) {
    expect(xhr.http).toBeDefined();
    expect(typeof xhr.http === 'function').toBe(true);
  }));

  it('should contain a get method', inject(function(xhr) {
    expect(xhr.get).toBeDefined();
    expect(typeof xhr.get === 'function').toBe(true);
  }));

  it('should contain a create method', inject(function(xhr) {
    expect(xhr.create).toBeDefined();
    expect(typeof xhr.create === 'function').toBe(true);
  }));

  it('should contain a update method', inject(function(xhr) {
    expect(xhr.update).toBeDefined();
    expect(typeof xhr.update === 'function').toBe(true);
  }));

  it('should contain a remove method', inject(function(xhr) {
    expect(xhr.remove).toBeDefined();
    expect(typeof xhr.remove === 'function').toBe(true);
  }));

  it('should contain a save method', inject(function(xhr) {
    expect(xhr.save).toBeDefined();
    expect(typeof xhr.save === 'function').toBe(true);
  }));

});
