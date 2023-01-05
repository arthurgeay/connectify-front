<template>
  <form @submit.prevent="updateUser">
    <div class="mb-3">
      <label class="form-label">Nom complet</label>
      <input type="text" class="form-control" v-model="user.fullname" />
    </div>
    <div class="mb-3">
      <label class="form-label">Age</label>
      <input type="number" class="form-control" v-model="user.age" />
    </div>

    <div class="mb-3">
      <label class="form-label">Ville</label>
      <input type="text" class="form-control" v-model="user.city" />
    </div>

    <button type="submit" class="btn btn-primary">Modifier</button>
  </form>
</template>
<script>
import axios from "axios";
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
      await axios
        .put(
          `${import.meta.env.VITE_API}/users/${this.$route.params.userId}`,
          this.user
        )
        .then((response) => {
          this.$router.push(`/`);
        });
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
