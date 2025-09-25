<script setup>
import { onMounted, ref } from 'vue'



const title = ref('')
const content = ref('')
const docs = ref([])

// let apiURL = "https://jsramverk-hoc-a2fwfbeecrhdfkhr.northeurope-01.azurewebsites.net/";
let apiURL = "http://localhost:8080";

// if (window.location.hostname === "localhost") {
//     apiURL = "http://localhost:8080";
// } else {
//     apiURL = "https://jsramverk-hoc-a2fwfbeecrhdfkhr.northeurope-01.azurewebsites.net/";
// }

//hämta alla dokument
async function fetchDocs() { 
    // const response = await fetch("http://localhost:8080/api/getAllDocs");
    const response = await fetch(`${apiURL}/api/getAllDocs`);

    const data = await response.json();
    // const text = await response.text();

    docs.value = data
    // console.log(text)
    console.log(data)

    }

// hämtar dokument när sidan laddas
onMounted(() => {
    fetchDocs()
})

// lägger till ett dokument
async function addOne() {
    // const response = await fetch('http://localhost:8080/api/addDocs', {
    const response = await fetch(`${apiURL}/api/addDocs`, {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.value,
        content: content.value
      })
    })
    const newDoc = await response.json()
    console.log('Nytt dokument:', newDoc) // mest för felsök

    docs.value.push({...newDoc, title: title.value, content: content.value})
    title.value = ''
    content.value = ''
}


</script>

<template>
    <div class="create-form">
    <h2>Skapa nytt dokument</h2>
        <form @submit.prevent="addOne" class="new-doc">
            <label for="title">Titel</label>
            <input v-model="title" type="text" id="title" name="title"/>


            <label for="content">Innehåll</label>
            <textarea v-model="content" id="content" name="content" rows="10"></textarea>

            <input type="submit" value="Skapa" />
        </form>
    </div>
    <div class="doc-list">
        <h2>Dokument</h2>
        <ul>
            <li v-for="(doc, index) in docs" :key="doc._id">
                <router-link :to="`/id/${doc._id}`">{{ doc.title }}</router-link>
                </li>

        </ul>
    </div>
</template>

<style scoped>
.new-doc {
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
}

input,
textarea {
    margin-bottom: 1.4rem;
    font-size: 1rem;
    padding: 1.4rem;
}


ul {
    text-decoration: none;
    list-style: none;   
    padding: 20px 0 50px 0;
    margin: 0;
    text-align: center; 
    /* border: 1px solid blue; */
}

ul a {
    color: black;
}

ul a:hover {
    color: rgb(169, 186, 169);
    border-bottom: 1px solid rgb(169, 186, 169);
}
</style>