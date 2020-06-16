<template>
  <div id="app">
    <div id="vue-app">
    <form>
        <input type="text" v-model="data.name"/><br/>
        <input type="text" v-model="data.last"/><br/>
        <input type="text" v-model="data.index"/><br/>
        <select v-model="data.grade">
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
        </select></br></br>
        <button type="button" v-on:click="add()">Add To Table</button></br></br>
        <button type="button" v-on:click="saveFile()">saveFile</button>
    </form>
    <table border="1">
        <thead><td>Name</td><td>Last Name</td><td>Index</td><td>Grade</td></thead>
        <tbody>
        <tr v-for="x in data.arr">
            <td>{{x.name}}</td>
            <td>{{x.last}}</td>
            <td>{{x.index}}</td>
            <td>{{x.grade}}</td>
        </tr>
        </tbody>
    </table>
</div>
    
    
  </div>
</template>

<script>


export default {
  name: "App",
  data(){
    return{
      data: {
          name: "",
          last: "",
          index: "",
          grade: 0,
          arr: []
        }
      };
  },

  methods: {
      add() {
          
          this.data.arr.push({name: this.data.name, last: this.data.last, index: this.data.index, grade: this.data.grade});
          console.log(1);
      },
      saveFile() {
        const data = JSON.stringify(this.data.arr)
        window.localStorage.setItem('arr', data);
        console.log(JSON.parse(window.localStorage.getItem('arr')))
      }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
