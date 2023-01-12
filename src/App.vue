<template>
  <nav v-if="isLogged" class="mb-5">
    <ul>
      <li>
        <strong><router-link to="/">Connectify</router-link></strong>
      </li>
    </ul>
    <ul>
      <li><router-link to="/map">Carte</router-link></li>
      <li><router-link to="/profile">Profil</router-link></li>
      <li><router-link to="/weather">Météo</router-link></li>
      <li><router-link to="/country">Pays</router-link></li>
      <li><LogoutButton /></li>
    </ul>
  </nav>
  <router-view></router-view>
</template>

<script>
import axios from "axios";
import LogoutButton from "./components/LogoutButton.vue";

export default {
  name: "App",
  data() {
    return {
      isLogged: localStorage.getItem("token") ? true : false,
    };
  },
  components: {
    LogoutButton,
  },
  watch: {},
};
</script>
