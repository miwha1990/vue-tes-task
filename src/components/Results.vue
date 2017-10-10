<template>
  <main>
    <h2>{{title}}</h2>
    <div class="results" v-if="result">
      <table v-if="result.length">
        <thead>
        <tr>
          <th>Departure</th>
          <th>Arrival</th>
          <th>Transport</th>
          <th>Duration</th>
          <th>Cost, {{currency}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in result" :key="index" >
          <td>{{item.departure}}</td>
          <td>{{item.arrival}}</td>
          <td>{{item.transport}}</td>
          <td>{{item.duration.h}} : {{item.duration.m}}</td>
          <td>{{item.cost}}</td>
        </tr>
        </tbody>
      </table>
      <h2 v-else>Oops! No results for this direction</h2>
      <router-link :to="{name:'Home'}">Reset</router-link>
    </div>
  </main>
</template>
<script>
  export default {
    computed: {
      result() {
        return this.$store.getters.getResultData;
      },
      title() {
        return this.$store.getters.getTitle;
      },
      currency() {
          return this.$store.getters.getCurrency;
      }
    }
  }
</script>
<style scoped>
  a{
    font-size: 1.3em;
    width: 50%;
    padding: 10px 20px;
    color:#fff;
    background: #7e15ff;
    border-radius: 10px;
    cursor: pointer;
    display: block;
    text-decoration: none;
    margin:0 auto;
    text-align: center;
  }
  h2{text-align: center}
  .results{
    padding: 20px;
    background: white;
    margin-top:20px;
    border-radius: 10px;
    width:50%;
  }
  table{
    width: 100%;
    text-align: center;
    border-collapse:collapse;
  }
  table thead tr th{border-bottom: 1px solid #999}
  table tr{height: 40px}
  table th{width: 20%}
</style>
