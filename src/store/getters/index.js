export default {
  SEARCH_RESULT(state) {
    return state.searchResult.objects
  },
  PACKAGES_VERSIONS(state) {
    return state.packageVersions.versions
  },
  PACKAGE_FILES_BY_VERSION(state) {
    return state.packageFilesByVersion
  },
}
