<template>
  <form @submit.prevent="updateUser">
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
      <input type="number" class="form-control" v-model="user.age" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Ville</label>
      <input type="text" class="form-control" v-model="user.city" required />
    </div>

    <button type="submit" class="btn btn-primary">Modifier</button>
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
  name: "UpdateUser",
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
    async updateUser() {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API}/users/${this.$route.params.userId}`,
          this.user
        );
        toast.success("Utilisateur modifié", options);

        this.$router.push(`/`);
      } catch (error) {
        toast.error("Une erreur est survenue", options);
      }
    },
  },
  async mounted() {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/users/${this.$route.params.userId}`
    );
    const { fullname, age, city } = response.data;
    this.user = { fullname, age, city };
  },
};
</script>
