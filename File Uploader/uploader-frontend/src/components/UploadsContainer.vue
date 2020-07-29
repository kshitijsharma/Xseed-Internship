<template>
  <div class="hello">
    <h1>Uploader</h1>
    <div>
      <vue-dropzone 
      id="Drop"
      ref="drop"
      :duplicateCheck=true  
      :options="dropzoneOptions"
      @vdropzone-complete-multiple="updatefileList"
      ></vue-dropzone>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import axios from 'axios'

export default {
  name: 'Main',
  data () {
    return {
      files:[],
      dropzoneOptions: {
          url: '/api/upload',
          uploadMultiple:true,
          thumbnailWidth: 200,
          addRemoveLinks: true,
          dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD YOUR FILES HERE"
      }
    }
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  methods:{
    updatefileList:async function(){
      await axios.get('/api/files')
        .then((response) => {
          this.$set(this, 'files', response.data)
        })
      this.$refs.drop.removeAllFiles()
      this.$emit("files-uploaded",this.files)
    }
  }
}
</script>

<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>
