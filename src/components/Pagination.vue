<template>

  <div class="center-align">
    <ul class="pagination">
      <li :class="curPage===1?'disabled':'waves-effect'" @click="pagClick(curPage-1)"><a href="#!"><i
        class="material-icons">chevron_left</i></a></li>
      <li :class="i+1===curPage?'active':'waves-effect'" v-for="(item, i) in items" @click="pagClick(i+1)"><a
        href="#!">{{i + 1}}</a></li>
      <li :class="curPage===items.length?'disabled':'waves-effect'" @click="pagClick(curPage+1)"><a href="#!"><i
        class="material-icons">chevron_right</i></a></li>
    </ul>
  </div>

</template>

<script>
  import { eventBus } from '../eventBus.js'

  export default {
    name: 'Pagination',
    props: ["items","curPage"],
    data() {
      return {}
    },
    methods: {
      pagClick: function (page) {
        eventBus.$emit("pagClick", page);
      }

    }
  }
</script>

<style></style>
