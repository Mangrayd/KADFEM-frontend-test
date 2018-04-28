<template>

  <table class="highlight">

    <!-- THEAD -->
    <thead>
      <tr>
        <th v-for="field in fields" @click="tableHeadClick(field.alias)">
          <div class="valign-wrapper">
            <span class="waves-effect">{{field.title}}</span><i class="tiny material-icons" v-if="order.field === field.alias">{{order.dir?"arrow_upward":"arrow_downward"}}</i>
          </div>
        </th>
        <th></th>
      </tr>
    </thead>

    <!-- TBODY -->
    <tbody>
      <tr v-for="item in items[curPage-1]" @click="tableRowClick(item)">
        <td>{{item.fio}}</td>
        <td>{{item.position}}</td>
        <td>{{item.phone}}</td>
        <td>
          <button class="btn-floating btn-small waves-effect waves-light red" type="button" @click="tableDeleteClick($event, item)"><i class="material-icons right">delete</i></button>
        </td>
      </tr>
      <tr v-if="!items.length">
        <td class="center-align" colspan="4">
          <h5>sorry, nothing found</h5>
        </td>
      </tr>
    </tbody>

  </table>

</template>

<script>
  import { eventBus } from '../eventBus.js'

  export default {
    name: 'UsersTable',
    props: ['items','curPage', 'order'],
    data () {
      return {
        fields: [
          {
            alias: "fio",
            title: "ФИО"
          },
          {
            alias: "position",
            title: "Должность"
          },
          {
            alias: "phone",
            title: "Телефон"
          },
        ],
      }
    },
    methods: {
      tableRowClick: function (item) {
        eventBus.$emit("tableRowClick", item);
      },
      tableHeadClick: function (alias) {
        eventBus.$emit("tableHeadClick", alias);
      },
      tableDeleteClick: function (event, item) {
        eventBus.$emit("tableDeleteClick", item);
        event.stopPropagation();
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
