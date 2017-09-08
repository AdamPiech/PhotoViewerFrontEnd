<template>
  <div id="app">
    <div class="gallery">
      <h1>Photo Viewer</h1>
    </div>
    <router-link to="/form"><button>Dropzone</button></router-link>
    <router-link to="/gallery"><button>Gallery</button></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  /*display: flex;*/
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

body {
  background-color: #263238;
  height: 100%;
  margin: 0;
  padding: 0;
}

h1, h2 {
  font-weight: normal;
  color: lightcyan;
}

a {
  color: lightcyan;
}

button {
 background-color:lightblue;
 text-decoration:none;
 padding:2px 2px;
 border-radius:3px;
 font-size:1em;
 width: 100px;
}
</style>
