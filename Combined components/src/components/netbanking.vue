<template>
    <div>
		<center>
		<template v-for="bank in banks" >
			<el-button type="primary" @click="navigate(bank.name)" :key="bank.name" v-if="bank.popular">{{bank.name}}</el-button>&emsp;&emsp;				
		</template>
		</center><br>
		<center><template>
		<el-select v-model="value" placeholder="Select">
			<el-option
			v-for="bank in banks"
			:key="bank.name"
			:label="bank.name"
			:value="bank.name">
			</el-option>
		</el-select>
		</template>&emsp;&emsp;
		<el-button type="primary" @click="navigate(null)">Proceed</el-button></center>
	</div>
</template>
<script>
  export default {
    data () {
      return {
		banks:[{name:'Axis Bank',popular:true,url:'https://www.axisbank.com/bank-smart/internet-banking/features-services'},
		{name:'HDFC Bank',popular:true,url:'https://netbanking.hdfcbank.com/netbanking/'},
		{name:'ICICI Bank',popular:true,url:'https://infinity.icicibank.com/corp/Login.jsp'},
		{name:'State Bank Of India',popular:true,url:'https://www.onlinesbi.com/retail/login.htm'},
		{name:'Karur Vysya Bank',popular:true,url:'https://www.kvb.co.in/ilogin/'},
		{name:'Bank Of Baroda',popular:false,url:'https://www.bobibanking.com/'},
		{name:'HSBC Bank',popular:false,url:'https://www.hsbc.co.in/ways-to-bank/online-banking/'}],
		value:''
      };
	},
	methods:{
		navigate(value){
			if (value === null){
				value=this.value
			}
			let obj = this.banks.find(bank => bank.name == value);
			window.location.href=obj.url
		}
	}
  }
</script>