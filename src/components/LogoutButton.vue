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
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    },
  },
};
</script>
