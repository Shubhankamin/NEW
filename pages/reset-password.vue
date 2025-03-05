<template>
  <!-- Tab and mobile screen -->
  <div class="fullscreen-container d-none d-md-block">
    <div class="logo-container d-block d-xl-none">
      <v-img src="/logo/logo.svg" height="50"></v-img>
    </div>
    <div class="form-Container d-block d-xl-none pt-5 pb-8">
      <h1 class="open-bold-h7 text-center py-4">Welcome Back</h1>
      <div class="d-flex flex-column align-items-center">
        <div style="width: 86%" class="mt-2 mx-auto">
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            v-model="password"
            @click:append-inner="visible = !visible"
          ></v-text-field>

          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Confirm your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            v-model="confirmPassword"
            @click:append-inner="visible = !visible"
          ></v-text-field>
        </div>
        <v-btn :disabled="!formIsValid" class="bg-black mx-5 rounded">
          <h5>Reset Password</h5>
        </v-btn>
      </div>
      <br />
      <p
        v-if="statusMessage"
        class="text-center text-red mt-2 open-bold-h7 text-body-1"
      >
        <v-icon>mdi-cancel</v-icon>
        {{ statusMessage }}
      </p>
    </div>

    <!-- Large screen -->
    <div class="logo-container-large d-none d-xl-block">
      <v-img src="/logo/logo.svg" height="50"></v-img>
      <v-icon
        @click="handleBackPress"
        color="black"
        size="36"
        class="cursor-pointer"
      >
        mdi-arrow-left
      </v-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const password = ref("");
const confirmPassword = ref("");
const visible = ref(false);
const router = useRouter();

const formIsValid = computed(
  () =>
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value
);

const statusMessage = computed(() => {
  if (!password.value || !confirmPassword.value) {
    return "";
  } else if (password.value !== confirmPassword.value) {
    return "Passwords do not match.";
  } else {
    return "";
  }
});

const handleBackPress = () => {
  router.push("/login");
};
</script>
