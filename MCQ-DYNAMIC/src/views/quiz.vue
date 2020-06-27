<template>
    <div>
        <div v-for="(quiz, index) in quizez" v-show="index === questionindex" :key="index">
        <el-card>
        <h1>{{ quiz.category }}</h1>
        <h2>{{ quiz.question }}</h2>
        <ol>
            <el-radio-group v-model="answers[index]">
                <li v-for="answer in quiz.incorrect_answers" :key="answer">
                    <el-radio name="answer" :label="answer"><b>{{answer}}</b></el-radio>
                </li>
            </el-radio-group>       
        </ol>
        </el-card>
        </div><br><br>
        <div v-if="questionindex < quizez.length">
        <center>
        <el-button type="danger" v-if="questionindex > 0" v-on:click="prev">
        prev
        </el-button>&emsp;
        <el-button type="success" v-on:click="next">
        next
        </el-button>
        </center>
        </div>
            <h1 v-if="questionindex == quizez.length">Your Total score is {{score}} / {{quizez.length}}</h1>
        </div>
</template>
<script>
var quiz_questions = [
  {
  "category": "Entertainment: Film",
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
  "category": "Entertainment: Video Games",
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
  },
  {
  "category": "Science & Nature",
  "type": "multiple",
  "difficulty": "easy",
  "question": "What is the hottest planet in the Solar System?",
  "correct_answer": "Venus",
  "incorrect_answers": [
  "Venus",
  "Mars",
  "Mercury",
  "Jupiter"
  ]
  },
  {
  "category": "Entertainment: Books",
  "type": "multiple",
  "difficulty": "hard",
  "question": "What is Ron Weasley's middle name?",
  "correct_answer": "Bilius",
  "incorrect_answers": [
  "Bilius",
  "Arthur",
  "John",
  "Dominic"
  ]
  },
  {
  "category": "Politics",
  "type": "multiple",
  "difficulty": "medium",
  "question": "Before 2011, True Capitalist Radio was known by a different name. What was that name?",
  "correct_answer": "True Conservative Radio",
  "incorrect_answers": [
  "True Conservative Radio",
  "True Republican Radio",
  "Texan Capitalist Radio",
  "United Capitalists"
  ]
  },
  {
  "category": "Entertainment: Film",
  "type": "multiple",
  "difficulty": "medium",
  "question": "This movie contains the quote, I love the smell of napalm in the morning!",
  "correct_answer": "Apocalypse Now",
  "incorrect_answers": [
  "Apocalypse Now",
  "Platoon",
  "The Deer Hunter",
  "Full Metal Jacket"
  ]
  },
  {
  "category": "History",
  "type": "multiple",
  "difficulty": "medium",
  "question": "The Herero genocide was perpetrated in Africa by which of the following colonial nations?",
  "correct_answer": "Germany",
  "incorrect_answers": [
  "Germany",
  "Britain",
  "Belgium",
  "France"
  ]
  },
  {
  "category": "Entertainment: Books",
  "type": "multiple",
  "difficulty": "easy",
  "question": "Under what pseudonym did Stephen King publish five novels between 1977 and 1984?",
  "correct_answer": "Richard Bachman",
  "incorrect_answers": [
  "Richard Bachman",
  "J. D. Robb",
  "Mark Twain",
  "Lewis Carroll"
  ]
  },
  {
  "category": "History",
  "type": "multiple",
  "difficulty": "medium",
  "question": "In what prison was Adolf Hitler held in 1924?",
  "correct_answer": "Landsberg Prison",
  "incorrect_answers": [
  "Landsberg Prison",
  "Spandau Prison",
  "Ebrach Abbey",
  "Hohenasperg"
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
        const obj=JSON.parse(window.localStorage.getItem('arr'))
        for (var i =0; i <obj.length; i++) {
            this.quizez.push(obj[i])
        }
    }
}
</script>
