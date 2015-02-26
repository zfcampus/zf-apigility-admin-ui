'use strict';

describe('API service', function () {
  var mockXhr = {};

  beforeEach(function(){
    module("apigility.service");

    module(function($provide) {
      $provide.service('xhr', function(){
        return mockXhr;
      });
      $provide.value('agApiPath', 'http://localhost:8181/api');
    });
  });

  it('should exist', inject(function($injector) {
    /*jshint expr: true */
    expect($injector.has('api')).toBe(true);
  }));

});
