<script setup>
// import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <div id="nav">
    | <router-link to="/">Hem</router-link> | 
  </div>
  <div class="header">
      <img src="/turtle2.png" class="logo" alt="turtle logo" />
      <img src="/turtle2.png" class="logo" alt="turtle logo" />
      <img src="/turtle2.png" class="logo" alt="turtle logo" />
      <img src="/turtle2.png" class="logo" alt="turtle logo" />



  </div>
  <h1>SSR-editor</h1>
  <router-view />
<div class="footer">
  <a href="https://github.com/cobj24/ssr-editor" class="github-links">
      <img src="/github.png" class="footer-logo" alt="turtle logo" />
      <p>Backend repo.</p>
      </a>
      <a href="https://github.com/cobj24/ssr-editor" class="github-links">
      <img src="/github.png" class="footer-logo" alt="turtle logo" />
      <p>Frontend repo.</p>
      </a>


</div>
</template>

<style scoped>
.header {
  /* border: 1px solid red; */
  background-color: rgb(231, 239, 231);
}

.logo {
  height: 6em;
  padding: 0.5em 1em 0.5em 1em;
  will-change: filter;
  transition: filter 300ms;
}


.footer-logo {
  height: 2em;
  /* border: 1px solid red; */
}


.footer {
  display:flex;
  justify-content: space-around;
  background-color: rgb(231, 239, 231);
  padding: 10px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
