<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const title = ref('');
const content = ref('');
const type = ref('text');
const docs = ref([]);

const route = useRoute();

let apiURL;
const token = sessionStorage.getItem('token');

if (window.location.hostname.includes("localhost")) {
    apiURL = "http://localhost:8080";
} else {
    apiURL = "https://jsramverk-hoc-a2fwfbeecrhdfkhr.northeurope-01.azurewebsites.net";
}

async function fetchDocs() {
    const response = await fetch(`${apiURL}/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            query: `
            query {
                documentsByUser {
                    _id
                    title
                    content
                    type
                }
            }
            `
        })
    });

    const json = await response.json();
    docs.value = json.data.documentsByUser;
}

async function addOne() {
    const response = await fetch(`${apiURL}/api/addDocs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            title: title.value,
            content: content.value,
            type: type.value
        })
    });

    const newDoc = await response.json();
    docs.value.push(newDoc);
    title.value = '';
    content.value = '';
    type.value = 'text';
}

onMounted(() => {
    fetchDocs();
});

watch(route, () => {
    fetchDocs();
});
</script>


<template>
    <div class="create-form">
        <h2>Skapa nytt dokument</h2>
        <form @submit.prevent="addOne" class="new-doc">
            <label for="title">Titel</label>
            <input v-model="title" type="text" id="title" name="title"/>

            <label for="type">Typ av dokument</label>
            <select v-model="type" id="type" name="type">
                <option value="text">Text</option>
                <option value="code">Kod</option>
            </select>

            <label for="content">Innehåll</label>
            <textarea v-model="content" id="content" name="content" rows="10"></textarea>

            <input type="submit" value="Skapa" />
        </form>
    </div>

    <div class="doc-list">
        <h2>Dina dokument</h2>
        <ul>
            <li v-for="(doc, index) in docs" :key="doc._id">
                <router-link :to="`/id/${doc._id}`">{{ doc.title }} <span>({{ doc.type }})</span></router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.new-doc {
    display: flex;
    flex-direction: column;
}

input,
textarea,
select {
    margin-bottom: 1.4rem;
    font-size: 1rem;
    padding: 1.4rem;
}

ul {
    list-style: none;
    padding: 20px 0 50px 0;
    margin: 0;
    text-align: center;
}

ul a {
    color: black;
    text-decoration: none;
}

ul a:hover {
    color: rgb(169, 186, 169);
    border-bottom: 1px solid rgb(169, 186, 169);
}
</style>
