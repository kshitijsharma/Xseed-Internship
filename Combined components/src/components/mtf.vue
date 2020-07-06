<template>
  <div>
    <div v-for="(quiz,index) in quizez" v-show="index === questionindex" :key="index">
      <el-card>
        <h2>Match the question in coloumn A to the answers in coloumn b by rearranging coloumn B</h2>
        <h2>{{quiz.head}}</h2>
        <table>
          <tr>
            <td>
              <el-card>
                <b>Column A</b>
              </el-card>
            </td>
            <td>
              <el-card>
                <b>Column B</b>
              </el-card>
            </td>
          </tr>
          <tr v-for="(element,parent_node_index) in quiz.question" :key="element.order">
            <td>
              <el-card>
                <b>{{element}}</b>
              </el-card>
            </td>
            <draggable
              class="list-group"
              tag="td"
              v-model="list"
              v-bind="dragOptions"
              :move="handlemove"
              @end="handleend"
              @start="isDragging=true"
            >
              <transition-group type="transition" :name="'flip-list'">
                <li style=" list-style-type: none;" v-for="(item,index) in list" :key="item.order">
                  <el-card style="background:aqua" v-show="index==parent_node_index">{{item.name}}</el-card>
                </li>
              </transition-group>
            </draggable>
          </tr>
        </table>
      </el-card>
    </div>
    <br>
    <br>

    <div v-if="questionindex < quizez.length">
      <center>
        <el-button type="danger" v-if="questionindex > 0" v-on:click="prev">Prev</el-button>&emsp;
        <el-button type="success" v-on:click="next">Next</el-button>
        <el-button type="warning" style="float:right;" v-on:click="submit">Submit</el-button>
      </center>
    </div>
    <h1 v-if="questionindex == quizez.length">Navigating to the Multiple Answer Questions.{{navigate()}}</h1>
  </div>
</template>

<script>
import draggable from "vuedraggable";

var quiz_questions = [
  {
    no: 0,
    type: "mtf",
    difficulty: "easy",
    head:"Arithmetic operations",
    question: ["2*3", "1*0", "5*1"],
    correct_answers: ["6", "0", "5"],
    correct: ["6", "0", "5"]
  },
  {
    no: 0,
    type: "mtf",
    difficulty: "easy",
    head:"Arithmetic operations",
    question: ["2+3", "1+0", "5+1"],
    correct_answers: ["5", "1", "6"],
    correct: ["5", "1", "6"]
  }
];

export default {
  name: "app",
  props:['prevscore','nos'],
  components: {
    draggable
  },
  data() {
    return {
      list: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
      questionindex: 0,
      quizez: quiz_questions,
      answers: [[""], [""]]
    };
  },
  created() {
    const message = this.quizez[this.questionindex].correct_answers.sort(
      function() {
        return 0.5 - Math.random();
      }
    );
    this.list = message.map((name, index) => {
      return { name, order: index + 1 };
    });
  },

  methods: {
    validate: function() {
      for (
        var i = 0;
        i < this.quizez[this.questionindex].correct_answers.length;
        i++
      ) {
        this.answers[this.questionindex][i] = this.list[i].name;
      }
    },
    next: function() {
      this.validate();
      this.questionindex++;
      if (this.questionindex < this.quizez.length) {
        const message = this.quizez[this.questionindex].correct_answers.sort(
          function() {
            return 0.5 - Math.random();
          }
        );
        this.list = message.map((name, index) => {
          return { name, order: index + 1 };
        });
      }
    },
    prev: function() {
      this.questionindex--;
      const message = this.quizez[this.questionindex].correct_answers.sort(
        function() {
          return 0.5 - Math.random();
        }
      );
      this.list = message.map((name, index) => {
        return { name, order: index + 1 };
      });
    },
    submit:function(){
      this.validate()
      this.$router.push({ path: 'complete', query: { score:this.score,noq:this.nques+this.nos } })
    },
    handleend() {
      this.futureItem = this.list[this.futureIndex];
      this.movingItem = this.list[this.movingIndex];
      const _items = Object.assign([], this.list);
      _items[this.futureIndex] = this.movingItem;
      _items[this.movingIndex] = this.futureItem;

      this.list = _items;
    },
    handlemove(e) {
      const { index, futureIndex } = e.draggedContext;
      this.movingIndex = index;
      this.futureIndex = futureIndex;
      return false;
    },
    navigate:function(){
      this.$router.push({ path: 'maq', query: { score:this.score,noq:this.nques+this.nos } })
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    score: function() {
      var total = this.prevscore;
      for (var i = 0; i < this.answers.length; i++) {
        for (var j = 0; j < this.answers[i].length; j++) {
          if (this.answers[i][j] === this.quizez[i].correct[j]) {
            total += 1;
          }
        }
      }
      return total;
    },
    nques: function() {
      var noq = 0;
      for (var i = 0; i < this.answers.length; i++) {
        for (var j = 0; j < this.answers[i].length; j++) {
          noq += 1;
        }
      }
      return noq;
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  },
  mounted() {
    const obj = JSON.parse(window.localStorage.getItem("arr"));
    if (obj !== null) {
      for (var i = 0; i < obj.length; i++) {
        this.quizez.push(obj[i]);
        this.answers.push([""])
      }
    }
  }
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}
</style>
