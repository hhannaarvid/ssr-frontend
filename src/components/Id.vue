<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const title = ref('')
const content = ref('')
const id = ref('')

let apiURL;
const token = sessionStorage.getItem('token');
const email = ref('')

// hämta id från sökvägen
const route = useRoute()
const router = useRouter()
const doc = ref(null)

if (window.location.hostname.includes("localhost")) {
    apiURL = "http://localhost:8080";
} else {
    apiURL = "https://jsramverk-hoc-a2fwfbeecrhdfkhr.northeurope-01.azurewebsites.net";
}


//hämta dokument
async function getDocument() {
    // console.log("JWT token:", token);
    const response = await fetch(`${apiURL}/${route.params.id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
    // console.log('id:', route.params.id)
    doc.value = await response.json()
    
    title.value = doc.value.title
    content.value = doc.value.content
    id.value = route.params.id
}

// funktion för att uppdatera dokument
async function updateOne() {

    const response = await fetch(`${apiURL}/api/update`, {
      method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    },
      body: JSON.stringify({
        id: id.value,       
        title: title.value,
        content: content.value 
      })
    })

    if (response.ok) {
        console.log('Dokument', title.value, 'är uppdaterat.')
        router.push('/')
    }
    
}

async function emailInvite(){
    const response = await fetch(`${apiURL}/api/invite`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            email: email.value,
            docId: "dokument-id"
        })
    })
    const result = await response.json();
    console.log(result);
}

//hämtar dokument när sidan laddas
onMounted(() => {
    getDocument()
})
</script>

<template>
    <div class="create-form">
    <h2>Uppdatera dokument</h2>
        <form @submit.prevent="updateOne" class="new-doc">
            <label for="title">Titel</label>
            <input v-model="title" type="text" id="title" name="title" />


            <label for="content">Innehåll</label>
            <textarea v-model="content" id="content" name="content" rows="10"></textarea>

            <input type="submit" value="Uppdatera" />
        </form>
        <form @submit.prevent="emailInvite" class="new-doc">
            <label for="invite">Bjud in någon att redigera dokumentet</label>
            <input v-model="email" id="email" name="email"></input>
            <input type="submit" value="Skicka Inbjudan"></input>
        </form>
    </div>
</template>

<style scoped>
.new-doc {
    display: flex;
    flex-direction: column;
}

input,
textarea {
    margin-bottom: 1.4rem;
    font-size: 1rem;
    padding: 1.4rem;
}
</style>