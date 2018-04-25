<template>
  <div id="slide-out" class="sidenav">
      <div class="user-view">
        <div class="center-align valign-wrapper">
          <img src="../assets/logo.png" alt="" class="circle responsive-img">
        </div>
        <br>
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">account_circle</i>
              <input id="icon_prefix" type="text" class="validate" v-model="item.fio">
              <label for="icon_prefix" :class="item.fio?'active':''">Fio</label>
            </div>

            <div class="input-field col s12">
              <i class="material-icons prefix">phone</i>
              <input id="icon_telephone" type="tel" class="validate" v-model="item.phone">
              <label for="icon_telephone" :class="item.phone?'active':''">Phone</label>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">business</i>
              <input id="icon_position" type="text" class="validate" v-model="item.position">
              <label for="icon_position" :class="item.position?'active':''">Position</label>
            </div>
            <div class="input-field col s12">
              <select v-model="item.boss">
                <option v-for="user in items" :value="user.id" :selected="item.boss === user.id?'selected':''">{{user.fio}}</option>
              </select>
              <label>His/her Boss</label>
            </div>
            <div class="input-field col s12">
              <select multiple>
                <option v-for="user in items" :value="user.id" :selected="user.boss===item.id?'selected':''">{{user.fio}}</option>
              </select>
              <label>His/her Inferiors</label>
            </div>
          </div>
        </form>
        <button class="btn waves-effect waves-light red" type="button" @click="close">Cancel
          <i class="material-icons right">clear</i>
        </button>
        <button class="btn waves-effect waves-light green" type="button" @click="close">Save
          <i class="material-icons right">check</i>
        </button>

      </div>
    </div>

</template>

<script>
  import { eventBus } from '../eventBus.js'

  export default {
    name: 'Pagination',
    props: ["item","items"],
    data() {
      return {}
    },
    create: function () {

    },
    methods: {
      close: function(){

      }

    }
  }
</script>

<style></style>
