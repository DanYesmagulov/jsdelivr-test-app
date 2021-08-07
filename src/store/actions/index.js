import axios from 'axios'

export default {
  SEARCH_PACKAGES({ commit }, payload) {
    return axios(
      `https://registry.npmjs.org/-/v1/search?text=${payload.query}&size=10`,
    )
      .then(packages => {
        commit('SET_SEARCH', packages.data)
        return packages
      })
      .catch(err => {
        console.log(err)
        return err
      })
  },
  GET_PACKAGE_VERSIONS({ commit }, payload) {
    return axios(`https://data.jsdelivr.com/v1/package/npm/${payload.query}`)
      .then(versions => {
        commit('SET_PACKAGE_VERSIONS', versions.data)
        return versions
      })
      .catch(err => {
        console.log(err)
        return err
      })
  },
  GET_PACKAGE_FILES_BY_VERSION({ commit }, payload) {
    return axios(
      `https://data.jsdelivr.com/v1/package/npm/${payload.query}@${payload.version}`,
    )
      .then(versions => {
        commit('SET_PACKAGE_FILES_BY_VERSION', versions.data)
        return versions
      })
      .catch(err => {
        console.log(err)
        return err
      })
  },
}
