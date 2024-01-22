<template>
  <div class="">
    <span class="text-base">{{ props.label }}</span>
    <div class="relative flex items-center pt-1">
      <button
        v-if="props.password == true"
        type="button"
        @click="showPass = !showPass"
        class="absolute ml-[92%] transition duration-200 ease-in-out active:scale-75"
      >
        <i
          v-if="visiblePassword.length > 0"
          :class="showPass ? 'bi bi-eye-slash' : 'bi bi-eye'"
        ></i>
      </button>

      <input
      
      autocomplete="off"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue"
        v-model="visiblePassword"
        :type="props.password ? (showPass ? 'text' : 'password'):'text'"
        :name="props.name"
        :id="props.id"
        class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const visiblePassword = ref("");
const showPass = ref(false);
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    default: "Label",
  },
  name: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  password: {
    type: Boolean,
    default: false,
  },
  
});

defineOptions({
  inheritAttrs: false,
});
</script>
