<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter();

const username = ref('')
const password = ref('')
const message = ref('')

let apiURL;
if (window.location.hostname.includes("localhost")) {
    apiURL = "http://localhost:8080";
} else {
    apiURL = "https://jsramverk-hoc-a2fwfbeecrhdfkhr.northeurope-01.azurewebsites.net";
}

// lägger till en användare
async function addUser() {
    try {
      const response = await fetch(`${apiURL}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })

    });

    // kollar felmeddelande och o användaren redan finns så avbryts
    if (!response.ok) {
        const error = await response.json();
        if (response.status === 400 && error.error === "user-exists") {
            message.value = "Användaren finns redan.";
        } else {
            message.value = error.message;
            return;
        }
        return;
    }

    console.log(username.value); // FELSÖK
    const newUser = await response.json()

    // mest för felsök
    console.log('Ny användare:', newUser) 
    username.value = ''
    password.value = ''

    // REDIRECT TILL LOGIN
    router.push('/login');
    
    } catch (err) {
        console.error("något gick fel: ", err)
    }
}
</script>

<template>
    <div class="signup-form">
    <h2>Resgistrera ny användare</h2>
        <form @submit.prevent="addUser" class="new-doc">
            <p>{{ message }}</p>
            <label for="title">Användarnamn</label>
            <input v-model="username" type="text" id="username" name="username" required/>


            <label for="content">Lösenord</label>
            <input v-model="password" type="password" id="password" name="password" required ></input>

            <input class="submit" type="submit" value="Registrera" />
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