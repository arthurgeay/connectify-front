<template>
  <div id="nav">
    <nav class="navbar fixed-top navbar-expand-xl bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-nav mr-auto">
          <router-link to="/" class="nav-item nav-link">Accueil</router-link>
          <router-link to="/profile" class="nav-item nav-link"
            >Profil</router-link
          >
          <router-link to="/login" class="nav-item nav-link"
            >Se connecter</router-link
          >
        </div>
        <ul class="navbar-nav mr-auto">
          <div class="d-flex flex-row-reverse">
            <LogoutButton />
          </div>
        </ul>
      </div>
    </nav>
  </div>
  <router-view></router-view>
</template>

<script>
import LogoutButton from "./components/LogoutButton.vue";
export default {
  name: "App",
  data() {
    return {
      user: localStorage.getItem("user"),
    };
  },
  components: {
    LogoutButton,
  },
  methods: {
    logout() {
      window.localStorage.removeItem("user");
    },
    updateUser(updateUser) {
      this.user = updateUser;
    },
  },
  watch: {
    user(user, userUpdated) {
      if (userUpdated) {
        this.updateUser(userUpdated);
      } else if (!user && !userUpdated) {
        this.logout();
      }
    },
  },
};
</script>

<style>
#nav a {
  font-weight: bold;
  color: #939aa2;
}

#nav a.router-link-exact-active {
  font-weight: bold;
  color: #2c3e50;
}
</style>
