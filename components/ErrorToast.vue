<template>
  <div class="toast-container error">
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
  background-color: red;
}
.error {
  background-color: red;
}
:deep(.Toastify__toast-theme--colored.Toastify__toast--default, .Toastify__toast-theme--light) {
  background-color: red;
  color: white;
}

:deep(.Toastify__toast-body) {
  color: white;
  background-color: red;
}
</style>
