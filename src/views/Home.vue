<template>
  <div class="container">
    <p>This is the homepage</p>

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
        <!-- <a href="" class="btn tbn-primary">Edit</a>
        <a href="" class="btn btn-danger">Delete</a> -->
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
      await axios
        .get(`https://connectify-api-ynov.herokuapp.com/users`)
        .then((response) => {
          this.users = response.data;
        });
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style></style>
