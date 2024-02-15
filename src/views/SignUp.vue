<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div
      class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
    >
      <div class="flex flex-col justify-center p-8 md:p-14">
        <span class="mb-3 text-4xl font-bold">Sign up</span>
        <span class="font-light text-gray-400 mb-8"
          >Please enter your details</span
        >
        <form @submit.prevent="signUp">
          <CustomTextInput
            label="Name"
            name="name"
            id="name"
            v-model="state.name"
          />
          <p class="pb-3 text-red-600 text-sm" v-if="v$.name.$error">
            {{ v$.name.$errors[0].$message }}
          </p>
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
          <CustomTextInput
            label="Confirm password"
            name="confirmPassword"
            id="confirmPassword"
            v-model="state.confirmPassword"
            :password="true"
          />
          <p class="pb-3 text-red-600 text-sm" v-if="v$.confirmPassword.$error">
            {{ v$.confirmPassword.$errors[0].$message }}
          </p>

          <div class="flex justify-between w-full py-4">
            <div class="mr-[140px]">
              <input
                type="checkbox"
                name="ch"
                id="ch"
                class="mr-2"
                v-model="state.isChecked"
              />
              <span class="text-sm" v-bind="state.isChecked"
                >I accept all the privacy and policies</span
              >
            </div>
          </div>
          <p class="pb-3 text-red-600 text-sm" v-if="v$.isChecked.$error">
            {{ v$.isChecked.$errors[0].$message }}
          </p>

          <CustomButton :isLoading="isLoading" label="Sign up" />
        </form>

        <div class="text-center text-gray-300">
          <span class="mr-2 text-sm">Already have an account?</span>
          <router-link to="/login">
            <button
              type="button"
              class="text-black text-sm font-bold cursor-pointer transition duration-200 ease-in-out active:scale-95"
            >
              Log in
            </button>
          </router-link>
        </div>
      </div>
      <div class="relative">
        <img
          src="../assets/images/signup.jpeg"
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
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import axios from "axios";
import { useToast } from "vue-toastification";

const router = useRouter();
const isLoading = ref(false);

const toast = useToast();

const state = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  isChecked: false,
});

const rules = computed(() => {
  return {
    name: { required: helpers.withMessage("Name is required", required) },
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
    confirmPassword: {
      required: helpers.withMessage("Password is required", required),
      sameAs: helpers.withMessage(
        "Password is not match",
        sameAs(state.password)
      ),
    },
    isChecked: {
      sameAs: helpers.withMessage("You must have to check this", sameAs(true)),
    },
  };
});

const v$ = useVuelidate(rules, state);

const signUp = async () => {
  await v$.value.$validate();

  if(v$.value.$pending || !v$.value.$errors || !v$.value.$invalid){
    axios.post("https://vue-registration-login-ppr1b8pcr-nafis-projects-abcf2012.vercel.app/api/register", state).then(({ data }) => {
    console.log(data);
   
    toast.success("Registration Successfully", { timeout: 2000 });

        isLoading.value = true;
        setTimeout(() => {
          isLoading.value = false;
          router.push("/login");
        }, 2500);
     
  }).catch(error=>{
    if(error.response.status === 422 && error.response.data.error){
      
      toast.error('Email is already taken',{ timeout: 2000 })
      }
  });
  }
  
};
</script>
