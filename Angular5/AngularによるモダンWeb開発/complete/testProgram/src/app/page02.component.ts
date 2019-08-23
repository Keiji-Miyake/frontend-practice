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
import {StoreService} from './store.service';

@Component({
  selector: 'page02',
  template: `
    <p>コンポーネント（2/2）</p>
    <p>前ページの金額　{{readStore() | number}}</p>
    <p><a routerLink="/">1ページ目へ</a></p>
  `,
  styles: [`p {
    font-size: 2rem;
  }`]
})
export class Page02Component implements OnChanges, OnInit, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  constructor(private storeService: StoreService) {//StoreServiceをDI
    console.log('@@@constructor');
  }

  readStore() {
    console.log('@@@readStore');
    return this.storeService.sharedData;
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
