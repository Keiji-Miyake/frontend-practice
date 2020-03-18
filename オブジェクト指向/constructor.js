var Person = function Person(living, age, gender) {
  // thisはここで生成される新たなオブジェクト。(つまり、this = new Object();)
  this.living = living;
  this.age = age,
  this.gender = gender;
  this.getGender = function() { return this.gender; };
  // 関数がnew演算子とともに呼ばれた場合、return文が宣言されていなくてもthisを返す。
};

// Personオブジェクトのインスタンスを生成
var cody = new Person(true, 33, 'male');

// codyはオブジェクトで、Person()のインスタンスである
console.log(typeof cody);
console.log(cody);
console.log(cody.constructor);