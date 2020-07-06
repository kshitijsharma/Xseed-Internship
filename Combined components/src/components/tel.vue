<template>
  <div id="app" style="background:white;">
    
      <form action="https://www.google.com">
        <center style="padding-top:2%;"><vue-tel-input v-model="mobile" @validate="check" style="width:50%;"/></center>
        <br>
        <el-button style="margin-bottom:3%;" type="success" v-if="!error">Submit</el-button>
      </form>
  </div>
</template>
<script>
import { VueTelInput } from "vue-tel-input";

export default {
  name: "PhoneNo",
  components: {
    VueTelInput
  },
  data: () => ({
    mobile: "",
    error: true,
  }),
  methods: {
    check({ isValid }) {
      if (isValid === true) {
        this.error = false;
      } else {
        this.error = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
