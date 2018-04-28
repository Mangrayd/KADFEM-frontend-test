<template>

  <div class="container" id="app">
    <div class="col s12">
      <div class="row">
        <div class="col s12 m4 l3">
          <h4>Users list</h4>
        </div>

        <div class="input-field col s12 m4 offset-m4 l3 offset-l6">
          <i class="material-icons prefix">search</i>
          <input id="search" type="text" class="validate" @keyup="change($event)">
          <label for="search">Search</label>
        </div>

      </div>
    </div>

    <UsersTable :items="itemsPerPage" :curPage="curPage" :order="order"/>

    <Pagination :items="itemsPerPage" :curPage="curPage" v-if="items.length>countPerPage"/>

    <Aside :item="activeUser" :items="items"/>

    <h4>New user</h4>

    <div class="col s12">
      <div class="row">

        <div class="input-field col s12 m4">
          <i class="material-icons prefix">account_circle</i>
          <input id="icon_prefix_new" type="text" class="validate" v-model="newUser.fio" required>
          <label for="icon_prefix_new">Fio</label>
        </div>

        <div class="input-field col s12 m4">
          <i class="material-icons prefix">phone</i>
          <input id="icon_telephone_new" type="tel" class="validate" v-model="newUser.phone">
          <label for="icon_telephone_new">Phone</label>
        </div>

        <div class="input-field col s12 m4">
          <i class="material-icons prefix">business</i>
          <input id="icon_position_new" type="text" class="validate" v-model="newUser.position">
          <label for="icon_position_new">Position</label>
        </div>

        <div class="col s12">
          <button class="btn waves-effect waves-light red" type="button" @click="clearUser()">Clear
            <i class="material-icons right">clear</i>
          </button>
          <button class="btn waves-effect waves-light green" type="button" @click="addUser()">Add
            <i class="material-icons right">check</i>
          </button>
        </div>

      </div>
    </div>

  </div>

</template>

<script>

  import UsersTable from './components/UsersTable';
  import Pagination from './components/Pagination';
  import Aside from './components/Aside';
  import Vue from 'vue';

  const users = require('./assets/users.js')();
  import { eventBus } from './eventBus.js';

  export default {
    name: 'App',
    components: {
      UsersTable,
      Pagination,
      Aside
    },
    data() {
      return {
        order: {
          field: "",
          dir: true
        },
        instance: null,
        countPerPage: 5,
        pages: 0,
        curPage: 1,
        items: Object.assign([],users),
        virtualItems: Object.assign([],users),
        itemsPerPage: [],
        newUser: {
          id: null,
          fio: "",
          position: "",
          phone: "",
          image: "",
          boss: '',
          inferiors: []
        },
        oldUser: {},
        activeUser: {
          id: null,
          fio: "",
          position: "",
          phone: "",
          image: "",
          boss: '',
          inferiors: []
        },
      }
    },
    created() {
      this.countPages();
      this.itemsPerPageFill();

      eventBus.$on("save", ()=>{
        this.instance.close();
      });
      eventBus.$on("cancel", (oldItem)=>{

        var i = this.items.indexOf(this.items.filter(item=>item.id === this.oldUser.id)[0]);
        Vue.set(this.items, i, this.oldUser);
        this.instance.close();
      });

      eventBus.$on("pagClick", (page)=>{
        if ( page === this.curPage || page<=0 || page>this.itemsPerPage.length ){
          return false;
        }
        this.curPage = page;
      });

      eventBus.$on("tableDeleteClick", (item)=>{

        if ( confirm("Are you sure?") ){
          const i = this.items.indexOf(this.items.filter(el=>el.id === item.id)[0]);
          this.items.splice(i,1);
          this.virtualItems.splice(i,1);
        }

      });
      eventBus.$on("tableRowClick", (item)=>{
        this.activeUser = item;
        this.oldUser = Object.assign({},item);

        const elem = document.querySelector('.sidenav');
        this.instance = M.Sidenav.init(elem, {edge:"right"});
        const elemS = document.querySelector('select');
        const instanceS = M.FormSelect.init(elemS, {});

        $(document).ready(function(){
          $('.sidenav').sidenav();
          $('select').formSelect();
        });
        this.instance.open();
      });
      eventBus.$on("tableHeadClick", (alias)=>{
        this.setOrder(alias);
      });

    },
    watch: {
      items: function () {
        this.countPages();
        this.itemsPerPageFill();
      },
      virtualItems: function () {
        this.countPages();
        this.itemsPerPageFill();
      },
      pages: function () {
        this.curPage = 1;
      }
    },
    methods: {
      change: function (event) {
        const str = event.target.value.toLowerCase();
        var arr = this.virtualItems;

        var newArr = arr.filter((item)=>{
          var fio = item.fio.toLowerCase();
          console.log(str + ' - ', fio + ' - ', fio.indexOf(str));
          return fio.indexOf(str) !== -1;
        });
        this.items = newArr;
        this.curPage= 1;
      },
      clearUser: function () {
        this.newUser = {
          id: null,
          fio: "",
          position: "",
          phone: "",
          image: "",
          boss: null,
          inferiors: []
        };
      },
      addUser: function () {
        if (!this.newUser.fio){
          return false;
        }
        this.newUser.id = new Date().getTime()/1000;
        this.items.push(this.newUser);
        this.virtualItems.push(this.newUser);

        this.activeUser = this.newUser;
        this.oldUser = Object.assign({},this.newUser);

        this.newUser = {
          id: null,
          fio: "",
          position: "",
          phone: "",
          image: "",
          boss: null,
          inferiors: []
        };

        const elem = document.querySelector('.sidenav');
        this.instance = M.Sidenav.init(elem, {edge:"right"});
        const elemS = document.querySelector('select');
        const instanceS = M.FormSelect.init(elemS, {});

        $(document).ready(function(){
          $('.sidenav').sidenav();
          $('select').formSelect();
        });
        this.instance.open();
      },
      countPages: function () {
        this.pages = Math.ceil(this.items.length / this.countPerPage);
      },
      itemsPerPageFill: function () {
        let p = 1;
        this.itemsPerPage = [];
        this.items.forEach((item,i)=>{

          if ( i > this.countPerPage*p-1 ){
            p++;
          }
          if ( !this.itemsPerPage[p-1] ) {
            this.itemsPerPage[p-1] = [];
          }
          this.itemsPerPage[p-1].push(item);

        });
      },
      pagClick: function (page) {
        if ( page === this.curPage || page<=0 || page>this.itemsPerPage.length ){
          return false;
        }
        this.curPage = page;
      },
      compare: function (key='fio', order=true) {
        return function(a, b) {
          if ( !a.hasOwnProperty(key) || !b.hasOwnProperty(key) ) {
            // свойства нет ни в одном из объектов
            return 0;
          }

          const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order === false) ? (comparison * -1) : comparison
          );
        };
      },
      setOrder: function (field) {

        if ( field !== this.order.field ){
          this.order.field = field;
          this.items.sort(this.compare(field));
          this.order.dir = true;
        } else {
          this.items.sort(this.compare(field, !this.order.dir));
          this.order.dir = !this.order.dir;
        }
      },
    }
  }
</script>

<style></style>
