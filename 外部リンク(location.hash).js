// スティッキーヘッダーなど
// 固定があると、ページ内リンクがずれることがある。
// それをロードした時にhashがあったら、
// スティッキーヘッダー分マイナスに移動させるjs

(function($) {
  $(function() {
    $(window).load(function() {
      if(location.hash !== "") {
        var offSet = $(location.hash).offset().top;
        $('body,html').animate({scrollTop:offSet - 58});
      }
     });
  });
})(jQuery);

