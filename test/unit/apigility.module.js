/*global describe, it, expect, should, before, beforeEach, after, afterEach */
'use strict';

describe('Apigility: Module Exists', function () {
  var module;

  beforeEach(function() {
    module = angular.module('apigility');
  });

  it('should be registered', function() {
    expect(module).not.toBe(null);
  });

  describe('Dependencies:', function() {
    var deps;

    function hasModule(m) {
      return deps.indexOf(m) >= 0;
    }

    beforeEach(function() {
      deps = module.value('appName').requires;
    });

    it('should have apigility.core as a dependency', function() {
      /*jshint expr: true */
      expect(hasModule('apigility.core')).toBe(true);
    });

    it('should have apigility.service as a dependency', function() {
      /*jshint expr: true */
      expect(hasModule('apigility.service')).toBe(true);
    });

    it('should have apigility.modal as a dependency', function() {
      /*jshint expr: true */
      expect(hasModule('apigility.modal')).toBe(true);
    });

    it('should have apigility.api-module as a dependency', function() {
      /*jshint expr: true */
      expect(hasModule('apigility.api-module')).toBe(true);
    });

    it('should have apigility.rest as a dependency', function() {
      /*jshint expr: true */
      expect(hasModule('apigility.rest')).toBe(true);
    });

    it('should have apigility.rpc as a dependency', function() {
      /*jshint expr: true */
      expect(hasModule('apigility.rpc')).toBe(true);
    });

    it('should have apigility.content-negotiation as a dependency', function() {
      /*jshint expr: true */
      expect(hasModule('apigility.content-negotiation')).toBe(true);
    });

    it('should have apigility.authentication as a dependency', function() {
      /*jshint expr: true */
      expect(hasModule('apigility.authentication')).toBe(true);
    });

    it('should have apigility.database as a dependency', function() {
      /*jshint expr: true */
      expect(hasModule('apigility.database')).toBe(true);
    });

    it('should have apigility.documentation as a dependency', function() {
      /*jshint expr: true */
      expect(hasModule('apigility.documentation')).toBe(true);
    });

    it('should have apigility.package as a dependency', function() {
      /*jshint expr: true */
      expect(hasModule('apigility.package')).toBe(true);
    });
  });
});
