<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    this.getGraphQlData()
  },
  methods: {
    getGraphQlData() {
      this.$graphql.request(`
          query{
            users{
              _id,
              userName,
              password,
              lastLoginAt,
              createAt
            }
          }
        `).then(result => {
        console.log(result);
      })
    }
  }
}
</script>

<style>
#app {
  background-color: #f0f0f0;
}
</style>
