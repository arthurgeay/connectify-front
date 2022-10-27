<template>
  <div class="container">
    <div class="d-flex justify-content-between mb-5 align-items-center<">
      <p class="mb-0">This is the homepage</p>
      <!-- <button class="btn btn-light">Ajouter un utilisateur</button> -->
    </div>

    <ul class="list-group list-group-numbered">
      <li
        class="list-group-item d-flex justify-content-between align-items-start"
        aria-current="true"
        v-for="user in users"
        v-bind:key="user"
      >
        <a
          href=""
          class="ms-2 me-auto text-decoration-none text-dark text-start"
        >
          <div class="fw-bold">{{ user.fullname }} - {{ user.age }} ans</div>
          {{ user.city }}
        </a>
        <!-- <button class="btn btn-primary me-2">Modifier</button> -->
        <button @click="deleteUser(user._id)" class="btn btn-danger align-self-center">
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
    // async addUser() {
    //   await axios
    //     .post(`${import.meta.env.VITE_API}/users`, {
    //       fullname,
    //       age,
    //       city
    //     })
    //     .then((response) => {
    //       this.users = response.data;
    //     });
    // },
    async deleteUser(userId) {
      await axios
        .delete(`${import.meta.env.VITE_API}/users/${userId}`)
        .then((response) => {
          this.users = response.data;
        });
    },
  },
  mounted() {
    this.getUsers();
    // this.addUser();
    this.deleteUser();
  },
};
</script>

<style></style>
