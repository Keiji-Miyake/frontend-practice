import {Injectable} from '@angular/core';

@Injectable()
export class CounterService {

  //閲覧回数を保持
  counter = 0;

  constructor() {
    console.log('@@@constructor');
  }

  //閲覧回数を加算して返す
  getCounter() {
    console.log('@@@getCounter');
    return this.counter++;
  }

}


