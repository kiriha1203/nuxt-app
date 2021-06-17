<template>
  <section class="container">
    <h1>Todoリスト</h1>
    <!-- <div class="headerLink">
      <router-link to="/">Todo Page</router-link>
      <router-link to="/deletedTodo">Deleted Todo Page</router-link>
    </div> -->
    <div class="addArea">
      <input type="text" name="addName" v-model="content" placeholder="タスクを入力してください">
      <button class="button button--green" @click="insert">追加</button>
    </div>
    <div class="filter">
      <button class="button button--gray" v-bind:class="{'is-active':(!find_flg)}" @click="flag_reset">全て</button>
      <button class="button button--gray" v-bind:class="{'is-active':find_flg && (find_state == '作業前')}" @click="find('作業前')">作業前</button>
      <button class="button button--gray" v-bind:class="{'is-active':find_flg && (find_state == '作業中')}" @click="find('作業中')">作業中</button>
      <button class="button button--gray" v-bind:class="{'is-active':find_flg && (find_state == '完了')}" @click="find('完了')">完了</button>
    </div>
    <table class="lists">
      <thead>
        <tr>
          <th>タスク</th>
          <th>登録日時</th>
          <th>状態</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in display_todos" :key="index">
          <td v-if="todo.delete_flg == 0">{{ todo.content }}</td>
          <td v-if="todo.delete_flg == 0">{{ todo.created_at }}</td>
          <td v-if="todo.delete_flg == 0">
            <button class="button--gray" 
                      v-bind:class="{
                        'button--gray':todo.state == '作業前',
                        'button--gray':todo.state == '作業中',
                        'button--gray':todo.state == '完了'}"
                      @click="changeState(todo)">
                {{ todo.state }}
            </button>
          </td>
          <td v-if="todo.delete_flg == 0"><button class="button button--red" @click="remove(todo)">削除</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data: function() {
    return {
      content: '',
      find_state: '',
      find_flg: false
    }
  },
  computed: {
    ...mapState(['todos']),
    display_todos:function() {
      if(this.find_flg) {
        let arr = [];
        let data = this.todos;
        data.forEach(element =>{
          if(element.state == this.find_state) {
            arr.push(element);
          }
        });
        return arr;
      } else {
        return this.todos;
      }
    }
  },
  methods: {
    insert: function() {
      if(this.content != ''){
        this.$store.commit('insert', {content: this.content});
        this.content = '';
      }
    },
    remove: function(todo) {
      this.$store.commit('remove', todo)
    },
    changeState: function(todo) {
      this.$store.commit('changeState', todo)
    },
    find: function(findState) {
      this.find_state = findState;
      this.find_flg = true;
    },
    flag_reset: function() {
      this.find_flg = false;
    }
  }
}
</script>
