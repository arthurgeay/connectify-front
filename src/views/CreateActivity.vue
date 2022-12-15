<template>
  <form @submit.prevent="createActivity">
    <div class="mb-3">
      <label class="form-label">Type</label>
      <input type="text" class="form-control" v-model="activity.type" />
    </div>
    <div class="mb-3">
      <label class="form-label">Date</label>
      <input type="date" class="form-control" v-model="activity.date" />
    </div>
    <div class="mb-3">
      <label class="form-label">Distance</label>
      <input type="number" class="form-control" v-model="activity.distance" />
    </div>
    <div class="mb-3">
      <label class="form-label">Durée</label>
      <input type="number" class="form-control" v-model="activity.duration" />
    </div>
    <div class="mb-3">
      <label class="form-label">Fréquence cardiaque moyenne</label>
      <input
        type="number"
        class="form-control"
        v-model="activity.averageHeartRate"
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Fréquence cardiaque maximale</label>
      <input
        type="number"
        class="form-control"
        v-model="activity.maxHeartRate"
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Nombre de calories dépensées</label>
      <input type="number" class="form-control" v-model="activity.calories" />
    </div>

    <button type="submit" class="btn btn-primary">Créer</button>
  </form>
</template>
<script>
import axios from "axios";
export default {
  name: "CreateActivity",
  components: {},
  data() {
    return {
      activity: {
        userId: "",
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
      await axios
        .post(`/activities/users/${this.activity.userId}`, this.activity)
        .then((response) => {
          this.$router.push(`/activities/${this.activity.userId}`);
        });
    },
  },
  async mounted() {
    this.activity.userId = this.$route.params.userId;
  },
};
</script>
