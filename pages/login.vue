<template>
  <div class="fullscreen-container d-none d-md-block">
    <div class="logo-container d-block d-xl-none">
      <v-img src="https://dummyimage.com/300/09f/fff.png" height="50"></v-img>
    </div>
    <v-row class="justify-center">
      <v-col cols="10">
        <div class="form-Container d-block d-xl-none pt-5 pb-8">
          <h1 class="open-bold-h7 text-center py-4">Welcome Back</h1>
          <div class="d-flex flex-column align-items-center">
            <div style="width: 86%" class="mt-2 mx-auto">
              <v-text-field
                density="compact"
                placeholder="Email address"
                v-model="email"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                :rules="emailRules"
              ></v-text-field>

              <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                v-model="password"
                density="compact"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
              ></v-text-field>
            </div>

            <v-btn
              :class="
                isEmailValid && isPasswordValid
                  ? 'bg-black mx-5'
                  : 'bg-grey-300 mx-5'
              "
              :disabled="!isEmailValid || !isPasswordValid"
              class="rounded"
              :loading="isLoading"
              @click="handleLogin"
            >
              <h5>LOGIN</h5>
            </v-btn>

            <NuxtLink to="/forgot-password" class="text-black">
              <p class="text-center my-3">Forgot password?</p>
            </NuxtLink>
          </div>
          <br />
          <p
            v-if="statusMessage"
            class="text-center text-red mt-8 open-bold-h7 text-body-1 my-2"
          >
            <v-icon>mdi-cancel</v-icon>
            {{ statusMessage }}
          </p>
        </div>
      </v-col>
    </v-row>

    <!-- Large screen -->
    <div class="logo-container-large d-none d-xl-block">
      <v-img src="/logo/logo.svg" height="50"></v-img>
      <v-icon
        @click="handleBackPress"
        color="black"
        size="36"
        class="cursor-pointer"
        >mdi-arrow-left</v-icon
      >
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});
const isLoading = ref(false);
const email = ref("");
const password = ref("");
const visible = ref(false);
const { login, statusMessage } = useAuth();

const isEmailValid = ref(false);
const isPasswordValid = ref(false);

watch(email, (val) => {
  isEmailValid.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
});

watch(password, (val) => {
  isPasswordValid.value =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      val
    );
});

const router = useRouter();

const handleLogin = async () => {
  isLoading.value = true; 
  statusMessage.value = "";

  try {
    const { session, error } = await login(email.value, password.value);

    if (error) {
      throw new Error(error);
    }

    console.log("Login session:", session);

    if (session && session.user) {
      const user = useCookie("user", { path: "/", maxAge: 60 * 60 * 24 * 7 }); 
      user.value = JSON.stringify({
        id: session.user.id,
        email: session.user.email,
        authenticated: true,
      });

      console.log("User cookie set:", user.value);
      router.push("/dashboard");
    }
  } catch (err) {
    console.error("Login failed:", err.message);
    statusMessage.value = err.message;
  } finally {
    isLoading.value = false; 
  }
};
</script>

<style scoped>
.otp-input {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #808080;
}
</style>
