<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();


function logout() {
  sessionStorage.removeItem("token");
  router.push("/login");
}

onMounted(() => {
    logout()
})
</script>
<template>

</template>
<style>
</style>