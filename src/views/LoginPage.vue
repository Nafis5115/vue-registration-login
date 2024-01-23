<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div
      class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
    >
      <div class="flex flex-col justify-center p-8 md:p-14">
        <span class="mb-3 text-4xl font-bold">Log in</span>
        <span class="font-light text-gray-400 mb-8"
          >Please enter your details</span
        >
        <form @submit.prevent="login">
          <CustomTextInput
            label="Email"
            name="email"
            id="email"
            v-model="state.email"
          />
          <p class="pb-3 text-red-600 text-sm" v-if="v$.email.$error">
            {{ v$.email.$errors[0].$message }}
          </p>

          <CustomTextInput
            label="Password"
            name="password"
            id="password"
            v-model="state.password"
            :password="true"
          />
          <p class="pb-3 text-red-600 text-sm" v-if="v$.password.$error">
            {{ v$.password.$errors[0].$message }}
          </p>

          <div class="flex justify-between w-full py-4">
            <div class="mr-24">
              <input
                type="checkbox"
                name="ch"
                id="ch"
                class="mr-2"
                v-model="isChecked"
              />
              <span class="text-sm" v-bind="isChecked"
                >Remember for 30 days</span
              >
            </div>
            <button
              type="button"
              class="text-sm font-bold cursor-pointer transition duration-200 ease-in-out active:scale-95"
            >
              Forgot password?
            </button>
          </div>
          <CustomButton :isLoading="isLoading" label="Log in" />
        </form>

        <button
          type="button"
          class="w-full border border-gray-300 text-base p-2 rounded-lg mb-6 hover:bg-black hover:text-white transition duration-200 ease-in-out active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            class="inline mr-2"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          <span>Log in with google</span>
        </button>
        <div class="text-center text-gray-300">
          <span class="mr-2 text-sm">Don't have an account?</span>
          <router-link to="/sign-up">
            <button
              type="button"
              class="text-black text-sm font-bold cursor-pointer transition duration-200 ease-in-out active:scale-95"
            >
              Sign up for free
            </button>
          </router-link>
        </div>
      </div>
      <div class="relative">
        <img
          src="../assets/images/login.jpeg"
          class="w-[400px] h-full hidden rounded-r-2xl md:block"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import CustomTextInput from "../components/CustomTextInput.vue";
import CustomButton from "../components/CustomButton.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import axios from "axios";
import { useToast } from "vue-toastification";

const isLoading = ref(false);
const isChecked = ref(false);

const router = useRouter();
const toast = useToast();

const state = reactive({
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Email is required", required),
      email: helpers.withMessage("Email is not valid", email),
    },
    password: {
      required: helpers.withMessage("Password is required", required),
      minLength: helpers.withMessage(
        "Password is must be 8 characters",
        minLength(8)
      ),
    },
  };
});

const v$ = useVuelidate(rules, state);

const login = async () => {
  await v$.value.$validate();

  if (v$.value.$pending || !v$.value.$errors || !v$.value.$invalid) {
    axios
      .post("http://127.0.0.1:8000/api/login", state)
      .then(({ data }) => {
        console.log(data.token);
        const token = data.token;
        const userName = data.user.name;
    localStorage.setItem('user_name', userName);
        localStorage.setItem('access_token', token);
        
        toast.success("Successfully login", { timeout: 2000 });

        isLoading.value = true;
        setTimeout(() => {
          isLoading.value = false;

          router.push("/");
        }, 2500);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("Email or password is incorrect", { timeout: 2000 });
        }
      });
  }
};
</script>
