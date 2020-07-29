<template>
  <div>
    <div>
         <el-col :span="8">
              <el-card :body-style="{ padding: '10px'}">
               <el-button style="color:black;border:0" v-on:click="selectFile(file)">
                {{file.name}}</el-button><br>
              <el-button type="danger" icon="el-icon-delete" v-on:click="deleteFile(file)" circle></el-button>
              </el-card>
         </el-col>
        
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  props: ['file'],
  data () {
    return {
    }
  },
  name: 'UploadedFile',
  methods: {
    deleteFile (file) {
      this.$emit("delete-file", file);
    },
    selectFile (file){
      this.$emit("file-selected",file)
    }
  }
}
</script>

<style scoped>
iframe {
    display: none;
}
</style>
