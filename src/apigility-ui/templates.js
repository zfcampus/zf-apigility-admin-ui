angular.module('templates-main', ['apigility-ui/auth/ag-auth-nav.html', 'apigility-ui/auth/auth.basic.html', 'apigility-ui/auth/auth.digest.html', 'apigility-ui/auth/auth.html', 'apigility-ui/auth/auth.oauth2.html', 'apigility-ui/backend/backend.html', 'apigility-ui/doc/doc.html', 'apigility-ui/service/ag-service-nav.html', 'apigility-ui/service/delete-service.modal.html', 'apigility-ui/service/new-service.modal.html', 'apigility-ui/service/new-version.modal.html', 'apigility-ui/service/service-splash.html', 'apigility-ui/service/service.documentation.html', 'apigility-ui/service/service.fields.html', 'apigility-ui/service/service.html', 'apigility-ui/service/service.settings.html', 'apigility-ui/service/sidebar.html']);

angular.module("apigility-ui/auth/ag-auth-nav.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/auth/ag-auth-nav.html",
    "<a ng-click=\"authNav.go()\">Authentication</a>\n" +
    "");
}]);

angular.module("apigility-ui/auth/auth.basic.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/auth/auth.basic.html",
    "<form class=\"form-horizontal\" role=\"form\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"model\" class=\"col-sm-2 control-label\">Model</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.model\" placeholder=\"Path to the model module\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"param\" class=\"col-sm-2 control-label\">Parameter</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.param\"\n" +
    "        placeholder=\"Parameter to use when initializing the model module\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" style=\"margin-top:50px\">\n" +
    "    <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "      <button type=\"button\" class=\"btn btn-danger\" ng-click=\"vm.remove()\"><span class=\"glyphicon glyphicon-trash\"></span> Delete</button>\n" +
    "      <button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.save()\">Save</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>\n" +
    "");
}]);

angular.module("apigility-ui/auth/auth.digest.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/auth/auth.digest.html",
    "<form class=\"form-horizontal\" role=\"form\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"model\" class=\"col-sm-2 control-label\">Model</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.model\"\n" +
    "        placeholder=\"Path to the model module\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"param\" class=\"col-sm-2 control-label\">Parameter</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.param\"\n" +
    "        placeholder=\"Parameter to use when initializing the model module\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"realm\" class=\"col-sm-2 control-label\">Realm</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.realm\" placeholder=\"Realm\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" style=\"margin-top:50px\">\n" +
    "    <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "      <button type=\"button\" class=\"btn btn-danger\" ng-click=\"vm.remove()\"><span class=\"glyphicon glyphicon-trash\"></span> Delete</button>\n" +
    "      <button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.save()\">Save</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>\n" +
    "");
}]);

angular.module("apigility-ui/auth/auth.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/auth/auth.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h3 class=\"panel-title\">Authentication</h3>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"panel-body\">\n" +
    "    <tabset type=\"tabs\" vertical=\"false\">\n" +
    "      <tab\n" +
    "        ng-repeat=\"t in auth.tabs\"\n" +
    "        heading=\"{{t.heading}}\"\n" +
    "        active=\"t.active\"\n" +
    "        ng-click=\"auth.go(t.route)\"></tab>\n" +
    "    </tabset>\n" +
    "\n" +
    "    <ui-view></ui-view>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/auth/auth.oauth2.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/auth/auth.oauth2.html",
    "<form class=\"form-horizontal\" role=\"form\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"model\" class=\"col-sm-2 control-label\">Model</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.model\" placeholder=\"Path to the model module\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"param\" class=\"col-sm-2 control-label\">Parameter</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.param\"\n" +
    "        placeholder=\"Parameter to use when initializing the model module\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"username\" class=\"col-sm-2 control-label\">Username</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.username\"\n" +
    "        placeholder=\"OAuth2 HTTP authentication username\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"password\" class=\"col-sm-2 control-label\">Password</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"password\" class=\"form-control\" ng-model=\"vm.password\"\n" +
    "        placeholder=\"OAuth2 HTTP authentication password\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"url.token\" class=\"col-sm-2 control-label\">Token URL (for obtaining a token)</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.url.token\"\n" +
    "        placeholder=\"/oauth2/token\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"url.authorize\" class=\"col-sm-2 control-label\">Authorization URL</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.url.authorize\"\n" +
    "        placeholder=\"/oauth2/authorize\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"url.revoke\" class=\"col-sm-2 control-label\">Revocation URL (for revoking a token)</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.url.revoke\" placeholder=\"/oauth2/revoke\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"view.authorize\" class=\"col-sm-2 control-label\">Authorization view</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.view.authorize\"\n" +
    "        placeholder=\"Path to file containing HTML authorization form markup\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" style=\"margin-top:50px\">\n" +
    "    <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "      <button type=\"button\" class=\"btn btn-danger\" ng-click=\"vm.remove()\"><span class=\"glyphicon glyphicon-trash\"></span> Delete</button>\n" +
    "      <button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.save()\">Save</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>\n" +
    "");
}]);

angular.module("apigility-ui/backend/backend.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/backend/backend.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h3 class=\"panel-title\">Generate backend</h3>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"panel-body\" ng-hide=\"vm.success\">\n" +
    "    <form class=\"form-horizontal\" role=\"form\">\n" +
    "    <div class=\"form-group\">\n" +
    "        <label for=\"model\" class=\"col-sm-2 control-label\">Application Path</label>\n" +
    "        <div class=\"col-sm-10\">\n" +
    "        <input type=\"text\" class=\"form-control\" ng-model=\"vm.path\"\n" +
    "            placeholder=\"Path to the application to generate\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"param\" class=\"col-sm-2 control-label\">Overwrite?</label>\n" +
    "      <div class=\"col-sm-10\">\n" +
    "        <input type=\"checkbox\" ng-model=\"vm.overwrite\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\" style=\"margin-top:50px\">\n" +
    "      <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.generate()\">Generate</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"panel-body\" ng-show=\"vm.success\">\n" +
    "    <p>Application generated</p>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/doc/doc.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/doc/doc.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h3 class=\"panel-title\">Documentation</h3>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"panel-body\">\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/service/ag-service-nav.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/service/ag-service-nav.html",
    "<a ng-click=\"serviceNav.go()\">Service</a>\n" +
    "");
}]);

angular.module("apigility-ui/service/delete-service.modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/service/delete-service.modal.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">Delete service</h4>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <h4>Are you certain you want to delete the service \"{{ vm.service_name }}\"?</h4>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"vm.cancel()\">No</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.submit()\">Yes</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/service/new-service.modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/service/new-service.modal.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">Create new service</h4>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"service_name\" class=\"control-label\">New service name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" ng-model=\"vm.service_name\" placeholder=\"Insert the service name\">\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"route_path\" class=\"control-label\">Path to match</label>\n" +
    "    <input type=\"text\" class=\"form-control\" ng-model=\"vm.route_path\" placeholder=\"/path/to/match\">\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"service_type\" class=\"control-label\">Service type</label>\n" +
    "    <select class=\"form-control\" ng-model=\"vm.service_type\">\n" +
    "      <option value=\"rpc\">RPC</option>\n" +
    "      <option value=\"rest\">REST</option>\n" +
    "    </select>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"vm.cancel()\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.submit()\">Create service</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/service/new-version.modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/service/new-version.modal.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">New version</h4>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <h4>Do you want to create a new version?</h4>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"vm.cancel()\">No</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.submit()\">Yes</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/service/service-splash.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/service/service-splash.html",
    "<div class=\"panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h3 class=\"panel-title\">Create new service</h3>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"service_name\" class=\"control-label\">New service name</label>\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.service_name\" placeholder=\"Insert the service name\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"route_path\" class=\"control-label\">Path to match</label>\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.route_path\" placeholder=\"/path/to/match\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"service_type\" class=\"control-label\">Service type</label>\n" +
    "      <select class=\"form-control\" ng-model=\"vm.service_type\">\n" +
    "        <option value=\"rpc\">RPC</option>\n" +
    "        <option value=\"rest\">REST</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"vm.reset()\">Reset</button>\n" +
    "      <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.submit()\">Create service</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/service/service.documentation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/service/service.documentation.html",
    "<i>placeholder</i>\n" +
    "");
}]);

angular.module("apigility-ui/service/service.fields.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/service/service.fields.html",
    "<form class=\"form-horizontal\" role=\"form\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\" class=\"col-sm-2 control-label\">Field Name</label>\n" +
    "    <div class=\"col-sm-3\">\n" +
    "      <input type=\"text\" class=\"form-control\" placeholder=\"Name\"\n" +
    "        ng-model=\"vm.name\" ng-readonly=\"!vm.is_latest\">\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"type\" class=\"col-sm-2 control-label\">Field Type</label>\n" +
    "    <div class=\"col-sm-2\">\n" +
    "      <select class=\"form-control\" name=\"type\" ng-model=\"vm.type\" ng-readonly=\"!vm.is_latest\">\n" +
    "        <option>string</option>\n" +
    "        <option>string</option>\n" +
    "        <option>integer</option>\n" +
    "        <option>float</option>\n" +
    "        <option>array</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-3\">\n" +
    "      <label for=\"type\" class=\"control-label\">Required</label>\n" +
    "      <input type=\"checkbox\" name=\"required\" ng-model=\"vm.required\" ng-readonly=\"!vm.is_latest\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" ng-show=\"vm.is_latest\">\n" +
    "    <label for=\"constraint.name\" class=\"col-sm-2 control-label\">Constraint</label>\n" +
    "    <div class=\"col-sm-3\">\n" +
    "      <select class=\"form-control\"\n" +
    "        ng-model=\"vm.constraint.name\"\n" +
    "        ng-change=\"vm.update_param_visibility()\">\n" +
    "        <option value=\"\">(None)</option>\n" +
    "        <option>min</option>\n" +
    "        <option>max</option>\n" +
    "        <option>regex</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-4\">\n" +
    "      <input type=\"text\" class=\"form-control\"\n" +
    "        ng-disabled=\"vm.is_empty(vm.constraint.name)\"\n" +
    "        ng-model=\"vm.constraint.param\" placeholder=\"Constraint value\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-3\">\n" +
    "      <button type=\"button\" class=\"btn btn-default\"\n" +
    "        ng-click=\"vm.add_constraint()\">Add constraint</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" ng-show=\"vm.constraints.length\">\n" +
    "    <div class=\"col-sm-7 col-md-offset-2\">\n" +
    "      <div class=\"table-responsive\">\n" +
    "        <table class=\"table table-bordered\">\n" +
    "          <thead>\n" +
    "            <tr style=\"background:#eeeeee\">\n" +
    "              <th>Constraint</th>\n" +
    "              <th>Value</th>\n" +
    "              <th ng-show=\"vm.is_latest\">Action</th>\n" +
    "            </tr>\n" +
    "          </thead>\n" +
    "          <tbody>\n" +
    "            <tr ng-repeat=\"constraint in vm.constraints\">\n" +
    "              <td>{{constraint.name}}</td>\n" +
    "              <td>{{constraint.param}}</td>\n" +
    "              <td ng-show=\"vm.is_latest\"><a ng-click=\"vm.remove_constraint($index)\"><span class=\"glyphicon glyphicon-minus\"></span> Remove</a></td>\n" +
    "            </tr>\n" +
    "          </tbody>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-hide=\"vm.is_edit() || !vm.is_latest\" class=\"form-group\">\n" +
    "    <div class=\"col-sm-7 col-md-offset-2\">\n" +
    "      <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel_edit()\">Reset</button>\n" +
    "      <button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.add_field()\">Add field</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-show=\"vm.is_edit() && vm.is_latest\" class=\"form-group\">\n" +
    "    <div class=\"col-sm-7 col-md-offset-2\">\n" +
    "      <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel_edit()\">Cancel</button>\n" +
    "      <button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.update_field()\">Save field</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-show=\"vm.fields.length\">\n" +
    "    <h3 class=\"sub-header\">Fields</h3>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"col-sm-12\">\n" +
    "        <div class=\"table-responsive\">\n" +
    "          <table class=\"table table-bordered\">\n" +
    "            <thead>\n" +
    "              <tr style=\"background:#eeeeee\">\n" +
    "                <th>Name</th>\n" +
    "                <th>Type</th>\n" +
    "                <th>Required</th>\n" +
    "                <th colspan=\"2\">Action</th>\n" +
    "              </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "              <tr ng-repeat=\"field in vm.fields\">\n" +
    "                <td>{{field.name}}</td>\n" +
    "                <td>{{field.type}}</td>\n" +
    "                <td>{{field.required | agCheckmark}}</td>\n" +
    "                <td>\n" +
    "                  <div ng-show=\"vm.is_latest\">\n" +
    "                    <a ng-click=\"vm.edit_field(field.name)\"><span class=\"glyphicon glyphicon-pencil\"></span> Edit</a>\n" +
    "                  </div>\n" +
    "                  <div ng-hide=\"vm.is_latest\">\n" +
    "                    <a ng-click=\"vm.edit_field(field.name)\"><span class=\"glyphicon glyphicon-pencil\"></span> View</a>\n" +
    "                  </div>\n" +
    "                </td>\n" +
    "                <td ng-show=\"vm.is_latest\"><a ng-click=\"vm.remove_field(field.name)\"><span class=\"glyphicon glyphicon-minus\"></span> Remove</a></td>\n" +
    "              </tr>\n" +
    "            </tbody>\n" +
    "          </table>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>\n" +
    "");
}]);

angular.module("apigility-ui/service/service.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/service/service.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "      <h3 class=\"panel-title\">\n" +
    "        {{service.name}} (v{{service.version}})\n" +
    "\n" +
    "        <span class=\"pull-right\">\n" +
    "          <button type=\"button\" class=\"btn btn-danger\" ng-click=\"service.deleteModal()\">\n" +
    "              <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "              Delete service\n" +
    "          </button>\n" +
    "        </span>\n" +
    "      </h3>\n" +
    "      <div class=\"clearfix\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"panel-body\">\n" +
    "    <tabset type=\"tabs\" vertical=\"false\">\n" +
    "      <tab\n" +
    "        ng-repeat=\"t in service.tabs\"\n" +
    "        heading=\"{{t.heading}}\"\n" +
    "        active=\"t.active\"\n" +
    "        ng-click=\"service.go(t.route)\"></tab>\n" +
    "    </tabset>\n" +
    "\n" +
    "    <ui-view></ui-view>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/service/service.settings.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/service/service.settings.html",
    "<form class=\"form-horizontal\" role=\"form\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\" class=\"col-sm-2 control-label\">Name</label>\n" +
    "    <div class=\"col-sm-4\">\n" +
    "      <input type=\"text\" class=\"form-control\"\n" +
    "        ng-model=\"settings.service_name\" readonly>\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"url\" class=\"col-sm-2 control-label\">Type</label>\n" +
    "    <div class=\"col-sm-4\">\n" +
    "      <select class=\"form-control\" ng-model=\"settings.type\" readonly>\n" +
    "          <option value=\"rest\">REST</option>\n" +
    "          <option value=\"rpc\">RPC</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"route\" class=\"col-sm-2 control-label\">URL</label>\n" +
    "    <div class=\"col-sm-4\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"settings.service.route\" ng-readonly=\"settings.is_legacy()\">\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"accepts\" class=\"col-sm-2 control-label\">Accepts</label>\n" +
    "    <div class=\"col-sm-4\">\n" +
    "      <tags-input\n" +
    "        ng-model=\"settings.service.accepts\"\n" +
    "        ng-readonly=\"settings.is_legacy()\"\n" +
    "        placeholder=\"Add a mimetype\"\n" +
    "        add-on-space=\"true\"\n" +
    "        add-on-enter=\"true\"\n" +
    "        add-on-blur=\"true\"\n" +
    "        allowed-tags-pattern=\"^[a-zA-Z0-9_+.-]+$\"></tags-input>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"content_types\" class=\"col-sm-2 control-label\">Content types</label>\n" +
    "    <div class=\"col-sm-4\">\n" +
    "      <tags-input\n" +
    "        ng-model=\"settings.service.content_types\"\n" +
    "        ng-readonly=\"settings.is_legacy()\"\n" +
    "        placeholder=\"Add a mimetype\"\n" +
    "        add-on-space=\"true\"\n" +
    "        add-on-enter=\"true\"\n" +
    "        add-on-blur=\"true\"\n" +
    "        allowed-tags-pattern=\"^[a-zA-Z0-9_+.-]+$\"></tags-input>\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"authentication\" class=\"col-sm-2 control-label\">Authentication</label>\n" +
    "    <div class=\"col-sm-4\">\n" +
    "      <select class=\"form-control\" ng-model=\"settings.service.authentication\" ng-readonly=\"settings.is_legacy()\">\n" +
    "          <option value=\"\">None</option>\n" +
    "          <option value=\"basic\">Basic</option>\n" +
    "          <option value=\"digest\">Digest</option>\n" +
    "          <option value=\"oauth2\">OAuth2</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-show=\"settings.is_rest()\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label class=\"col-sm-2 control-label\">Entity Methods</label>\n" +
    "      <div class=\"col-sm-4\">\n" +
    "        <label class=\"control-label method-checkbox\" ng-repeat=\"method in settings.options\">\n" +
    "          <input\n" +
    "            type=\"checkbox\"\n" +
    "            name=\"methods_entity[]\"\n" +
    "            value=\"{{method}}\"\n" +
    "            ng-checked=\"settings.service.options.entity.indexOf(method) > -1\"\n" +
    "            ng-disabled=\"settings.is_legacy()\"\n" +
    "            ng-click=\"settings.toggle(method, 'options', 'entity')\">{{method}}</input>\n" +
    "        </label>\n" +
    "      </div>\n" +
    "\n" +
    "      <label class=\"col-sm-2 control-label\">Entity Authorizations</label>\n" +
    "      <div class=\"col-sm-4\">\n" +
    "        <label class=\"control-label method-checkbox\" ng-repeat=\"method in settings.options\">\n" +
    "          <input\n" +
    "            type=\"checkbox\"\n" +
    "            name=\"authorizations_entity[]\"\n" +
    "            value=\"{{method}}\"\n" +
    "            ng-checked=\"settings.service.authorization.entity[method]\"\n" +
    "            ng-disabled=\"settings.is_legacy()\"\n" +
    "            ng-click=\"settings.toggle(method, 'authorization', 'entity')\">{{method}}</input>\n" +
    "        </label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <label class=\"col-sm-2 control-label\">Collection Methods</label>\n" +
    "      <div class=\"col-sm-4\">\n" +
    "        <label class=\"control-label method-checkbox\" ng-repeat=\"method in settings.options\">\n" +
    "          <input\n" +
    "            type=\"checkbox\"\n" +
    "            name=\"methods_collection[]\"\n" +
    "            value=\"{{method}}\"\n" +
    "            ng-checked=\"settings.service.options.collection.indexOf(method) > -1\"\n" +
    "            ng-disabled=\"settings.is_legacy()\"\n" +
    "            ng-click=\"settings.toggle(method, 'options', 'collection')\">{{method}}</input>\n" +
    "        </label>\n" +
    "      </div>\n" +
    "\n" +
    "      <label class=\"col-sm-2 control-label\">Collection Authorizations</label>\n" +
    "      <div class=\"col-sm-4\">\n" +
    "        <label class=\"control-label method-checkbox\" ng-repeat=\"method in settings.options\">\n" +
    "          <input\n" +
    "            type=\"checkbox\"\n" +
    "            name=\"authorizations_collection[]\"\n" +
    "            value=\"{{method}}\"\n" +
    "            ng-checked=\"settings.service.authorization.collection[method]\"\n" +
    "            ng-disabled=\"settings.is_legacy()\"\n" +
    "            ng-click=\"settings.toggle(method, 'authorization', 'collection')\">{{method}}</input>\n" +
    "        </label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" ng-hide=\"settings.is_rest()\">\n" +
    "    <label class=\"col-sm-2 control-label\"> Methods</label>\n" +
    "    <div class=\"col-sm-4\">\n" +
    "      <label class=\"control-label method-checkbox\" ng-repeat=\"method in settings.options\">\n" +
    "        <input\n" +
    "          type=\"checkbox\"\n" +
    "          name=\"methods[]\"\n" +
    "          value=\"{{method}}\"\n" +
    "          ng-checked=\"settings.service.options.indexOf(method) > -1\"\n" +
    "          ng-disabled=\"settings.is_legacy()\"\n" +
    "          ng-click=\"settings.toggle(method, 'options')\">{{method}}</input>\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    <label class=\"col-sm-2 control-label\">Authorizations</label>\n" +
    "    <div class=\"col-sm-4\">\n" +
    "      <label class=\"control-label method-checkbox\" ng-repeat=\"method in settings.options\">\n" +
    "        <input\n" +
    "          type=\"checkbox\"\n" +
    "          name=\"authorizations[]\"\n" +
    "          value=\"{{method}}\"\n" +
    "          ng-checked=\"settings.service.authorization[method]\"\n" +
    "          ng-disabled=\"settings.is_legacy()\"\n" +
    "          ng-click=\"settings.toggle(method, 'authorization')\">{{method}}</input>\n" +
    "      </label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" style=\"margin-top:50px\" ng-hide=\"settings.is_legacy()\">\n" +
    "    <div class=\"col-sm-offset-2 col-sm-4\">\n" +
    "      <button type=\"button\" class=\"btn btn-primary\" ng-click=\"settings.save()\">Save settings</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>\n" +
    "");
}]);

angular.module("apigility-ui/service/sidebar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/service/sidebar.html",
    "<div class=\"row\">\n" +
    "  <form class=\"navbar-form\" ng-submit=\"sidebar.load_service()\">\n" +
    "    <div class=\"form-group has-feedback\">\n" +
    "      <input\n" +
    "        class=\"form-control\"\n" +
    "        type=\"search\"\n" +
    "        placeholder=\"Search for a service\"\n" +
    "        ng-model=\"sidebar.search\"\n" +
    "        typeahead=\"service for service in sidebar.get_service_names() | filter:$viewValue | limitTo:8\">\n" +
    "      <i class=\"glyphicon glyphicon-search form-control-feedback\"></i>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\" ng-show=\"sidebar.versions\">\n" +
    "  <div class=\"col-sm-12\">\n" +
    "    Switch to version\n" +
    "    <select ng-model=\"sidebar.version\" ng-change=\"sidebar.change_version()\">\n" +
    "      <option\n" +
    "        ng-repeat=\"version in sidebar.versions\"\n" +
    "        ng-selected=\"sidebar.is_current_version(version)\">{{version}}</option>\n" +
    "    </select>\n" +
    "    <button class=\"btn btn-primary btn-sm\" ng-click=\"sidebar.new_version_modal()\">New version</button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<h3>\n" +
    "  Services\n" +
    "  <button class=\"btn btn-primary btn-sm\" ng-click=\"sidebar.new_service_modal()\">New service</button>\n" +
    "</h3>\n" +
    "\n" +
    "<ul class=\"nav nav-sidebar\">\n" +
    "  <li ng-repeat=\"(name, def) in sidebar.services\" ng-class=\"{ active: sidebar.is_active(name) }\">\n" +
    "    <a href ui-sref=\"ag.service.settings({ service: name, version:\n" +
    "      sidebar.latest(name) })\">{{name}} - {{ def.route }}</a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);
