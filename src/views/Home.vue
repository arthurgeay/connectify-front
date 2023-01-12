<template>
  <div v-if="users.length >= 0">
    <div class="d-flex justify-between mb-5">
      <h3 class="align-self-center mb-0">Liste des utilisateurs</h3>
      <button @click="$router.push(`/users/create`)">
        Ajouter un utilisateur
      </button>
    </div>

    <article
      class="d-flex justify-between wrap gap-4"
      :aria-busy="this.isLoading"
      aria-current="true"
      v-for="user in users"
      v-bind:key="user"
    >
      <div class="align-self-center">
        <p class="mb-0">{{ user.fullname }} - {{ user.age }} ans</p>
        {{ user.city }}
      </div>
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
import { useToast } from "vue-toastification";

const toast = useToast();
const options = {
  position: "top-right",

  closeButton: false,
  hideProgressBar: true,
  closeOnClick: true,
};

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
      this.isLoading = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          this.users = response.data;
          this.isLoading = false;
        }
      } catch (error) {
        toast.error(
          "Une erreur est survenue lors de la récupérations des utilisateurs",
          options
        );
      }
    },

    async deleteUser(userId) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API}/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 204
        ) {
          await this.getUsers();
          toast.success("Utilisateur supprimé", options);
        }
      } catch (error) {
        toast.error(
          "Une erreur est survenue lors de la suppression de cet utilisateur",
          options
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

<style>
.Vue-Toastification__toastCustom {
  max-height: 300px !important;
}
</style>
