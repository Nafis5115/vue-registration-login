<template>
 <div class="flex justify-between mx-8 mt-4">
    <h1 class="text-4xl ">Hi {{ userName }}</h1>
    <button class="text-red-500" @click="logout">Logout</button>

 </div>

</template>
<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();
const userName = localStorage.getItem('user_name');
const logout = async()=>{
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_name');
    router.push('/login');
}

</script>