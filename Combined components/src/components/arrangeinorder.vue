<template>
  <div>
    <div v-for="(quiz,index) in quizez" v-show="index === questionindex" :key="index">
      <el-card>
        <h3>{{ quiz.question}}</h3>
        <table>
          <tr>
            <td>
              <el-card>
                <b>Options</b>
              </el-card>
            </td>
          </tr>
          <tr
            v-for="(element,parent_node_index) in quiz.correct_answers"
            :key="element.order"
          >
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
        <el-button type="danger" style="float:left;" v-if="questionindex > 0" v-on:click="prev">Prev</el-button>&emsp;
        <el-button type="warning" style="float:right;" v-on:click="submit">Submit</el-button>&emsp;
        <el-button type="success" v-on:click="next">Next</el-button>
      </center>
    </div>
    <el-card v-if="questionindex == quizez.length">
    <h1 >Your score is {{score}} / {{nques+nos}}</h1>
    </el-card>
  </div>
</template>

<script>
import draggable from "vuedraggable";

var quiz_questions = [
  {
    no: 0,
    type: "mtf",
    difficulty: "easy",
    question: "Arrange the below options in descending order",
    correct_answers: ["6", "5", "3", "0"],
    correct: ["6", "5", "3", "0"]
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
      answers: [[""]]
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
    this.validate();
    this.$router.push({ path: 'complete', query: { score:this.score,noq:this.quizez.length+this.nos } })
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
      setTimeout(function(){ this.$router.push({path:''}) },5000);
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
    const obj = JSON.parse(window.localStorage.getItem("sen"));
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
  transition: transform 1s;
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
