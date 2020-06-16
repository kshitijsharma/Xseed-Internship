var vm=new Vue({
    el:'#app',
    data:{
        tweets:[]
    },created:function(){
        this.fetchtweets()
    },
    methods:{
        
        fetchtweets:async function(){
            let temp=await axios.get("https://tweet---search.herokuapp.com/getTweets")
            this.tweets=temp.data
        }
    }
})
