// store/index.js
import Vuex from 'vuex';

const createStore = () => {
	return new Vuex.Store({
		state: () => ({
			todos: [
				{content: 'todoを作ることができる', created_at: '2021-06-18 17:00', state: '完了', delete_flg: false}, 
				{content: 'todoの状態を変更できる', created_at: '2021-06-17 17:00', state: '完了', delete_flg: false},
				{content: 'todoの削除機能で削除できる', created_at: '2021-06-16 17:00', state: '完了', delete_flg: false},
				{content: 'todoの削除機能でキャンセルを押すと削除されない', created_at: '2021-06-15 17:00', state: '完了', delete_flg: false},
				{content: 'todoの追加の下のボタンを押すと検索できる', created_at: '2021-06-14 17:00', state: '完了', delete_flg: false},
				{content: 'Todo Page, Deleted Todo Page に遷移できる', created_at: '2021-06-13 17:00', state: '完了', delete_flg: false},
				{content: 'ビットコインの金額をAxiosを使用して表示させれている', created_at: '2021-06-12 17:00', state: '完了', delete_flg: false},
				{content: 'ハンバーガを押すとチャットのようなものが表示される', created_at: '2021-01-18 17:00', state: '完了', delete_flg: false},
				{content: 'チャットの機能の実装', created_at: '2021-02-18 17:00', state: '作業中', delete_flg: false},
				{content: 'チャット機能にtodoを連結', created_at: '2021-04-18 17:00', state: '作業前', delete_flg: false},
				{content: '削除の確認', created_at: '2021-04-18 17:00', state: '完了', delete_flg: true},

			],
			option: [
				{id:0, label:'作業前'},
				{id:1, label:'作業中'},
				{id:2, label:'完了'}
			]
		}),
		mutations: {
			todo_create: function(state, obj) {
				var d = new Date();
				var fmt = d.getFullYear()
									+ '-' + ('00' + (d.getMonth() + 1)).slice(-2)
									+ '-' + ('00' + d.getDate()).slice(-2)
									+ ' ' + ('00' + d.getHours()).slice(-2)
									+ ':' + ('00' + d.getMinutes()).slice(-2);
				state.todos.unshift({
					content: obj.content,
					created_at: fmt,
					state: '作業前',
					delete_flg: false
				})
			},
			todo_delete: function(state, obj){
				for(let i = 0; i < state.todos.length; i++) {
					const ob = state.todos[i];
					if(ob.content == obj.content && ob.created_at == obj.created_at) {
						if (confirm('"' + ob.content + '"' + 'を削除しますか？')) {
							ob.delete_flg = true;
						} else {
							ob.delete_flg = false;
						}
						// state.todos.splice(i, 1);
					}
				}
			},
			// 状態の変更機能  1クリックで次の状態へ変更する　state.option 参照
			todo_changeState: function(state, obj){
				for(let i = 0; i < state.todos.length; i++) {
					const ob = state.todos[i];
					if(ob.content == obj.content && ob.created_at == obj.created_at && ob.state == obj.state) {
						let nowState;
						for(let j = 0; j < state.option.length; j++) {
							if(state.option[j].label == ob.state){
								nowState = state.option[j].id;
							}
						}
						nowState++;
						if(nowState >= state.option.length){
							nowState = 0;
						}
						obj.state = state.option[nowState].label
						return;
					}
				}
			}
		}
	})
}

export default createStore;