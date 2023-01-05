<template>
  <div v-if="users.length > 0">
    <div class="d-flex justify-between mb-5">
      <p>Liste des utilisateurs</p>
      <button class="w-fit" @click="$router.push(`/users/create`)">
        Ajouter un utilisateur
      </button>
    </div>

    <article class="d-flex justify-between" aria-current="true" v-for="user in users" v-bind:key="user">
      <a>
        <div>{{ user.fullname }} - {{ user.age }} ans</div>
        {{ user.city }}
      </a>
      <div class="d-flex gap-4">
        <button @click="$router.push(`/activities/${user._id}`)">
          Activités
        </button>
        <button class="outline contrast" @click="$router.push(`/users/${user._id}/update`)">
          Modifier
        </button>
        <button class="outline secondary" @click="deleteUser(user._id)">
          Supprimer
        </button>
      </div>
    </article>
  </div>
  <div class="container" v-else>
    <LoadingCircle />
  </div>
</template>

<script>
import axios from "axios";
import LoadingCircle from "../components/LoadingCircle.vue";
export default {
  name: "Home",
  components: { LoadingCircle },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getUsers() {
      await axios
        .get(`${import.meta.env.VITE_API}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.users = response.data;
        });
    },

    async deleteUser(userId) {
      await axios
        .delete(`${import.meta.env.VITE_API}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(async (response) => {
          await this.getUsers();
        });
    },
  },
  mounted() {
    if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
      return this.$router.push("/login");
    }
    this.getUsers();
  },
};
</script>
