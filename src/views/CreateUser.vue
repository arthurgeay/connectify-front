<template>
  <form @submit.prevent="addUser">
    <div class="mb-3">
      <label class="form-label">Nom complet</label>
      <input
        type="text"
        class="form-control"
        v-model="user.fullname"
        required
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Age</label>
      <input type="number" class="form-control" v-model="user.age" />
    </div>

    <div class="mb-3">
      <label class="form-label">Ville</label>
      <input type="text" class="form-control" v-model="user.city" />
    </div>

    <button type="submit" class="btn btn-primary">Créer</button>
  </form>
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
  name: "response",
  components: {},
  data() {
    return {
      user: {
        fullname: "",
        age: "",
        city: "",
      },
    };
  },
  methods: {
    async addUser() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API}/users`,
          this.user,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200 || response.status === 201) {
          toast.success("Utilisateur créé", options);
          this.users = response.data;
          this.$router.push(`/`);
        }
      } catch (error) {
        toast.error("Une erreur est survenue", options);
      }
    },
    async mounted() {
      this.activity.userId = this.$route.params.userId;
      this.addUser();
    },
  },
};
</script>
