<template>
  <nav v-if="isLogged" class="mb-5">
    <ul>
      <li><strong>Connectify</strong></li>
    </ul>
    <ul>
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/map">Carte</router-link></li>
      <li><router-link to="/profile">Profil</router-link></li>
      <li><LogoutButton /></li>
    </ul>
  </nav>
  <router-view></router-view>
  <div v-if="temperature">
    <p>Température actuelle : {{ temperature }} °C</p>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import LogoutButton from "./components/LogoutButton.vue";

const toast = useToast();
const options = {
  position: "top-right",

  closeButton: false,
  hideProgressBar: true,
  closeOnClick: true,
};
export default {
  name: "App",
  data() {
    return {
      temperature: undefined,
      isLogged: localStorage.getItem("token") ? true : false,
    };
  },
  methods: {
    async callSoapApi() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/temperatures/celsius`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          this.temperature = response.data;
        }
      } catch (error) {
        toast.error(
          "Une erreur est survenue lors de la récupération de la température",
          options
        );
      }
    },
  },
  mounted() {
    this.callSoapApi();
  },
  components: {
    LogoutButton,
  },
  watch: {},
};
</script>
