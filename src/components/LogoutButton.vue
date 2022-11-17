<template>
  <form class="d-flex" role="logout">
    <button class="btn btn-danger" type="submit" v-on:click="logout">
      Déconnexion
    </button>
  </form>
</template>

<script>
export default {
  name: "LogoutButton",
  data() {
    return {
      user: localStorage.getItem("user"),
    };
  },
  methods: {
    logout() {
      window.localStorage.removeItem("user");
    },
  },
};
</script>
