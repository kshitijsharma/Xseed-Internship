<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Tel" name="first"><tel/></el-tab-pane>
    <el-tab-pane label="CART" name="second"><cart/></el-tab-pane>
    <el-tab-pane label="MCQ" name="third"><mcq/></el-tab-pane>
    <el-tab-pane label="MTF" name="fourth"><mtf/></el-tab-pane>
    <el-tab-pane label="Arrange in Order" name="fifth"><sen/></el-tab-pane>
    <el-tab-pane label="OTP" name="sixth"><otp/></el-tab-pane>    
  </el-tabs>
</template>
<script>
  import cart from './cart.vue'
  import tel from '../components/tel'
  import mcq from '../components/mcqcreator'
  import mtf from '../views/creator'
  import sen from '../components/sentence'
  import otp from '../components/otp.vue'
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },components:{
      cart,
      tel,
      mcq,
      mtf,
      sen,
      otp
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>