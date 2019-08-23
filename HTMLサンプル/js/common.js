
//ロールオーバー
$(function(){
     $('a img').hover(function(){
        $(this).attr('src', $(this).attr('src').replace('_off', '_on'));
          }, function(){
             if (!$(this).hasClass('currentPage')) {
             $(this).attr('src', $(this).attr('src').replace('_on', '_off'));
        }
   });
});


//ヘッダ固定
$(function() {
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 80) {
      $('#global_header').addClass('fixed');
        $("#nav_fix").css("left", -$(window).scrollLeft());
    } else {
      $('#global_header').removeClass('fixed');
        $("#nav_fix").css("left", '0');
    }
  });
});


//アコーディオンメニュー - 言語選択SP版
$(function() {
     $("#langBtn").click(function() {
          $("#modalLang").fadeIn();
          pointY = $(window).scrollTop();
          $('body').css({
          'position': 'fixed',
          'width': '100%',
          'top': -pointY
          });
     });
     $("#langBtnClose,#modalLang").click(function() {
          $("#modalLang").fadeOut();
          $('body').css({
          'position': 'relative',
          'width': '',
          'top': ''
          });
     $(window).scrollTop(pointY);
     });
});
//アコーディオンメニュー - メニューSP版
$(function() {
     $("#menuBtn").click(function() {
           $("#modalMenu").fadeIn();
     });
     $("#menuBtnClose").click(function() {
          $("#modalMenu").fadeOut();
     });
});


//アコーディオンメニュー - 本文
$(function(){
        $(".acMenu li.acMenuTitle").on("click", function() {
            $(this).next().slideToggle();
            $(this).toggleClass("active");
        });
    });


//タブメニュー
$(function(){
        $("#tabMenu li a").on("click", function() {
            $("#tabBoxes div").hide();
            $($(this).attr("href")).fadeToggle();
            $("#tabMenu li a").removeClass("active");
            $(this).toggleClass("active");
        });
        return false;
    });


//時刻表アコーディオン
var accordion_menu = (function() {
    var timer = null;
    var offset_top1;
    function checkMobile() {
        if (window.matchMedia( "(min-width: 768px)" ).matches) {
            return true;
        } else {
            return false;
        }
    }
    
    function checkWidth() {
        var menu_title = $("dt");
        var menu_body = $("dd");
        $(".panel_title").off("click");

	    if (checkMobile()) {
            menu_body.attr("class", "pc_panel_body").css("display", "block");
            menu_title.attr("class", "pc_panel_title");
            var menu_icon = menu_title.find("i");
            menu_icon.removeAttr("class");
        } else {
            menu_body.attr("class", "panel_body").css("display", "none");
            menu_title.find("i").attr("class", "icon-chevron-down");
            menu_title.attr("class", "panel_title");
            $(".panel_title").on("click", function() {
                var menu_icon = $(this).find("i");
                if($(this).next().css("display") === "block") {
                    $(this).next().slideUp();
                    menu_icon.attr("class", "icon-chevron-down");
                } else {
                    $(this).next().slideDown();
                    menu_icon.attr("class", "icon-chevron-up");
    			}
            });
        }
    }
 
    function getResize() {
        try {
            window.addEventListener("resize", function() {
                if (checkMobile()) {
                    changeStyle();
                }
            }, false);
        } catch(e) {
            window.attachEvent("resize", function() {
                if (checkMobile()) {
                    changeStyle();
                }
           });
        }
    }

    function changeStyle() {
        clearTimeout(timer);
        timer = setTimeout(function() {
		    checkWidth();
        }, 200);
    } 

    return {
        checkWidth: checkWidth,
        getResize: getResize,
        init: function() {
            window.onload = function() {
                checkWidth();
                getResize();
            }
        }
     };
})();
 
accordion_menu.init();


//pagetopボタンフェード
$(function() {
    var topBtn = $('.pagetop');    
    topBtn.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});


//iPad調整
$(function(){
    // setViewport
    spView = 'width=device-width,initial-scale=0.5,user-scalable=0';
    tbView = 'width=1200px,user-scalable=1';
 
    if(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)){
        $('head').prepend('<meta name="viewport" content="' + spView + '" id="viewport">');
    } else if(navigator.userAgent.indexOf('iPad') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') == -1) || navigator.userAgent.indexOf('A1_07') > 0 || navigator.userAgent.indexOf('SC-01C') > 0){
        $('head').prepend('<meta name="viewport" content="' + tbView + '" id="viewport">');
    } 
});


//高さ調整
$(function() {
    $(".fixHeight").heightLine({
        minWidth:768
    });
    $(".fixHeight2").heightLine({
        minWidth:768
    });
    $(".fixHeight3").heightLine({
        minWidth:768
    });
});
