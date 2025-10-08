<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();


function logout() {
    sessionStorage.removeItem("token");
    window.dispatchEvent(new Event("login-change"));

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