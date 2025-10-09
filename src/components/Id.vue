<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const title = ref('')
const content = ref('')
const id = ref('')
const doc = ref(null)
const route = useRoute()
const router = useRouter()
const token = sessionStorage.getItem('token');
const email = ref('')

let apiURL;
if (window.location.hostname.includes("localhost")) {
    apiURL = "http://localhost:8080";
} else {
    apiURL = "https://jsramverk-hoc-a2fwfbeecrhdfkhr.northeurope-01.azurewebsites.net";
}


async function getDocument() {
  const response = await fetch(`${apiURL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
     },
    body: JSON.stringify({
      query: `
        query GetDoc($id: ID!) {
          document(id: $id) {
            _id
            title
            content
          }
        }
      `,
      variables: {
        id: route.params.id
      }
    })
  });

  const json = await response.json();
  doc.value = json.data.document;

  title.value = doc.value.title;
  content.value = doc.value.content;
  id.value = doc.value._id;
}

async function updateOne() {
  const response = await fetch(`${apiURL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
     },
    body: JSON.stringify({
      query: `
        mutation UpdateDoc($id: ID!, $input: DocumentInput!) {
          updateDocument(id: $id, input: $input) {
            _id
            title
            content
          }
        }
      `,
      variables: {
        id: id.value,
        input: {
          title: title.value,
          content: content.value
        }
      }
    })
  });

  const json = await response.json();

  if (json.data && json.data.updateDocument) {
    console.log('Dokument', title.value, 'är uppdaterat.');
    router.push('/');
  } else {
    console.error("Uppdatering misslyckades:", json);
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