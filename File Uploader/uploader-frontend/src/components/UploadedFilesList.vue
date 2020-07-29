<template>
  <div>
    <h1>Files List</h1>
    <ul>
      <uploaded-file
        v-for="(file,index) in files"
        v-bind:file.sync="file"
        v-on:file-selected="setter"
        v-on:delete-file="deleteFile"
        :key="index"
      ></uploaded-file>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import UploadedFile from './UploadedFile'

export default {
  name: 'UploadedFilesList',
  data () {
    return {
      files: []
    }
  },
  components: {
    UploadedFile,
  },
  methods: {
    setter(file){
      this.$emit("selected",file)
    },
    fetchFiles () {
      axios.get('/api/files')
        .then((response) => {
          this.$set(this, 'files', response.data)
        })
    },
    filesUploaded (files) {
        this.files=files
    },
    deleteFile (file) {
      if (confirm('Are you sure you want to delete the file?')) {
        axios.delete('/api/files/' + file._id)
          .then(() => {
            let fileIndex = this.files.indexOf(file)
            this.files.splice(fileIndex, 1)
          })
          .catch(() => {
            console.log("Error delete file")
          })
      }
    },
  },
  mounted () {
    this.fetchFiles()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>