<template>
  <GoogleMap api-key="AIzaSyDqw9PlfYMbDopxlRNH1hvwntZgjrmbip0" style="width: 100%; height: 500px" :center="center" :zoom="15">
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 47.2186371, lng: -1.5541362 };

    return { center };
  },
});
</script>