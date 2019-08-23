/*
* @title prototypeプロパティ「
* 2015/11/28 ES5
*
*
*/
// コンストラクタ関数定義
// オブジェクトの初期化に使われる関数をコンストラクタ関数という
function Human(name) {
  this.name = name;
}
// プロトタイプを拡張
// prototypeプロパティを使って、Humanにgreetメソッドを追加しています。
Human.prototype.greet = function() {
  console.log("Hello " + this.name);
}
// 上記で設置したメソッドを使用するときは、まず、new演算子でオブジェクトを生成します。
// このオブジェクトをインスタンスという。インスタンス自身が持っていない機能や属性であっても
// 生成したコンストラクタのプロトタイプから利用することができます。
var mike = new Human("Mike");
mike.greet(); // greetメソッドを使用。

/*
* @title クロージャーを理解する
* 変数のスコープ
*
*/
function createCounter() {
  var count = 0;
  return function() {
    count++;
    console.log(count);
  }
}

var counter1 = createCounter();
counter1();
counter1();
counter1();

var counter2 = createCounter();
counter2();
counter2();

count = 100;

counter1();

/*
* @title オブザーバーを理解する
* 変数のスコープ
* 状態の変化を監視することを目的したもので、あるオブジェクトの状態が変化した際に、
* あらかじめ登録しておいた監視者に対し通知を行います。
* 1. Observerと呼ばれるオブジェクトに監視者を登録する
* 2. 通知者がイベントを通知する
* 3. 監視者はイベント通知を受け取り、各々の目的を実行する
*/
// 1. コンストラクタの作成 監視者を格納するための空配列「this.listeners」を作成
function Observer() {
  this.listeners = {};
}
// 2. on,off,triggerといプロトタイプ関数を作成。
Observer.prototype.on = function(event, func) {
  if(! this.listeners[event]) {
    this.listeners[event] = [];
  }
  this.listeners[event].push(func);
};
Observer.prototype.off = function(event, func) {
  var ref = this.listeners[event];
  var len = ref.length;
  for (var i = 0; i < len; i++) {
    var listener = ref[i];
    if (listener === func) {
      ref.splice(i, 1);
    }
  }
};
// triggerメソッドはオブザーバー全体を反復処理し、実行します。
Observer.prototype.trigger = function(event) {
  var ref = this.listeners[event];
  for (var i = 0, len = ref.length; i < len; i++) {
    var listener = ref[i];
    if(typeof listener === "function") listener();
  }
};
// 3. Observerが完成したので次のように実行します。
var observer = new Observer();
var greet = function() {
  console.log("Good morning");
};
observer.on("morning", greet);
observer.trigger("morning");

var sayEvening = function() {
  console.log("Good evening");
};
observer.on("evening", sayEvening);
observer.trigger("evening");



function Human(name) {
  this.name = name;
  this.greet = function () {
    console.log("My name is " + this.name)
  }
}

var person = {
  name: 'John', // プロパティ
  sayHello: function() { // メソッド
    console.log('Hello, ' + this.name + '!');
  }
};

console.log(person.name);
person.sayHello();
// ↑これだと名前の数だけ作らないといけない。
// そこで↓

//ここから　コンストラクタの作成
var Person = function(name) {
  this.name = name;
  this.sayHello = function() {
    console.log('Hello, ' + this.name + '!');
  };
};

var j = new Person('john');
console.log(j.name);
j.sayHello();
//ここまで


// newってなに？
// newをつけると↓こんなかんじ
var Person__ = function(name) {
  var o = {
    name: name,
    sayHello: function() {
      console.log('Hello, ' + this.name + '!');
    }
  };
  return o;
};

var j2 = Person__('john');
console.log(j2.name);
j2.sayHello();

// newをつけるとvar o　の部分のようにオブジェクトが生成されて帰ってくる。
