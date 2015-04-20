(function () {
  'use strict';

  angular
    .module('apigility.service')
    .service('documentation', DocumentationService);

  DocumentationService.$inject = [ ];

  function DocumentationService() {

    function hasHalMediaType (mediatypes) {
      console.log('In hasHalMediaType with mediatypes', mediatypes);
      if (! Array.isArray(mediatypes)) {
        console.log('Did not receive an array; returning false');
        return false;
      }

      /* In some cases, the mediatypes will be arrays of strings, in other
       * cases, arrays of objects that have a "text" property.
       */
      var type;
      for (var i = 0; i < mediatypes.length; i += 1) {
        type = mediatypes[i];
        console.log('Examining mediatype', type);
        if (typeof type === 'object') {
          console.log('Is an object');
          if (! type.hasOwnProperty('text')) {
            console.log('Does not have text property; moving on');
            continue;
          }
          console.log('Casting type to text property');
          type = type.text;
        }

        if (typeof type !== 'string') {
          console.log('Type is still not a string', type);
          continue;
        }

        console.log('Examining mediatype', type);
        if (type === 'application/hal+json') {
          console.log('Found HAL!');
          return true;
        }
      }

      console.log('Did not find HAL!');
      return false;
    }

    function tab (num) {
      return new Array(num * 4).join(' ');
    }

    function createLink (rel, routeMatch, indent, append, type) {
      if (type == 'collection') {
        routeMatch = routeMatch.replace(/\[[a-zA-Z0-9_\/:\-]+\]$/, '');
      }
      if (append) {
        routeMatch += append;
      }
      return tab(indent) + '"' + rel + '": {\n' + tab(indent + 1) + '"href": "' + routeMatch + '"\n' + tab(indent) + '}';
    }

    function createLinks (links, indent) {
      return tab(indent) + '"_links": {\n' + links.join(',\n') + '\n' + tab(indent) + '}\n';
    }

    function createCollection (collectionName, routeMatch, params) {
      var entityLinks = [ createLink('self', routeMatch, 5) ];
      var collection = tab(1) + '"_embedded": {\n' + tab(2) + '"' + collectionName + '": [\n' + tab(3) + '{\n';
      collection += createLinks(entityLinks, 4);
      collection += params.join(',\n') + '\n' + tab(3) + '}\n' + tab(2) + ']\n' + tab(1) + '}';
      return collection;
    }

    this.fromConfiguration = function (method, direction, restPart, fields, whitelist, route, collection_name) {
      var doctext   = '';
      var docparams = [];
      var isHal     = false;
      var links     = [];

      if (direction == 'response' && whitelist) {
        isHal = hasHalMediaType(whitelist);
      }

      fields.forEach(function (item){
        docparams.push(tab(1) + '"' + item.name + '": "' + (item.description || '') + '"');
      });

      if (isHal && (restPart != 'collection' || method == 'POST')) {
        links.push(createLink('self', route, 2));
        doctext = '{\n' + createLinks(links, 1) + docparams.join(',\n') + '\n}';
      } else if (isHal && restPart == 'collection') {
        var collectionName = collection_name ? collection_name : 'items';
        docparams.forEach(function(param, key) {
          docparams[key] = tab(3) + param;
        });
        links.push(createLink('self', route, 2, false, 'collection'));
        links.push(createLink('first', route, 2, '?page={page}', 'collection'));
        links.push(createLink('prev', route, 2, '?page={page}', 'collection'));
        links.push(createLink('next', route, 2, '?page={page}', 'collection'));
        links.push(createLink('last', route, 2, '?page={page}', 'collection'));
        doctext = '{\n' + createLinks(links, 1) + createCollection(collectionName, route, docparams) + '\n}';
      } else {
        doctext = '{\n' + docparams.join(',\n') + '\n}';
      }
      return doctext;
    };

  }

})();
