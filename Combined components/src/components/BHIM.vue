<template>
    <div>
        <el-input placeholder="Enter your UPI ID" style="width:30%" v-model="upiid"></el-input>&emsp;
        <el-button type="primary" @click="integrator()">Proceed</el-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            upiid:''
        }
    },
    methods:{
        integrator(upiid){
            console.log(upiid)
            this.$router.push('/success')
        }
    }
}
</script>