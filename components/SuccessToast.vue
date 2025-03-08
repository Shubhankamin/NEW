<template>
  <div class="toast-container success">
    <h4>{{ heading }}</h4>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  heading: String,
  message: String,
});
</script>

<style scoped>
.toast-container {
  border-radius: 5px;
  color: white;
  text-align: left;
  padding: 10px;
  background-color: green;
}
.success {
  background-color: green;
}
</style>
