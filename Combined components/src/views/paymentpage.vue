<template>
<div id="ppg">
    <el-card>
    <h3> You have to pay <b>₹{{newPrice}}</b></h3>
    <el-tabs tab-position="left" type="border-card">
        <el-tab-pane  label="Credit Card"><CreditCard/></el-tab-pane>
        <el-tab-pane  label="Debit Card"><DebitCard/></el-tab-pane>
        <el-tab-pane  label="Net Banking"><NetBanking/></el-tab-pane>
        <el-tab-pane  label="BHIM UPI"><BHIM/></el-tab-pane>
        <el-tab-pane  label="PayTM"><PayTM/></el-tab-pane>
    </el-tabs>
    </el-card>
</div>
</template>
<script>
import CreditCard from '../components/creditcard.vue'
import DebitCard from '../components/debitcard.vue'
import NetBanking from '../components/netbanking.vue'
import BHIM from '../components/BHIM.vue'
import PayTM from '../components/PayTM.vue'
export default {
    name:'payment',
    props:['price'],
    components:{
        CreditCard,
        DebitCard,
        NetBanking,
        BHIM,
        PayTM
    },
    data(){
        return{
            newPrice:''
        }
    },
    created(){
        this.newPrice=this.price
    }
    
}
</script>