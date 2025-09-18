<script setup>
import { onMounted, ref } from 'vue'


defineProps({
  msg: String,
})

const title = ref('')
const content = ref('')
const docs = ref([])

async function fetchDocs() { 
    const response = await fetch("http://localhost:8080/");
    const data = await response.json();
    docs.value = data
    console.log(data)
    }

onMounted(() => {
    fetchDocs()
})

async function addOne() {
    const response = await fetch('http://localhost:8080/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.value,
        content: content.value
      })
    })
    const newDoc = await response.json()
    console.log('Nytt dokument:', newDoc)

    docs.value.push({...newDoc, title: title.value, content: content.value})
}



title.value = ''
content.value = ''


</script>

<template>
    <div class="create-form">
    <h2>Skapa nytt dokument</h2>
        <form @submit.prevent="addOne" class="new-doc">
            <label for="title">Titel</label>
            <input v-model="title" type="text" id="title" name="title" />


            <label for="content">Innehåll</label>
            <textarea v-model="content" id="content" name="content"></textarea>

            <input type="submit" value="Skapa" />
        </form>
    </div>
    <div class="doc-list">
        <h2>Dokument</h2>
        <ol>
            <li v-for="(doc, index) in docs" :key="doc._id">
                {{ doc.title }}
                </li>

        </ol>
    </div>
</template>

<style scoped>
.new-doc {
    display: flex;
    flex-direction: column;
    border: 1px solid red;
}

input,
textarea {
    margin-bottom: 1.4rem;
    font-size: 1rem;
    padding: 1.4rem;
}

ol {
    text-decoration: none;
    list-style-type: none;
    border: 1px solid blue;
}
</style>