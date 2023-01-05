<template>
  <div v-if="users.length > 0">
    <div class="d-flex justify-between mb-5">
      <p>Liste des utilisateurs</p>
      <button class="w-fit" @click="$router.push(`/users/create`)">
        Ajouter un utilisateur
      </button>
    </div>

    <article
      class="d-flex justify-between"
      :aria-busy="this.isLoading"
      aria-current="true"
      v-for="user in users"
      v-bind:key="user"
    >
      <a>
        <div>{{ user.fullname }} - {{ user.age }} ans</div>
        {{ user.city }}
      </a>
      <div class="d-flex gap-4">
        <button @click="$router.push(`/activities/${user._id}`)">
          Activités
        </button>
        <button
          class="outline contrast"
          @click="$router.push(`/users/${user._id}/update`)"
        >
          Modifier
        </button>
        <button class="outline secondary" @click="deleteUser(user._id)">
          Supprimer
        </button>
      </div>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import LoadingCircle from "../components/LoadingCircle.vue";
import { useToast } from "vue-toastification";

const toast = useToast();
export default {
  name: "Home",
  data() {
    return {
      users: [],
      isLoading: false,
    };
  },
  methods: {
    async getUsers() {
      const response = await axios.get(`${import.meta.env.VITE_API}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        this.users = response.data;
      } else {
        toast.error(
          "Une erreur est survenue lors de la récupérations des utilisateurs"
        );
      }
    },

    async deleteUser(userId) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        await this.getUsers();
      } else {
        toast.error(
          "Une erreur est survenue lors de la suppression de votre compte"
        );
      }
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
