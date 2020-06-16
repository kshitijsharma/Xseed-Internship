<template>
  <div>
    <div v-for="(quiz, index) in quizez" v-show="index === questionindex" :key="index">
      <h1>{{ quiz.category }}</h1>
      <el-card>
        <h2>Match the question in coloumn A to the answers in coloumn b by rearranging coloumn B</h2>
        <div>
          <h3 style="float:left;text-align:center;padding:40px">coloum A
            <ol>
              <li v-for="question in quiz.question" :key="question">
                <b>{{ question}}</b>
              </li>
            </ol>
          </h3>
          <h3 style="float:Right;text-align:center;padding:40px">colomn B
            <div class="fluid container">
              <div class="col-md-3">
                <draggable
                  class="list-group"
                  tag="ul"
                  v-model="list"
                  v-bind="dragOptions"
                  :move="handlemove"
                  @end="handleend"
                  @start="isDragging=true"
                >
                  <transition-group type="transition" :name="'flip-list'">
                    <li
                      class="list-group-item"
                      v-for="element in list"
                      :key="element.order"
                    >{{element.name}}</li>
                  </transition-group>
                </draggable>
              </div>
            </div>
          </h3>
        </div>
      </el-card>
    </div>
    <br>
    <br>

    <div v-if="questionindex < quizez.length">
      <center>
        <el-button type="danger" v-if="questionindex > 0" v-on:click="prev">prev</el-button>&emsp;
        <el-button type="warning" v-on:click="submit">Submit</el-button>&emsp;
        <el-button type="success" v-on:click="next">next</el-button>
      </center>
    </div>
    <h1 v-if="questionindex == quizez.length">Your Total score is {{score}} / {{nques}}</h1>
  </div>
</template>

<script>
import draggable from "vuedraggable";

var quiz_questions = [
  {
    no: 0,
    category: "Maths",
    type: "mtf",
    difficulty: "easy",
    question: ["2*3", "1*0", "5*1"],
    correct_answers: ["6", "0", "5"],
    correct: ["6", "0", "5"]
  }
];

export default {
  name: "app",
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
    next: function() {
      this.questionindex++;
      const message = this.quizez[this.questionindex].correct_answers.sort(
        function() {
          return 0.5 - Math.random();
        }
      );
      this.list = message.map((name, index) => {
        return { name, order: index + 1 };
      });
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
    submit: function() {
      for (
        var i = 0;
        i < this.quizez[this.questionindex].correct_answers.length;
        i++
      ) {
        this.answers[this.questionindex][i] = this.list[i].name;
      }
    },

    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
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
      return false; // disable sort
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
    listString() {
      return JSON.stringify(this.list, null, 2);
    },
    score: function() {
      var total = 0;
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
    for (var i = 0; i < obj.length; i++) {
      this.quizez.push(obj[i]);
    }
  }
};
</script>

<style>
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

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
