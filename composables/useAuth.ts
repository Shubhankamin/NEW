export function useAuth() {
  const supabase = useNuxtApp().$supabase as any;
  const loading = ref<boolean>(false);
  const statusMessage = ref<string | null>(null);

  const login = async (email: string, password: string): Promise<any> => {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    loading.value = false;

    if (error) {
      console.error("Login error:", error.message);
      statusMessage.value = error.message;
      return { error: error.message };
    }

    return { session: data.session };
  };

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
    const user = useCookie("user");
    user.value = null; 
    navigateTo("/login");
  };

  return { login, logout, statusMessage, loading };
}
