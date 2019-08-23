import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {HttpService} from './http.service';
import {CarouselModule, CollapseModule, ModalModule} from 'ngx-bootstrap';
import {DetailComponent} from './detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
