import {
  Component,
  Input,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'child',
  template: `
    <p>子コンポーネント</p>
    <p>登録時刻:{{getNow()}}</p>
    <p *ngIf="childValue > 0">書式付金額 {{format()}}</p>
  `,
  styles: [`p {
    font-size: 2rem;
  }`]
})
export class ChildComponent implements OnChanges, OnInit, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() childValue: number;

  constructor() {
    console.log('@@@constructor');
  }

  //現在時刻の取得
  getNow() {
    console.log('@@@getNow');
    return (new Date()).toLocaleTimeString();
  }

  //数値の前に￥マーク、後に－を付ける
  format(): string {
    console.log('@@@format');
    return '\\' + String(this.childValue) + '-';
  }

  ngOnChanges() {
    console.log('@@@ngOnChanges');
  }

  ngOnInit() {
    console.log('@@@ngOnInit');
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
