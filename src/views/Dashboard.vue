<template>
  <div class="container">
    <div class="jumbotron">
      <h1>
        Hello im module: {{ moduleName }}
      </h1>
      <p>Im your dashboard!</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      moduleName: 'Dashboard'
    }
  }
}
</script>

<style>
</style>
