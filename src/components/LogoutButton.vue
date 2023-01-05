<template>
  <form style="margin-bottom: 0" role="logout">
    <button type="submit" v-on:click="logout">
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
