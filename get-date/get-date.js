/**************************************************

	JavaScriptで日時を取得する

**************************************************/
//DOMの読み込み完了後に実行
window.onload = function(){

//変数名の衝突を避けるため、即時関数にする
(function(){

	//日時オブジェクトを作成
	var nObj = new Date();

	//日時 (先頭に0が付かない)
	var year = nObj.getFullYear();			//年
	var month = nObj.getMonth() + 1;		//月
	var date = nObj.getDate();					//日
	var hour = nObj.getHours();					//時
	var minute = nObj.getMinutes();			//分
	var second = nObj.getSeconds();			//秒

	//日時 (1桁の場合、先頭を0埋めにする)
	var month2 = add0( (nObj.getMonth() + 1) );	//月
	var date2 = add0( nObj.getDate() );					//日
	var hour2 = add0( nObj.getHours() );				//時
	var minute2 = add0( nObj.getMinutes() );		//分
	var second2 = add0( nObj.getSeconds() );		//秒

	//曜日 (日本語)
	var weekDayJP = ["日","月","火","水","木","金","土"];
	var wDJ = weekDayJP[nObj.getDay()];

	//曜日 (英語)
	var weekDayEN = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	var wDE = weekDayEN[nObj.getDay()];

	//0埋めで2桁にする関数
	function add0(str){
		return ("0" + str).substr(-2);
	}

	//テキストフォームに出力
	var tDate = year + "年" + month + "月" + date + "日" + "(" + wDJ + ")" + " " + hour + "時" + minute + "分" + second + "秒";
	document.getElementById("date").value = tDate;

	//テキストフォームに出力 (先頭を0埋め)
	var tDate2 = year + "年" + month2 + "月" + date2 + "日" + "(" + wDE + ")" + " " + hour2 + "時" + minute2 + "分" + second2 + "秒";
	document.getElementById("date2").value = tDate2;

})();

}

