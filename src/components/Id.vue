<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const title = ref('')
const content = ref('')
const id = ref('')

let apiURL = "https://jsramverk-hoc-a2fwfbeecrhdfkhr.northeurope-01.azurewebsites.net/";
// if (window.location.hostname === "localhost") {
//     apiURL = "http://localhost:8080";
// } else {
//     apiURL = "https://jsramverk-hoc-a2fwfbeecrhdfkhr.northeurope-01.azurewebsites.net/";
// }

// hämta id från sökvägen
const route = useRoute()
const router = useRouter()

const doc = ref(null)

//hämta dokument
async function getDocument() {
    const response = await fetch(`${apiURL}/${route.params.id}`)
    console.log('id:', route.params.id)
    doc.value = await response.json()
    
    title.value = doc.value.title
    content.value = doc.value.content
    id.value = route.params.id
    // console.log(doc.title.value) -- för felsök
    // console.log(id.value) -- för felsök
}

//hämtar dokument när sidan laddas
onMounted(() => {
    getDocument()
})

// funktion för att uppdatera dokument
async function updateOne() {

    const response = await fetch(`${apiURL}/api/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id.value,       
        title: title.value,
        content: content.value 
      })
    })

    // const result = await response.json() -- för felsök
    // console.log('Uppdaterat dokument:', result) -- för felsök
    if (response.ok) {
        console.log('Dokument', title.value, 'är uppdaterat.')
        router.push('/')
    }
    
}

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