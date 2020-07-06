
<template>
  <div id="app">
    <el-card>
      <table>
        <tr>
          <td colspan="2">
            <el-input type="textarea" style="width:300%" :autosize="{ minRows: 4}" placeholder="Enter your Passage  here" v-model="data.sentence"/>
          </td>
        </tr>
      </table>
      <h3 style="color:red;">*Please enter the blank items within square brackets*</h3>
      <h3 style="color:red;">*EG:if you want "My name is _______.", type "My name is [Your value]".*</h3>
      <br>
      <el-button type="primary" v-on:click="add()">Add Question</el-button>&emsp;
    </el-card>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      data: {
        type: "fill-in-the-blanks",
        difficulty: "medium",
        sentence: "",
      },
      arr: []
    };
  },

  methods: {
    add() {
      this.arr.push({
        type: this.data.type,
        difficulty: this.data.difficulty,
        sentence: this.data.sentence
      });
      this.data.sentence = "";
      console.log(this.arr);
      const data = JSON.stringify(this.arr);
      window.localStorage.setItem("fillex", data);
      const obj = JSON.parse(window.localStorage.getItem("fillex"));
      console.log(obj);
    },
  }
};
</script>

