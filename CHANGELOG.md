# Changelog

All notable changes to this project will be documented in this file, in reverse chronological order by release.

## 1.3.8 - 2016-08-17

### Added

- Nothing.

### Deprecated

- Nothing.

### Removed

- Nothing.

### Fixed

- [#128](https://github.com/zfcampus/zf-apigility-admin-ui/pull/128) fixes how
  the UI calls the authorization endpoints, ensuring the controller name is
  properly formed.

## 1.3.7 - 2016-08-14

### Added

- Nothing.

### Deprecated

- Nothing.

### Removed

- Nothing.

### Fixed

- [#123](https://github.com/zfcampus/zf-apigility-admin-ui/pull/123) fixes
  display of the sidebar on initial load when a default API version other than
  the latest version is selected; it now correctly *always* displays the latest
  version on initial load.
- [#125](https://github.com/zfcampus/zf-apigility-admin-ui/pull/125) fixes the
  "Add a description for this service" links on API dashboards. Previously, they
  had no handler, and thus did nothing; with this release, they provide a modal
  for updating the service description.

## 1.3.6 - 2016-08-12

### Added

- Nothing.

### Deprecated

- Nothing.

### Removed

- Nothing.

### Fixed

- [#119](https://github.com/zfcampus/zf-apigility-admin-ui/pull/119) fixes
  transitions to new API versions when selecting an API version in the sidebar.
  Previously, the sidebar would be updated, but the UI would not transition to
  the API's dashboard for that version.
- [#120](https://github.com/zfcampus/zf-apigility-admin-ui/pull/120) updates the
  About tab to provide updated links and information about the project.

## 1.3.5 - 2016-08-11

### Added

- Nothing.

### Deprecated

- Nothing.

### Removed

- Nothing.

### Fixed

- [#118](https://github.com/zfcampus/zf-apigility-admin-ui/pull/118) fixes the
  API dashboard new service modal handler to ensure that the sidebar is updated
  when a new service is successfully created.

## 1.3.4 - 2016-08-10

### Added

- Nothing.

### Deprecated

- Nothing.

### Removed

- Nothing.

### Fixed

- Re-builds the distribution files, as they were not rebuilt for 1.3.3, and thus
  changes were not observed.

## 1.3.3 - 2016-08-10

### Added

- Nothing.

### Deprecated

- Nothing.

### Removed

- Nothing.

### Fixed

- [#117](https://github.com/zfcampus/zf-apigility-admin-ui/pull/117) fixes the
  about screen to no longer use a hard-coded version. Instead, it now attempts
  to query the apigility-version API, returning the version that returns. If the
  API is not pressent, or errors in some way, the string `@dev` is now used for
  the version.

## 1.3.2 - 2016-08-09

### Added

- Nothing.

### Deprecated

- Nothing.

### Removed

- Nothing.

### Fixed

- [#116](https://github.com/zfcampus/zf-apigility-admin-ui/pull/116) ensures
  that the short service name, and not the full controller service name, is
  displayed on service pages.
- [#116](https://github.com/zfcampus/zf-apigility-admin-ui/pull/116) fixes
  issues with updating the sidebar after adding a new service; previously, the
  number and type of entries was correct, but no service names were displayed
  after update; they are now displayed correctly.
- [#116](https://github.com/zfcampus/zf-apigility-admin-ui/pull/116) fixes
  issues with updating the sidebar after removing a service; previously, the
  last service listed of the given type was removed regardless of the service
  removed; now the correct service is removed from the listing.

## 1.3.1 - 2016-08-06

### Added

- Nothing.

### Deprecated

- Nothing.

### Removed

- Nothing.

### Fixed

- [#114](https://github.com/zfcampus/zf-apigility-admin-ui/pull/114) fixes how
  the UI generates URIs to the various service endpoints (REST and RPC services,
  their input filters, their authorization rules, and their documentation) to
  ensure they work with the latest admin changes. In particular, prior to this
  patch, the service names were receiving both a duplicate prefix and suffix
  that caused the URLs to be invalid.

## 1.3.0 - 2016-07-27

### Added

- [#113](https://github.com/zfcampus/zf-apigility-admin-ui/pull/113) updates ZF
  component dependencies to versions that are forwards compatible with other ZF
  version 3 releases.
- [#107](https://github.com/zfcampus/zf-apigility-admin-ui/pull/107) adds a
  "Field type" input to new/edit field entries; this information can now be used
  by documentation systems (e.g., Swagger) to report field types.

### Deprecated

- Nothing.

### Removed

- [#113](https://github.com/zfcampus/zf-apigility-admin-ui/pull/113) removes
  support for PHP 5.5.
- [#113](https://github.com/zfcampus/zf-apigility-admin-ui/pull/113) removes
  the dependency on rwoverdijk/assetmanager, adding suggestions for:
  - rwoverdijk/assetmanager at `^1.7` (unreleased at this time)
  - zfcampus/zf-asset-manager at `^1.0`

### Fixed

- [#93](https://github.com/zfcampus/zf-apigility-admin-ui/pull/93) updates how
  controller names are sent to the admin API, providing the fully qualified
  class name. This update allows the UI to properly work with modules that use a
  PSR-4 directory structure.
- [#97](https://github.com/zfcampus/zf-apigility-admin-ui/pull/97) updates all
  API calls that pass the module name to normalize the module name using
  `encodeURIComponent()`; this allows using sub-namespaces in the backend code.

## 1.2.4 - 2016-07-27

### Added

- Nothing.

### Deprecated

- Nothing.

### Removed

- Nothing.

### Fixed

- [#54](https://github.com/zfcampus/zf-apigility-admin-ui/pull/54) fixes display
  of field names generated from Doctrine entities, and also updates it to allow
  display and usage of underscore-separated names.
- [#85](https://github.com/zfcampus/zf-apigility-admin-ui/pull/85) adds
  additional information to error messages when unable to create a new service
  for reasons other than conflicts.
- [#91](https://github.com/zfcampus/zf-apigility-admin-ui/pull/91) fixes the
  templates for adding and editing validators and filters with boolean switches
  such that they now work properly.
- [#99](https://github.com/zfcampus/zf-apigility-admin-ui/pull/99) updates the
  template to make the copyright date in the footer dynamic.
