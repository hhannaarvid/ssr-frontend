<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const username = ref('')
const password = ref('')


let apiURL;
if (window.location.hostname.includes("localhost")) {
    apiURL = "http://localhost:8080";
} else {
    apiURL = "https://jsramverk-hoc-a2fwfbeecrhdfkhr.northeurope-01.azurewebsites.net";
}

//logga in användare
async function loginUser () {
    console.log("inloggad!")
    console.log(username.value, password.value)
}
</script>

<template>
    <div class="login-form">
    <h2>Logga in</h2>
        <form @submit.prevent="loginUser" class="new-doc">
            <label for="title">Logga in</label>
            <input v-model="username" type="text" id="username" name="username" />


            <label for="content">Lösenord</label>
            <input v-model="password" id="password" name="password"></input>

            <input class="submit" type="submit" value="Logga in" />
        </form>
    </div>


</template>

<style scoped>
.new-doc {
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
    padding: 10px;
}

input {
    margin-bottom: 1.4rem;
    font-size: 1rem;
    padding: 1.4rem;
    width: 40%;
    margin: 10px auto;
}


</style>