import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy,
  OnInit
} from '@angular/core';
import {Page02Component} from './page02.component';
import {Page01Component} from './page01.component';

export const ROUTES = [
  {path: 'page02', component: Page02Component},
  {path: '', component: Page01Component}
];

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class MainComponent implements OnChanges, OnInit, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  constructor() {
    console.log('@@@constructor');
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
