<template>
    <button
            type="submit"
         
            class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300 "
                
            
      
          >
            <svg
            v-show="props.isLoading"
              class="w-5 h-5 text-gray-400 animate-spin absolute md:left-1/4 md:ml-3.5 left-1/2 -ml-2"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              ></path>
            </svg>
            <span :class="{'invisible':props.isLoading}">{{ props.label }}</span>
          </button>
</template>

<script setup>

const props = defineProps({
    
    isLoading:{
        type:Boolean,
        default:false
    },
    label:{
      type:String,
      
    }
    
}) 

</script>