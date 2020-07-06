<template>
<div>
  <div v-for="(passage, parent_node_index) in sentenceParts" v-show="parent_node_index === questionindex" :key="parent_node_index">
    <el-card>
        <span v-for="(part, index) in passage" :key="index">
          <input
            v-if="part.input"
            v-model="part.guess"
            :aria-colindex="index"
          >
          <span v-else>{{ part.text }}</span>
        </span>
    </el-card>
  </div><br><br>
  <div v-if="questionindex < sentenceParts.length">
    <center>
      <el-button type="danger" v-if="questionindex > 0" v-on:click="prev">Prev</el-button>&emsp;
      <el-button type="success" v-on:click="next">Next</el-button>
      <el-button type="warning" style="float:right;" v-on:click="submit">Submit</el-button>
    </center>
  </div>
  <el-card v-if="questionindex == sentenceParts.length">
    <h1 class="correct"> Your score is {{score}} / {{passages.length*5}}</h1>
  </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      questionindex:0,
      sentenceParts: [],
      passages:[]
    }
  },
  computed: {
    score:function() {
        var score=0
        this.sentenceParts.forEach((passage) => {
        if(passage.every(this.partIsCorrect)){
          score+=5
        }
      });
      return score;
    }
  },

  methods: {
    partIsCorrect:function(part) {
      return !part.input || part.text === part.guess
    },
    reset:function(sentence){
      const re = /(\[[^\]]*\])/

      const parts = sentence.split(re).filter(text => text)

      var Parts = parts.map(segment => {
        const isInput = re.test(segment)
        return {
          guess: '',
          input: isInput,
          text: isInput ? segment.slice(1, -1) : segment
        }
      })
      this.sentenceParts.push(Parts)
    },
    next: function() {
      this.questionindex++;
    },
    prev: function() {
      this.questionindex--;
    },
    submit:function(){
      this.$router.push({ path: 'complete', query: { score:this.score,noq:this.passages.length*5} })
    }
  },
  mounted(){
    this.passages=JSON.parse(window.localStorage.getItem("fillex"))
    for(var i=0;i<this.passages.length;i++){
      this.reset(this.passages[i].sentence)
    }
  }
}
</script>
<style scoped>
.correct{
  color: #7c7;
}
</style>