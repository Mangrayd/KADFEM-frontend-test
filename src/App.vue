<template>

  <div id="app" style="max-width: 980px; margin: 0 auto;">

    <UsersTable :items="itemsPerPage" :curPage="curPage" :order="order"/>

    <Pagination :items="itemsPerPage" :curPage="curPage"/>

    <Aside :item="activeUser" :items="items"/>

  </div>

</template>

<script>

  import UsersTable from './components/UsersTable';
  import Pagination from './components/Pagination';
  import Aside from './components/Aside';

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
        countPerPage: 10,
        pages: 0,
        curPage: 1,
        items: users,
        itemsPerPage: [],
        activeUser: {
          id: null,
          fio: "",
          position: "",
          phone: "",
          image: "",
          boss: null,
          inferiors: []
        },
      }
    },
    created() {
      this.countPages();
      this.itemsPerPageFill();

      eventBus.$on("pagClick", (page)=>{
        if ( page === this.curPage || page<=0 || page>this.itemsPerPage.length ){
          return false;
        }
        this.curPage = page;
      });
      eventBus.$on("tableRowClick", (item)=>{
        this.activeUser = item;
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
    mounted() {

    },
    watch: {
      items: function () {
        this.countPages();
        this.itemsPerPageFill();
      }
    },
    methods: {
      /*close:function () {
        this.instance.close();
      },*/
      countPages: function () {
        this.pages = parseInt(this.items.length / this.countPerPage);
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
