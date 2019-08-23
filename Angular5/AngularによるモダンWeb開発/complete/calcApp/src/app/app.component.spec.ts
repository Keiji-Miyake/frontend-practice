import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';

describe('複利計算単体テスト', () => {
  //テスト用コンポーネントのインスタンス
  let component;
  //テストデータ
  let INIT_VALUE = 1000;
  let RATE = 3;
  let RESULT = 1343;
  let ARR_RESULT = [1000, 1030, 1060, 1092, 1125, 1159, 1194, 1229, 1266, 1304, 1343];

  //テストごとの前処理
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [FormsModule] //双方向データバインドに必要
    });
    //デバッグ用コンポーネントのインスタンス取得
    component =
      TestBed.createComponent(AppComponent).componentInstance;

    //localStorageのリセット
    localStorage.clear();

    //コンポーネントのプロパティに値を代入
    component.initValue = INIT_VALUE;
    component.rate = RATE;
  });

  it('10年後の金額計算', async(() => {
    //10年後の計算
    let result = component.calc();
    //結果の評価
    expect(result).toEqual(RESULT);
  }));

  it('年ごとの金額推移', async(() => {
    //年ごとの金額計算
    let arrResult = component.calcArray();
    //結果の評価
    expect(arrResult).toEqual(ARR_RESULT);
  }));

  it('データクリア', async(() => {
    //クリア
    component.clear();
    //結果の評価
    expect(component.initValue).toEqual(0);
    expect(component.rate).toEqual(0);
  }));

  it('データ保存', async(() => {
    //保存
    component.save();
    //読み取り
    component.ngOnInit();
    //結果の評価
    expect(component.initValue).toEqual(INIT_VALUE);
    expect(component.rate).toEqual(RATE);
  }));
});
