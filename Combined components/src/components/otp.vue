
<template>
  <el-card>
      <div style="padding: 50px;">
        <otp-input
          ref="otpInput"
          input-classes="otp-input"
          separator="-"
          :num-inputs="4"
          :should-auto-focus="true"
          :is-input-num="true"
          @on-change="handleOnChange"
          @on-complete="handleOnComplete"
        />
        <br>
        <el-button type="primary" @click="handleClearInput()">Resend</el-button>
        Time remaining: {{min}}:{{sec}}
      </div>
  </el-card>
</template>


<script>
import OtpInput from "@bachdgvn/vue-otp-input";
export default {
  name: "App",
  data() {
    return {
      countDown: 120,
      min: 0,
      sec: 0
    };
  },
  components: {
    OtpInput
  },

  methods: {
    handleOnComplete(value) {
      console.log("OTP completed: ", value);
      alert("Auto submitting");
    },
    handleOnChange(value) {
      console.log("OTP changed: ", value);
    },
    handleClearInput() {
      this.$refs.otpInput.clearInput();

      if (this.countDown === 0) {
        this.countDown = 120;
        this.countDownTimer();
      } else {
        this.countDown = 120;
      }
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.min = Math.floor(this.countDown / 60);
          this.sec = this.countDown - this.min * 60;
          this.countDownTimer();
        }, 1000);
      }
    }
  },

  created: function() {
    this.countDownTimer();
  }
};
</script>

<style lang="less">
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  &.error {
    border: 1px solid red !important;
  }
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>


