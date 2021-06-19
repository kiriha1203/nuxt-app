<template>
  <section class="container">
    <h1>Todoリスト</h1>
    <!-- <div class="headerLink">
      <router-link to="/">Todo Page</router-link>
      <router-link to="/deletedTodo">Deleted Todo Page</router-link>
    </div> -->
    <div class="addArea">
      <input type="text" name="addName" v-model="content" placeholder="タスクを入力してください">
      <button class="button button--green" @click="todo_create">追加</button>
    </div>
    <div class="filter">
      <button class="button button--gray" v-bind:class="{'is-active':(!find_flg)}" @click="todo_flag_reset">全て</button>
      <button class="button button--gray" v-bind:class="{'is-active':find_flg && (find_state == '作業前')}" @click="todo_find('作業前')">作業前</button>
      <button class="button button--gray" v-bind:class="{'is-active':find_flg && (find_state == '作業中')}" @click="todo_find('作業中')">作業中</button>
      <button class="button button--gray" v-bind:class="{'is-active':find_flg && (find_state == '完了')}" @click="todo_find('完了')">完了</button>
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
          <td>{{ todo.content }}</td>
          <td>{{ todo.created_at }}</td>
          <td>
            <button class="button--gray" 
                      v-bind:class="{
                        'button--gray':todo.state == '作業前',
                        'button--gray':todo.state == '作業中',
                        'button--gray':todo.state == '完了'}"
                      @click="todo_changeState(todo)">
                {{ todo.state }}
            </button>
          </td>
          <td><button class="button button--red" @click="todo_remove(todo)">削除</button></td>
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
      let exists_todos = (this.todos).filter(todo => !todo.deleted_flg);
      if(this.find_flg) {
        let find_todos = exists_todos.filter(todo => todo.state == this.find_state);
        return find_todos;
      } else {
        return exists_todos;
      }
    }
  },
  methods: {
    todo_create: function() {
      if(this.content != ''){
        this.$store.commit('insert', {content: this.content});
        this.content = '';
      }
    },
    todo_delete: function(todo) {
      this.$store.commit('remove', todo)
    },
    todo_changeState: function(todo) {
      this.$store.commit('changeState', todo)
    },
    todo_find: function(findState) {
      this.find_state = findState;
      this.find_flg = true;
    },
    todo_flag_reset: function() {
      this.find_flg = false;
    }
  }
}
</script>