<template>
  <h1>La météo du {{ formatDate() }}</h1>
  <Line v-if="isLoaded" :options="chartOptions" :data="chartData" />
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import { format } from "date-fns";

import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const toast = useToast();
const options = {
  position: "top-right",

  closeButton: false,
  hideProgressBar: true,
  closeOnClick: true,
};

export default {
  name: "Weather",
  components: { Line },
  data() {
    return {
      isLoaded: false,
      weatherLabels: [],
      weatherTemperatures: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Température",
            backgroundColor: "#f87979",
            data: [],
          },
          {
            label: "Précipitation",
            backgroundColor: "green",
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  async mounted() {
    await this.getWeather();
  },
  methods: {
    async getWeather() {
      try {
        this.isLoaded = false;
        const response = await axios.get(
          `${import.meta.env.VITE_API}/weathers/current`
        );

        this.chartData.labels = response.data.map((weather) =>
          format(new Date(weather.date), "hh:mm")
        );

        this.chartData.datasets[0].data = response.data.map(
          (weather) => weather.temperature
        );

        this.chartData.datasets[1].data = response.data.map(
          (weather) => weather.precipitation
        );

        this.isLoaded = true;
      } catch (error) {
        toast.error("Une erreur est survenue, veuillez réessayer", options);
      }
    },
    formatDate() {
      return format(new Date(), "dd/MM/yyyy");
    },
  },
};
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/charts.css/dist/charts.min.css";
</style>
