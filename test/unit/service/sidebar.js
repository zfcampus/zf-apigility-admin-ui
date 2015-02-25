'use strict';

describe('Sidebar service', function () {
  var mockApi = {
    getRestList : function(){ return [] },
    getRpcList  : function(){ return [] }
  };

  beforeEach(function(){

    module("apigility.service");

    module(function($provide) {
      $provide.service('api', function(){
        return mockApi;
      });
    });

  });

  it('should exist', inject(function($injector) {
    /*jshint expr: true */
    expect($injector.has('SidebarService')).toBe(true);
  }));

  it('should contains function', inject(function($injector) {
    var SidebarService = $injector.get('SidebarService');

    expect(SidebarService.addVersion).toBeDefined();
    expect(SidebarService.setSelectedVersion).toBeDefined();
    expect(SidebarService.getSelectedVersion).toBeDefined();
    expect(SidebarService.isLastVersion).toBeDefined();
    expect(SidebarService.setApis).toBeDefined();
    expect(SidebarService.addApi).toBeDefined();
    expect(SidebarService.getApis).toBeDefined();
    expect(SidebarService.removeApi).toBeDefined();
    expect(SidebarService.addRestService).toBeDefined();
    expect(SidebarService.removeRestService).toBeDefined();
    expect(SidebarService.addRpcService).toBeDefined();
    expect(SidebarService.removeRpcService).toBeDefined();
    expect(SidebarService.getSelected).toBeDefined();
    expect(SidebarService.setSelected).toBeDefined();
  }));

  it('should return apis when getApis is called', inject(function($injector) {
    var SidebarService = $injector.get('SidebarService');
    var apis = [
      { name : 'Foo', versions : [1], selected_version : 1 },
      { name : 'Bar', versions : [1,2], selected_version : 2}
    ];

    SidebarService.setApis(apis);
    expect(SidebarService.getApis()).toEqual(apis);
  }));

  it('should add api using addApi', inject(function($injector) {
    var SidebarService = $injector.get('SidebarService');
    var apis = [
      { name : 'Foo', versions : [1], selected_version : 1 },
      { name : 'Bar', versions : [1,2], selected_version : 2}
    ];
    var api = { name : 'Test', versions: [1,2,3] };

    SidebarService.setApis(apis);
    SidebarService.addApi(api);
    var expected = [
      { name : 'Foo', versions : [1], selected_version : 1 },
      { name : 'Bar', versions : [1,2], selected_version : 2},
      { name : 'Test', versions: [1,2,3], selected_version : 3 }
    ];
    expect(SidebarService.getApis()).toEqual(expected);
  }));

  it('should remove api using removeApi', inject(function($injector) {
    var SidebarService = $injector.get('SidebarService');
    var apis = [
      { name : 'Foo', versions : [1], selected_version : 1 },
      { name : 'Bar', versions : [1,2], selected_version : 2}
    ];

    SidebarService.setApis(apis);
    SidebarService.removeApi('Bar');
    var expected = [
      { name : 'Foo', versions : [1], selected_version : 1 }
    ];
    expect(SidebarService.getApis()).toEqual(expected);
  }));

  it('should add version using addVersion', inject(function($injector) {
    var SidebarService = $injector.get('SidebarService');
    var apis = [
      { name : 'Foo', versions : [1], selected_version : 1 }
    ];

    SidebarService.setApis(apis);
    SidebarService.addVersion('Foo', 2);
    var expected = [
      { name : 'Foo', versions : [1, 2], selected_version : 1 }
    ];
    expect(SidebarService.getApis()).toEqual(expected);
  }));

  it('should check if last version using isLastVersion', inject(function($injector) {
    var SidebarService = $injector.get('SidebarService');
    var apis = [
      { name : 'Foo', versions : [1, 2], selected_version : 1 }
    ];

    SidebarService.setApis(apis);
    expect(SidebarService.isLastVersion(1, 'Foo')).toBe(false);
    expect(SidebarService.isLastVersion(2, 'Foo')).toBe(true);
  }));

  it('should set selected version using setSelectedVersion', inject(function($injector) {
    var SidebarService = $injector.get('SidebarService');
    var apis = [
      { name : 'Foo', versions : [1], selected_version : 1 },
      { name : 'Bar', versions : [1,2], selected_version : 2}
    ];

    SidebarService.setApis(apis);
    SidebarService.setSelectedVersion('Bar', 1);
    expect(SidebarService.getSelectedVersion('Bar')).toEqual(1);
  }));

  it('should add REST service using addRestService', inject(function($injector) {
    var SidebarService = $injector.get('SidebarService');
    var apis = [
      { name : 'Foo', versions : [1], selected_version : 1, rest : [], rpc: [] }
    ];

    SidebarService.setApis(apis);
    SidebarService.addRestService('Foo', 'Baz');
    var expected = [
      { name : 'Foo', versions : [1], selected_version : 1, rest : [ 'Baz' ], rpc: [] }
    ];
    expect(SidebarService.getApis()).toEqual(expected);
  }));

  it('should remove REST service using removeRestService', inject(function($injector) {
    var SidebarService = $injector.get('SidebarService');
    var apis = [
      { name : 'Foo', versions : [1], selected_version : 1, rest : [ 'Bar', 'Baz'] }
    ];

    SidebarService.setApis(apis);
    SidebarService.removeRestService('Foo', 'Bar');
    var expected = [
      { name : 'Foo', versions : [1], selected_version : 1, rest : [ 'Baz' ] }
    ];
    expect(SidebarService.getApis()).toEqual(expected);
  }));

  it('should add RPC service using addRpcService', inject(function($injector) {
    var SidebarService = $injector.get('SidebarService');
    var apis = [
      { name : 'Foo', versions : [1], selected_version : 1, rest : [], rpc: [] }
    ];

    SidebarService.setApis(apis);
    SidebarService.addRpcService('Foo', 'Baz');
    var expected = [
      { name : 'Foo', versions : [1], selected_version : 1, rest : [], rpc: [ 'Baz' ] }
    ];
    expect(SidebarService.getApis()).toEqual(expected);
  }));

  it('should remove RPC service using removeRpcService', inject(function($injector) {
    var SidebarService = $injector.get('SidebarService');
    var apis = [
      { name : 'Foo', versions : [1], selected_version : 1, rest: [], rpc : [ 'Bar', 'Baz'] }
    ];

    SidebarService.setApis(apis);
    SidebarService.removeRpcService('Foo', 'Bar');
    var expected = [
      { name : 'Foo', versions : [1], selected_version : 1, rest:[], rpc : [ 'Baz' ] }
    ];
    expect(SidebarService.getApis()).toEqual(expected);
  }));

  it('should select the API or Service using setSelected', inject(function($injector) {
    var SidebarService = $injector.get('SidebarService');

    SidebarService.setSelected('Foo');
    expect(SidebarService.getSelected()).toEqual('Foo');
  }));
});
