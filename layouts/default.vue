<template>
  <v-app id="inspire" class="py-0">
    <div>
      <!-- Side Drawer -->
      <v-navigation-drawer
        :width="260"
        class="drawer overflow-x-hidden"
        v-model="drawer"
        elevation="5"
      >
        <div
          class="d-flex justify-center align-center bg-white py-10 relative-class"
        >
          <img
            class="scale-up-center"
            src="https://dummyimage.com/300/09f/fff.png"
            alt="logo"
            width="150"
          />
        </div>

        <div class="d-flex flex-column justify-space-between">
          <div>
            <div>
              <NuxtLink to="/dashboard" class="text-black">
                <div
                  :class="{
                    'active-button': activeButton === 'dashboard',
                  }"
                  @click="setActiveButton('dashboard')"
                  class="types mx-4 buttons cursor-pointer"
                >
                  <v-btn
                    class="open-light-h6 buttons text-class"
                    variant="text"
                    prepend-icon="mdi-chart-line"
                    ><p class="text-left">Dashboard</p></v-btn
                  >
                </div>
              </NuxtLink>
            </div>

            <div>
              <NuxtLink to="/customer" class="text-black">
                <div
                  :class="{
                    'active-button': activeButton === 'customer',
                  }"
                  @click="setActiveButton('customer')"
                  class="types mx-4 mt-3 buttons cursor-pointer"
                >
                  <v-btn
                    class="open-light-h6 buttons text-class"
                    variant="text"
                    prepend-icon="mdi-account-group"
                    >Customer</v-btn
                  >
                </div>
              </NuxtLink>
            </div>
            <div>
              <NuxtLink to="/category" class="text-black">
                <div
                  :class="{
                    'active-button': activeButton === 'category',
                  }"
                  width="100%"
                  @click="setActiveButton('category')"
                  class="types mx-4 mt-3 buttons cursor-pointer"
                >
                  <v-btn
                    variant="text"
                    class="open-light-h6 buttons text-class"
                    prepend-icon="mdi-view-grid-outline"
                    >Category</v-btn
                  >
                </div>
              </NuxtLink>
            </div>

            <div>
              <NuxtLink to="/products" class="text-black">
                <div
                  :class="{
                    'active-button': activeButton === 'products',
                  }"
                  width="100%"
                  @click="setActiveButton('products')"
                  class="types mx-4 mt-3 buttons cursor-pointer"
                >
                  <v-btn
                    variant="text"
                    class="open-light-h6 buttons text-class"
                    prepend-icon="mdi-select-group"
                    >Products</v-btn
                  >
                </div>
              </NuxtLink>
            </div>

            <!-- <div>
              <NuxtLink to="/gift-card/new" class="text-black">
                <div
                  :class="{ 'active-button': activeButton === 'Gift card' }"
                  width="100%"
                  @click="setActiveButton('new')"
                  class="types mx-4 mt-3 buttons cursor-pointer"
                >
                  <v-btn
                    variant="text"
                    class="open-light-h6 buttons text-none"
                    prepend-icon="mdi-wallet-giftcard"
                    >Gift Card</v-btn
                  >
                </div>
              </NuxtLink>
              <div v-if="showSubMenuGiftCard">
                <NuxtLink to="/gift-card/new" class="text-black">
                  <div
                    class="types mx-4 mt-3 pl-4 ml-14 buttons cursor-pointer"
                    :class="{
                      'active-button': activeButton === 'new',
                    }"
                    width="100%"
                    @click="setActiveButton('new')"
                  >
                    <v-btn
                      variant="text"
                      class="open-light-h6 buttons text-transform-class"
                      prepend-icon="mdi-briefcase-outline"
                      >New</v-btn
                    >
                  </div>
                </NuxtLink>
                <NuxtLink to="/gift-card/purchased" class="text-black">
                  <div
                    class="types mx-4 mt-3 pl-4 ml-14 buttons cursor-pointer"
                    :class="{
                      'active-button': activeButton === 'purchased',
                    }"
                    width="100%"
                    @click="setActiveButton('purchased')"
                  >
                    <v-btn
                      variant="text"
                      class="open-light-h6 buttons text-transform-class"
                      prepend-icon="mdi-application"
                      >Purchased</v-btn
                    >
                  </div>
                </NuxtLink>
              </div>
            </div> -->

            <!-- <div>
              <NuxtLink to="/product-orders/order" class="text-black">
                <div
                  :class="{ 'active-button': activeButton === 'orders' }"
                  width="100%"
                  @click="setActiveButton('order')"
                  class="types mx-4 mt-3 buttons cursor-pointer"
                >
                  <v-btn
                    variant="text"
                    class="open-light-h6 buttons text-class"
                    prepend-icon="mdi-invoice-list"
                    >Product Orders</v-btn
                  >
                </div>
              </NuxtLink>
              <div v-if="showSubMenuOrders">
                <NuxtLink to="/product-orders/order" class="text-black">
                  <div
                    class="types mx-4 mt-3 pl-4 ml-14 buttons cursor-pointer"
                    :class="{
                      'active-button': activeButton === 'order',
                    }"
                    width="100%"
                    @click="setActiveButton('order')"
                  >
                    <v-btn
                      variant="text"
                      class="open-light-h6 buttons text-transform-class"
                      prepend-icon="mdi-bookmark-outline"
                      >Order</v-btn
                    >
                  </div>
                </NuxtLink>
                <NuxtLink to="/product-orders/custom-design" class="text-black">
                  <div
                    class="types mx-4 mt-3 ml-14 pl-4 buttons cursor-pointer"
                    :class="{
                      'active-button': activeButton === 'Custom Design',
                    }"
                    width="100%"
                    @click="setActiveButton('Custom Design')"
                  >
                    <v-btn
                      variant="text"
                      class="open-light-h6 buttons text-transform-class"
                      prepend-icon="mdi-lock-pattern"
                      >Custom design</v-btn
                    >
                  </div>
                </NuxtLink>
              </div>
            </div> -->
            <!-- <div>
              <NuxtLink to="/enquiries" class="text-black">
                <div
                  :class="{ 'active-button': activeButton === 'enquiries' }"
                  width="100%"
                  @click="setActiveButton('enquiries')"
                  class="types mx-4 mt-3 buttons cursor-pointer"
                >
                  <v-btn
                    variant="text"
                    class="open-light-h6 buttons text-none"
                    prepend-icon="mdi-view-list-outline"
                    >Enquiries</v-btn
                  >
                </div>
              </NuxtLink>
            </div> -->
            <div>
              <!-- <NuxtLink to="/others/blogs" class="text-black">
                <div
                  :class="{
                    'active-button': activeButton === 'blogs',
                  }"
                  width="100%"
                  @click="setActiveButton('blogs')"
                  class="types mx-4 mt-3 buttons"
                >
                  <v-btn
                    variant="text"
                    class="open-light-h6 buttons"
                    prepend-icon="mdi-message-draw"
                    >Blogs</v-btn
                  >
                </div>
              </NuxtLink> -->
              <!-- <div>
                <NuxtLink to="/others/daily-rate" class="text-black">
                  <div
                    @click="setActiveButton('daily-rate')"
                    :class="{
                      'active-button': activeButton === 'daily-rate',
                    }"
                    class="types mx-4 mt-3 buttons cursor-pointer"
                    width="100%"
                  >
                    <v-btn
                      variant="text"
                      class="open-light-h6 buttons text-class"
                      prepend-icon="mdi-invoice-list"
                      >Others</v-btn
                    >
                  </div>
                </NuxtLink>

                <div v-if="showSubmenuOthers">
                  <NuxtLink to="/others/daily-rate" class="text-black">
                    <div
                      class="types mx-4 mt-3 pl-4 ml-14 buttons cursor-pointer"
                      :class="{
                        'active-button': activeButton === 'daily-rate',
                      }"
                      @click="setActiveButton('daily-rate')"
                    >
                      <v-btn
                        variant="text"
                        class="open-light-h6 buttons text-transform-class"
                        prepend-icon="mdi-bookmark-outline"
                        >Daily Rate</v-btn
                      >
                    </div>
                  </NuxtLink>
                  <NuxtLink to="/others/blogs" class="text-black">
                    <div
                      class="types mx-4 mt-3 ml-14 pl-4 buttons cursor-pointer"
                      :class="{ 'active-button': activeButton === 'blogs' }"
                      @click="setActiveButton('blogs')"
                    >
                      <v-btn
                        variant="text"
                        class="open-light-h6 buttons text-transform-class"
                        prepend-icon="mdi-lock-pattern"
                        >Blogs</v-btn
                      >
                    </div>
                  </NuxtLink>
                </div>
              </div> -->
            </div>
            <!-- <div>
              <NuxtLink to="/career/jobs" class="text-black">
                <div
                  :class="{ 'active-button': activeButton === 'careers' }"
                  width="100%"
                  @click="setActiveButton('jobs')"
                  class="types mx-4 mt-3 buttons cursor-pointer"
                >
                  <v-btn
                    variant="text"
                    class="open-light-h6 buttons text-none"
                    prepend-icon="mdi-message-draw"
                    >Career</v-btn
                  >
                </div>
              </NuxtLink>
              <div v-if="showSubMenuCareers">
                <NuxtLink to="/career/jobs" class="text-black">
                  <div
                    class="types mx-4 mt-3 pl-4 ml-14 buttons cursor-pointer"
                    :class="{
                      'active-button': activeButton === 'jobs',
                    }"
                    width="100%"
                    @click="setActiveButton('jobs')"
                  >
                    <v-btn
                      variant="text"
                      class="open-light-h6 buttons text-transform-class"
                      prepend-icon="mdi-briefcase-outline"
                      >Jobs</v-btn
                    >
                  </div>
                </NuxtLink>
                <NuxtLink to="/career/application" class="text-black">
                  <div
                    class="types mx-4 mt-3 pl-4 ml-14 buttons cursor-pointer"
                    :class="{
                      'active-button': activeButton === 'application',
                    }"
                    width="100%"
                    @click="setActiveButton('application')"
                  >
                    <v-btn
                      variant="text"
                      class="open-light-h6 buttons text-transform-class"
                      prepend-icon="mdi-application"
                      >Application</v-btn
                    >
                  </div>
                </NuxtLink>
              </div>
            </div> -->
            <!-- <div>
              <NuxtLink to="/offers" class="text-black">
                <div
                  :class="{ 'active-button': activeButton === 'offers' }"
                  width="100%"
                  @click="setActiveButton('offers')"
                  class="types mx-4 mt-3 buttons cursor-pointer"
                >
                  <v-btn
                    variant="text"
                    class="open-light-h6 buttons text-none"
                    prepend-icon="mdi-tag"
                    >Offers</v-btn
                  >
                </div>
              </NuxtLink>
            </div> -->
            <div>
              <NuxtLink to="/blogs" class="text-black">
                <div
                  :class="{
                    'active-button': activeButton === 'blogs',
                  }"
                  width="100%"
                  @click="setActiveButton('blogs')"
                  class="types mx-4 mt-3 buttons"
                >
                  <v-btn
                    variant="text"
                    class="open-light-h6 buttons text-none"
                    prepend-icon="mdi-message-draw"
                    >Blogs</v-btn
                  >
                </div>
              </NuxtLink>
            </div>
            <div>
              <NuxtLink to="/settings" class="text-black">
                <div
                  :class="{ 'active-button': activeButton === 'settings' }"
                  width="100%"
                  @click="setActiveButton('settings')"
                  class="types mx-4 mt-3 buttons cursor-pointer"
                >
                  <v-btn
                    variant="text"
                    class="open-light-h6 buttons text-none"
                    prepend-icon="mdi-cog"
                    >Settings</v-btn
                  >
                </div>
              </NuxtLink>
            </div>
          </div>
          <div class="types mx-4 mt-10 mb-14 buttons" @click="logout">
            <v-btn
              class="open-light-h6 buttons text-none"
              variant="text"
              prepend-icon="mdi-power"
              >Logout</v-btn
            >
          </div>
        </div>
      </v-navigation-drawer>

      <!-- HeaderFor all the pages of admin-->
      <v-main>
        <div v-if="loader == true" class="bg-white header main-header">
          <v-sheet class="inner-absolute-layout transparent-loader">
            <div class="loader"></div>
          </v-sheet>
        </div>
        <v-container class="pt-0 px-0" fluid>
          <div>
            <v-app-bar class="d-none d-md-block" :elevation="0">
              <v-row class="py-0">
                <v-col cols="6" class="d-flex d-lg-none">
                  <v-icon @click="drawer = !drawer" class="my-auto ml-5"
                    >mdi-menu</v-icon
                  >
                </v-col>
                <v-col cols="6" class="d-none d-lg-block">
                  <p class="open-bold-h7 ml-2">
                    {{ activeButton.toUpperCase() }}
                  </p>
                </v-col>
                <v-col cols="6" class="content-class">
                  <div>
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <div class="d-flex ga-5 mx-6">
                          <div class="role-box pa-1 my-auto">
                            <p class="open-dark-h5 text-center"></p>
                          </div>

                          <div class="my-auto">
                            <v-avatar
                              class="my-auto bg-grey cursor-pointer"
                              size="29"
                              v-bind="props"
                            >
                              <p>{{ adminName.charAt(0).toUpperCase() }}</p>
                            </v-avatar>
                          </div>
                        </div>
                        <!-- <v-btn
                        class="my-auto btn mr-2"
                        v-ripple="false"
                        variant="text"
                        append-icon="mdi-menu-down"
                      >
                      </v-btn> -->
                      </template>

                      <v-list class="pa-0 my-2 px-2">
                        <v-list-item class="pa-0 mx-5">
                          <v-list-item-title class="pa-0">
                            <div class="d-flex flex-column">
                              <v-btn
                                @click="editProfile"
                                variant="text"
                                class="btn pa-0 ma-0 w-100"
                                ><p class="open-dark-h6">Profile</p></v-btn
                              >
                            </div>
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </v-col>
              </v-row>
            </v-app-bar>
            <v-divider></v-divider>
          </div>

          <div class="d-none d-md-block">
            <slot />
          </div>

          <div class="d-block d-md-none wrapper">
            <h1 class="Inter-Bold-h4 text-center position-class-new">
              Sorry..this software is not optimized for this screen.Please use
              minimum screen resolution of (1024x768).
            </h1>
            <div class="loading-wave">
              <div class="loading-bar"></div>
              <div class="loading-bar"></div>
              <div class="loading-bar"></div>
              <div class="loading-bar"></div>
            </div>
          </div>
        </v-container>
        <v-dialog v-model="editDialog" max-width="300px">
          <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
              <div class="d-flex flex-row justify-space-between pt-2 w-100">
                <div class="mx-auto">
                  <h1 class="open-bold-h6 my-auto text-center mb-4">Logout</h1>
                </div>
              </div>
            </v-card-title>
            <label class="Inter-Semi-h5 my-auto mb-4 ml-4 text-center">
              Are you sure you want to logout?
            </label>

            <v-card-actions class="text-center pb-5">
              <div class="d-flex ga-5 ml-2 w-100">
                <button
                  @click="editDialog = false"
                  class="text-center pa-2 card-class"
                >
                  <span class="black Inter-Semi-h5 text-primary">No</span>
                </button>
                <button
                  :loading="loading"
                  @click="logoutConfirm"
                  class="white bg-primary btns text-center pa-2 button-class"
                >
                  <span class="Inter-Semi-h5">Yes</span>
                </button>
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-main>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
const { $supabase } = useNuxtApp();
const activeButton = ref("");
const loading = ref(false);
const loader = ref(true);
const router = useRouter();
const route = useRoute();
const drawer = ref(false);
const editDialog = ref(false);
// const userRole = ref("");
const showSubMenuCareers = ref(false);
const showSubmenuSocial = ref(false);
const showSubmenuOthers = ref(false);
const showSubMenuOrders = ref(false);
const showSubMenuGiftCard = ref(false);
// const showSubMenuOthers = ref(false);

//button active state
setTimeout(() => {
  // loader.value = false;
  drawer.value = true;
}, 1500);

// function toggleOthers() {
//   showSubmenuOthers.value = !showSubmenuOthers.value;

//   if (showSubmenuOthers.value) {
//     setActiveButton("daily-rate");
//   }
// }

function setActiveButton(routeName: string) {
  activeButton.value = routeName;
  showSubMenuCareers.value = false;
  showSubmenuSocial.value = false;
  showSubmenuOthers.value = false;
  showSubMenuOrders.value = false;
  showSubMenuGiftCard.value = false;

  if (
    routeName == "jobs" ||
    routeName == "application" ||
    routeName == "customerTestimonials"
  ) {
    showSubMenuCareers.value = true;
  } else {
    showSubMenuCareers.value = false;
  }

  if (
    routeName == "social" ||
    routeName == "meetings" ||
    routeName == "blogs"
  ) {
    showSubmenuSocial.value = true;
  } else {
    showSubmenuSocial.value = false;
  }

  if (
    routeName === "social" ||
    routeName === "meetings" ||
    routeName === "blogs"
  ) {
    showSubmenuSocial.value = true;
  }

  if (routeName === "daily-rate" || routeName === "blogs") {
    showSubmenuOthers.value = true;
  }

  if (
    routeName == "order" ||
    routeName == "orders" ||
    routeName == "Custom Design"
  ) {
    showSubMenuOrders.value = true;
  } else {
    showSubMenuOrders.value = false;
  }

  if (
    routeName === "new" ||
    routeName === "news" ||
    routeName === "purchased"
  ) {
    showSubMenuGiftCard.value = true;
  } else {
    showSubMenuGiftCard.value = false;
  }
  if (
    routeName === "daily " ||
    routeName === "daily-rate" ||
    routeName === "blogs"
  ) {
    showSubmenuOthers.value = true;
  } else {
    showSubmenuOthers.value = false;
  }
}

onMounted(() => {
  console.log(router, "name");
  const savedActiveButton = route.name;
  console.log(savedActiveButton, "KL");
  if (savedActiveButton) {
    // @ts-ignore
    activeButton.value = savedActiveButton.replace(
      /associate-management-earnings-id|-id/g,
      ""
    );
  }
  setTimeout(() => {
    loader.value = false;
  }, 1500);
});

const editProfile = () => {
  router.push("/profile");
};

const logout = () => {
  editDialog.value = true;
};

const logoutConfirm = async () => {
  loading.value = true;

  try {
    const { error } = await $supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    // Manually remove any stored auth data
    localStorage.removeItem("supabase.auth.token");

    // Clear cookies properly
    const cookiesToClear = [
      "user",
      "profileData",
      "accessToken",
      "refreshToken",
      "tokenExpiry",
      "role",
      "constantsData",
    ];

    cookiesToClear.forEach((cookieName) => {
      const cookie = useCookie(cookieName);
      cookie.value = null;
    });

    console.log("Cookies cleared, redirecting...");

    // Ensure Supabase updates the auth state before redirecting
    await $supabase.auth.getSession();

    // Redirect to login page
    return navigateTo("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    loading.value = false;
  }
};

watch(
  () => useCookie("user").value,
  (newUser) => {
    if (!newUser) {
      console.log("User logged out, redirecting...");
      navigateTo("/login");
    }
  }
);

watch(
  () => route.name,
  (newRouteName) => {
    if (typeof newRouteName === "string") {
      if (newRouteName === "gift-card" || newRouteName === "gift-card-id") {
        setActiveButton("new");
      } else if (
        newRouteName === "gift-card-new" ||
        newRouteName === "gift-card-new-id"
      ) {
        setActiveButton("new");
      } else if (newRouteName === "gift-card-purchased") {
        setActiveButton("purchased");
      } else if (
        newRouteName === "product-orders-order" ||
        newRouteName === "product-orders-order-id"
      ) {
        setActiveButton("order");
      } else if (
        newRouteName === "product-orders-custom-design" ||
        newRouteName === "product-orders-custom-design-id"
      ) {
        setActiveButton("Custom Design");
      } else if (newRouteName === "others") {
        setActiveButton("others");
      } else if (
        newRouteName === "others-daily-rate" ||
        newRouteName === "others-daily-rate-id"
      ) {
        setActiveButton("daily-rate");
      } else if (
        newRouteName === "others-blogs" ||
        newRouteName === "others-blogs-id"
      ) {
        setActiveButton("blogs");
      } else if (
        newRouteName === "career-jobs" ||
        newRouteName === "others-jobs-id"
      ) {
        setActiveButton("jobs");
      } else if (
        newRouteName === "career-application" ||
        newRouteName === "others-application-id"
      ) {
        setActiveButton("application");
      } else {
        const cleanedRouteName = newRouteName.split("-")[0];
        setActiveButton(cleanedRouteName);
      }
    }
  }
);

const config = useRuntimeConfig();
const bkUrl = config.public.bkUrl;
const token = useCookie("accessToken");
const profileCookie = useCookie("profileData");
const constantsCookie = useCookie("constantsData");
const adminName = ref("");
</script>

<style scoped>
* {
  :deep(.v-btn__overlay) {
    display: none;
  }
  :deep(.v-btn__underlay) {
    display: none;
  }
  :deep(.v-ripple__container) {
    display: none;
  }
}

.button-class {
  width: 120px;
  border-radius: 5px;
}

.card-class {
  width: 120px;
  border-radius: 5px;
  color: #1d448c;
  border: 0.5px solid #000000;
}

.text-class {
  text-transform: none;
  border: none;
}

.position-class-new {
  position: absolute;
  top: 40%;
  left: 2%;
}
.wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-header {
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 21474836479999;
}
.content-class {
  display: flex;
  justify-content: flex-end;
}
.transparent-loader {
  background: transparent;
}
.text-transform-class {
  text-transform: none;
  font-size: 12px;
}

/* .header {
  z-index: 100000000;
} */

.role-box {
  width: 8vw;
  border-radius: 15px;
  /* border: 1px solid rgb(213, 213, 213); */
}

.types {
  border: 1px solid #000;
  border-radius: 10px;
  cursor: pointer;
}

.drawer {
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
}
.active-button {
  color: #ffffff;
  background-color: #000000;
  scale: 1.02;
}
.active-button:hover {
  color: #ffffff;
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%);
}

.active-button:active {
  transform: translate(0em, 0.2em);
}

.buttons:hover {
  background-color: #000;
  color: #fff;
}

.inner-absolute-layout {
  position: fixed;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
}
.loader {
  width: 48px;
  height: 48px;
  margin: auto;
  position: relative;
}

.loader:before {
  content: "";
  width: 48px;
  height: 5px;
  background: #f8d796;
  position: absolute;
  top: 60px;
  left: 0;
  border-radius: 50%;
  animation: shadow324 0.5s linear infinite;
}

.loader:after {
  content: "";
  width: 100%;
  height: 100%;
  background: #d0a654;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 4px;
  animation: jump7456 0.5s linear infinite;
}

@keyframes jump7456 {
  15% {
    border-bottom-right-radius: 3px;
  }

  25% {
    transform: translateY(9px) rotate(22.5deg);
  }

  50% {
    transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }

  75% {
    transform: translateY(9px) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes shadow324 {
  0%,
  100% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.2, 1);
  }
}
</style>
