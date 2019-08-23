//必要なクラスをインポート
import {browser, element, by} from 'protractor';

export class CalcAppE2ETestPage {

  //元本入力欄(input要素1番目）
  initValueInput = element.all(by.css('input')).get(0);
  //利率入力欄(input要素2番目）
  rateInput = element.all(by.css('input')).get(1);
  //クリアボタン(button要素1番目）
  clearButton = element.all(by.css('button')).get(0);
  //保存ボタン(button要素2番目）
  saveButton = element.all(by.css('button')).get(1);
  //10年後の金額表示エリア(class属性にalertをもつp要素1番目）
  result = element.all(by.css('.alert')).get(0);

  //ルートパスのページを表示
  navigateTo() {
    return browser.get('/');
  }

}
