<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const username = ref('')
const password = ref('')

const router = useRouter();

let apiURL;
if (window.location.hostname.includes("localhost")) {
    apiURL = "http://localhost:8080";
} else {
    apiURL = "https://jsramverk-hoc-a2fwfbeecrhdfkhr.northeurope-01.azurewebsites.net";
}

//logga in användare
async function loginUser () {
    // skicka till /login i backend
    try {
        const response = await fetch(`${apiURL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })

        });

        const data = await response.json();

        if (!response.ok) {
            const error = await response.json();
            console.log(error)
            return;
        } else {
            sessionStorage.setItem("token", data.token);
            // console.log(data.token)
            window.dispatchEvent(new Event("login-change"));
            router.push("/");
        }
       
    } catch (err) {
        console.error("något gick fel: ", err)
    }

    console.log("inloggad!")
    console.log(username.value, password.value)
    // redirect till editor
    
}
</script>

<template>
    <div class="login-form">
    <h2>Logga in</h2>
        <form @submit.prevent="loginUser" class="new-doc">
            <label for="title">Logga in</label>
            <input v-model="username" type="text" id="username" name="username" required/>


            <label for="content">Lösenord</label>
            <input v-model="password" type="password" id="password" name="password" required></input>

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