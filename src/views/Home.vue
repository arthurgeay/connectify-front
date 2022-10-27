<template>
  <div class="container">
    <div class="d-flex justify-content-between mb-5 align-items-center<">
      <p class="mb-0">Liste des utilisateurs</p>
      <button class="btn btn-light" @click="$router.push(`/users/create`)">
        Ajouter un utilisateur
      </button>
    </div>

    <ul class="list-group list-group-numbered">
      <li
        class="list-group-item d-flex justify-content-between align-items-start"
        aria-current="true"
        v-for="user in users"
        v-bind:key="user"
      >
        <a class="ms-2 me-auto text-decoration-none text-dark text-start">
          <div class="fw-bold">{{ user.fullname }} - {{ user.age }} ans</div>
          {{ user.city }}
        </a>
        <button
          class="btn btn-warning me-2 align-self-center"
          @click="$router.push(`/activities/${user._id}`)"
        >
          Activités
        </button>
        <button
          class="btn btn-primary me-2 align-self-center"
          @click="$router.push(`/users/${user._id}/update`)"
        >
          Modifier
        </button>
        <button
          @click="deleteUser(user._id)"
          class="btn btn-danger align-self-center"
        >
          Supprimer
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getUsers() {
      await axios.get(`${import.meta.env.VITE_API}/users`).then((response) => {
        this.users = response.data;
      });
    },

    async deleteUser(userId) {
      await axios
        .delete(`${import.meta.env.VITE_API}/users/${userId}`)
        .then(async (response) => {
          await this.getUsers();
        });
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style></style>
