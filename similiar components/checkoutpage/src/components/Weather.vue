<template>
  <div>
    <h1>Checkout Page</h1>
    <button v-on:click="getWeatherData">View cart Items</button>
    <div v-for="weatherData in weatherDataList" :key="weatherData.id" class="weather-data">
      <div class="weather-stats">
        <div>
          <span class="name">{{weatherData.name}}</span>
        </div>
      </div>
      <div class="weather-price">
        <span>{{weatherData.cost}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Weather",
  data() {
    return {
      weatherDataList: []
    };
  },
  methods: {
    getWeatherData() {
      //   fetch("weather.json")
      //     .then(response => response.json())
      //     .then(data => (this.weatherDataList = data));
      axios
        .get("weather.json")
        .then(response => (this.weatherDataList = response.data));
    }
  }
};
</script>
<style scoped>
.weather-data {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
  border-bottom: 2px solid #ccc;
  padding: 20px;
}

.weather-stats {
  flex-grow: 8;
  text-align: left;
  padding-left: 20px;
}

.weather-stats .name {
  font-size: 20px;
}

.weather-price {
  flex-grow: 1;
  font-size: 20px;
}

button {
  padding: 10px;
  background-color: #1aa832;
  color: white;
  border: 1px solid #ccc;
}
</style>