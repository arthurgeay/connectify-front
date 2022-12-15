<template>
  <div>
    <loading :active.sync="isLoading"></loading>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";

export default {
  data() {
    return {
      isLoading: true,
      fullPage: false,
    };
  },
  components: {
    Loading,
  },
};
</script>
