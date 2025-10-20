<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { EditorView } from '@codemirror/view'
import { basicSetup } from "codemirror";
import { javascript } from '@codemirror/lang-javascript'
import { EditorState } from '@codemirror/state'

const title = ref('')
const content = ref('')
const id = ref('')
const doc = ref(null)
const route = useRoute()
const router = useRouter()
const token = sessionStorage.getItem('token');
const email = ref('')
const docType = ref('text')
const output = ref('')
const editor = ref(null)
let codeView = null

let apiURL;
if (window.location.hostname.includes("localhost")) {
  apiURL = "http://localhost:8080";
} else {
  apiURL = "https://jsramverk-hoc-a2fwfbeecrhdfkhr.northeurope-01.azurewebsites.net";
}

// WATCH: Kör om man växlar typ till 'code'
watch(docType, async (newType) => {
  if (newType === 'code') {
    await nextTick();
    initCodeEditor();
  }
});

async function getDocument() {
  const response = await fetch(`${apiURL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      query: `
        query GetDoc($id: ID!) {
          document(id: $id) {
            _id
            title
            content
            type
          }
        }
      `,
      variables: {
        id: route.params.id
      }
    })
  })

  const json = await response.json()
  doc.value = json.data.document
  title.value = doc.value.title
  content.value = doc.value.content
  id.value = doc.value._id
  docType.value = doc.value.type || 'text'

  if (docType.value === 'code') {
    await nextTick(); // säkerställ att DOM är uppdaterad
    initCodeEditor()
  }
}

function initCodeEditor() {
  if (!editor.value) return;

  if (codeView) {
    codeView.destroy();             // stäng ned föregående instans
    codeView = null;
    editor.value.innerHTML = '';    // rensa DOM-innehåll
  }

  const startState = EditorState.create({
    doc: content.value,
    extensions: [basicSetup, javascript()]
  });

  codeView = new EditorView({
    state: startState,
    parent: editor.value
  });
}

async function updateOne() {
  const updatedContent = docType.value === 'code'
    ? codeView.state.doc.toString()
    : content.value

  const response = await fetch(`${apiURL}/api/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: title.value,
      content: updatedContent,
      type: docType.value,
      id: id.value
    })
  })

  if (response.ok) {
    console.log("Dokument uppdaterat!")
    router.push('/')
  }
}

async function emailInvite() {
  const response = await fetch(`${apiURL}/api/invite`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      email: email.value,
      docId: id.value
    })
  })
  const result = await response.json()
  console.log(result)
}

async function runCode() {
  const codeToRun = codeView?.state?.doc?.toString() || '';
  console.log("Kod som skickas:", codeToRun);

  if (!codeToRun.trim()) {
    output.value = "Ingen kod att köra!";
    return;
  }

  const base64Code = btoa(codeToRun);

  try {
    const response = await fetch("https://execjs.emilfolino.se/code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code: base64Code })
    });

    const result = await response.json();
    console.log("Svar från execjs:", result);

    if (result.data) {
      try {
        const decoded = atob(result.data);
        output.value = decoded;
        console.log("Decoded output:", decoded);
      } catch (e) {
        output.value = "Fel vid avkodning.";
        console.error("Base64-dekodningsfel:", e);
      }
    } else if (result.error) {
      output.value = "Fel från servern: " + result.error;
    } else {
      output.value = "Ingen output från servern.";
    }

  } catch (err) {
    output.value = "Nätverksfel eller servern svarar inte.";
    console.error(err);
  }
}

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

      <label for="type">Dokumenttyp</label>
      <select v-model="docType" id="type">
        <option value="text">Text</option>
        <option value="code">Kod</option>
      </select>

      <label for="content">Innehåll</label>

      <div v-if="docType === 'text'">
        <textarea v-model="content" id="content" name="content" rows="10"></textarea>
      </div>

      <div v-else ref="editor" class="code-editor"></div>

      <input type="submit" value="Uppdatera" />
    </form>

    <div v-if="docType === 'code'" class="run-section">
      <button @click="runCode">Kör koden</button>
      <pre class="output">{{ output }}</pre>
    </div>

    <form @submit.prevent="emailInvite" class="new-doc">
      <label for="invite">Bjud in någon att redigera dokumentet</label>
      <input v-model="email" id="email" name="email" />
      <input type="submit" value="Skicka Inbjudan" />
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

.code-editor {
  border: 1px solid #ccc;
  margin-bottom: 1.4rem;
}

.run-section button {
  margin-top: 1rem;
  background-color: #f9f9f9;
  color: #213547;
  border: 1px solid #ccc;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

.run-section button:hover {
  background-color: #e0e0e0;
  border-color: #646cff;
}

.output {
  background: rgb(231, 239, 231);
  color: #000000ff;
  border: 1px solid #000000ff;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1rem;
  white-space: pre-wrap;
  font-size: 1rem;
}

</style>
