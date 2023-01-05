<template>
  <div class="container-sm">
    <p>Historique d'activités</p>
  </div>
  <div class="accordion" id="accordionExample">
    <div
      class="accordion-item"
      v-for="activity in activities"
      ref="itemCollapse"
      v-bind:key="activity"
    >
      <h2 class="accordion-header" id="headingOne">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          {{ `${activity.type} - ${activity.date}` }}
        </button>
      </h2>
      <div
        id="collapseOne"
        class="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <div id="calories">
            <p>
              {{ `Calories dépensées : ` }}
              <strong>{{ activity.calories }}</strong>
            </p>
          </div>
          <div id="distance">
            <p>
              {{ `Distance : ` }} <strong>{{ activity.distance }}</strong>
            </p>
          </div>
          <div id="duration">
            <p>
              {{ `Durée : ` }} <strong>{{ activity.duration }}</strong>
            </p>
          </div>
          <div id="heart_freq">
            <p>
              {{ `Fréquence cardiaque moy : ` }}
              <strong>{{ activity.averageHeartRate }}</strong>
            </p>
            <p>
              {{ `Fréquence cardiaque max : ` }}
              <strong>{{ activity.maxHeartRate }}</strong>
            </p>
          </div>

          <button
            class="btn btn-primary"
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
          <button class="btn btn-danger" @click="deleteActivity(activity._id)">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      @click="$router.push(`/activity/${$route.params.userId}/create`)"
    >
      Créer une activité
    </button>
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
        const activitiesData = await axios.get(
          `${import.meta.env.VITE_API}/activities/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.activities = activitiesData.data;
      } catch (error) {
        toast.error("Erreur lors de la récupération des activités"), options;
      }
    },
    async deleteActivity(id) {
      await axios
        .delete(
          `${import.meta.env.VITE_API}/activities/${id}/users/${
            this.$route.params.userId
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(
          async (response) =>
            await this.getActivities(this.$route.params.userId)
        );
    },
  },
  async mounted() {
    await this.getActivities(this.$route.params.userId);
  },
};
</script>
