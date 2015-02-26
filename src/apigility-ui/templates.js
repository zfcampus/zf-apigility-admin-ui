angular.module('templates-main', ['apigility-ui/api-module/api-module.html', 'apigility-ui/authentication/authentication.html', 'apigility-ui/content-negotiation/content-negotiation.html', 'apigility-ui/dashboard/dashboard.html', 'apigility-ui/database/database.html', 'apigility-ui/documentation/documentation-api.html', 'apigility-ui/documentation/documentation-list.html', 'apigility-ui/documentation/documentation-service.html', 'apigility-ui/documentation/documentation.html', 'apigility-ui/header/header.html', 'apigility-ui/modal/about.html', 'apigility-ui/modal/add-dboption.html', 'apigility-ui/modal/add-filter.html', 'apigility-ui/modal/add-validator.html', 'apigility-ui/modal/delete-api.html', 'apigility-ui/modal/delete-db.html', 'apigility-ui/modal/delete-dboption.html', 'apigility-ui/modal/delete-field.html', 'apigility-ui/modal/delete-filter.html', 'apigility-ui/modal/delete-rest.html', 'apigility-ui/modal/delete-rpc.html', 'apigility-ui/modal/delete-selector.html', 'apigility-ui/modal/delete-validator.html', 'apigility-ui/modal/delete-viewmodel.html', 'apigility-ui/modal/edit-db.html', 'apigility-ui/modal/edit-dboption.html', 'apigility-ui/modal/edit-field.html', 'apigility-ui/modal/edit-filter.html', 'apigility-ui/modal/edit-validator.html', 'apigility-ui/modal/edit-viewmodel.html', 'apigility-ui/modal/new-api.html', 'apigility-ui/modal/new-db.html', 'apigility-ui/modal/new-doctrinestrategy.html', 'apigility-ui/modal/new-field.html', 'apigility-ui/modal/new-selector.html', 'apigility-ui/modal/new-service.html', 'apigility-ui/modal/new-version.html', 'apigility-ui/modal/new-viewmodel.html', 'apigility-ui/modal/view-doctrineparams.html', 'apigility-ui/package/package.html', 'apigility-ui/rest/rest.html', 'apigility-ui/rpc/rpc.html', 'apigility-ui/sidebar/sidebar.html']);

angular.module("apigility-ui/api-module/api-module.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/api-module/api-module.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h3 class=\"panel-title\">\n" +
    "      API: {{vm.apiName}} (v{{vm.version}})\n" +
    "      <button class=\"btn btn-danger pull-right\" ng-click=\"vm.deleteApiModal()\" ng-hide=\"vm.disabled\"><span class=\"glyphicon glyphicon-trash\"></span> Delete API</button>\n" +
    "    </h3>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "      <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      <div class=\"col-sm-6\">\n" +
    "        <h3>Authentication</h3>\n" +
    "        <br />\n" +
    "        <form class=\"form-inline\" role=\"form\" unsaved-warning-form>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"control-label\">Set authentication type</label>\n" +
    "            <select class=\"form-control\" ng-model=\"vm.authentication_type\" ng-disabled=\"vm.disabled\">\n" +
    "              <option>None</option>\n" +
    "              <option>Basic</option>\n" +
    "              <option>Digest</option>\n" +
    "              <option>OAuth2</option>\n" +
    "            </select>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <button type=\"submit\" class=\"btn btn-success btn-sm\" ng-hide=\"vm.disabled\">Save</span></button>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "      <div class=\"col-sm-6\">\n" +
    "        <h3>Version <button class=\"btn btn-sm btn-primary\" ng-click=\"vm.newVersionModal()\" ng-hide=\"vm.disabled\">New version</button></h3>\n" +
    "        <br />\n" +
    "        <form class=\"form-inline\" role=\"form\" unsaved-warning-form>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"control-label\">Set default version</label>\n" +
    "            <select class=\"form-control\" ng-model=\"vm.module.default_version\" ng-options=\"ver for ver in vm.module.versions\" ng-disabled=\"vm.disabled\"></select>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <button type=\"submit\" class=\"btn btn-success btn-sm\" ng-click=\"vm.setDefaultVersion()\" ladda=\"vm.loading\" ng-hide=\"vm.disabled\">Save</span></button>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "      <br clear=\"left\"><br />\n" +
    "      <h3>REST</h3>\n" +
    "      <table class=\"table table-bordered col-sm-12\">\n" +
    "        <thead>\n" +
    "          <tr>\n" +
    "            <th class=\"col-sm-2\">Service name</th>\n" +
    "            <th class=\"col-sm-4\">URL</th>\n" +
    "            <th class=\"col-sm-6\">Description</th>\n" +
    "          </tr>\n" +
    "        </thead>\n" +
    "        <tr ng-repeat=\"rest in vm.rest\">\n" +
    "          <td><a ui-sref=\"ag.rest({api: vm.apiName, ver: vm.version, rest: rest.service_name})\" ng-click=\"vm.setSelected('api'+vm.apiName+'rest'+rest.service_name)\">{{rest.service_name}}</a></td>\n" +
    "          <td>{{rest.route_match}}</td>\n" +
    "          <td>\n" +
    "            <a href=\"\" ng-if=\"!rest._embedded.documentation.description\" ng-hide=\"vm.disabled\">Add a description for this service</a>\n" +
    "            <span ng-if=\"rest._embedded.documentation.description\">{{rest._embedded.documentation.description}}</span>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "        <tr ng-if=\"!vm.rest || vm.rest.length == 0\">\n" +
    "          <td colspan=\"3\">\n" +
    "            No REST services<span ng-hide=\"vm.disabled\">, <a ng-click=\"vm.newServiceModal()\">create a new one</a></span>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      <h3>RPC</h3>\n" +
    "      <table class=\"table table-bordered col-sm-12\">\n" +
    "        <thead>\n" +
    "          <tr>\n" +
    "            <th class=\"col-sm-2\">Service name</th>\n" +
    "            <th class=\"col-sm-4\">URL</th>\n" +
    "            <th class=\"col-sm-6\">Description</th>\n" +
    "          </tr>\n" +
    "        </thead>\n" +
    "        <tr ng-repeat=\"rpc in vm.rpc\">\n" +
    "          <td><a ui-sref=\"ag.rpc({api: vm.apiName, ver: vm.version, rpc: rpc.service_name})\" ng-click=\"vm.setSelected('api'+vm.apiName+'rpc'+rpc.service_name)\">{{rpc.service_name}}</a></td>\n" +
    "          <td>{{rpc.route_match}}</td>\n" +
    "          <td>\n" +
    "            <a href=\"\" ng-if=\"!rpc._embedded.documentation.description\" ng-hide=\"vm.disabled\">Add a description for this service</a>\n" +
    "            <span ng-if=\"rpc._embedded.documentation.description\">{{rpc._embedded.documentation.description}}</span>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "        <tr ng-if=\"!vm.rpc || vm.rpc.length == 0\">\n" +
    "          <td colspan=\"3\">\n" +
    "            No RPC services<span ng-hide=\"vm.disabled\">, <a ng-click=\"vm.newServiceModal()\">create a new one</a></span>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/authentication/authentication.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/authentication/authentication.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h3 class=\"panel-title\">Authentication</h3>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <tabset justified=\"true\">\n" +
    "        <!-- BASIC -->\n" +
    "        <tab heading=\"Basic\" active=\"vm.tabs.basic\">\n" +
    "          <form class=\"form-horizontal\" role=\"form\" unsaved-warning-form>\n" +
    "            <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "              <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"auth_basic_realm\" class=\"col-sm-2 control-label\">Authentication Realm</label>\n" +
    "              <div class=\"col-sm-10\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"vm.basic.realm\" placeholder=\"Insert the Realm\" ng-change=\"vm.change(0)\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"auth_basic_htpasswd\" class=\"col-sm-2 control-label\">Path of htpasswd file</label>\n" +
    "              <div class=\"col-sm-10\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"vm.basic.htpasswd\" placeholder=\"Insert the path of htpasswd\" ng-change=\"vm.change(0)\">\n" +
    "                <span class=\"help-block\"><span class=\"glyphicon glyphicon-info-sign\" aria-hidden=\"true\"></span> If you need to create a <i>htpasswd</i> file, read this <a href=\"https://apigility.org/documentation/auth/authentication-http-basic\" target=\"_blank\">guide</a></span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" style=\"margin-top:30px\">\n" +
    "              <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.resetBasic()\" unsaved-warning-clear>Reset</button>\n" +
    "                <button type=\"submit\" class=\"btn btn-success\" ng-click=\"vm.saveBasic()\" ladda=\"vm.loading\">Save</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </tab>\n" +
    "\n" +
    "        <!-- DIGEST -->\n" +
    "        <tab heading=\"Digest\" active=\"vm.tabs.digest\">\n" +
    "          <form class=\"form-horizontal\" role=\"form\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"auth_digest_realm\" class=\"col-sm-2 control-label\">Authentication Realm</label>\n" +
    "              <div class=\"col-sm-10\">\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"auth_digest_realm\" placeholder=\"Insert the Realm\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"auth_digest_htpasswd\" class=\"col-sm-2 control-label\">Path of htdigest file</label>\n" +
    "              <div class=\"col-sm-10\">\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"auth_digest_htdigest\" placeholder=\"Insert the path of htdigest\">\n" +
    "                <span class=\"help-block\"><span class=\"glyphicon glyphicon-info-sign\" aria-hidden=\"true\"></span> If you need to create a <i>htdigest</i> file, read this <a href=\"https://apigility.org/documentation/auth/authentication-http-digest\" target=\"_blank\">guide</a></span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"auth_digest_domains\" class=\"col-sm-2 control-label\">Digest domains</label>\n" +
    "              <div class=\"col-sm-10\">\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"auth_digest_domains\" placeholder=\"Insert the digest domains\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"auth_digest_timeout\" class=\"col-sm-2 control-label\">Nonce timeout</label>\n" +
    "              <div class=\"col-sm-10\">\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"auth_digest_timeout\" placeholder=\"Insert the timeout\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" style=\"margin-top:30px\">\n" +
    "              <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "                <button type=\"button\" class=\"btn btn-success\">Save</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </tab>\n" +
    "\n" +
    "        <!-- OAUTH2 -->\n" +
    "        <tab heading=\"OAuth2\" active=\"vm.tabs.oauth2\">\n" +
    "          <form class=\"form-horizontal\" role=\"form\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"oauth2_adapter\" class=\"col-sm-2 control-label\">Select adapter</label>\n" +
    "              <div class=\"col-sm-10\">\n" +
    "                <select class=\"form-control\" name=\"type\" id=\"oauth2_adapter\">\n" +
    "                  <option>PDO</option>\n" +
    "                  <option>Mongo</option>\n" +
    "                </select>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"oauth2_pdo_dsn\" class=\"col-sm-2 control-label\">PDO DSN</label>\n" +
    "              <div class=\"col-sm-10\">\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"oauth2_pdo_dsn\" placeholder=\"DSN\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"oauth2_username\" class=\"col-sm-2 control-label\">Username</label>\n" +
    "              <div class=\"col-sm-10\">\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"oauth2_username\" placeholder=\"Username\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"oauth2_password\" class=\"col-sm-2 control-label\">Password</label>\n" +
    "              <div class=\"col-sm-10\">\n" +
    "                <input type=\"password\" class=\"form-control\" id=\"oauth2_password\" placeholder=\"Password\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"oauth2_route\" class=\"col-sm-2 control-label\">OAuth2 route</label>\n" +
    "              <div class=\"col-sm-10\">\n" +
    "                <input type=\"password\" class=\"form-control\" id=\"oauth2_route\" placeholder=\"/oauth\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" style=\"margin-top:30px\">\n" +
    "              <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "                <button type=\"button\" class=\"btn btn-success\">Save</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/content-negotiation/content-negotiation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/content-negotiation/content-negotiation.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h3 class=\"panel-title\">Content Negotiation</h3>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      <h3>Selectors <button type=\"button\" class=\"btn btn-primary btn-sm\" data-toggle=\"modal\" ng-click=\"vm.newSelectorModal()\">New selector</button></h3>\n" +
    "      <table class=\"table table-bordered col-sm-12\">\n" +
    "        <thead>\n" +
    "          <tr>\n" +
    "            <th class=\"col-sm-3\">Name</th>\n" +
    "            <th class=\"col-sm-6\">View model</th>\n" +
    "            <th class=\"col-sm-3\">Action</th>\n" +
    "          </tr>\n" +
    "        </thead>\n" +
    "        <tr ng-repeat=\"item in vm.content_negotiation\">\n" +
    "          <td>{{item.content_name}}</td>\n" +
    "          <td>\n" +
    "            <button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"vm.addViewModel(item)\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
    "            <span ng-repeat=\"(viewmodel, mediatype) in item.selectors\"><a ng-click=\"vm.editViewModel(item, viewmodel)\">{{viewmodel}}</a>, </span>\n" +
    "            <span ng-if=\"vm.selectors.length == 0\">No view models</span>\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            <button type=\"button\" ng-click=\"vm.deleteSelectorModal(item)\" class=\"btn btn-danger btn-xs\"><i class=\"glyphicon glyphicon-trash\"></i> delete</button>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/dashboard/dashboard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/dashboard/dashboard.html",
    "<div id=\"dashboard\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8\">\n" +
    "      <h1>Welcome to Apigility!</h1>\n" +
    "      <br /><br />\n" +
    "      <p class=\"lead\">\n" +
    "        <strong>Apigility</strong> is an API Builder, designed to simplify creating and maintaining useful, easy to consume, and well-structured APIs.<br />\n" +
    "      </p>\n" +
    "      <p class=\"lead\">\n" +
    "        If this is the first time using <strong>Apigility</strong> we suggest to read this <a href=\"https://apigility.org/documentation/intro/getting-started\" target=\"_blank\">introduction</a> or watch this getting started <a href=\"https://apigility.org/video\" target=\"_blank\">video</a>.\n" +
    "      </p>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-4\">\n" +
    "      <img src=\"apigility-ui/img/ag-hero.png\" class=\"pull-right\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/database/database.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/database/database.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h3 class=\"panel-title\">Database</h3>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      <h3>Database adapters <button type=\"button\" class=\"btn btn-primary btn-sm\" data-toggle=\"modal\" ng-click=\"vm.newDbModal()\">New DB Adapter</button></h3>\n" +
    "      <table class=\"table table-bordered col-sm-12\">\n" +
    "        <thead>\n" +
    "          <tr>\n" +
    "            <th class=\"col-sm-2\">Name</th>\n" +
    "            <th class=\"col-sm-2\">Driver</th>\n" +
    "            <th class=\"col-sm-2\">Database</th>\n" +
    "            <th class=\"col-sm-4\">Driver options</th>\n" +
    "            <th class=\"col-sm-2\">Actions</th>\n" +
    "          </tr>\n" +
    "        </thead>\n" +
    "        <tr ng-repeat=\"item in vm.db_adapter\">\n" +
    "          <td>{{item.adapter_name}}</td>\n" +
    "          <td>{{item.driver}}</td>\n" +
    "          <td>{{item.database}}</td>\n" +
    "          <td>\n" +
    "            <button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"vm.addDbOptionModal(item)\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
    "            <span ng-repeat=\"(option, value) in item.driver_options\"><a ng-click=\"vm.editDbOptionModal(item, option)\">{{option}} = {{value}}</a>, </span>\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            <button type=\"button\" ng-click=\"vm.editDbModal(item)\" class=\"btn btn-success btn-xs\"><i class=\"glyphicon glyphicon-pencil\"></i> edit</button> <button type=\"button\" ng-click=\"vm.deleteDbModal(item)\" class=\"btn btn-danger btn-xs\"><i class=\"glyphicon glyphicon-trash\"></i> delete</button>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "    <div class=\"row\" ng-if=\"vm.doctrine_adapter\">\n" +
    "      <div class=\"col-sm-12\">\n" +
    "        <h3>Doctrine adapters</h3>\n" +
    "        <table class=\"table table-bordered col-sm-12\">\n" +
    "          <thead>\n" +
    "            <tr>\n" +
    "              <th class=\"col-sm-2\">Adapter name</th>\n" +
    "              <th class=\"col-sm-2\">Configuration</th>\n" +
    "              <th class=\"col-sm-2\">Event Manager</th>\n" +
    "              <th class=\"col-sm-4\">Driver class</th>\n" +
    "              <th class=\"col-sm-2\">Params</th>\n" +
    "            </tr>\n" +
    "          </thead>\n" +
    "          <tbody>\n" +
    "            <tr ng-repeat=\"item in vm.doctrine_adapter\">\n" +
    "              <td>{{item.adapter_name}}</td>\n" +
    "              <td>{{item.configuration}}</td>\n" +
    "              <td>{{item.eventmanager}}</td>\n" +
    "              <td>{{item.driverClass}}</td>\n" +
    "              <td><button type=\"button\" ng-click=\"vm.viewDoctrineParamsModal(item)\" class=\"btn btn-primary btn-xs\"><i class=\"glyphicon glyphicon-search\"></i> view params</button></td>\n" +
    "            </tr>\n" +
    "          </tbody>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/documentation/documentation-api.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/documentation/documentation-api.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-body\">\n" +
    "    <accordion close-others=\"oneAtATime\">\n" +
    "      <accordion-group ng-repeat=\"service in vm.doc.services\" heading=\"{{service.name}}\">\n" +
    "        <accordion>\n" +
    "          <p>{{service.description}}</p>\n" +
    "          <accordion-group ng-repeat=\"(http, collection) in service.operations\">\n" +
    "            <ng-include src=\"'apigility-ui/documentation/documentation-service.html'\"></ng-include>\n" +
    "          </accordion-group>\n" +
    "          <accordion-group ng-repeat=\"(http, collection) in service.entity_operations\">\n" +
    "            <ng-include src=\"'apigility-ui/documentation/documentation-service.html'\"></ng-include>\n" +
    "          </accordion-group>\n" +
    "        </accordion>\n" +
    "      </accordion-gruop>\n" +
    "    </accordion>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/documentation/documentation-list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/documentation/documentation-list.html",
    "<table class=\"table table-bordered\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th class=\"col-md-4\">API name</th>\n" +
    "      <th class=\"col-md-8\">Versions</th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tr ng-repeat=\"api in vm.doc\">\n" +
    "    <td>{{api.name}}</td>\n" +
    "    <td>\n" +
    "      <span ng-repeat=\"ver in api.versions\"><a ui-sref=\"ag.documentation({api: api.name, ver: ver})\">Ver. {{ver}}</a>, </span>\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "</table>\n" +
    "");
}]);

angular.module("apigility-ui/documentation/documentation-service.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/documentation/documentation-service.html",
    "<accordion-heading>\n" +
    "              <span style=\"width:70px\" class=\"badge\">{{http}}</span> {{service.route_collection}}\n" +
    "              <span class=\"pull-right\" ng-if=\"collection.requires_authorization\"><span class=\"glyphicon glyphicon-lock\"></span> requires authentication</span>\n" +
    "            </accordion-heading>\n" +
    "            <p>{{collection.description}}</p>\n" +
    "            <h4 ng-if=\"service.fields\">Fields</h4>\n" +
    "            <table class=\"table table-striped table-bordered\" ng-if=\"service.fields\">\n" +
    "              <thead>\n" +
    "                <tr>\n" +
    "                  <th>Field</th>\n" +
    "                  <th>Description</th>\n" +
    "                  <th class=\"center-block\">Required</th>\n" +
    "                </tr>\n" +
    "              </thead>\n" +
    "              <tbody>\n" +
    "                <tr ng-repeat=\"(field, data) in service.fields\">\n" +
    "                  <td>{{field}}</td>\n" +
    "                  <td>{{data.description}}</td>\n" +
    "                  <td class=\"center-block\"><span ng-if=\"data.required\" class=\"glyphicon glyphicon-ok\"></span></td>\n" +
    "                </tr>\n" +
    "              </tbody>\n" +
    "            </table>\n" +
    "            <div class=\"panel-info\">\n" +
    "              <div class=\"panel-heading\"><h4 class=\"panel-title\">Request</h4></div>\n" +
    "              <div class=\"panel-body\">\n" +
    "                <h4>Headers</h4>\n" +
    "                <table class=\"table table-striped table-bordered\">\n" +
    "                  <thead>\n" +
    "                    <tr>\n" +
    "                      <th>Header</th>\n" +
    "                      <th>Value</th>\n" +
    "                    </tr>\n" +
    "                  </thead>\n" +
    "                  <tbody>\n" +
    "                    <tr>\n" +
    "                      <td>Accept</td>\n" +
    "                      <td class=\"list-group\">\n" +
    "                        <div class=\"list-group-item\" ng-repeat=\"type in service.request_accept_types\">{{type}}</div>\n" +
    "                      </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"collection.requires_authorization\">\n" +
    "                      <td>Authentication</td>\n" +
    "                      <td style=\"color:gray\">HTTP Basic, HTTP Digest, or OAuth2 Bearer token (check API provider for details)</td>\n" +
    "                    </tr>\n" +
    "                  </tbody>\n" +
    "                </table>\n" +
    "                <h4 ng-if=\"http !== 'GET' && http !== 'DELETE'\">Body</h4>\n" +
    "                <pre ng-if=\"http !== 'GET' && http !== 'DELETE'\" class=\"pre-scrollable\">{{collection.request}}</pre>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"panel-info\">\n" +
    "              <div class=\"panel-heading\"><h4 class=\"panel-title\">Response</h4></div>\n" +
    "              <div class=\"panel-body\">\n" +
    "                <h4>Status Codes</h4>\n" +
    "                <ul class=\"list-group\">\n" +
    "                  <li class=\"list-group-item\" ng-repeat=\"status in collection.response_status_codes\"><strong>{{status.code}}:</strong> {{status.message}}</li>\n" +
    "                </ul>\n" +
    "                <h4>Headers</h4>\n" +
    "                <table class=\"table table-striped table-bordered\">\n" +
    "                  <thead>\n" +
    "                    <tr>\n" +
    "                      <th>Header</th>\n" +
    "                      <th>Value</th>\n" +
    "                    </tr>\n" +
    "                  </thead>\n" +
    "                  <tbody>\n" +
    "                    <tr>\n" +
    "                      <td>Content-Type</td>\n" +
    "                      <td class=\"list-group\">\n" +
    "                        <div class=\"list-group-item\" ng-repeat=\"type in service.response_content_types\">{{type}}</div>\n" +
    "                      </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                      <td>Allow</td>\n" +
    "                      <td style=\"color:gray\">Comma-separated list of all HTTP methods allowed</td>\n" +
    "                    </tr>\n" +
    "                  </tbody>\n" +
    "                </table>\n" +
    "                <h4 ng-if=\"http !== 'DELETE'\">Body</h4>\n" +
    "                <pre ng-if=\"http !== 'DELETE'\" class=\"pre-scrollable\">{{collection.response}}</pre>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "");
}]);

angular.module("apigility-ui/documentation/documentation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/documentation/documentation.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h3 class=\"panel-title\">Documentation <span ng-if=\"vm.apiName\"> of <strong>{{vm.apiName}}</strong> (v{{vm.version}})</span></h3>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <ng-include src=\"'apigility-ui/documentation/documentation-list.html'\" ng-if=\"!vm.apiName\"></ng-include>\n" +
    "    <ng-include src=\"'apigility-ui/documentation/documentation-api.html'\" ng-if=\"vm.apiName\"></ng-include>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/header/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/header/header.html",
    "<nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"navbar-header col-sm-4 col-md-3\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a ui-sref=\"ag\" ng-click=\"vm.setSelected('')\"><img id=\"logo\" src=\"apigility-ui/img/logo.png\" alt=\"Apigility\"></a><span id=\"version\"><a ng-click=\"vm.aboutModal()\">version {{vm.apigilityVersion}}</a></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"navbar-collapse collapse\">\n" +
    "      <ul class=\"nav nav-pills nav-justified\">\n" +
    "        <li ng-class=\"{active: ('ag.content' | includedByState)}\"><a ui-sref=\"ag.content\" ng-click=\"vm.setSelected('')\">Content negotiation</a></li>\n" +
    "        <li ng-class=\"{active: ('ag.authentication' | includedByState)}\"><a ui-sref=\"ag.authentication\" ng-click=\"vm.setSelected('')\">Authentication</a></li>\n" +
    "        <li ng-class=\"{active: ('ag.database' | includedByState)}\"><a ui-sref=\"ag.database\" ng-click=\"vm.setSelected('')\">Database</a></li>\n" +
    "        <li ng-class=\"{active: ('ag.documentation' | includedByState)}\"><a ui-sref=\"ag.documentation({api : null, ver : null})\" ng-click=\"vm.setSelected('')\">Documentation</a></li>\n" +
    "        <li ng-class=\"{active: ('ag.package' | includedByState)}\"><a ui-sref=\"ag.package\" ng-click=\"vm.setSelected('')\">Package</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</nav>\n" +
    "");
}]);

angular.module("apigility-ui/modal/about.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/about.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\"><strong>Apigility {{vm.version}}</strong></h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p align=\"center\"><img src=\"apigility-ui/img/ag-hero.png\"></p>\n" +
    "  <p style=\"margin-top:20px\">Apigility is the open source API builder for PHP, the world's easiest way to create high-quality APIs.</p>\n" +
    "  <p>Apigility is made using <a href=\"http://framework.zend.com\" target=\"_blank\">Zend Framework 2</a>, <a href=\"https://angularjs.org/\" target=\"_blank\">AngularJS</a> and <a href=\"http://getbootstrap.com/\" target=\"_blank\">Bootstrap</a>.</p>\n" +
    "  <p>The official web site of the project is <a href=\"https://apigility.org\" target=\"_blank\">apigility.org</a>. If you want to contribute you can <a href=\"https://github.com/zfcampus\" target=\"_blank\">fork the project on github</a>.\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <p class=\"pull-left\">&copy; 2013-2015 by <a href=\"http://www.zend.com\">Zend Technologies</a> Ltd</p>\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Close</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/add-dboption.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/add-dboption.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">Add driver option for <strong>{{vm.db.adapter_name}}</strong></h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Option</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.option\" placeholder=\"Insert the option name\" autofocus>\n" +
    "  <label class=\"control-label\">Value</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.value\" placeholder=\"Insert the option value\">\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Save</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/add-filter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/add-filter.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">Add filter for field {{vm.field.name}}</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Filter</label>\n" +
    "  <select class=\"form-control\" ng-model=\"vm.filter.name\" ng-options=\"name as name for (name, value) in vm.filters\" ng-change=\"vm.selectFilter()\"></select>\n" +
    "  <br />\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"rest_validator_option\" class=\"col-sm-2 control-label\">Option</label>\n" +
    "    <div class=\"col-sm-8\">\n" +
    "      <select class=\"form-control\" ng-model=\"vm.option.name\" ng-options=\"name as name for (name, value) in vm.options\" ng-change=\"vm.option.value=''\"></select>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-2\">\n" +
    "      <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.addOption()\">Add option</span></button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <br />\n" +
    "  <div class=\"form-group\">\n" +
    "    <label class=\"control-label col-sm-2\">Value</label>\n" +
    "    <div class=\"col-sm-8\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.option.value\" placeholder=\"Insert the option value ({{vm.filters[vm.filter.name][vm.option.name]}})\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <br /><br />\n" +
    "  <table class=\"table table-bordered col-md-12\">\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th class=\"col-md-5\">Option</th>\n" +
    "        <th class=\"col-md-5\">Value</th>\n" +
    "        <th class=\"col-md-2\">Action</th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tr ng-repeat=\"(option, value) in vm.filter.options\">\n" +
    "      <td>{{option}}</td>\n" +
    "      <td>{{value}}</td>\n" +
    "      <td><button type=\"button\" ng-click=\"vm.deleteOption(option)\" class=\"btn btn-danger btn-xs\"><i class=\"glyphicon glyphicon-trash\"></i> delete</button></td>\n" +
    "    </tr>\n" +
    "    <tr ng-show=\"vm.filter.options | emptyObject\">\n" +
    "      <td colspan=\"3\">\n" +
    "        No options have been defined</a>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </table>\n" +
    "  <br clear=\"left\" />\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Save</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/add-validator.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/add-validator.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">Add validator for field <strong>{{vm.field.name}}</strong></h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Validator</label>\n" +
    "  <select class=\"form-control\" ng-model=\"vm.validator.name\" ng-options=\"name as name for (name, value) in vm.validators\" ng-change=\"vm.selectValidator()\"></select>\n" +
    "  <br />\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"rest_validator_option\" class=\"col-sm-2 control-label\">Option</label>\n" +
    "    <div class=\"col-sm-8\">\n" +
    "      <select class=\"form-control\" ng-model=\"vm.option.name\" ng-options=\"name as name for (name, value) in vm.options\" ng-change=\"vm.option.value=''\"></select>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-2\">\n" +
    "      <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.addOption()\">Add option</span></button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <br />\n" +
    "  <div class=\"form-group\">\n" +
    "    <label class=\"control-label col-sm-2\">Value</label>\n" +
    "    <div class=\"col-sm-8\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.option.value\" placeholder=\"Insert the option value ({{vm.validators[vm.validator.name][vm.option.name]}})\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <br /><br />\n" +
    "  <table class=\"table table-bordered col-md-12\">\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th class=\"col-md-5\">Option</th>\n" +
    "        <th class=\"col-md-5\">Value</th>\n" +
    "        <th class=\"col-md-2\">Action</th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tr ng-repeat=\"(option, value) in vm.validator.options\">\n" +
    "      <td>{{option}}</td>\n" +
    "      <td>{{value}}</td>\n" +
    "      <td><button type=\"button\" ng-click=\"vm.deleteOption(option)\" class=\"btn btn-danger btn-xs\"><i class=\"glyphicon glyphicon-trash\"></i> delete</button></td>\n" +
    "    </tr>\n" +
    "    <tr ng-show=\"vm.validator.options | emptyObject\">\n" +
    "      <td colspan=\"3\">\n" +
    "        No options have been defined</a>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </table>\n" +
    "  <br clear=\"left\" />\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Save</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/delete-api.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/delete-api.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\" id=\"myModalDeleteService\"><span class=\"glyphicon glyphicon-trash\"></span> Delete API</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <p class=\"modal_msg\">Are you sure to delete the <strong>{{vm.apiName}}</strong> API?</p>\n" +
    "  <p>By default, deleting the API only removes the API module from the application configuration.\n" +
    "  You can re-enable it by re-adding the module to your application configuration at a later date.</p>\n" +
    "\n" +
    "  <p><input type=\"checkbox\" ng-model=\"vm.recursive\" ng-disabled=\"vm.loading\"> Delete all files associated with this API?</p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\" ng-disabled=\"vm.loading\">No</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Yes</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/delete-db.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/delete-db.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\" id=\"myModalDeleteService\"><span class=\"glyphicon glyphicon-trash\"></span> Delete database adapter</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p class=\"modal_msg\">Are you sure to delete the database adapter <strong>{{vm.db.adapter_name}}</strong>?</p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">No</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Yes</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/delete-dboption.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/delete-dboption.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\"><span class=\"glyphicon glyphicon-trash\"></span> Delete driver option</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p class=\"modal_msg\">Are you sure to delete the driver option <strong>{{vm.option}}</strong>?</p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">No</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Yes</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/delete-field.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/delete-field.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\" id=\"myModalDeleteService\"><span class=\"glyphicon glyphicon-trash\"></span> Delete field</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <p class=\"modal_msg\">Are you sure to delete the field <strong>{{vm.field.name}}</strong>?</p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">No</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Yes</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/delete-filter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/delete-filter.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\"><span class=\"glyphicon glyphicon-trash\"></span> Delete driver option</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p class=\"modal_msg\">Are you sure to delete the driver option <strong>{{vm.option}}</strong>?</p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">No</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Yes</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/delete-rest.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/delete-rest.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\" id=\"myModalDeleteService\"><span class=\"glyphicon glyphicon-trash\"></span> Delete REST</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p class=\"modal_msg\">Are you sure to delete the REST service <strong>{{vm.restName}}</strong>?</p>\n" +
    "  <p><input type=\"checkbox\" ng-model=\"vm.recursive\" ng-disabled=\"vm.loading\"> Delete all files and directories for this service</p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">No</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Yes</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/delete-rpc.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/delete-rpc.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\" id=\"myModalDeleteService\"><span class=\"glyphicon glyphicon-trash\"></span> Delete RPC</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p class=\"modal_msg\">Are you sure to delete the RPC service <strong>{{vm.rpcName}}</strong>?</p>\n" +
    "  <p><input type=\"checkbox\" ng-model=\"vm.recursive\" ng-disabled=\"vm.loading\"> Delete all files and directories for this service</p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">No</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Yes</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/delete-selector.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/delete-selector.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\"><span class=\"glyphicon glyphicon-trash\"></span> Delete selector</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <p class=\"modal_msg\">Are you sure to delete the selector <strong>{{vm.selector.content_name}}</strong>?</p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">No</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Yes</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/delete-validator.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/delete-validator.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\" id=\"myModalDeleteService\"><span class=\"glyphicon glyphicon-trash\"></span> Delete validator</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p class=\"modal_msg\">Are you sure to delete the validator <strong>{{vm.validator.name}}</strong>?</p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">No</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Yes</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/delete-viewmodel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/delete-viewmodel.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\"><span class=\"glyphicon glyphicon-trash\"></span> Delete view model</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p class=\"modal_msg\">Are you sure to delete the view model <strong>{{vm.classname}}</strong>?</p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">No</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Yes</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/edit-db.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/edit-db.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">Edit Database Adapter</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Adapter Name</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.db.adapter_name\" readonly><br />\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <label class=\"control-label\">Driver Type</label>\n" +
    "      <select class=\"form-control\" ng-model=\"vm.db.driver\" ng-options=\"option as option for option in vm.driver_types\"></select>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <label class=\"control-label\">Database</label>\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.db.database\" placeholder=\"Insert the database name\"><br />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">DSN</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.db.dsn\" placeholder=\"(Optional) DSN for database\"><br />\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <label class=\"control-label\">Username</label>\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.db.username\" placeholder=\"(Optional) Username\"><br />\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <label class=\"control-label\">Password</label>\n" +
    "      <input type=\"password\" class=\"form-control\" ng-model=\"vm.db.password\" placeholder=\"(Optional) Password\"><br />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Hostname</label>\n" +
    "  <input type=\"password\" class=\"form-control\" ng-model=\"vm.db.hostname\" placeholder=\"(Optional) Hostname\"><br />\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <label class=\"control-label\">Port</label>\n" +
    "      <input type=\"password\" class=\"form-control\" ng-model=\"vm.db.port\" placeholder=\"(Optional) Port\"><br />\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <label class=\"control-label\">Charset</label>\n" +
    "      <input type=\"password\" class=\"form-control\" ng-model=\"vm.db.charset\" placeholder=\"(Optional) Charset\"><br />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Save</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/edit-dboption.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/edit-dboption.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">Edit driver option for <strong>{{vm.db.adapter_name}}</strong> <button type=\"button\" class=\"btn btn-danger btn-sm pull-right\" ng-click=\"vm.deleteDbOptionModal(vm.db, vm.option)\"><span class=\"glyphicon glyphicon-trash\"></span> Delete option</button></h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Option</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.option\" placeholder=\"Insert the option name\" readonly>\n" +
    "  <label class=\"control-label\">Value</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.value\" placeholder=\"Insert the option value\">\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Save</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/edit-field.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/edit-field.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">Edit Field</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Name</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.field.name\" placeholder=\"Insert the Field name\" readonly><br />\n" +
    "  <label class=\"control-label\">Description</label>\n" +
    "  <textarea class=\"form-control\" ng-model=\"vm.field.description\" rows=\"3\" placeholder=\"Insert the description\"></textarea><br />\n" +
    "  <label class=\"col-sm-4 control-label\">File upload?</label>\n" +
    "  <input type=\"checkbox\" ng-model=\"vm.field.type\" value=\"Zend\\InputFilter\\FileInput\" class=\"col-sm-2 control-label\">\n" +
    "  <label class=\"col-sm-4 control-label\">Required</label>\n" +
    "  <input type=\"checkbox\" ng-model=\"vm.field.required\" value=\"Yes\" class=\"col-sm-2 control-label\"><br />\n" +
    "  <label class=\"col-sm-4 control-label\">Allow Empty</label>\n" +
    "  <input type=\"checkbox\" ng-model=\"vm.field.allow_empty\" value=\"Yes\" class=\"col-sm-2 control-label\">\n" +
    "  <label class=\"col-sm-4 control-label\">Continue if Empty</label>\n" +
    "  <input type=\"checkbox\" ng-model=\"vm.field.continue_if_empty\" value=\"Yes\" class=\"col-sm-2 control-label\"><br /><br />\n" +
    "  <label class=\"control-label\">Validation Failure Message</label>\n" +
    "  <textarea class=\"form-control\" ng-model=\"vm.field.error_message\" rows=\"3\" placeholder=\"Insert the failure message\"></textarea>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Save</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/edit-filter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/edit-filter.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">Filter for <strong>{{vm.field.name}}</strong> field <button type=\"button\" class=\"btn btn-danger btn-sm pull-right\" ng-click=\"vm.deleteFilterModal()\" ng-hide=\"vm.disabled\"><span class=\"glyphicon glyphicon-trash\"></span> Delete filter</button></h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Filter</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.filter.name\" readonly>\n" +
    "  <br />\n" +
    "  <div class=\"form-group\">\n" +
    "    <label class=\"col-sm-2 control-label\">Option</label>\n" +
    "    <div class=\"col-sm-8\">\n" +
    "      <select class=\"form-control\" ng-model=\"vm.option.name\" ng-options=\"name as name for (name, value) in vm.options\" ng-change=\"vm.option.value=''\" ng-disabled=\"vm.disabled\"></select>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-2\">\n" +
    "      <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.addOption()\" ng-hide=\"vm.disabled\">Add option</span></button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <br />\n" +
    "  <div class=\"form-group\">\n" +
    "    <label class=\"control-label col-sm-2\">Value</label>\n" +
    "    <div class=\"col-sm-8\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.option.value\" placeholder=\"Insert the option value ({{vm.filters[vm.filter.name][vm.option.name]}})\" ng-disabled=\"vm.disabled\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <br /><br />\n" +
    "  <table class=\"table table-bordered col-md-12\">\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th class=\"col-md-5\">Option</th>\n" +
    "        <th class=\"col-md-5\">Value</th>\n" +
    "        <th class=\"col-md-2\">Action</th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tr ng-repeat=\"(option, value) in vm.filter.options\">\n" +
    "      <td>{{option}}</td>\n" +
    "      <td>{{value}}</td>\n" +
    "      <td><button type=\"button\" ng-click=\"vm.deleteOption(option)\" class=\"btn btn-danger btn-xs\" ng-hide=\"vm.disabled\"><i class=\"glyphicon glyphicon-trash\"></i> delete</button></td>\n" +
    "    </tr>\n" +
    "    <tr ng-show=\"vm.filter.options | emptyObject\">\n" +
    "      <td colspan=\"3\">\n" +
    "        No options have been defined</a>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </table>\n" +
    "  <br clear=\"left\" />\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\" ng-hide=\"vm.disabled\">Save</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/edit-validator.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/edit-validator.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">Validator for <strong>{{vm.field.name}}</strong> field <button type=\"button\" class=\"btn btn-danger btn-sm pull-right\" ng-click=\"vm.deleteValidatorModal()\" ng-hide=\"vm.disabled\"><span class=\"glyphicon glyphicon-trash\"></span> Delete validator</button></h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Validator</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.validator.name\" readonly>\n" +
    "  <br />\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"rest_validator_option\" class=\"col-sm-2 control-label\">Option</label>\n" +
    "    <div class=\"col-sm-8\">\n" +
    "      <select class=\"form-control\" ng-model=\"vm.option.name\" ng-options=\"name as name for (name, value) in vm.options\" ng-change=\"vm.option.value=''\" ng-disabled=\"vm.disabled\"></select>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-2\">\n" +
    "      <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.addOption()\" ng-hide=\"vm.disabled\">Add option</span></button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <br />\n" +
    "  <div class=\"form-group\" ng-disabled=\"vm.disabled\">\n" +
    "    <label class=\"control-label col-sm-2\">Value</label>\n" +
    "    <div class=\"col-sm-8\">\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.option.value\" placeholder=\"Insert the option value ({{vm.validators[vm.validator.name][vm.option.name]}})\" ng-disabled=\"vm.disabled\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <br /><br />\n" +
    "  <table class=\"table table-bordered col-md-12\">\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th class=\"col-md-5\">Option</th>\n" +
    "        <th class=\"col-md-5\">Value</th>\n" +
    "        <th class=\"col-md-2\">Action</th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tr ng-repeat=\"(option, value) in vm.validator.options\">\n" +
    "      <td>{{option}}</td>\n" +
    "      <td>{{value}}</td>\n" +
    "      <td><button type=\"button\" ng-click=\"vm.deleteOption(option)\" class=\"btn btn-danger btn-xs\" ng-hide=\"vm.disabled\"><i class=\"glyphicon glyphicon-trash\"></i> delete</button></td>\n" +
    "    </tr>\n" +
    "    <tr ng-show=\"vm.validator.options | emptyObject\">\n" +
    "      <td colspan=\"3\">\n" +
    "        No options have been defined</a>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </table>\n" +
    "  <br clear=\"left\" />\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\" ng-hide=\"vm.disabled\">Save</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/edit-viewmodel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/edit-viewmodel.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">Edit View Model <button type=\"button\" class=\"btn btn-danger btn-sm pull-right\" ng-click=\"vm.deleteViewModelModal()\"><span class=\"glyphicon glyphicon-trash\"></span> Delete view model</button></h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Name</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.classname\" readonly><br />\n" +
    "  <label class=\"control-label\">Mediatypes</label>\n" +
    "  <tags-input\n" +
    "    ng-model=\"vm.mediatypes\"\n" +
    "    ng-readonly=\"\"\n" +
    "    placeholder=\"Add a media type\"\n" +
    "    add-on-space=\"true\"\n" +
    "    add-on-enter=\"true\"\n" +
    "    add-on-blur=\"true\"\n" +
    "    allowed-tags-pattern=\"^[a-zA-Z-]+/[a-zA-Z0-9*_+.-]+$\"></tags-input>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Save</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/new-api.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/new-api.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">Create new API</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.apiname\" placeholder=\"Insert the API name\" ng-disabled=\"vm.loading\" autofocus>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\" ng-disabled=\"vm.loading\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Create</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/new-db.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/new-db.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">New Database Adapter</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Adapter Name</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.db.adapter_name\" placeholder=\"Insert the adapter name\" autofocus><br />\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <label class=\"control-label\">Driver Type</label>\n" +
    "      <select class=\"form-control\" ng-model=\"vm.db.driver\" ng-options=\"option as option for option in vm.driver_types\"></select>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <label class=\"control-label\">Database</label>\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.db.database\" placeholder=\"Insert the database name\"><br />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">DSN</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.db.dsn\" placeholder=\"(Optional) DSN for database\"><br />\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <label class=\"control-label\">Username</label>\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"vm.db.username\" placeholder=\"(Optional) Username\"><br />\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <label class=\"control-label\">Password</label>\n" +
    "      <input type=\"password\" class=\"form-control\" ng-model=\"vm.db.password\" placeholder=\"(Optional) Password\"><br />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Hostname</label>\n" +
    "  <input type=\"password\" class=\"form-control\" ng-model=\"vm.db.hostname\" placeholder=\"(Optional) Hostname\"><br />\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <label class=\"control-label\">Port</label>\n" +
    "      <input type=\"password\" class=\"form-control\" ng-model=\"vm.db.port\" placeholder=\"(Optional) Port\"><br />\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <label class=\"control-label\">Charset</label>\n" +
    "      <input type=\"password\" class=\"form-control\" ng-model=\"vm.db.charset\" placeholder=\"(Optional) Charset\"><br />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Save</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/new-doctrinestrategy.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/new-doctrinestrategy.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">New Hydrator Strategy</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Field</label>\n" +
    "  <select ng-model=\"vm.field\" class=\"form-control\" ng-options=\"k as v for (k,v) in vm.fields\">\n" +
    "    <option value='' disabled>- Choose a field -</option>\n" +
    "  </select><br>\n" +
    "  <label class=\"control-label\">Strategy</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.strategy\" placeholder=\"Type a declared strategy service name\" ng-disabled=\"vm.loading\" autofocus>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\" ng-disabled=\"vm.loading\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Create</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/new-field.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/new-field.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">New Field</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Name</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.field.name\" placeholder=\"Insert the Field name\" autofocus><br />\n" +
    "  <label class=\"control-label\">Description</label>\n" +
    "  <textarea class=\"form-control\" ng-model=\"vm.field.description\" rows=\"3\" placeholder=\"Insert the description\"></textarea><br />\n" +
    "  <label class=\"col-sm-4 control-label\">File upload?</label>\n" +
    "  <input type=\"checkbox\" ng-model=\"vm.field.type\" value=\"Zend\\InputFilter\\FileInput\" class=\"col-sm-2 control-label\">\n" +
    "  <label class=\"col-sm-4 control-label\">Required</label>\n" +
    "  <input type=\"checkbox\" ng-model=\"vm.field.required\" value=\"Yes\" class=\"col-sm-2 control-label\"><br />\n" +
    "  <label class=\"col-sm-4 control-label\">Allow Empty</label>\n" +
    "  <input type=\"checkbox\" ng-model=\"vm.field.allow_empty\" value=\"Yes\" class=\"col-sm-2 control-label\">\n" +
    "  <label class=\"col-sm-4 control-label\">Continue if Empty</label>\n" +
    "  <input type=\"checkbox\" ng-model=\"vm.field.continue_if_empty\" value=\"Yes\" class=\"col-sm-2 control-label\"><br /><br />\n" +
    "  <label class=\"control-label\">Validation Failure Message</label>\n" +
    "  <textarea class=\"form-control\" ng-model=\"vm.field.error_message\" rows=\"3\" placeholder=\"Insert the failure message\"></textarea>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Save</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/new-selector.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/new-selector.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">Create new Selector</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.selectorname\" placeholder=\"Insert the Selector name\" ng-disabled=\"vm.loading\" autofocus>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\" ng-disabled=\"vm.loading\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Create</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/new-service.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/new-service.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">Create a new service</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <div role=\"tabpanel\">\n" +
    "    <label class=\"control-label\">API</label>\n" +
    "    <select class=\"form-control\" ng-model=\"vm.apiname\" ng-options=\"api.name for api in vm.apis\" ng-disabled=\"vm.loading\"></select>\n" +
    "    <br />\n" +
    "    <label class=\"control-label\">Select the type of service to create</label>\n" +
    "    <br />\n" +
    "    <!-- Nav tabs -->\n" +
    "    <tabset justified=\"true\">\n" +
    "      <tab heading=\"REST\" active=\"vm.tabs.rest\">\n" +
    "        <label for=\"rest_service_name\" class=\"control-label\">Service name</label>\n" +
    "        <input type=\"text\" id=\"rest_service_name\" class=\"form-control\" ng-model=\"vm.restname\" ng-disabled=\"vm.loading\" placeholder=\"Insert the service name\" autofocus>\n" +
    "      </tab>\n" +
    "      <tab heading=\"RPC\" active=\"vm.tabs.rpc\">\n" +
    "        <label for=\"rpc_service_name\" class=\"control-label\">Service name</label>\n" +
    "        <input type=\"text\" id=\"rpc_service_name\" class=\"form-control\" ng-model=\"vm.rpcname\" ng-disabled=\"vm.loading\" placeholder=\"Insert the service name\">\n" +
    "        <br />\n" +
    "        <label for=\"route_match\" class=\"control-label\">Route to match</label>\n" +
    "        <input type=\"text\" id=\"route_match\" class=\"form-control\" ng-model=\"vm.route\" ng-disabled=\"vm.loading\" placeholder=\"Insert the route to match\">\n" +
    "      </tab>\n" +
    "      <tab heading=\"DB Connected\" active=\"vm.tabs.db\">\n" +
    "        <div ng-if=\"vm.db.db_adapter.length === 0\">\n" +
    "          <h3>No DB Adapters Present</h3>\n" +
    "          <p>You have not yet configured any database adapters, and thus cannot create a DB-Connected service. You can create adapters on the <a ui-sref=\"ag.database\" ng-click=\"vm.cancel()\">Database Adapters</a> setting page.\n" +
    "        </div>\n" +
    "        <div ng-if=\"vm.db.db_adapter.length > 0\">\n" +
    "          <label for=\"db_adapter_name\" class=\"control-label\">DB adapter name</label>\n" +
    "          <select class=\"form-control\" id=\"db_adapter_name\" ng-model=\"vm.adapter\" ng-options=\"db.adapter_name for db in vm.db.db_adapter\" ng-change=\"vm.discoverDb()\">\n" +
    "            <option value=\"\" disabled>- Choose an adapter -</option>\n" +
    "          </select>\n" +
    "          <!--<br />\n" +
    "          <label for=\"rtable_name\" class=\"control-label\">Table name</label>\n" +
    "          <input type=\"text\" class=\"form-control\" ng-model=\"vm.table_name\" ng-disabled=\"vm.loading\" placeholder=\"Insert the table name\">-->\n" +
    "        </div>\n" +
    "        <div ui-tree class=\"angular-ui-tree\" id=\"db-tables-tree\" data-max-depth=\"2\" ng-if=\"(vm.tables && vm.tables.length > 0) || vm.discovering\">\n" +
    "          <label class=\"control-label\">Tables<span class=\"glyphicon glyphicon-refresh glyphicon-spin\" ng-if=\"vm.discovering\"></span></label>\n" +
    "          <ol ui-tree-nodes=\"options\" ng-model=\"vm.tables\" class=\"angular-ui-tree-nodes\">\n" +
    "            <li class=\"angular-ui-tree-node\" ng-repeat=\"table in vm.tables\" ui-tree-node collapsed=\"true\">\n" +
    "              <div class=\"tree-node\">\n" +
    "                <div class=\"pull-left tree-handle angular-ui-tree-handle\" ui-tree-handle>\n" +
    "                  <span class=\"glyphicon glyphicon-list\"></span>\n" +
    "                </div>\n" +
    "                <div class=\"tree-node-content\">\n" +
    "                  <a class=\"btn btn-default btn-xs\" ng-click=\"vm.toggle(this)\" data-nodrag=\"\">\n" +
    "                    <span ng-class=\"{'glyphicon-chevron-right': collapsed, 'glyphicon-chevron-down': !collapsed}\" class=\"glyphicon glyphicon-chevron-down\"></span>\n" +
    "                  </a>\n" +
    "                  <span>{{table.table_name}}</span>\n" +
    "                  <input type=\"checkbox\" class=\"pull-right\" checklist-model=\"vm.dbServices\" checklist-value=\"table\">\n" +
    "                  <div class=\"clearfix\"></div>\n" +
    "                  <div ng-class=\"{hidden: collapsed}\">\n" +
    "                    <table class=\"table table-bordered\">\n" +
    "                      <caption>Fields</caption>\n" +
    "                      <thead>\n" +
    "                      <tr>\n" +
    "                        <th class=\"col-sm-3\">Column</th>\n" +
    "                        <th class=\"col-sm-4\">Type (Length)</th>\n" +
    "                        <th class=\"col-sm-2\">Required</th>\n" +
    "                        <th class=\"col-sm-3\">Constraints</th>\n" +
    "                      </tr>\n" +
    "                      </thead>\n" +
    "                      <tbody>\n" +
    "                      <tr ng-repeat=\"column in table.columns\">\n" +
    "                        <td>{{column.name}}</td>\n" +
    "                        <td>{{column.type}}<span ng-show=\"column['length']\"> ({{column['length']}})</span></td>\n" +
    "                        <td><i class=\"glyphicon glyphicon-ok\" ng-if=\"!!column.required\"></i></td>\n" +
    "                        <td>{{column.constraints.join(', ')}}</td>\n" +
    "                      </tr>\n" +
    "                      </tbody>\n" +
    "                    </table>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </li>\n" +
    "          </ol>\n" +
    "        </div>\n" +
    "      </tab>\n" +
    "      <tab heading=\"Doctrine Connected\" ng-if=\"vm.doctrine\" active=\"vm.tabs.doctrine\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"doctrine_entity_manager\" class=\"control-label\">Entity Manager</label>\n" +
    "          <select class=\"form-control\" id=\"doctrine_entity_manager\" ng-model=\"vm.doctrineAdapter\" ng-options=\"doctrine.adapter_name for doctrine in vm.doctrine\" ng-change=\"vm.discoverDoctrine()\" ng-disabled=\"vm.discovering\">\n" +
    "            <option value=\"\" disabled>- Choose an adapter -</option>\n" +
    "          </select>\n" +
    "        </div>\n" +
    "        <div ui-tree class=\"angular-ui-tree\" id=\"db-entities-tree\" data-max-depth=\"2\" ng-if=\"(vm.entities && vm.entities.length > 0 ) || vm.discovering\">\n" +
    "          <label class=\"control-label\">Entities<span class=\"glyphicon glyphicon-refresh glyphicon-spin\" ng-if=\"vm.discovering\"></span></label>\n" +
    "          <ol ui-tree-nodes=\"options\" ng-model=\"vm.entities\" class=\"angular-ui-tree-nodes\">\n" +
    "            <li class=\"angular-ui-tree-node\" ng-repeat=\"entity in vm.entities\" ui-tree-node>\n" +
    "              <div class=\"tree-node\">\n" +
    "                <div class=\"pull-left tree-handle angular-ui-tree-handle\" ui-tree-handle>\n" +
    "                  <span class=\"glyphicon glyphicon-list\"></span>\n" +
    "                </div>\n" +
    "                <div class=\"tree-node-content\">\n" +
    "                  <span>{{entity.entity_class}}</span>\n" +
    "                  <input type=\"checkbox\" class=\"pull-right\" checklist-model=\"vm.doctrineEntities\" checklist-value=\"entity\">\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </li>\n" +
    "          </ol>\n" +
    "        </div>\n" +
    "      </tab>\n" +
    "    </tabset>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\" ng-disabled=\"vm.loading\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Create service</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/new-version.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/new-version.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\" id=\"myModalVersion\">New API version</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <p class=\"modal_msg\">Do you want to create <strong>version {{vm.newVersion}}</strong> for <strong>{{vm.apiName}}</strong> API?</p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">No</button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-sm\"  ng-click=\"vm.ok()\" ladda=\"vm.loading\">Yes</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/new-viewmodel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/new-viewmodel.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">New View Model</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"alert alert-danger\" role=\"alert\" ng-hide=\"!vm.alert\">\n" +
    "    <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> {{vm.alert}}\n" +
    "  </div>\n" +
    "  <label class=\"control-label\">Name</label>\n" +
    "  <input type=\"text\" class=\"form-control\" ng-model=\"vm.classname\" placeholder=\"Insert the View Model class\" autofocus><br />\n" +
    "  <label class=\"control-label\">Mediatypes</label>\n" +
    "  <tags-input\n" +
    "    ng-model=\"vm.mediatypes\"\n" +
    "    ng-readonly=\"\"\n" +
    "    placeholder=\"Add a media type\"\n" +
    "    add-on-space=\"true\"\n" +
    "    add-on-enter=\"true\"\n" +
    "    add-on-blur=\"true\"\n" +
    "    allowed-tags-pattern=\"^[a-zA-Z-]+/[a-zA-Z0-9*_+.-]+$\"></tags-input>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Close</button>\n" +
    "  <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"vm.ok()\" ladda=\"vm.loading\">Save</span></button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/modal/view-doctrineparams.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/modal/view-doctrineparams.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">View Doctrine Adapter Parameters</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <form class=\"form-horizontal\" id=\"doctrine-params\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label class=\"col-sm-3 control-label\">Driver Class:</label>\n" +
    "      <div class=\"col-sm-9\">\n" +
    "        <p class=\"form-control-static\">{{vm.adapter.driverClass}}</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label class=\"col-sm-3 control-label\">Host:</label>\n" +
    "      <div class=\"col-sm-9\">\n" +
    "        <p class=\"form-control-static\">{{vm.adapter.params.host}}</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label class=\"col-sm-3 control-label\">Port:</label>\n" +
    "      <div class=\"col-sm-9\">\n" +
    "        <p class=\"form-control-static\">{{vm.adapter.params.port}}</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label class=\"col-sm-3 control-label\">Charset:</label>\n" +
    "      <div class=\"col-sm-9\">\n" +
    "        <p class=\"form-control-static\">{{vm.adapter.params.charset}}</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label class=\"col-sm-3 control-label\">User:</label>\n" +
    "      <div class=\"col-sm-9\">\n" +
    "        <p class=\"form-control-static\">{{vm.adapter.params.user}}</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label class=\"col-sm-3 control-label\">Database:</label>\n" +
    "      <div class=\"col-sm-9\">\n" +
    "        <p class=\"form-control-static\">{{vm.adapter.params.dbname}}</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"vm.ok()\">Close</button>\n" +
    "</div>");
}]);

angular.module("apigility-ui/package/package.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/package/package.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h3 class=\"panel-title\">Package</h3>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <form class=\"form-horizontal\" role=\"form\" unsaved-warning-form>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label class=\"col-sm-3 control-label\">Package format</label>\n" +
    "        <div class=\"col-sm-2\">\n" +
    "          <select class=\"form-control\" ng-model=\"vm.format\">\n" +
    "            <option>ZIP</option>\n" +
    "            <option>TAR</option>\n" +
    "            <option>TGZ (tar.gz)</option>\n" +
    "            <option>ZPK</option>\n" +
    "          </select>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-6\">\n" +
    "          <span class=\"help-block\"><span class=\"glyphicon glyphicon-info-sign\" aria-hidden=\"true\"></span> ZPK is the file format of <a href=\"http://www.zend.com/en/products/server\" target=\"_blank\">Zend Server</a></span>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label class=\"col-sm-3 control-label\">APIs to include in the package</label>\n" +
    "        <div class=\"col-sm-8\">\n" +
    "          <span ng-repeat=\"api in vm.apis\">\n" +
    "            <input type=\"checkbox\" checklist-model=\"vm.modules\" checklist-value=\"api.name\" ng-change=\"vm.change()\"> {{api.name}}\n" +
    "          </span>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label class=\"col-sm-3 control-label\">Include the <i>vendor</i> folder?</label>\n" +
    "        <div class=\"col-sm-2\">\n" +
    "          <input type=\"checkbox\" ng-model=\"vm.vendor\" value=\"Yes\"><br />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label class=\"col-sm-3 control-label\">Execute composer?</label>\n" +
    "        <div class=\"col-sm-2\">\n" +
    "          <input type=\"checkbox\" ng-model=\"vm.composer\" value=\"Yes\"><br />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label class=\"col-sm-3 control-label\">Parse the .gitignore to exclude files?</label>\n" +
    "        <div class=\"col-sm-2\">\n" +
    "          <input type=\"checkbox\" ng-model=\"vm.gitignore\" value=\"Yes\"><br />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label class=\"col-sm-3 control-label\">Application config to include</label>\n" +
    "        <div class=\"col-sm-8\">\n" +
    "          <input type=\"text\" class=\"form-control\" ng-model=\"vm.config\" placeholder=\"Insert the path of the config files to include\"><br />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"panel panel-default\" ng-if=\"vm.format === 'ZPK'\">\n" +
    "        <div class=\"panel-heading\">Zend Server ZPK options</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"col-sm-3 control-label\">Path to a custom deployment.xml</label>\n" +
    "            <div class=\"col-sm-8\">\n" +
    "              <input type=\"text\" class=\"form-control\" ng-model=\"vm.xml\" placeholder=\"Insert the path of deployment.xml (optional)\"><br />\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"col-sm-3 control-label\">Directory containing ZPK package assets</label>\n" +
    "            <div class=\"col-sm-8\">\n" +
    "              <input type=\"text\" class=\"form-control\" ng-model=\"vm.zpkpackage\" placeholder=\"Insert the path of directory containing ZPK package assets (optional)\"><br />\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"col-sm-3 control-label\">Application version</label>\n" +
    "            <div class=\"col-sm-8\">\n" +
    "              <input type=\"text\" class=\"form-control\" ng-model=\"vm.zpkversion\" placeholder=\"Insert the application version to be used in ZPK package (optional)\"><br />\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\" style=\"margin-top:30px\">\n" +
    "        <div class=\"col-sm-offset-3 col-sm-4\">\n" +
    "          <button type=\"submit\" class=\"btn btn-success\" ng-click=\"vm.saveGeneral()\" ladda=\"vm.loading\">Generate package</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/rest/rest.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/rest/rest.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h3 class=\"panel-title\">\n" +
    "      <span class=\"glyphicon glyphicon-leaf\"></span> REST service: {{vm.restName}} (v{{vm.version}})\n" +
    "      <button class=\"btn btn-danger pull-right\" ng-click=\"vm.deleteRestModal()\" ng-hide=\"vm.disabled\"><span class=\"glyphicon glyphicon-trash\"></span> Delete service</button>\n" +
    "    </h3>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "      <tabset>\n" +
    "        <tab heading=\"General Settings\" active=\"vm.tabs.general_settings\">\n" +
    "          <form class=\"form-horizontal\" role=\"form\" unsaved-warning-form>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"rest_name\" class=\"col-sm-2 control-label\">Name</label>\n" +
    "              <div class=\"col-sm-4\">\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"rest_name\" ng-model=\"vm.rest.service_name\" readonly>\n" +
    "              </div>\n" +
    "              <label for=\"rest_page_size\" class=\"col-sm-2 control-label\">Page size</label>\n" +
    "              <div class=\"col-sm-4\">\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"rest_page_size\" ng-model=\"vm.rest.page_size\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"col-sm-2 control-label\">Route matches</label>\n" +
    "              <div class=\"col-sm-4\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"vm.rest.route_match\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\">\n" +
    "              </div>\n" +
    "              <label class=\"col-sm-2 control-label\">HTTP Entity Methods</label>\n" +
    "              <div class=\"col-sm-4\">\n" +
    "              <span ng-repeat=\"http in vm.httpMethods\">\n" +
    "                <input type=\"checkbox\" checklist-model=\"vm.rest.entity_http_methods\" checklist-value=\"http\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\"> {{http}}\n" +
    "              </span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"col-sm-2 control-label\">Route identifier name</label>\n" +
    "              <div class=\"col-sm-4\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"vm.rest.route_identifier_name\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\">\n" +
    "              </div>\n" +
    "              <label class=\"col-sm-2 control-label\">HTTP Collection Methods</label>\n" +
    "              <div class=\"col-sm-4\">\n" +
    "              <span ng-repeat=\"http in vm.httpMethods\">\n" +
    "                <input type=\"checkbox\" checklist-model=\"vm.rest.collection_http_methods\" checklist-value=\"http\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\"> {{http}}\n" +
    "              </span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"rest_entity_id\" class=\"col-sm-2 control-label\">Entity identifier name</label>\n" +
    "              <div class=\"col-sm-4\">\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"rest_entity_id\" ng-model=\"vm.rest.entity_identifier_name\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\">\n" +
    "              </div>\n" +
    "              <label for=\"rest_page_size_parameter\" class=\"col-sm-2 control-label\">Page Size Parameter</label>\n" +
    "              <div class=\"col-sm-4\">\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"rest_page_size_parameter\" ng-model=\"vm.rest.page_size_param\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-if=\"!vm.isDoctrine\">\n" +
    "              <label for=\"rest_hydrator\" class=\"col-sm-2 control-label\">Hydrator Service Name</label>\n" +
    "              <div class=\"col-sm-4\">\n" +
    "                <select class=\"form-control\" ng-model=\"vm.rest.hydrator_name\" ng-options=\"hydrator for hydrator in vm.hydrators\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\"></select>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"rest_query_white_list\" class=\"col-sm-2 control-label\">Collection Query String Whitelist</label>\n" +
    "              <div class=\"col-sm-4\">\n" +
    "                <tags-input\n" +
    "                    ng-model=\"vm.rest.collection_query_whitelist\"\n" +
    "                    ng-hide=\"vm.disabled\"\n" +
    "                    ng-change=\"vm.change(0)\"\n" +
    "                    placeholder=\"Insert query whitelist\"\n" +
    "                    add-on-space=\"true\"\n" +
    "                    add-on-enter=\"true\"\n" +
    "                    add-on-blur=\"true\"\n" +
    "                    allowed-tags-pattern=\"^[a-zA-Z0-9_+.-]+$\"></tags-input>\n" +
    "                <span ng-repeat=\"collection in vm.rest.collection_query_whitelist\" ng-show=\"vm.disabled\">{{collection.text}}, </span>\n" +
    "              </div>\n" +
    "              <label for=\"rest_collection_name\" class=\"col-sm-2 control-label\">Collection Name</label>\n" +
    "              <div class=\"col-sm-4\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"vm.rest.collection_name\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"rest_entity_class\" class=\"col-sm-2 control-label\">Entity Class</label>\n" +
    "              <div class=\"col-sm-4\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"vm.rest.entity_class\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\">\n" +
    "              </div>\n" +
    "              <label for=\"rest_collection_class\" class=\"col-sm-2 control-label\">Collection Class</label>\n" +
    "              <div class=\"col-sm-4\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"vm.rest.collection_class\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" style=\"margin-top:30px\">\n" +
    "              <div class=\"col-sm-offset-2 col-sm-4\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.resetGeneral()\" unsaved-warning-clear ng-hide=\"vm.disabled\">Reset</button>\n" +
    "                <button type=\"submit\" class=\"btn btn-success\" ng-click=\"vm.saveGeneral()\" ladda=\"vm.loading\" ng-hide=\"vm.disabled\">Save</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </tab>\n" +
    "        <tab heading=\"Database Settings\" active=\"vm.tabs.db\" ng-if=\"vm.rest.table_name\">\n" +
    "          <form class=\"form-horizontal\" role=\"form\" unsaved-warning-form>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"db_adapter_name\" class=\"col-sm-2 control-label\">Adapter name</label>\n" +
    "              <div class=\"col-sm-8\">\n" +
    "                <select class=\"form-control\" id=\"db_adapter_name\" ng-model=\"vm.adapter\" ng-options=\"db.adapter_name for db in vm.db.db_adapter\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\"></select>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"table_name\" class=\"col-sm-2 control-label\">Table name</label>\n" +
    "              <div class=\"col-sm-8\">\n" +
    "                <input type=\"text\" id=\"table_name\" class=\"form-control\" ng-model=\"vm.rest.table_name\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"tg_service\" class=\"col-sm-2 control-label\">TableGateway Service Name</label>\n" +
    "              <div class=\"col-sm-8\">\n" +
    "                <input type=\"text\" id=\"tg_service\" class=\"form-control\" ng-model=\"vm.rest.table_service\" readonly>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" style=\"margin-top:30px\">\n" +
    "              <div class=\"col-sm-offset-2 col-sm-4\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.resetGeneral()\" unsaved-warning-clear ng-hide=\"vm.disabled\">Reset</button>\n" +
    "                <button type=\"submit\" class=\"btn btn-success\" ng-click=\"vm.saveGeneral()\" ladda=\"vm.loading\" ng-hide=\"vm.disabled\">Save</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </tab>\n" +
    "        <tab heading=\"Doctrine Settings\" active=\"vm.tabs.doctrine\" ng-if=\"vm.isDoctrine\">\n" +
    "          <form class=\"form-horizontal\" role=\"form\" unsaved-warning-form>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"doctrine_object_manager\" class=\"col-sm-2 control-label\">Object Manager</label>\n" +
    "              <div class=\"col-sm-8\">\n" +
    "                <select class=\"form-control\" id=\"doctrine_object_manager\" ng-model=\"vm.rest.object_manager\" ng-options=\"om.adapter_name as om.adapter_name for om in vm.doctrine track by vm.rest.object_manager\" ng-change=\"vm.change(1)\"></select>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"doctrine_hydrator_service\" class=\"col-sm-2 control-label\">Hydrator Service</label>\n" +
    "              <div class=\"col-sm-8\">\n" +
    "                <input type=\"text\" id=\"doctrine_hydrator_service\" class=\"form-control\" ng-model=\"vm.rest.hydrator_name\" readonly>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"col-sm-2 control-label\">Hydrator strategies<br><button type=\"button\" class=\"btn btn-xs btn-primary\" ng-click=\"vm.newDoctrineStrategyModal()\"><span class=\"glyphicon glyphicon-plus\"></span></button></label>\n" +
    "              <div class=\"col-sm-8\">\n" +
    "                <table class=\"table table-bordered\">\n" +
    "                  <thead>\n" +
    "                    <tr>\n" +
    "                      <th class=\"col-md-3\">Field</th>\n" +
    "                      <th class=\"col-md-8\">Strategy</th>\n" +
    "                      <th class=\"col-md-1\">&nbsp;</th>\n" +
    "                    </tr>\n" +
    "                  </thead>\n" +
    "                  <tbody>\n" +
    "                    <tr ng-if=\"vm.rest.strategies.length == 0\">\n" +
    "                      <td colspan=\"3\">No hydrator strategy configured<span ng-hide=\"vm.disabled\">, <a ng-click=\"vm.newDoctrineStrategyModal()\">create the first one</a></span></td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-repeat=\"(k,v) in vm.rest.strategies\">\n" +
    "                      <td>{{k}}</td>\n" +
    "                      <td>{{v}}</td>\n" +
    "                      <td><button type=\"button\" class=\"btn btn-xs btn-danger\" ng-click=\"vm.removeStrategy(k)\"><span class=\"glyphicon glyphicon-minus\"></span></button></td>\n" +
    "                    </tr>\n" +
    "                  </tbody>\n" +
    "                </table>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "              <div class=\"col-sm-offset-2 col-sm-6\">\n" +
    "                <div class=\"checkbox\">\n" +
    "                  <label>\n" +
    "                    <input type=\"checkbox\" ng-model=\"vm.rest.by_value\">Hydrate by value\n" +
    "                  </label>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            <div class=\"form-group\" style=\"margin-top:30px\">\n" +
    "              <div class=\"col-sm-offset-3 col-sm-4\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.resetGeneral()\" unsaved-warning-clear>Reset</button>\n" +
    "                <button type=\"submit\" class=\"btn btn-success\" ng-click=\"vm.saveGeneral()\" ladda=\"vm.loading\">Save</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </tab>\n" +
    "        <tab heading=\"Content Negotiation\" active=\"vm.tabs.content_negotiation\">\n" +
    "          <form class=\"form-horizontal\" role=\"form\" unsaved-warning-form>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"rest_content_negotiation\" class=\"col-sm-2 control-label\">Content Negotiation Selector</label>\n" +
    "              <div class=\"col-sm-8\">\n" +
    "                <select class=\"form-control\" ng-model=\"vm.rest.selector\" ng-options=\"selector.content_name for selector in vm.content_negotiation\" ng-change=\"vm.change(2)\" ng-disabled=\"vm.disabled\"></select>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"col-sm-2 control-label\">Accept whitelist</label>\n" +
    "              <div class=\"col-sm-8\">\n" +
    "                <tags-input\n" +
    "                    ng-hide=\"vm.disabled\"\n" +
    "                    ng-click=\"vm.change(2)\"\n" +
    "                    ng-change=\"vm.change(1)\"\n" +
    "                    ng-model=\"vm.tags.accept_whitelist\"\n" +
    "                    placeholder=\"Add a mediatype\"\n" +
    "                    add-on-space=\"true\"\n" +
    "                    add-on-enter=\"true\"\n" +
    "                    add-on-blur=\"true\"\n" +
    "                    allowed-tags-pattern=\"^[a-zA-Z0-9_+.-]+$\"></tags-input>\n" +
    "                <span ng-repeat=\"accept in vm.tags.accept_whitelist\" ng-show=\"vm.disabled\">{{accept.text}}, </span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"col-sm-2 control-label\">Content-Type whitelist</label>\n" +
    "              <div class=\"col-sm-8\">\n" +
    "                <tags-input\n" +
    "                    ng-hide=\"vm.disabled\"\n" +
    "                    ng-click=\"vm.change(2)\"\n" +
    "                    ng-change=\"vm.change(2)\"\n" +
    "                    ng-model=\"vm.tags.content_type_whitelist\"\n" +
    "                    placeholder=\"Add a content type\"\n" +
    "                    add-on-space=\"true\"\n" +
    "                    add-on-enter=\"true\"\n" +
    "                    add-on-blur=\"true\"\n" +
    "                    allowed-tags-pattern=\"^[a-zA-Z0-9_+.-]+$\"></tags-input>\n" +
    "                <span ng-repeat=\"content in vm.tags.content_type_whitelist\" ng-show=\"vm.disabled\">{{content.text}}, </span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" style=\"margin-top:30px\">\n" +
    "              <div class=\"col-sm-offset-2 col-sm-4\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.resetContentNegotiation()\" unsaved-warning-clear ng-hide=\"vm.disabled\">Reset</button>\n" +
    "                <button type=\"submit\" class=\"btn btn-success\" ng-click=\"vm.saveContentNegotiation()\" ladda=\"vm.loading\" ng-hide=\"vm.disabled\">Save</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </tab>\n" +
    "        <tab heading=\"Fields\" active=\"vm.tabs.fields\">\n" +
    "          <h3>Fields <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.newFieldModal()\" ng-hide=\"vm.disabled\">New field</button></h3>\n" +
    "          <div class=\"form-group\">\n" +
    "            <table class=\"table table-bordered\">\n" +
    "              <thead>\n" +
    "              <tr>\n" +
    "                <th class=\"col-md-2\">Name</th>\n" +
    "                <th class=\"col-md-1\">Required</th>\n" +
    "                <th class=\"col-md-3\">Validator</th>\n" +
    "                <th class=\"col-md-3\">Filter</th>\n" +
    "                <th class=\"col-md-3\">Action</th>\n" +
    "              </tr>\n" +
    "              </thead>\n" +
    "              <tr ng-repeat=\"field in vm.rest.fields\">\n" +
    "                <td>{{field.name}}</td>\n" +
    "                <td><span ng-if=\"field.required\" class=\"glyphicon glyphicon-ok\"></span></td>\n" +
    "                <td>\n" +
    "                  <button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"vm.addValidatorModal(field)\" ng-hide=\"vm.disabled\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
    "                  <span ng-repeat=\"validator in field.validators\"><a ng-click=\"vm.editValidatorModal(field, validator)\">{{validator.name}}</a>, </span>\n" +
    "                  <span ng-if=\"field.validators.length == 0\">No validators</span>\n" +
    "                </td>\n" +
    "                <td>\n" +
    "                  <button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"vm.addFilterModal(field)\" ng-hide=\"vm.disabled\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
    "                  <span ng-repeat=\"filter in field.filters\"><a ng-click=\"vm.editFilterModal(field, filter)\">{{filter.name}}</a>, </span>\n" +
    "                  <span ng-if=\"field.filters.length == 0\">No filters</span>\n" +
    "                </td>\n" +
    "                <td>\n" +
    "                  <button type=\"button\" ng-click=\"vm.editFieldModal(field)\" class=\"btn btn-success btn-xs\" ng-hide=\"vm.disabled\"><i class=\"glyphicon glyphicon-pencil\"></i> edit</button> <button type=\"button\" ng-click=\"vm.deleteFieldModal(field)\" class=\"btn btn-danger btn-xs\" ng-hide=\"vm.disabled\"><i class=\"glyphicon glyphicon-trash\"></i> delete</button>\n" +
    "                </td>\n" +
    "              </tr>\n" +
    "              <tr ng-if=\"vm.rest.fields.length == 0\">\n" +
    "                <td colspan=\"5\">\n" +
    "                  No fields have been configured<span ng-hide=\"vm.disabled\">, <a ng-click=\"vm.newFieldModal()\">create the first one</a></span>\n" +
    "                </td>\n" +
    "              </tr>\n" +
    "            </table>\n" +
    "          </div>\n" +
    "        </tab>\n" +
    "        <tab heading=\"Authorization\" active=\"vm.tabs.authorization\">\n" +
    "          <form class=\"form-horizontal\" role=\"form\" unsaved-warning-form>\n" +
    "            <h3>HTTP methods authorization</h3>\n" +
    "            <p ng-hide=\"vm.disabled\">In this page you can specify which HTTP methods to put under authentication, for your entity and collection service.\n" +
    "              You can choose only the HTTP methods available for the service, if you want to change it go to <a href=\"\">General Settings</a>.\n" +
    "              The authentication type is defined per API in <a ui-sref=\"ag.apimodule({api: vm.apiName, ver: vm.version})\">this page</a>.</p>\n" +
    "            <br />\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"col-sm-2 control-label\">Entity authorization</label>\n" +
    "              <div class=\"col-sm-8\">\n" +
    "              <span ng-repeat=\"http in vm.httpMethods\">\n" +
    "                <input type=\"checkbox\" checklist-model=\"vm.auth.entity\" checklist-value=\"http\" ng-change=\"vm.change(3)\" ng-disabled=\"vm.rest.entity_http_methods.indexOf(http) < 0 || vm.disabled\"> {{http}}\n" +
    "              </span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"col-sm-2 control-label\">Collection authorization</label>\n" +
    "              <div class=\"col-sm-8\">\n" +
    "              <span ng-repeat=\"http in vm.httpMethods\">\n" +
    "                <input type=\"checkbox\" checklist-model=\"vm.auth.collection\" checklist-value=\"http\" ng-change=\"vm.change(3)\" ng-disabled=\"vm.rest.collection_http_methods.indexOf(http) < 0 || vm.disabled\"> {{http}}\n" +
    "              </span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" style=\"margin-top:30px\">\n" +
    "              <div class=\"col-sm-offset-2 col-sm-4\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.resetAuthorization()\" unsaved-warning-clear ng-hide=\"vm.disabled\">Reset</button>\n" +
    "                <button type=\"submit\" class=\"btn btn-success\" ng-click=\"vm.saveAuthorization()\" ladda=\"vm.loading\" ng-hide=\"vm.disabled\">Save</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </tab>\n" +
    "        <tab heading=\"Documentation\" active=\"vm.tabs.documentation\">\n" +
    "          <form class=\"form-horizontal\" role=\"form\" unsaved-warning-form>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"col-sm-2 control-label\">REST service description</label>\n" +
    "              <div class=\"col-sm-10\">\n" +
    "                <textarea class=\"form-control\" ng-model=\"vm.rest.documentation.description\" placeholder=\"Insert the description here\" ng-change=\"vm.change(4)\" ng-disabled=\"vm.disabled\"></textarea>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <tabset justified=\"true\" class=\"col-sm-12\">\n" +
    "                <tab heading=\"Collection\" active=\"vm.tabs.doc.collection\">\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Description</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                      <textarea class=\"form-control\" ng-model=\"vm.rest.documentation.collection.description\" placeholder=\"Insert the Collection description here\" ng-change=\"vm.change(4)\" ng-disabled=\"vm.disabled\"></textarea>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <tabset justified=\"true\" class=\"col-sm-12\">\n" +
    "                      <tab ng-repeat=\"http in vm.rest.collection_http_methods\" heading=\"{{http}}\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                          <label class=\"col-sm-2 control-label\">Description</label>\n" +
    "                          <div class=\"col-sm-10\">\n" +
    "                            <textarea class=\"form-control\" ng-model=\"vm.rest.documentation.collection[http].description\" placeholder=\"Insert the description here\" ng-change=\"vm.change(4)\" ng-disabled=\"vm.disabled\"></textarea>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\" ng-if=\"http !== 'GET'\">\n" +
    "                          <label class=\"col-sm-2 control-label\">Request Body</label>\n" +
    "                          <div class=\"col-sm-10\">\n" +
    "                            <textarea class=\"form-control\" ng-model=\"vm.rest.documentation.collection[http].request\" placeholder=\"Insert the request specification\" ng-change=\"vm.change(4)\" ng-disabled=\"vm.disabled\"></textarea>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                          <label class=\"col-sm-2 control-label\">Response Body</label>\n" +
    "                          <div class=\"col-sm-10\">\n" +
    "                            <textarea class=\"form-control\" ng-model=\"vm.rest.documentation.collection[http].response\" placeholder=\"Insert the response specification\" ng-change=\"vm.change(4)\" ng-disabled=\"vm.disabled\"></textarea>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </tab>\n" +
    "                    </tabset>\n" +
    "                  </div>\n" +
    "                </tab>\n" +
    "                <tab heading=\"Entity\" active=\"vm.tabs.doc.entity\">\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Description</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                      <textarea class=\"form-control\" ng-model=\"vm.rest.documentation.entity.description\" placeholder=\"Insert the Entity description here\" ng-change=\"vm.change(4)\" ng-disabled=\"vm.disabled\"></textarea>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <tabset justified=\"true\" class=\"col-sm-12\">\n" +
    "                      <tab ng-repeat=\"http in vm.rest.entity_http_methods\" heading=\"{{http}}\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                          <label class=\"col-sm-2 control-label\">Description</label>\n" +
    "                          <div class=\"col-sm-10\">\n" +
    "                            <textarea class=\"form-control\" ng-model=\"vm.rest.documentation.entity[$index].description\" placeholder=\"Insert the description here\" ng-change=\"vm.change(4)\" ng-disabled=\"vm.disabled\"></textarea>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\" ng-if=\"http !== 'GET'\">\n" +
    "                          <label class=\"col-sm-2 control-label\">Request Body</label>\n" +
    "                          <div class=\"col-sm-10\">\n" +
    "                            <textarea class=\"form-control\" ng-model=\"vm.rest.documentation.entity[$index].request\" placeholder=\"Insert the request specification\" ng-change=\"vm.change(3)\" ng-disabled=\"vm.disabled\"></textarea>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                          <label class=\"col-sm-2 control-label\">Response Body</label>\n" +
    "                          <div class=\"col-sm-10\">\n" +
    "                            <textarea class=\"form-control\" ng-model=\"vm.rest.documentation.entity[$index].response\" placeholder=\"Insert the response specification\" ng-change=\"vm.change(4)\" ng-disabled=\"vm.disabled\"></textarea>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </tab>\n" +
    "                    </tabset>\n" +
    "                  </div>\n" +
    "                </tab>\n" +
    "              </tabset>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" style=\"margin-top:30px\">\n" +
    "              <div class=\"col-sm-offset-2 col-sm-4\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.resetDocumentation()\" unsaved-warning-clear ng-hide=\"vm.disabled\">Reset</button>\n" +
    "                <button type=\"submit\" class=\"btn btn-success\" ng-click=\"vm.saveDocumentation()\" ladda=\"vm.loading\" ng-hide=\"vm.disabled\">Save</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </tab>\n" +
    "        <tab heading=\"Source code\" active=\"vm.tabs.sourcecode\">\n" +
    "          <form class=\"form-inline\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"control-label\">Select the file to open</label>\n" +
    "              <select class=\"form-control\">\n" +
    "                <option ng-click=\"vm.getSourceCode(source.classname)\" ng-repeat=\"source in vm.rest.source_code\">{{source.name}}</option>\n" +
    "              </select>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "          <br clear=\"left\">\n" +
    "          <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\"><span class=\"glyphicon glyphicon-file\" aria-hidden=\"true\"></span> {{vm.file}}</div>\n" +
    "            <div class=\"panel-body\" ng-bind-html=\"vm.sourcecode\"></div>\n" +
    "          </div>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/rpc/rpc.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/rpc/rpc.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h3 class=\"panel-title\">\n" +
    "      <span class=\"glyphicon glyphicon-fire\"></span> RPC service: {{vm.rpcName}} (v{{vm.version}})\n" +
    "      <button class=\"btn btn-danger pull-right\" ng-click=\"vm.deleteRpcModal()\" ng-hide=\"vm.disabled\"><span class=\"glyphicon glyphicon-trash\"></span> Delete service</button>\n" +
    "    </h3>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <tabset justified=\"true\">\n" +
    "      <tab heading=\"General Settings\" active=\"vm.tabs.general_settings\">\n" +
    "        <form class=\"form-horizontal\" role=\"form\" unsaved-warning-form>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"col-sm-2 control-label\">Name</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "              <input type=\"text\" class=\"form-control\" ng-model=\"vm.rpc.service_name\" readonly>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"col-sm-2 control-label\">Route to match</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "              <input type=\"text\" class=\"form-control\" ng-model=\"vm.rpc.route_match\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\">\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"col-sm-2 control-label\">Allowed HTTP Methods</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "              <span ng-repeat=\"http in vm.httpMethods\">\n" +
    "                <input type=\"checkbox\" checklist-model=\"vm.rpc.http_methods\" checklist-value=\"http\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\"> {{http}}\n" +
    "              </span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label for=\"rest_content_negotiation\" class=\"col-sm-2 control-label\">Content Negotiation Selector</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "              <select class=\"form-control\" ng-model=\"vm.rpc.selector\" ng-options=\"selector.content_name for selector in vm.content_negotiation\" ng-change=\"vm.change(0)\" ng-disabled=\"vm.disabled\"></select>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"col-sm-2 control-label\">Accept whitelist</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "              <tags-input\n" +
    "              ng-hide=\"vm.disabled\"\n" +
    "              ng-click=\"vm.change(0)\"\n" +
    "              ng-change=\"vm.change(0)\"\n" +
    "              ng-model=\"vm.tags.accept_whitelist\"\n" +
    "              placeholder=\"Add a mediatype\"\n" +
    "              add-on-space=\"true\"\n" +
    "              add-on-enter=\"true\"\n" +
    "              add-on-blur=\"true\"\n" +
    "              allowed-tags-pattern=\"^[a-zA-Z0-9_+.-]+$\"></tags-input>\n" +
    "              <span ng-repeat=\"accept in vm.tags.accept_whitelist\" ng-show=\"vm.disabled\">{{accept.text}}, </span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"col-sm-2 control-label\">Content-Type whitelist</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "              <tags-input\n" +
    "              ng-hide=\"vm.disabled\"\n" +
    "              ng-click=\"vm.change(0)\"\n" +
    "              ng-change=\"vm.change(0)\"\n" +
    "              ng-model=\"vm.tags.content_type_whitelist\"\n" +
    "              placeholder=\"Add a content type\"\n" +
    "              add-on-space=\"true\"\n" +
    "              add-on-enter=\"true\"\n" +
    "              add-on-blur=\"true\"\n" +
    "              allowed-tags-pattern=\"^[a-zA-Z0-9_+.-]+$\"></tags-input>\n" +
    "              <span ng-repeat=\"accept in vm.tags.content_type_whitelist\" ng-show=\"vm.disabled\">{{accept.text}}, </span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\" style=\"margin-top:30px\">\n" +
    "            <div class=\"col-sm-offset-2 col-sm-4\">\n" +
    "              <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.resetGeneral()\" unsaved-warning-clear ng-hide=\"vm.disabled\">Reset</button>\n" +
    "              <button type=\"submit\" class=\"btn btn-success\" ng-click=\"vm.saveGeneral()\" ladda=\"vm.loading\" ng-hide=\"vm.disabled\">Save</button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </tab>\n" +
    "      <tab heading=\"Fields\" active=\"vm.tabs.fields\">\n" +
    "        <h3>Fields <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.newFieldModal()\" ng-hide=\"vm.disabled\">New field</button></h3>\n" +
    "        <div class=\"form-group\">\n" +
    "          <table class=\"table table-bordered\">\n" +
    "            <thead>\n" +
    "              <tr>\n" +
    "                <th class=\"col-md-2\">Name</th>\n" +
    "                <th class=\"col-md-1\">Required</th>\n" +
    "                <th class=\"col-md-3\">Validator</th>\n" +
    "                <th class=\"col-md-3\">Filter</th>\n" +
    "                <th class=\"col-md-3\">Action</th>\n" +
    "              </tr>\n" +
    "            </thead>\n" +
    "            <tr ng-repeat=\"field in vm.rpc.fields\">\n" +
    "              <td>{{field.name}}</td>\n" +
    "              <td><span ng-if=\"field.required\" class=\"glyphicon glyphicon-ok\"></span></td>\n" +
    "              <td>\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"vm.addValidatorModal(field)\" ng-hide=\"vm.disabled\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
    "                <span ng-repeat=\"validator in field.validators\"><a ng-click=\"vm.editValidatorModal(field, validator)\">{{validator.name}}</a>, </span>\n" +
    "                <span ng-if=\"field.validators.length == 0\">No validators</span>\n" +
    "                </td>\n" +
    "              <td>\n" +
    "                <button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"vm.addFilterModal(field)\" ng-hide=\"vm.disabled\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
    "                <span ng-repeat=\"filter in field.filters\"><a ng-click=\"vm.editFilterModal(field, filter)\">{{filter.name}}</a>, </span>\n" +
    "                <span ng-if=\"field.filters.length == 0\">No filters</span>\n" +
    "              </td>\n" +
    "              <td>\n" +
    "                <button type=\"button\" ng-click=\"vm.editFieldModal(field)\" class=\"btn btn-success btn-xs\" ng-hide=\"vm.disabled\"><i class=\"glyphicon glyphicon-pencil\"></i> edit</button> <button type=\"button\" ng-click=\"vm.deleteFieldModal(field)\" class=\"btn btn-danger btn-xs\" ng-hide=\"vm.disabled\"><i class=\"glyphicon glyphicon-trash\"></i> delete</button>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "            <tr ng-if=\"vm.rest.fields.length == 0\">\n" +
    "              <td colspan=\"5\">\n" +
    "                No fields have been configured<span ng-hide=\"vm.disabled\">, <a ng-click=\"vm.newFieldModal()\">create the first one</a></span>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "          </table>\n" +
    "        </div>\n" +
    "      </tab>\n" +
    "      <tab heading=\"Authorization\" active=\"vm.tabs.authorization\">\n" +
    "        <form class=\"form-horizontal\" role=\"form\" unsaved-warning-form>\n" +
    "          <h3>HTTP methods authorization</h3>\n" +
    "          <p ng-hide=\"vm.disabled\">In this page you can specify which HTTP methods to put under authentication. You can choose only the HTTP methods available for the service, if you want to change it go to <a href=\"\">General Settings</a>.\n" +
    "          The authentication type is defined per API in <a ui-sref=\"ag.apimodule({api: vm.apiName, ver: vm.version})\">this page</a>.</p>\n" +
    "          <br />\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"col-sm-2 control-label\">Authorization</label>\n" +
    "            <div class=\"col-sm-8\">\n" +
    "              <span ng-repeat=\"http in vm.httpMethods\">\n" +
    "                <input type=\"checkbox\" checklist-model=\"vm.auth\" checklist-value=\"http\" ng-change=\"vm.change(1)\" ng-disabled=\"vm.rpc.http_methods.indexOf(http) < 0 || vm.disabled\"> {{http}}\n" +
    "              </span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\" style=\"margin-top:30px\">\n" +
    "            <div class=\"col-sm-offset-2 col-sm-4\">\n" +
    "              <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.resetAuthorization()\" unsaved-warning-clear ng-hide=\"vm.disabled\">Reset</button>\n" +
    "              <button type=\"submit\" class=\"btn btn-success\" ng-click=\"vm.saveAuthorization()\" ladda=\"vm.loading\" ng-hide=\"vm.disabled\">Save</button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </tab>\n" +
    "      <tab heading=\"Documentation\" active=\"vm.tabs.documentation\">\n" +
    "        <form class=\"form-horizontal\" role=\"form\" unsaved-warning-form>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"col-sm-2 control-label\">RPC service description</label>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "              <textarea class=\"form-control\" ng-model=\"vm.rpc.documentation.description\" placeholder=\"Insert the description here\" ng-change=\"vm.change(2)\" ng-disabled=\"vm.disabled\"></textarea>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <tabset justified=\"true\" class=\"col-sm-12\">\n" +
    "              <tab ng-repeat=\"http in vm.rpc.http_methods\" heading=\"{{http}}\">\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label class=\"col-sm-2 control-label\">Description</label>\n" +
    "                  <div class=\"col-sm-10\">\n" +
    "                    <textarea class=\"form-control\" ng-model=\"vm.rpc.documentation[http].description\" placeholder=\"Insert the description here\" ng-change=\"vm.change(2)\" ng-disabled=\"vm.disabled\"></textarea>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-if=\"http !== 'GET'\">\n" +
    "                  <label class=\"col-sm-2 control-label\">Request Body</label>\n" +
    "                  <div class=\"col-sm-10\">\n" +
    "                    <textarea class=\"form-control\" ng-model=\"vm.rpc.documentation[http].request\" placeholder=\"Insert the request specification\" ng-change=\"vm.change(2)\" ng-disabled=\"vm.disabled\"></textarea>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label class=\"col-sm-2 control-label\">Response Body</label>\n" +
    "                  <div class=\"col-sm-10\">\n" +
    "                    <textarea class=\"form-control\" ng-model=\"vm.rpc.documentation[http].response\" placeholder=\"Insert the response specification\" ng-change=\"vm.change(2)\" ng-disabled=\"vm.disabled\"></textarea>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\" style=\"margin-top:30px\">\n" +
    "            <div class=\"col-sm-offset-2 col-sm-4\">\n" +
    "              <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.resetDocumentation()\" unsaved-warning-clear ng-hide=\"vm.disabled\">Reset</button>\n" +
    "              <button type=\"submit\" class=\"btn btn-success\" ng-click=\"vm.saveDocumentation()\" ladda=\"vm.loading\" ng-hide=\"vm.disabled\">Save</button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </tab>\n" +
    "      <tab heading=\"Source code\" active=\"vm.tabs.sourcecode\">\n" +
    "        <form class=\"form-inline\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"control-label\">Select the file to open</label>\n" +
    "            <select class=\"form-control\">\n" +
    "              <option ng-click=\"vm.getSourceCode(source.classname)\" ng-repeat=\"source in vm.rpc.source_code\">{{source.name}}</option>\n" +
    "            </select>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "        <br clear=\"left\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-heading\"><span class=\"glyphicon glyphicon-file\" aria-hidden=\"true\"></span> {{vm.file}}</div>\n" +
    "          <div class=\"panel-body\" ng-bind-html=\"vm.sourcecode\"></div>\n" +
    "        </div>\n" +
    "      </tab>\n" +
    "    </tabset>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("apigility-ui/sidebar/sidebar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("apigility-ui/sidebar/sidebar.html",
    "<div class=\"row\">\n" +
    "  <form class=\"navbar-form\" ng-submit=\"vm.searchApi(vm.search)\">\n" +
    "    <div class=\"form-group has-feedback\">\n" +
    "      <input\n" +
    "      class=\"form-control\"\n" +
    "      type=\"search\"\n" +
    "      placeholder=\"Search for a service\"\n" +
    "      ng-model=\"vm.search\"\n" +
    "      ng-disabled=\"vm.loading\"\n" +
    "      typeahead=\"service for service in vm.services | filter:$viewValue | limitTo:8\">\n" +
    "      <span class=\"glyphicon glyphicon-remove form-control-feedback\" ng-hide=\"!vm.search\" ng-click=\"vm.searchApi('')\"></span>\n" +
    "    </div>\n" +
    "    <button type=\"submit\" class=\"btn btn-success btn-sm\"><span class=\"glyphicon glyphicon-search\"></span> Search</button>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<br />\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-12 text-right\">\n" +
    "    <span class=\"pull-left\" ng-hide=\"vm.loading\"><strong>API LIST</strong></span>\n" +
    "    <span class=\"pull-left\" ng-show=\"vm.loading\"><img src=\"apigility-ui/img/spinning.gif\"> Loading...</span>\n" +
    "    <button type=\"button\" id=\"new_api\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.newApiModal()\" ng-disabled=\"vm.loading\">New API</button>\n" +
    "    <button type=\"button\" id=\"new_service\" class=\"btn btn-info btn-sm\" ng-click=\"vm.newServiceModal()\" ng-disabled=\"vm.loading || vm.apis.length == 0\">New Service</button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<br />\n" +
    "<div ui-tree class=\"ng-scope angular-ui-tree\" data-drag-enabled=\"false\" data-max-depth=\"2\" ng-hide=\"vm.apis.length == 0\">\n" +
    "  <ol ui-tree-nodes=\"options\" ng-model=\"vm.apis\" class=\"ng-scope ng-pristine ng-valid angular-ui-tree-nodes\">\n" +
    "    <li class=\"ng-scope angular-ui-tree-node\" ng-repeat=\"item in vm.apis\" ui-tree-node=\"\">\n" +
    "      <div class=\"ng-scope ng-binding angular-ui-tree-handle\" ui-tree-handle ng-class=\"{ 'selected' : 'api'+item.name === vm.getSelected() }\">\n" +
    "        <a class=\"btn btn-default btn-xs\" ng-click=\"vm.toggle(this)\" data-nodrag=\"\">\n" +
    "          <span ng-class=\"{'glyphicon-chevron-right': collapsed, 'glyphicon-chevron-down': !collapsed}\" class=\"glyphicon glyphicon-chevron-down\"></span>\n" +
    "        </a>\n" +
    "        <a ng-click=\"vm.apiname=item.name;vm.setSelected('api'+item.name)\" ui-sref=\"ag.apimodule({api: item.name, ver: item.selected_version})\">{{item.name}}</a> - version <select ng-model=\"item.selected_version\" ng-options=\"ver for ver in item.versions\" ng-change=\"vm.changeVersion(item.name, item.selected_version);vm.setSelected('api'+item.name)\"></select>\n" +
    "        <span class=\"badge pull-right\">{{item.rest.length + item.rpc.length}}</span>\n" +
    "      </div>\n" +
    "      <ol class=\"ng-scope ng-pristine ng-valid angular-ui-tree-nodes\" ng-class=\"{hidden: collapsed}\">\n" +
    "        <li class=\"ng-scope angular-ui-tree-node\" ng-repeat=\"subItem in item.rest\">\n" +
    "          <div class=\"ng-scope ng-binding angular-ui-tree-handle\" ui-tree-handle ng-class=\"{ 'selected' : 'api'+item.name+'rest'+subItem === vm.getSelected() }\">\n" +
    "            <span class=\"glyphicon glyphicon-leaf\"></span> <a ui-sref=\"ag.rest({api: item.name, ver: item.selected_version, rest: subItem})\" ng-click=\"vm.setSelected('api'+item.name+'rest'+subItem)\">{{subItem}}</a>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "        <li class=\"ng-scope angular-ui-tree-node\" ng-repeat=\"subItem in item.rpc\">\n" +
    "          <div class=\"ng-scope ng-binding angular-ui-tree-handle\" ui-tree-handle ng-class=\"{ 'selected' : 'api'+item.name+'rpc'+subItem === vm.getSelected() }\">\n" +
    "            <span class=\"glyphicon glyphicon-fire\"></span> <a ui-sref=\"ag.rpc({api: item.name, ver: item.selected_version, rpc: subItem})\" ng-click=\"vm.setSelected('api'+item.name+'rpc'+subItem)\">{{subItem}}</a>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "      </ol>\n" +
    "    </li>\n" +
    "  </ol>\n" +
    "</div>\n" +
    "<div class=\"alert alert-info\" role=\"alert\" ng-show=\"vm.apis.length == 0 && !vm.search && !vm.loading\">\n" +
    "  <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> No APIs configured, <a ng-click=\"vm.newApiModal()\">would you like to create one?</a>\n" +
    "</div>\n" +
    "<div class=\"alert alert-danger\" role=\"alert\" ng-show=\"vm.apis.length == 0 && vm.search\">\n" +
    "  <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span> No services found, try with a new search\n" +
    "</div>\n" +
    "");
}]);
