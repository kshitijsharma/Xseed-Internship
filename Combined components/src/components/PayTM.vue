<template>
    <div>
        <el-input type="tel" v-model="value" style="width:30%" placeholder="Enter your PayTM Number" required></el-input>&emsp;
        <el-button type="primary" @click="integrator()">Proceed</el-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            value:''
        }
    },
    methods:{
        integrator(){
            console.log(this.value)
            this.$router.push('/success')
        }
    }
}
</script>
