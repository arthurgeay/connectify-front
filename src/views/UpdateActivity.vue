<template>
  <form @submit.prevent="updateActivity">
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

    <button type="submit" class="btn btn-primary">Mettre à jour</button>
  </form>
</template>
<script>
import axios from "axios";
export default {
  name: "UpdateActivity",
  components: {},
  props: ["activityProp"],
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
    async updateActivity() {
      await axios
        .put(
          `${import.meta.env.VITE_API}/activities/${
            this.$route.params.activityId
          }/users/${this.$route.params.userId}`,
          this.activity,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          this.$router.push(`/activities/${this.$route.params.userId}`);
        });
    },
  },
  async mounted() {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/activities/${
        this.$route.params.activityId
      }/users/${this.$route.params.userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const {
      date,
      calories,
      distance,
      duration,
      averageHeartRate,
      maxHeartRate,
      type,
    } = response.data;

    this.activity = {
      date,
      calories,
      distance,
      duration,
      averageHeartRate,
      maxHeartRate,
      type,
    };
  },
};
</script>
