// 
var Person = function(name) {
  this.name = name || 'nanashi'; // もしnameに何もはいっていなかったら、nanashi　
  this.sayHello = function() {
    console.log('Hello, ' + this.name + '!');
  };
  this.sayGoodBye = function() {
    console.log('GoodBye, ' + this.name + '!');
  };
};

// 外のコンストラクタの作成
var Hero = function(name, hp, job) {
  this.name = name;
  this.hp = hp;
  this.job = job;
};

// Personコンストラクタを引き継ぎたい場合 prototype
Hero.prototype = new Person();

var c = new Hero('Cusinart', 59, 'fighter');

console.log(c.name);
console.log(c.hp);
console.log(c.job);
c.sayHello();
c.sayGoodBye();

// Personにメソッドを追加する
Person.prototype.teleport = function() {
  console.log('Oops!');
};
c.teleport();

var p = new Person();
p.sayHello();

