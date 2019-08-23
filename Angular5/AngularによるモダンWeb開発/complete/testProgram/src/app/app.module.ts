import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MainComponent, ROUTES} from './main.component';
import {Page01Component} from './page01.component';
import {Page02Component} from './page02.component';
import {CalcService} from './calc.service';
import {StoreService} from './store.service';
import {ChildComponent} from './child.component';
import {CounterService} from './counter.service';

@NgModule({
  declarations: [ //コンポーネント,ディレクティブ,パイプ
    MainComponent,
    Page01Component,
    Page02Component,
    ChildComponent
  ],
  imports: [  //外部@NgModuleで定義されたモジュール
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ //DIするサービス
    CalcService,
    StoreService,
    CounterService
  ],
  bootstrap: [MainComponent] //アプリ起動時コンポーネント
})
export class AppModule {
}
