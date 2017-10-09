<template>
  <main>
    <h2>{{title}}</h2>
    <form>
      <div class="formGroup">
        <label class="forSelect" for="out">From:</label>
        <select name="out" id="out" v-model="form.out">
          <option disabled selected value="">Choose departure city...</option>
          <option v-for="(option, index) in out" :value="option" :key="index">{{option}}</option>
        </select>
      </div>
      <div class="formGroup">
        <label class="forSelect" for="to">To:</label>
        <select name="to" id="to" v-model="form.to">
          <option disabled selected value="">Choose arrival city...</option>
          <option v-for="(option, index) in to" :value="option" :key="index">{{option}}</option>
        </select>
      </div>
      <div class="formGroup">
        <input type="radio" id="price"
               name="sorting" value="1" v-model="form.sort">
        <label for="price" class="radio_button">Cheapest</label>

        <input type="radio" id="time"
               name="sorting" value="2" v-model="form.sort">
        <label for="time" class="radio_button">Fastest</label>
      </div>
      <button @click.prevent="renderList()">Search</button>
    </form>
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
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      result:false,
      Data:false,
      currencyValue:false,
      out:[],
      to:[],
      title: 'TripSorter',
      form:{
        out:false,
        to:false,
        sort:1
      }
    }
  },
  computed: {
    loadedData(){
        return this.Data;
    },
    currency(){
        return this.currencyValue;
    }
  },
  created(){
    this.$http.get('./static/response.json').then(res => {
        this.Data = res.body['deals'];
        this.currencyValue= res.body['currency'];
        console.log(res.body)
        this.loadedData.map(elem => {
            if(this.out.indexOf(elem['departure']) === -1) {
                this.out.push(elem['departure'])
            }
            if(this.to.indexOf(elem['arrival']) === -1) {
                this.to.push(elem['arrival'])
            }
        })
    })
  },
  methods:{
      renderList(){
          const sortedArray = this.loadedData
              .filter(elem => {
//                 if(elem['departure'] === this.form.out && elem['arrival'] === this.form.to) console.log('hey!');
//                 if(elem['arrival'] === this.form.to) console.log('WOW!');
                 return (elem['departure'] === this.form.out && elem['arrival'] === this.form.to)
              });
          if(this.form.sort === '1'){
              sortedArray.sort(this.costSort('cost'))
          }else{
              sortedArray.sort(this.timeSort('duration'))
          }
          console.log(sortedArray);
          this.result = sortedArray;
      },
      costSort(property) {
          return  (a,b) => (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      },
      timeSort(property) {
          return  (a,b) => {
              let first = (a[property]['h']*60+a[property]['m']);
              let second = (b[property]['h']*60+b[property]['m']);
              return (first < second) ? -1 : (first > second) ? 1 : 0;
          }
      }
  }
}
</script>

<style scoped>
  main{display: flex;justify-content: center;align-items: center;flex-direction: column;height: 100%;}
  form{padding: 40px; border-radius: 10px; background: white; font-size: 1.2em;}
  input[type=radio]{
    display: none;
  }
  .formGroup{
    width: 100%;
    position: relative;
    margin-bottom: 30px;
  }
  .forSelect{
    font-size: 0.9em;
    width: 25%;
    float: left;
    vertical-align: middle;
  }
  .formGroup select{
    width: 75%;
    background: transparent;
    height: 30px;
    border-radius: 5px;
    outline: none;
  }
  .formGroup select option{
    font-size: 1.2em;
  }
  .radio_button{
    padding: 10px 20px;
    border: 2px solid transparent;
    color:#7e15ff;
    background: white;
    border-radius: 10px;
    cursor: pointer;
  }
  input[type=radio]:checked + label.radio_button{
    border: 2px solid #7e15ff;
    color:#fff;
    background: #7e15ff;
  }
  button{
    font-size: 1.3em;
    width: 100%;
    padding: 10px 20px;
    border: 2px solid #ffad40;
    color:#fff;
    background: #ffad40;
    border-radius: 10px;
    cursor: pointer;
  }



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
