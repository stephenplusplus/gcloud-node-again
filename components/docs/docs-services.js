angular.module('gcloud.docs')
  .factory('getLinks', function(pages, versions) {
    return function(version) {
      var baseUrl = '#/docs/' + version;
      var VERSIONS = pages.VERSIONS;
      if (!version || version === 'master') {
        var versions = Object.keys(VERSIONS);
        match = versions[versions.length - 1];
      } else {
        match = Object.keys(VERSIONS).filter(semver.satisfies.bind(null, version))[0];
      }
      return VERSIONS[match]
        .map(function(module) {
          if (pages[module]._url) {
            pages[module].url = pages[module]._url.replace('{baseUrl}', baseUrl);
          }
          return pages[module];
        });
    };
  });
