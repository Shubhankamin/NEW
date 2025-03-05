export default defineNuxtRouteMiddleware((to) => {
  const user = useCookie("user");

  console.log("Raw user.value:", user.value);
  console.log("Type of user.value:", typeof user.value);

  const userData = user.value;

  console.log("User data:", userData);

  const isLoggedIn = userData && userData.id ? true : false;

  if (!isLoggedIn && to.path.startsWith("/dashboard")) {
    console.log("Redirecting to login");
    return navigateTo("/login");
  }

  if (isLoggedIn && to.path === "/login") {
    console.log("Redirecting to dashboard");
    return navigateTo("/dashboard");
  }
});
