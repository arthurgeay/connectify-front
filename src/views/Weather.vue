<template>
  <h1>La météo du {{ formatDate() }}</h1>
  <div :aria-busy="!isLoaded" v-if="!isLoaded">Chargements des données</div>
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
            label: "Température (Celsius)",
            backgroundColor: "#f87979",
            data: [],
          },
          {
            label: "Température (Fahrenheit)",
            backgroundColor: "yellow",
            data: [],
          },
          {
            label: "Précipitation (mm)",
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

        const celciusTemperatures = response.data.map(
          (weather) => weather.temperature
        );

        const farenheitTemperatures = await this.callSoapApi(
          celciusTemperatures
        );

        const precipitations = response.data.map(
          (weather) => weather.precipitation
        );

        this.chartData.labels = response.data.map((weather) =>
          format(new Date(weather.date), "hh:mm")
        );

        this.chartData.datasets[0].data = celciusTemperatures;
        this.chartData.datasets[1].data =
          farenheitTemperatures.temperatures || [];
        this.chartData.datasets[2].data = precipitations;

        this.isLoaded = true;
      } catch (error) {
        toast.error("Une erreur est survenue, veuillez réessayer", options);
      }
    },
    formatDate() {
      return format(new Date(), "dd/MM/yyyy");
    },
    async callSoapApi(temperatures) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API}/temperatures/conversion`,
          {
            temperatures,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          return response.data;
        }
      } catch (error) {
        toast.error(
          "Une erreur est survenue lors de la récupération de la température",
          options
        );
      }
    },
  },
};
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/charts.css/dist/charts.min.css";
</style>
