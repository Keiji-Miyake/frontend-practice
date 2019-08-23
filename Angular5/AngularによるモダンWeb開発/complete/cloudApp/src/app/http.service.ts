//ｰｰｰｰｰｰｰ-------------------
// 通信処理
//ｰｰｰｰｰｰｰ-------------------
import {Injectable} from '@angular/core';
import {HttpParams, JsonpClientBackend, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface TourData {
  error: string;
  data: string;
}

@Injectable()
export class HttpService {

  //Web API URL
  WEB_API_URL = 'https://webservice.recruit.co.jp/ab-road/tour/v1/';
  //APIキー
  API_KEY = '■入手したAPIキー■';
  //取得件数
  DEFAULT_SIZE = '30';
  //取得の順番(人気順:5)
  SORT_RANKING = '5';
  //JSONPコールバック関数名(Angular固有値）
  CALLBACK = 'JSONP_CALLBACK';

  constructor(private jsonp: JsonpClientBackend,
              private http: HttpClient) {
  }

  //クラウドからツアー情報取得
  getTourData(areaCode: string): Observable<TourData> {
    //接続設定
    let config = this.setParam(areaCode);
    //データ取得
    return this.reqData(config);
  }

  //通信設定値作成
  setParam(areaCode: string): HttpParams {
    //Urlパラメータオブジェクト作成
    return (new HttpParams())
      .set('key', this.API_KEY)
      .set('area', areaCode)
      .set('order', this.SORT_RANKING)
      .set('count', this.DEFAULT_SIZE)
      .set('format', 'jsonp')
      .set('callback', this.CALLBACK);
  }

  //HTTPリクエストとレスポンス処理
  reqData(config): Observable<TourData> {
    let url = this.WEB_API_URL + '?' + config.toString();
    return this.http.jsonp<{ results: any }>(url, this.CALLBACK)
      .map(res => {
          let tourData;
          if (res.results.error) {
            //Web APIリクエスト失敗
            let err = res.results.error[0];
            tourData = {
              error: err.code,
              data: err.message
            };
          } else {
            //Web APIリクエスト成功
            let dataObj = res.results.tour;
            tourData = {
              error: null,
              data: dataObj,
            };
          }
          console.dir(tourData);
          return tourData;
        }
      );
  }

}

