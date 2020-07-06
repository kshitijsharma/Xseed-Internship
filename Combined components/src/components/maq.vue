<template>
    <div>
        <div v-for="(quiz, index) in quizez" v-show="index === questionindex" :key="index">
        <el-card>
        <h2>{{ quiz.question }}</h2>
        <ol style="list-style-type:none;padding:0;">
            <el-checkbox-group v-model="answers[index]">
                <li styele="margin-bottom:2px;" v-for="answer in quiz.incorrect_answers" :key="answer">
                    <el-checkbox :label="answer"><b>{{answer}}</b></el-checkbox>
                </li>
            </el-checkbox-group>  
        </ol>
        </el-card>
        </div><br><br>
        <div v-if="questionindex < quizez.length">
        <center>
        <el-button type="danger" v-if="questionindex > 0" v-on:click="prev">
        Prev
        </el-button>&emsp;
        <el-button type="success" v-on:click="next">
        Next
        </el-button>
        <el-button type="warning" style="float:right;" v-on:click="submit">Submit</el-button>
        </center>    
        </div>
            <div v-if="questionindex == quizez.length">Navigating to the True or False Questions.{{navigate()}}</div>
        
        </div>
</template>
<script>
import isEqual from "lodash/isEqual"
var quiz_questions=[
    {
  "type": "multiple",
  "difficulty": "easy",
  "question": "What is the hottest planet in the Solar System?",
  "correct_answer": ["Venus","Mercury"],
  "incorrect_answers": [
  "Venus",
  "Mars",
  "Mercury",
  "Jupiter"
  ]
  }
]
export default {

  name: 'app',
  props:['prevscore','nos'],
  data : function (){
  return{
    questionindex:0,
    quizez:quiz_questions,
    answers:[[]],
  }
  },
  methods: {
        next: function() {
        this.questionindex++;
        },
        prev: function() {
        this.questionindex--;
        },
        navigate:function(){
        this.$router.push({ path: 'tf', query: { score:this.score,noq:this.quizez.length+this.nos } })
        },
        submit:function(){
        this.$router.push({ path: 'complete', query: { score:this.score,noq:this.quizez.length+this.nos } })
        }
    },
computed:{
        score: function() {
        var total = this.prevscore;
        for (var i =0; i <this.answers.length; i++) {
        if(isEqual(this.answers[i],this.quizez[i].correct_answer)){total +=1;}
        }
        return total;
        }
    },
    mounted(){
        const z=JSON.parse(window.localStorage.getItem("maq"))
        console.log(z)
        for (var i =0; i <z.length; i++) {
            this.quizez.push(z[i])
            this.answers.push([])
        }
    }
}
</script>
