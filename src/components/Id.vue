<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const title = ref('')
const content = ref('')

// hämta id från sökvägen
const route = useRoute()
const doc = ref(null)

//hämta dokument
async function getDocument() {
    const response = await fetch(`http://localhost:8080/${route.params.id}`)
    console.log('id:', route.params.id)
    doc.value = await response.json()
    
    title.value = doc.value.title
    content.value = doc.value.content
    // console.log(doc.title.value)
}

onMounted(() => {
    getDocument()
})

// funktion för att uppdatera dokument

</script>

<template>
    <div class="create-form">
    <h2>Uppdatera dokument</h2>
        <form class="new-doc">
            <label for="title">Titel</label>
            <input v-model="title" type="text" id="title" name="title" />


            <label for="content">Innehåll</label>
            <textarea v-model="content" id="content" name="content"></textarea>

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