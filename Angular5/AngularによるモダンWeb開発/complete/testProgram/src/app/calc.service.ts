import {Injectable} from '@angular/core';
import {StoreService} from './store.service';

@Injectable()
export class CalcService {

  constructor(private storeService: StoreService) { //StoreService DI
    console.log('@@@constructor');
  }

  //消費税加算計算と保存
  addTax(num: number) {
    console.log('@@@addTax');
    num *= 1.08; //税込み金額計算
    this.storeService.writeStore(num); //StoreServiceを使って税込金額を保存
    return num;
  }

}


