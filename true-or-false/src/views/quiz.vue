<template>
  <div>
    <div v-for="(quiz, index) in quizez" v-show="index === questionindex" :key="index">
      <el-card>
        <h1>{{ quiz.category }}</h1>
        <h2>{{ quiz.question }}</h2>
        <ol>
          <el-radio-group v-model="answers[index]">
            <li v-for="answer in quiz.incorrect_answers" :key="answer">
              <el-radio name="answer" :label="answer">
                <b>{{answer}}</b>
              </el-radio>
            </li>
          </el-radio-group>
        </ol>
      </el-card>
    </div>
    <br>
    <br>
    <div v-if="questionindex < quizez.length">
      <center>
        <el-button type="danger" v-if="questionindex > 0" v-on:click="prev">prev</el-button>&emsp;
        <el-button type="success" v-on:click="next">next</el-button>
      </center>
    </div>
    <h1 v-if="questionindex == quizez.length">Your Total score is {{score}} / {{quizez.length}}</h1>
  </div>
</template>
<script>
var quiz_questions = [
  {
    category: "Entertainment: Film",
    type: "true or false",
    difficulty: "easy",
    question: "Was E.T. the Extra-Terrestrial shot in (1982)?",
    correct_answer: "TRUE",
    incorrect_answers: ["TRUE", "FALSE"]
  }
];
export default {
  name: "app",

  data: function() {
    return {
      questionindex: 0,
      quizez: quiz_questions,
      answers: Array(quiz_questions.length).fill("")
    };
  },
  methods: {
    next: function() {
      this.questionindex++;
    },
    prev: function() {
      this.questionindex--;
    }
  },
  computed: {
    score: function() {
      var total = 0;
      for (var i = 0; i < this.answers.length; i++) {
        if (this.answers[i] === this.quizez[i].correct_answer) {
          total += 1;
        }
      }
      return total;
    }
  },
  mounted() {
    const obj = JSON.parse(window.localStorage.getItem("arr"));
    for (var i = 0; i < obj.length; i++) {
      this.quizez.push(obj[i]);
    }
  }
};
</script>
