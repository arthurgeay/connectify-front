<template>
  <form @submit.prevent="createActivity">
    <div class="mb-3">
      <label class="form-label">Type</label>
      <input
        type="text"
        class="form-control"
        v-model="activity.type"
        required
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Date</label>
      <input
        type="date"
        class="form-control"
        v-model="activity.date"
        required
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Distance</label>
      <input
        type="number"
        class="form-control"
        v-model="activity.distance"
        required
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Durée</label>
      <input
        type="number"
        class="form-control"
        v-model="activity.duration"
        required
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Fréquence cardiaque moyenne</label>
      <input
        type="number"
        class="form-control"
        v-model="activity.averageHeartRate"
        required
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Fréquence cardiaque maximale</label>
      <input
        type="number"
        class="form-control"
        v-model="activity.maxHeartRate"
        required
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Nombre de calories dépensées</label>
      <input
        type="number"
        class="form-control"
        v-model="activity.calories"
        required
      />
    </div>

    <button type="submit" class="btn btn-primary">Créer</button>
  </form>
</template>
<script>
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  name: "CreateActivity",
  components: {},
  data() {
    return {
      activity: {
        date: "",
        calories: "",
        distance: "",
        duration: "",
        date: "",
        averageHeartRate: "",
        maxHeartRate: "",
        type: "",
      },
    };
  },
  methods: {
    async createActivity() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API}/activities/users/${
            this.$route.params.userId
          }`,
          this.activity,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          this.$router.push(`/activities/${this.activity.userId}`);
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Une erreur est survenue, veuillez vérifier les données saisies"
        );
      }
    },
  },
};
</script>
