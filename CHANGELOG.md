# Changelog

All notable changes to this project will be documented in this file, in reverse chronological order by release.

## 1.4.0 - TBD

### Added

- Nothing.

### Deprecated

- Nothing.

### Removed

- Nothing.

### Fixed

- Nothing.

## 1.3.1 - TBD

### Added

- Nothing.

### Deprecated

- Nothing.

### Removed

- Nothing.

### Fixed

- Nothing.

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
