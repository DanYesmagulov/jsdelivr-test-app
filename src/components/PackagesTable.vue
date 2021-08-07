<template>
  <div>
    <b-list-group>
      <b-list-group-item
        class="border-bottom p-3"
        v-for="(pkg, id) in packages"
        :key="id"
        @click="
          getVersions(pkg.package.name)
          saveAuthor(pkg.package.publisher)
        "
        style="cursor: pointer"
      >
        <div class="d-flex justify-content-between">
          <h5 class="font-weight-bold">{{ pkg.package.name }}</h5>
        </div>
        <div class="d-flex justify-content-between" style="height: 30px">
          <p>{{ pkg.package.publisher.username }}</p>
          <span class="border px-1">{{ pkg.package.version }}</span>
        </div>
        <div style="max-width: 80%">
          {{ pkg.package.description }}
        </div>
        <div
          class="d-flex"
          style="display: flex; flex-direction: row; flex-wrap: wrap; width: 100%; font-size: 15px;"
        >
          <p
            v-for="(word, id) in pkg.package.keywords"
            :key="id"
            class="mr-3 border p-1"
            style="margin-bottom: 10px;"
          >
            {{ word }}
          </p>
        </div>
      </b-list-group-item>
    </b-list-group>

    <b-modal id="bv-modal" hide-footer>
      <div class="mb-3">
        <b-form-select
          v-model="selectedVersion"
          @change="getFiles(currentPackage, selectedVersion)"
          :options="versions"
          size="10"
        ></b-form-select>
      </div>
      <div style="font-size: 12px">
        <a
          v-if="files.default"
          target="_blank"
          rel="noopener noreferrer"
          :href="
            `https://cdn.jsdelivr.net/npm/${this.currentPackage}@${selectedVersion}${files.default}`
          "
        >
          {{ `default: ${files.default}` }}
        </a>
        <ul style="list-style-type: none">
          <li v-for="(file, id) in files.files" :key="id">
            <p style="margin: 0" v-if="file.type == 'directory'">
              {{ 'directory: ' + file.name + '/' }}
            </p>
            <ul
              style="list-style-type: none"
              v-if="file.files && file.type == 'directory'"
            >
              <li v-for="(f, id) in file.files" :key="id">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="
                    `https://cdn.jsdelivr.net/npm/${currentPackage}@${selectedVersion}/${file.name}/${f.name}`
                  "
                  >{{ file.name + '/' + f.name }}</a
                >
              </li>
            </ul>
            <a
              v-if="file.type == 'file'"
              target="_blank"
              rel="noopener noreferrer"
              :href="
                `https://cdn.jsdelivr.net/npm/${currentPackage}@${selectedVersion}/${file.name}`
              "
              >{{ file.name }}</a
            >
          </li>
        </ul>
      </div>
      <div v-if="author" class="border-top pt-3 d-flex justify-content-between">
        <p>{{ author.username }}</p>
        <a :href="'mailto:' + author.email">{{ author.email }}</a>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PackagesTable',
  data() {
    return {
      selectedVersion: null,
      currentPackage: null,
      author: null,
    }
  },
  computed: {
    ...mapGetters({
      packages: 'SEARCH_RESULT',
      versions: 'PACKAGES_VERSIONS',
      files: 'PACKAGE_FILES_BY_VERSION',
    }),
  },
  methods: {
    ...mapActions(['GET_PACKAGE_VERSIONS', 'GET_PACKAGE_FILES_BY_VERSION']),
    saveAuthor(author) {
      this.author = author
    },
    async getFiles(query, version) {
      this.selectedVersion = version
      await this.GET_PACKAGE_FILES_BY_VERSION({ query, version })
    },
    async getVersions(query) {
      await this.GET_PACKAGE_VERSIONS({ query })
      this.selectedVersion = this.versions[0]
      this.currentPackage = query
      await this.getFiles(query, this.selectedVersion)
      this.$bvModal.show('bv-modal')
    },
  },
}
</script>

<style lang="scss" scoped></style>
