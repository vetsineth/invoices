<template>
  <div>
    <h4>Home</h4>
    <h1 class="heading-text">Welcome to Home page</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: []
    };
  },

  methods: {
    getAddNew() {
      this.$router.push("/message/MessageNew");
    }
  }
};
</script>
<style scoped>
.heading-text {
  text-align: center;
}
</style>

