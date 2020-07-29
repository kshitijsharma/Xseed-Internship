<template>
  <div>
    <a v-bind:href="'/files/' + selected.name" target="_blank">{{selected.name}}</a>
    <el-button type="text" @click="dialogVisible = true">Select File</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      width="70"
      :before-close="handleClose">
      <div>
        <uploads-container v-on:files-uploaded="filesUploaded"></uploads-container>
      </div>
      <el-row>
        <uploaded-files ref="filesList" v-on:selected="assign" v-bind:files.sync="files"></uploaded-files>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog> 
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import UploadedFiles from '@/components/UploadedFilesList'
import UploadsContainer from '@/components/UploadsContainer'

export default {
  name: 'Main',
  data () {
    return {
      files: [],
      selected:'',
      dialogVisible:false
    }
  },
  components: {
    UploadedFiles,
    UploadsContainer
  },
  methods: {
    assign(file){
      this.selected=file
    },
    filesUploaded (files) {
      this.$refs.filesList.filesUploaded(files)
    },
    handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }


  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
