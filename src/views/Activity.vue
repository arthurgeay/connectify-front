<template>
  <div class="d-flex justify-between mb-5">
    <h3 class="align-self-center mb-0">Historique des activités</h3>
    <button @click="$router.push(`/activity/${$route.params.userId}/create`)">
      Créer une activité
    </button>
  </div>

  <article v-for="activity in activities" ref="itemCollapse" v-bind:key="activity">
    <details>
      <summary>{{ `${activity.type} - ${activity.date}` }}</summary>
      <div class="pt-5">
        <p>
          {{ `Calories dépensées : ` }}
          <strong>{{ activity.calories }}</strong>
        </p>
        <p>
          {{ `Distance : ` }} <strong>{{ activity.distance }}</strong>
        </p>
        <p>
          {{ `Durée : ` }} <strong>{{ activity.duration }}</strong>
        </p>
        <p>
          {{ `Fréquence cardiaque moy : ` }}
          <strong>{{ activity.averageHeartRate }}</strong>
        </p>
        <p>
          {{ `Fréquence cardiaque max : ` }}
          <strong>{{ activity.maxHeartRate }}</strong>
        </p>
      </div>

      <div class="d-flex gap-4 justify-end">
        <button
          class="outline contrast"
          @click="
            $router.push({
              name: 'UpdateActivity',
              params: {
                activityId: activity._id,
                userId: $route.params.userId,
              },
            })
          "
        >
          Modifier
        </button>
        <button class="outline secondary" @click="deleteActivity(activity._id)">
          Supprimer
        </button>
      </div>
    </details>
  </article>
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
  name: "Activity",
  components: {},
  data() {
    return {
      activities: [],
    };
  },
  methods: {
    async getActivities(userId) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/activities/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.activities = response.data;
      } catch (error) {
        toast.error("Erreur lors de la récupération des activités", options);
      }
    },
    async deleteActivity(id) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API}/activities/${id}/users/${
            this.$route.params.userId
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        await this.getActivities(this.$route.params.userId);
        toast.success("Activité supprimée", options);
      } catch (error) {
        toast.error("Erreur lors de la suppression de l'activité", options);
      }
    },
  },
  async mounted() {
    await this.getActivities(this.$route.params.userId);
  },
};
</script>
<style>
.Vue-Toastification__toastCustom {
  max-height: 300px !important;
}
</style>
