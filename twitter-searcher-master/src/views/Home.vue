<template>
  <div class="home">
    <header>
      <h1>Tweet Fetcher</h1>
    </header>
    <form >
        <label>Enter the search keyword:<input type="text" v-model="skey"></label>
        <input type="button" @click="fetchtweets" value="Search">
    </form>
    <div v-if="disp">
      <h3 v-for="tweet in tweets" :key="tweet">{{tweet}}</h3><br>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: 'Home',
  data(){
    return{
        tweets:{},
        disp:false,
        skey:''
    }
    },
    methods:{
        fetchtweets:async function(){
            let temp=await axios.get("https://tweet---search.herokuapp.com/getTweets",{
              params:{
                key:this.skey
              }
            })
            this.tweets=temp.data
            this.disp=true
        }
    }
}
</script>
