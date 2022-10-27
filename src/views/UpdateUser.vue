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
  props: ["userProp"],
  data() {
    return {
      userId: "",
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
        .put(`${import.meta.env.VITE_API}/users/${this.user.userId}`, this.user)
        .then((response) => {
          this.$router.push(`/`);
        });
    },
  },
  async mounted() {
    this.user.userId = this.$route.params.userId;
    if (this.userProp) {
      this.user = {
        ...this.userProp,
        userId: this.$route.params.userId,
      };
    }
  },
};
</script>
