<template>
  <h1>La météo</h1>
  <table class="charts-css bar">
    <caption>
      2016 Summer Olympics Medal Table
    </caption>

    <thead>
      <tr>
        <th scope="col">Country</th>
        <th scope="col">Gold</th>
        <th scope="col">Silver</th>
        <th scope="col">Bronze</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <th scope="row">USA</th>
        <td>46</td>
        <td>37</td>
        <td>38</td>
      </tr>
      <tr>
        <th scope="row">GBR</th>
        <td>27</td>
        <td>23</td>
        <td>17</td>
      </tr>
      <tr>
        <th scope="row">CHN</th>
        <td>26</td>
        <td>18</td>
        <td>26</td>
      </tr>
    </tbody>
  </table>
  {{ weathers }}
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();
const options = {
  position: "top-right",

  closeButton: false,
  hideProgressBar: true,
  closeOnClick: true,
};

export default {
  name: "Weather",
  data() {
    return {
      weathers: [],
    };
  },
  async mounted() {
    await this.getWeather();
  },
  methods: {
    async getWeather() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/weathers/current`
        );

        this.weathers = response.data;
      } catch (error) {
        toast.error("Une erreur est survenue, veuillez réessayer", options);
      }
    },
  },
};
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/charts.css/dist/charts.min.css";

.bar {
  height: 200px;
  width: 50px;
}
</style>
