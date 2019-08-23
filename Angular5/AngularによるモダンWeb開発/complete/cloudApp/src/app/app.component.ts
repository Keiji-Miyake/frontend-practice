import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {HttpService, TourData} from './http.service';
import {DetailComponent} from './detail.component';
import {ViewContainerRef, ViewChild} from '@angular/core';
import {HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //ツアー明細ダイアログの参照取得
  @ViewChild('detailDialog') detailComponent: DetailComponent;

  tourObj; //選択したツアー情報(１件分）
  selectedData; //選択したエリアのツアー情報
  bookmarks; //ブックマーク
  isMobile = false; //PCとモバイルの判定
  MOBILE_SCREEN_WIDTH = 768; //モバイル判定画面幅
  isCollapsed = false;
  areas = [ //３エリアの全データ
    {code: 'BCH', name: 'ビーチリゾート', data: null},
    {code: 'EUR', name: 'ヨーロッパ', data: null},
    {code: 'DUS', name: 'アメリカ', data: null},
    {code: 'BOOKMARK', name: 'お気に入り', data: null},
  ];
  viewContainerRef; //modal 表示用

  public constructor(private httpService: HttpService,
                     viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  //アプリ起動時の処理
  ngOnInit() {
    //クラウドからツアー情報取得
    this.getTour();
    //保存したブックマークの取得
    this.initBookmarks();
    //PCとモバイルデバイスの判定
    this.onScreenResize();
  }

//3エリアのツアー情報を一括受信
  getTour() {
    this.selectedData = null;
    for (let i = 0; i < this.areas.length; i++) {
      let areaCode = this.areas[i].code;
      if (areaCode === 'BOOKMARK') { //お気に入りはローカル保存のため受信不要
        continue;
      }
      this.httpService.getTourData(areaCode)
        .subscribe(
          result => this.setTour(result, i), //通信成功時の処理
          error => alert('通信エラー\n' + error.message) //通信失敗時の処理
        );
    }
  }

  //受信データの表示
  setTour(result: TourData, i: number) {
    //Web APIデータ取得エラー発生時
    if (result.error) {
      alert('Web APIエラー\n' + result.data);
      return;
    }
    //Web APIデータ取得成功時
    this.areas[i].data = result;
  }

  //エリアメニュー選択時
  onAreaChange(index) {
    let area = this.areas[index];
    //ブックマーク選択時
    if (area.code === 'BOOKMARK') {
      if (Object.keys(this.bookmarks).length === 0) {
        alert('ブックマークが登録されていません');
        return;
      }
      this.selectedData = Object.keys(this.bookmarks)
        .map(key => this.bookmarks[key]);
    } else {
      //エリア名選択時
      this.selectedData = area.data.data;
    }
    //スクロール位置をリセット(一部のブラウザはタイマーから呼び出しが必要）
    setTimeout(scroll(0, 0), 1);
  }


  //保存したブックマーク情報の読み取り
  initBookmarks() {
    let storeData = localStorage.getItem('bookmarks');
    if (storeData) {
      this.bookmarks = JSON.parse(storeData);
    } else {
      this.bookmarks = {};
    }
  }

  //ブックマークボタンのクリック時
  onBookmarkClick(tourID, index) {
    //登録が無い場合はブックマーク情報に追加
    if (!this.isMarked(tourID)) {
      //登録件数の確認
      if (Object.keys(this.bookmarks).length === 10) {
        return alert('Bookmarkは最大10件です');
      }
      //登録
      this.bookmarks[tourID] = this.selectedData[index];
    } else {
      //登録済みの場合はブックマーク情報から削除
      delete this.bookmarks[tourID];
    }
    //更新されたブックマーク情報の保存
    localStorage.setItem(
      'bookmarks', JSON.stringify(this.bookmarks));
  }

  //ブックマーク登録済み確認
  isMarked(tourID) {
    return this.bookmarks[tourID];
  }

  //ツアー詳細ボタンクリック時
  onDetailClick(index) {
    this.tourObj = this.selectedData[index];
    this.detailComponent.openDialog();
  }

  // resizeイベント
  @HostListener('window:resize')
  onScreenResize() {
    this.isMobile = (innerWidth < this.MOBILE_SCREEN_WIDTH);
  }

}
