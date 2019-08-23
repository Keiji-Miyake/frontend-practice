import {Injectable} from '@angular/core';

@Injectable()
export class StoreService {

  //画面間の共通データ
  sharedData = 0;

  constructor() {
    console.log('@@@constructor');
  }

  //受け取った値を保存
  writeStore(num: number) {
    console.log('@@@writeStore');
    this.sharedData = num;
  }

  //保存した値を読み取り
  readStore(): number {
    console.log('@@@readStore');
    return this.sharedData;
  }
}


