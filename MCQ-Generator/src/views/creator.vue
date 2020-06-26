<template>
  <div id="app">
    <el-card>
        <h3>Category: <input type="text" v-model="data.category"/></h3>
        <h3>Question: <input type="text" v-model="data.question"/></h3>
        <h3>Answer: <input type="text" v-model="data.correct_answer"/></h3>
        <h3>Options:</h3>
        <h3>1.<input type="text" v-model="data.incorrect_answers[0]"/></h3>
        <h3>2.<input type="text" v-model="data.incorrect_answers[1]"/></h3>
        <h3>3.<input type="text" v-model="data.incorrect_answers[2]"/></h3>
        <h3>4.<input type="text" v-model="data.incorrect_answers[3]"/></h3>
        <el-button type="success" v-on:click="add()">Add Question</el-button>&emsp;
        <el-button type="success" v-on:click="saveFile()">saveFile</el-button>&emsp;
        <el-button type="success" v-on:click="navigate()">Go to your Quiz page</el-button>
    </el-card>
  </div>
</template>

<script>


export default {
  name: "App",
  data(){
    return{
      data: {
          category: "",
          type: "multiple",
          difficulty: "medium",
          question:"",
          correct_answer:"",
          incorrect_answers:["","","",""]
        },
        arr:[]
      };
  },

  methods: {
      add() {
          
          this.arr.push({category: this.data.category, type: this.data.type, difficulty: this.data.difficulty, question: this.data.question,
          correct_answer:this.data.correct_answer,incorrect_answers:this.data.incorrect_answers});
          console.log(this.arr);
      },
      saveFile() {
        const data = JSON.stringify(this.arr)
        window.localStorage.setItem('arr', data);
        const obj=JSON.parse(window.localStorage.getItem('arr'))
        console.log(obj)
      },
      navigate(){
          this.$router.push('/quiz')
      }
  }
};
</script>
