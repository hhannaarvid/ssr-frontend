<script setup>
import { onMounted, ref } from 'vue';

const title = ref('');
const content = ref('');
const docs = ref([]);

let apiURL = "http://localhost:8080";

async function fetchDocs() {
  const response = await fetch(`${apiURL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          documents {
            _id
            title
            content
          }
        }
      `
    })
  });

  const json = await response.json();
  docs.value = json.data.documents;
}

async function addOne() {
  const response = await fetch(`${apiURL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation AddDoc($input: DocumentInput!) {
          addDocument(input: $input) {
            _id
            title
            content
          }
        }
      `,
      variables: {
        input: {
          title: title.value,
          content: content.value
        }
      }
    })
  });

  const json = await response.json();
  const newDoc = json.data.addDocument;
  docs.value.push(newDoc);
  title.value = '';
  content.value = '';
}

onMounted(() => {
  fetchDocs();
});
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