<template>
  <h1>Pays</h1>
  <div :aria-busy="!isLoaded" v-if="!isLoaded">Chargements des données</div>
  <article v-for="(country, index) in countries" :key="index">
    <h2>{{ country.name }}</h2>
    <p><img :src="country.logo" alt="drapeau" /></p>
    <p>{{ country.population }} habitants</p>
  </article>
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
  name: "Country",
  data() {
    return {
      countries: [],
      isLoaded: false,
    };
  },
  async mounted() {
    await this.getCountry();
  },
  methods: {
    async getCountry() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/countries`
        );

        this.countries = response.data;
        this.isLoaded = true;
      } catch (error) {
        toast.error("Une erreur est survenue, veuillez réessayer", options);
      }
    },
  },
};
</script>
