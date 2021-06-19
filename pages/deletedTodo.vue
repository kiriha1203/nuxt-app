<template>
  <section class="container">
    <h1>Todoリスト</h1>
    <!-- <div class="headerLink">
      <router-link to="/">Todo Page</router-link>
      <router-link to="/deletedTodo">Deleted Todo Page</router-link>
    </div> -->
    <div class="Filter">
      <button class="button button--gray" v-bind:class="{'is-active':(!find_flg)}" @click="todo_flag_reset">全て</button>
      <button class="button button--gray" v-bind:class="{'is-active':find_flg && (find_state == '作業前')}" @click="todo_find('作業前')">作業前</button>
      <button class="button button--gray" v-bind:class="{'is-active':find_flg && (find_state == '作業中')}" @click="todo_find('作業中')">作業中</button>
      <button class="button button--gray" v-bind:class="{'is-active':find_flg && (find_state == '完了')}" @click="todo_find('完了')">完了</button>
    </div>
    <table class="Lists">
      <thead>
        <tr>
          <th>タスク</th>
          <th>登録日時</th>
          <th>状態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in display_todos" :key="index">
          <td>{{ todo.content }}</td>
          <td>{{ todo.created_at }}</td>
          <td>
            <button class="button" 
                      v-bind:class="{
                        'button--yet':todo.state == '作業前',
                        'button--progress':todo.state == '作業中',
                        'button--done':todo.state == '完了'}" >
                {{ todo.state }}
            </button>
          </td>
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
      let deleted_todos = (this.todos).filter(todo => todo.deleted_flg = true);
      if(this.find_flg) {
        let find_todos = deleted_todos.filter(todo => todo.state == this.find_state);
        return find_todos;
      } else {
        return deleted_todos;
      }
    }
  },
  methods: {
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
