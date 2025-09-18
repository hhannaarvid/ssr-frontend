<script setup>
import { onMounted, ref } from 'vue'


defineProps({
  msg: String,
})

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

</script>

<template>
    <div class="create-form">
    <h2>Skapa nytt dokument</h2>
        <form method="POST" action="/" class="new-doc">
            <label for="title">Titel</label>
            <input type="text" name="title" />


            <label for="content">Innehåll</label>
            <textarea name="content"></textarea>

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
}

input,
textarea {
    margin-bottom: 1.4rem;
    font-size: 1rem;
    padding: 1.4rem;
}

ul {
    text-decoration: none;
}
</style>