import { createStore } from 'redux'
import { todoApp } from './reducers/index.js';

// createStoreの引数はReducer: ここでは固定値を返すことにしている
let store = createStore(todoApp); // ReducerをStoreにセットしておく

// TODOの追加
var addTodoElem = document.getElementById('addTodo');
var input       = addTodoElem.getElementsByTagName('input')[0];
var button      = addTodoElem.getElementsByTagName('button')[0];
button.addEventListener('click', () => {
  // ボタンをくりっくしたら「TODOを追加する」というアクションをStoreに渡す
  var todoText = input.value;
  store.dispatch(addTodo(todoText));
});

// TODOの完了
var todoList = document.getElementById('todoList');
var elements = todoList.getElementsByTagName('li');
var listArray = [...elements];
listArray.forEach((v, index) => {
  v.addEventListener('click', e => {
    // TODOをクリックしたら「TODOの完了状態を切り替える」というアクションをStoreに渡す
    store.dispatch(toggleTodo(index));
  });
});

// フィルタリング
var links = document.getElementById('links');
var childs = links.childNodes;
var childList = [...childs];
childList.filter(v => v.nodeName != '#text').forEach(v => {
  v.addEventListener('click', e => {
    // リンクをクリックしたら「TODOのフィルタリング状態を切り替える」
    // というアクションをStoreに渡す
    var filterText = v.innerHTML;
    store.dispatch(setVisibilityFilter(filterText));
  });
});
