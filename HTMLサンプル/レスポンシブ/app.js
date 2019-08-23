'use strict';
var $win = $(window),
$mediaQueries = $('#js-mediaQueries'),
widthStatus = '';

(function ($) {
  $win.on('load resize', function() {
      var fontFmaily = $mediaQueries.css('font-family').replace(/"/g, '');

      if (fontFmaily === 'pc' && widthStatus != 'pc') {
          // PCの処理
          console.log('pc');
          widthStatus  = 'pc';
      } else if (fontFmaily === 'tab' && widthStatus != 'tab') {
          // TABの処理
          console.log('tab');
          widthStatus  = 'tab';
      } else if (fontFmaily === 'sp' && widthStatus != 'sp') {
          // SPの処理
          console.log('sp');
          widthStatus  = 'sp';
      }
  });
})(jQuery);

/* UA判定、PCの場合は電話番号のリンクを無効化
---------------------------------------*/
(function($) {
  $(function() {
    var md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile() !== null) {
      return;
    }
    $('a.js-disableTelForDesktops').each(function() {
      $(this).css('pointer-events', 'none');
    });
  });
})(jQuery);
