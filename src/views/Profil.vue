<template>
  <div class="container-sm">
    <p>Profil</p>
    <p>Email : {{ email }}</p>

    <p v-if="!hasTooManyRequests">
      Nombre de requêtes API restantes : {{ rateLimitRemaining }} /
      {{ rateMax }}
    </p>
    <p v-else>
      Vous avez atteint le nombre maximum de requêtes autorisées par minute.
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profil",
  mounted() {
    this.getProfile();
  },
  data() {
    return {
      user: {},
      email: "",
      rateLimitRemaining: null,
      rateMax: null,
      hasTooManyRequests: false,
    };
  },
  methods: {
    async getProfile() {
      await axios
        .get(`/me`)
        .then((response) => {
          this.hasTooManyRequests = false;

          this.email = response.data.email;
          this.rateLimitRemaining = response.data.rateLimitRemaining;
          this.rateMax = response.data.rateLimitMax;
        })
        .catch((error) => {
          if (error.response.status === 429) {
            this.hasTooManyRequests = true;
          }
        });
    },
  },
};
</script>
