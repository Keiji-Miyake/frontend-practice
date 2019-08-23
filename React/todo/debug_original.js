import todoApp from './reducers/index.js';

// 初期値となるstateを取得
var initialState = todoApp({}, {});
console.log(initialState);
// => { todos:[], visibilityFilter: "SHOW_ALL"}

// TODOを一つ追加する
var nextState = todoApp(initialState, {type:'ADD_TODO', id:1, text:'First todo'});
console.log(nextState);
// => { todos:[{ id:1, text:"First todo!", completed:false }], visibilityFilter:"SHOW_ALL"}