<script setup>
import { ref } from 'vue'


defineProps({
  msg: String,
})

const count = ref(0)

</script>

<template>
    <h2>Uppdatera dokument</h2>
        <form method="POST" action="/" class="new-doc">
            <label for="title">Titel</label>
            <input type="text" name="title" />


            <label for="content">Innehåll</label>
            <textarea name="content"></textarea>

            <input type="submit" value="Skapa" />
        </form>
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