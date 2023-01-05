<template>
  <nav v-if="isLogged">
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
</template>


<script>
import LogoutButton from "./components/LogoutButton.vue";
export default {
  name: "App",
  data() {
    return {
    isLogged: localStorage.getItem("token") ?? false,
    };
  },
  components: {
    LogoutButton,
  },
  watch: {
  },
};
</script>
