<template>
    <div>
        <div v-for="(quiz, index) in quizez" v-show="index === questionindex" :key="index">
        <el-card>
        <h2>{{ quiz.question }}</h2>
        <ol style="padding:0;">
            <el-radio-group v-model="answers[index]">
                <li v-for="answer in quiz.incorrect_answers" :key="answer">
                    <el-radio name=" answer" style="margin-bottom: 2px;" :label="answer"><b>{{answer}}</b></el-radio>
                </li>
            </el-radio-group>       
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
            <h1 v-if="questionindex == quizez.length">Navigating to match the following.{{navigate()}}</h1>
        </div>
</template>
<script>
var quiz_questions = [
  {
  "type": "multiple",
  "difficulty": "easy",
  "question": "Who directed E.T. the Extra-Terrestrial (1982)?",
  "correct_answer": "Steven Spielberg",
  "incorrect_answers": [
  "Steven Spielberg",
  "Stanley Kubrick",
  "James Cameron",
  "Tim Burton"
  ]
  },
  {
  "type": "multiple",
  "difficulty": "medium",
  "question": "What is the main character of Metal Gear Solid 2?",
  "correct_answer": "Raiden",
  "incorrect_answers": [
  "Raiden",
  "Solidus Snake",
  "Big Boss",
  "Venom Snake"
  ]
  }
]
export default {

  name: 'app',
  
  data : function (){
  return{
    questionindex:0,
    quizez:quiz_questions,
    answers:Array(quiz_questions.length).fill(''),
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
        this.$router.push({ path: 'quiz', query: { score:this.score,noq:this.quizez.length } })
        },
        submit:function(){
        this.$router.push({ path: 'complete', query: { score:this.score,noq:this.quizez.length} })
        }
    },
computed:{
        score: function() {
        var total = 0;
        for (var i =0; i <this.answers.length; i++) {
        if(this.answers[i]==this.quizez[i].correct_answer){total +=1;}
        }
        return total;
        }
    },
    mounted(){
        const obj=JSON.parse(window.localStorage.getItem("mcq"))
        for (var i =0; i <obj.length; i++) {
            this.quizez.push(obj[i])
        }
    }
}
</script>
