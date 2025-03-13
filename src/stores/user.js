import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("users", () => {
    const user = ref(null);
    const errorMsg = ref("");
    const loading = ref(false);
    const loadingUser = ref(false);

    function validEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    const handleLogin = async credential => {
        let response = {};
        const { email, password } = credential;
        if (!validEmail(email) || !password.length) {
            return (errorMsg.value = "信箱或密碼有誤");
        }

        loading.value = true;

        const { error } = await supabase.auth.signInWithPassword(credential);
        if (error) {
            loading.value = false;
            return (errorMsg.value = error.message);
        }

        // const { data: loginUser } = await supabase.from("userprofile").select().eq("email", email).single();
        const { data: loginUser } = await supabase.auth.getUser();

        if (!loginUser.user) {
            loadingUser.value = false;
            return (user.value = null);
        }

        user.value = {
            id: loginUser.user.id,
            email: loginUser.user.email,
            name: loginUser.user.user_metadata.full_name
        };
        // user.value = {
        //     id: loginUser.id,
        //     email: loginUser.email,
        //     name: loginUser.name
        // };

        loading.value = false;
        errorMsg.value = "";

        return (response = {
            success: true,
            data: user
        });
    };
    const handleSignup = async credential => {
        const { name, email, password } = credential;

        if (password.length < 8) {
            return (errorMsg.value = "密碼長度過短");
        }
        if (!validEmail(email)) {
            return (errorMsg.value = "信箱錯誤");
        }

        loading.value = true;

        const { data: userNameHasExist } = await supabase.from("userprofile").select().eq("name", name).single();
        if (userNameHasExist) {
            loading.value = false;
            return (errorMsg.value = "使用者已註冊");
        }
        const { data: userHasExist } = await supabase.from("userprofile").select().eq("email", email).single();
        if (userHasExist) {
            loading.value = false;
            return (errorMsg.value = "使用者已註冊");
        }

        const { error } = await supabase.auth.signUp({
            email: credential.email,
            password: credential.password,
            options: {
                data: {
                    full_name: credential.name
                }
            }
        });

        if (error) {
            loading.value = false;
            return (errorMsg.value = error.message);
        }
        await supabase.from("userprofile").insert({
            email,
            name
        });

        const { data: newUser } = await supabase.from("userprofile").select().eq("email", email).single();

        user.value = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        };
        loading.value = false;
        errorMsg.value = "";
    };
    const handleLogout = async () => {
        await supabase.auth.signOut();
        user.value = null;
    };
    const getUser = async () => {
        loadingUser.value = true;

        const { data } = await supabase.auth.getUser();

        if (!data.user) {
            loadingUser.value = false;
            return (user.value = null);
        }
        // const { data: userWithEmail } = await supabase
        //     .from("userprofile")
        //     .select()
        //     .eq("email", data.user.email)
        //     .single();

        //   user.value = {
        //     email: userWithEmail.email,
        //     name: userWithEmail.name,
        //     id: userWithEmail.id
        //   }
        const name = data.user.user_metadata.full_name ? data.user.user_metadata.full_name : "aa";
        user.value = {
            email: data.user.email,
            id: data.user.id,
            name: name
        };

        loadingUser.value = false;
    };

    const updateUser = async credential => {
        const { name } = credential;
        if (!name) {
            return (errorMsg = "不能為空");
        }
        const { data, error } = await supabase.auth.updateUser({
            data: {
                full_name: name
            }
        });
    };

    const clearErrorMsg = () => {
        errorMsg.value = "";
    };

    return {
        user,
        errorMsg,
        loading,
        loadingUser,
        handleLogin,
        handleSignup,
        handleLogout,
        getUser,
        clearErrorMsg,
        updateUser
    };
});
