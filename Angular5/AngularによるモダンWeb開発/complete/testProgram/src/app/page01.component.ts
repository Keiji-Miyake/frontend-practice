import {
  Component,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
} from '@angular/core';
import {CalcService} from './calc.service';
import {CounterService} from './counter.service';

@Component({
  selector: 'page01',
  template: `
    <p>親コンポーネント（1/2）</p>
    <p><input type="text" [(ngModel)]="value01"/></p>
    <p>入力金額　{{value01}}</p>
    <p>税込金額　{{calc()}}</p>
    <p>閲覧回数　{{counterService.counter}}</p>
    <!--<p>閲覧回数　{{counterService.getCounter()}}</p>-->
    <p><a routerLink="/page02">2ページ目へ</a></p>
    <hr/>
    <!--子コンポーネント出力先-->
    <child [childValue]="value01"></child>
  `,
  styles: [
      `p, input {
      font-size: 2rem;
      color: blue;
    }`]
})
export class Page01Component implements OnChanges, OnInit, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  value01 = 0; //データバインドする変数

  constructor(private calcService: CalcService, //CalcService DI
              public counterService: CounterService) { //CounterService DI
    console.log('@@@constructor');
  }

  //CalcServiceを使った計算
  calc(): number {
    console.log('@@@calc');
    return this.calcService.addTax(this.value01);
  }

  ngOnInit() {
    console.log('@@@ngOnInit');
    this.counterService.counter++; //コンポーネント生成時に閲覧回数加算
  }

  ngOnChanges() {
    console.log('@@@ngOnChanges');
  }

  ngDoCheck() {
    console.log('@@@ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('@@@ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('@@@ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('@@@ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('@@@ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('@@@ngOnDestroy');
  }

}
