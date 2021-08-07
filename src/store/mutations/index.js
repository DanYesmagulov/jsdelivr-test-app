export default {
  SET_SEARCH: (state, value) => {
    state.searchResult = value
  },
  SET_PACKAGE_VERSIONS: (state, list) => {
    state.packageVersions = list
  },
  SET_PACKAGE_FILES_BY_VERSION: (state, list) => {
    state.packageFilesByVersion = list
  },
}
