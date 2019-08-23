(function($) {
  var _click = 'ontouchstart' in window ? 'touchend' : 'click'; // クリックイベントのデバイス切り替え
  var window_mode = '';  // sp or pc
  // スムーズスクロール
  function smoothScroll(windowMode) {
    switch (windowMode) {
      case 'pc': var fixedHeaderHeight = 80; break;
      case 'sp': var fixedHeaderHeight = 55; break;
      default: var fixedHeaderHeight = 0; break;
    }
    $('.js-smoothScroll')
      .off('click.smoothscroll')
      .on('click.smoothscroll', function(e){
        if (location.hostname == this.hostname) {
          var speed = 500;
          var target = $(this.hash == '#' ? 'html' : this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            var position = ($('#js-headerfix').hasClass('active')) ? target.offset().top - fixedHeaderHeight : target.offset().top;
            $("html, body").animate({scrollTop:position}, speed, "swing");
            return false;
          }
        }
      });
  }
  /***************************************************************************
  // PC関数 ヘッダー　スムーススクロール
  ***************************************************************************/
  var func_pc = function() {
    $('#point_header_block').prependTo('.headerTop .right'); // header dアカウント
    smoothScroll('pc');
  };
  /***************************************************************************
  // SP関数 ヘッダー　スムーススクロール 高さ合わせ削除
  ***************************************************************************/
  var func_sp = function() {
    $('#point_header_block').insertAfter('.headerTop'); // header dアカウント
    smoothScroll('sp');
    $('.col-2').find('.js-fitHeight').css('height', ''); // 2列高さ合わせ解除
  };

  /***************************************************************************
  // document ready イベント
  ***************************************************************************/
  $(function() {
    // 読み込み時 window幅判断で表示を変える処理。
    if($('body').css('min-width') === '320px') {
      window_mode = 'sp'; //width: 740px以下の時
      func_sp();
    } else if($('body').css('min-width') != '320px') {
      window_mode = 'pc'; //width: 741px以上の時
      func_pc();
    }

    // アコーディオンボタンの次の要素を表示非表示イベント
    $('.js-acToggle').on(_click, function() {
      var $toggleElm = $(this).next();
      $(this).toggleClass('active').next().toggleClass('open').slideToggle();
    })

    //topPage mainvisual
    if($('body').hasClass('home')) {
      // PC
      $('.mainvisual .spNone .slider').slick({
        appendArrows: $('.mainvisual .spNone .control'),
        appendDots: $('.mainvisual .spNone .control'),
        centerMode: true,
        dots: true,
        variableWidth: true
      });
      // SP
      var spTopVisualSlider = $('.mainvisual .pcNone .slider').slick({
        arrows: false,
        adaptiveHeight: true,
        appendDots: $('.mainvisual .pcNone .control .pager'),
        dots: true,
      });
      $('.mainvisual .pcNone .slick-prev').on(_click, function() {
        spTopVisualSlider.slick('slickPrev');
      });
      $('.mainvisual .pcNone .slick-next').on(_click, function() {
        spTopVisualSlider.slick('slickNext');
      });
    }

    // 外部リンクにtarget="_blank"付与
    $('.js-blank').not('[href*="'+location.hostname+'"]').attr({target:"_blank"}).addClass("blank").removeClass('js-blank');
  });

  $(function(){
    //appDetailPage point slider
    $('.js-appPointSlider').slick({
      dots: true,
    });

    //appDetailPage review sp slider
    if ($('body').css('min-width') == '320px') {
      if($('.apps_entry .reviewList').hasClass('slideOn')){
      }else{
        $('.apps_entry .reviewList').addClass('slideOn');
        $('.apps_entry .reviewList').slick({
          dots: true,
        });
      }
    }else{
      if($('.apps_entry .reviewList').hasClass('slideOn')){
        $('.apps_entry .reviewList').removeClass('slideOn');
        $('.apps_entry .reviewList').slick('unslick');
      }else{
      }
    }
    $(window).resize(function(){
      if ($('body').css('min-width') == '320px') {
        if($('.apps_entry .reviewList').hasClass('slideOn')){
        }else{
          $('.apps_entry .reviewList').addClass('slideOn');
          $('.apps_entry .reviewList').slick({
            dots: true,
          });
        }
      }else{
        if($('.apps_entry .reviewList').hasClass('slideOn')){
          $('.apps_entry .reviewList').removeClass('slideOn');
          $('.apps_entry .reviewList').slick('unslick');
        }else{
        }
      }
    });

    //movie modal
    $('.popup-iframe').magnificPopup({
     type: 'iframe',
     mainClass: 'mfp-fade',
     removalDelay: 200,
     preloader: false
    });

  });


  /***************************************************************************
  // リサイズイベント
  ***************************************************************************/

  $(window).on('resize', function() {
    // pcの時 ********************************
    if($('body').css('min-width') != '320px') {
      // spからの切り替え１回のみ -----------------
      if(window_mode === 'sp') {
        window_mode = 'pc'; //width: 741px以上の時
        func_pc();
        // footerアコーディオン解除
        if($('#footer .js-acToggle').next().is(':hidden')) {
          $('#footer .js-acToggle').next().removeClass('open').css('display', '');
        }
        // トップページ 高さ合わせ
        if($('body').hasClass('home')) {
          $('.appList .box').css('height', '').find('.logo').css('height', ''); // 使えるアプリ解除
        }
      }
      // 常時実行 ----------------------------
      // col-2 js-fitHeightクラスの高さ調整
      $('.col-2').each(function() {
        $(this).find('.js-fitHeight').tile(2);
      });

      // 使えるアプリ 高さ合わせ
      if($('body').hasClass('apps_top') || $('body').hasClass('apps_category')) {
        $('.appsList .box .text').tile(4); // 4列高さ合わせ
      }
      // コラム詳細 高さ合わせ
      if($('body').hasClass('column_entry')) {
        $('.col-4 .box').tile(4); // 4列高さ合わせ
        $('.relationColumn .col-3-2').find('.box').tile(3); // 3列高さ合わせ
      }
    }
    // spの時 ********************************
    else {
      // pcからの切り替え１回のみ ----------------
      if(window_mode === 'pc') {
        window_mode = 'sp';
        func_sp();
        // 使えるアプリ 高さ合わせ
        if($('body').hasClass('apps_top') || $('body').hasClass('apps_category')) {
          $('.appsList .box .text').css('height', ''); //解除
        }
      }
      // 常時実行 ----------------------------
      // トップページ 高さ合わせ
      if($('body').hasClass('home')) {
        $('.appList .box').find('.logo').tile(2).end().tile(2); // 使えるアプリ
      }
      // コラム詳細 高さ合わせ
      if($('body').hasClass('column_entry')) {
        $('.col-4 .box').tile(2); // 2列高さ合わせ
        $('.relationColumn .col-3-2').find('.box').tile(2); // 2列高さ合わせ
      }
    }
  });

  /***************************************************************************
  // ロードイベント
  ***************************************************************************/
  $(window).load(function() {

    //　要素の高さ合わせ　/////////////////////////////////////////////////////////////////
    // pcの時
    if ($('body').css('min-width') != '320px') {
      // col-2 js-fitHeightクラスの高さ調整
      $('.col-2').each(function() {
        $(this).find('.js-fitHeight').tile(2);
      });

      // 使えるアプリ 高さ合わせ
      if($('body').hasClass('apps_top') || $('body').hasClass('apps_category')) {
        $('.appsList .box .text').tile(4); // 4列高さ合わせ
      }
      // コラム詳細 高さ合わせ
      if($('body').hasClass('column_entry')) {
        $('.col-4 .box').tile(4); // 4列高さ合わせ
        $('.relationColumn .col-3-2').find('.box').tile(3); // 3列高さ合わせ
      }
    }
    // spの時
    else {
      // トップページ 高さ合わせ
      if($('body').hasClass('home')) {
        $('.appList .box').find('.logo').tile(2).end().tile(2); // 使えるアプリ
      }
      // コラム詳細 高さ合わせ
      if($('body').hasClass('column_entry')) {
        $('.col-4 .box').tile(2); // 2列高さ合わせ
        $('.relationColumn .col-3-2').find('.box').tile(2); // 2列高さ合わせ
      }
    }


    //common col-2
  	if ($('body').css('min-width') != '320px') {
  		var listCountCol2 = $('.col-2').length;
  		if(listCountCol2){
  			$('.col-2').each(function(n) {
  				$(this).addClass('col-2' + (n+1));
  			});
  			for(i=1;i<=listCountCol2;i++){
  				$('.col-2'+i).find(' > .box').tile(2);
  				$(window).load(function() {
  					$('.col-2'+i).find(' > .box').tile(2);
  				});
  			}
  		}
  	}else{
  		var listCountCol2 = $('.col-2').length;
  		if(listCountCol2){
  			$('.col-2').each(function(n) {
  				$(this).addClass('col-2' + (n+1));
  			});
  			for(i=1;i<=listCountCol2;i++){
  				$('.col-2'+i).find(' > .box').removeAttr('style');
  				$(window).load(function() {
  					$('.col-2'+i).find(' > .box').removeAttr('style');
  				});
  			}
  		}
  	}
  	$(window).resize(function(){
  		if ($('body').css('min-width') != '320px') {
  			var listCountCol2 = $('.col-2').length;
  			if(listCountCol2){
  				$('.col-2').each(function(n) {
  					$(this).addClass('col-2' + (n+1));
  				});
  				for(i=1;i<=listCountCol2;i++){
            $('.col-2'+i).find(' > .box').tile(2);
  				}
  			}
  		}
  		else {
  			var listCountCol2 = $('.col-2').length;
  			if(listCountCol2){
  				$('.col-2').each(function(n) {
  					$(this).addClass('col-2' + (n+1));
  				});
  				for(i=1;i<=listCountCol2;i++){
  					$('.col-2'+i).find(' > .box').removeAttr('style');
  				}
  			}
  		}
  	});

    //common col-3
  	if ($('body').css('min-width') != '320px') {
  		var listCountCol3 = $('.col-3').length;
  		if(listCountCol3){
  			$('.col-3').each(function(n) {
  				$(this).addClass('col-3' + (n+1));
  			});
  			for(i=1;i<=listCountCol3;i++){
  				$('.col-3'+i).find(' > .box').tile(3);
  				$(window).load(function() {
  					$('.col-3'+i).find(' > .box').tile(3);
  				});
  			}
  		}
  	}else{
  		var listCountCol3 = $('.col-3').length;
  		if(listCountCol3){
  			$('.col-3').each(function(n) {
  				$(this).addClass('col-3' + (n+1));
  			});
  			for(i=1;i<=listCountCol3;i++){
  				$('.col-3'+i).find(' > .box').removeAttr('style');
  				$(window).load(function() {
  					$('.col-3'+i).find(' > .box').removeAttr('style');
  				});
  			}
  		}
  	}
  	$(window).resize(function(){
  		if ($('body').css('min-width') != '320px') {
  			var listCountCol3 = $('.col-3').length;
  			if(listCountCol3){
  				$('.col-3').each(function(n) {
  					$(this).addClass('col-3' + (n+1));
  				});
  				for(i=1;i<=listCountCol3;i++){
            $('.col-3'+i).find(' > .box').tile(3);
  				}
  			}
  		}
  		else {
  			var listCountCol3 = $('.col-3').length;
  			if(listCountCol3){
  				$('.col-3').each(function(n) {
  					$(this).addClass('col-3' + (n+1));
  				});
  				for(i=1;i<=listCountCol3;i++){
  					$('.col-3'+i).find(' > .box').removeAttr('style');
  				}
  			}
  		}
  	});


    //common bonusList
  	if ($('body').css('min-width') != '320px') {
  		var listCount = $(".com_bonusList").length;
  		if(listCount){
  			$('.com_bonusList').each(function(n) {
  				$(this).addClass('com_bonusList' + (n+1));
  			});
  			for(i=1;i<=listCount;i++){
  				$('.com_bonusList'+i).find(' > li:not(:first)').tile(2);
  				$(window).load(function() {
  					$('.com_bonusList'+i).find(' > li:not(:first)').tile(2);
  				});
  			}
  		}
  	}else{
  		var listCount = $(".com_bonusList").length;
  		if(listCount){
  			$('.com_bonusList').each(function(n) {
  				$(this).addClass('com_bonusList' + (n+1));
  			});
  			for(i=1;i<=listCount;i++){
  				$('.com_bonusList'+i).find(' > li:not(:first)').removeAttr('style');
  				$(window).load(function() {
  					$('.com_bonusList'+i).find(' > li:not(:first)').removeAttr('style');
  				});
  			}
  		}
  	}
  	$(window).resize(function(){
  		if ($('body').css('min-width') != '320px') {
  			var listCount = $(".com_bonusList").length;
  			if(listCount){
  				$('.com_bonusList').each(function(n) {
  					$(this).addClass('com_bonusList' + (n+1));
  				});
  				for(i=1;i<=listCount;i++){
            $('.com_bonusList'+i).find(' > li:not(:first)').tile(2);
  				}
  			}
  		}
  		else {
  			var listCount = $(".com_bonusList").length;
  			if(listCount){
  				$('.com_bonusList').each(function(n) {
  					$(this).addClass('com_bonusList' + (n+1));
  				});
  				for(i=1;i<=listCount;i++){
  					$('.com_bonusList'+i).find(' > li:not(:first)').removeAttr('style');
  				}
  			}
  		}
  	});

   //apps_entry functionList
    if ($('body').css('min-width') != '320px') {
      var listCount = $(".apps_entry .functionList").length;
      if(listCount){
        $('.apps_entry .functionList').each(function(n) {
          $(this).addClass('functionList' + (n+1));
        });
        for(i=1;i<=listCount;i++){
          $('.functionList'+i).find('li > div').tile(4);
          $(window).load(function() {
            $('.com_bonusList'+i).find('li > div').tile(4);
          });
        }
      }
    }else{
      var listCount = $(".apps_entry .functionList").length;
      if(listCount){
        $('.functionList').each(function(n) {
          $(this).addClass('functionList' + (n+1));
        });
        for(i=1;i<=listCount;i++){
          $('.functionList'+i).find('li > div').removeAttr('style');
          $(window).load(function() {
            $('.functionList'+i).find('li > div').removeAttr('style');
          });
        }
      }
    }
    $(window).resize(function(){
      if ($('body').css('min-width') != '320px') {
        var listCount = $(".apps_entry .functionList").length;
        if(listCount){
          $('.functionList').each(function(n) {
            $(this).addClass('functionList' + (n+1));
          });
          for(i=1;i<=listCount;i++){
            $('.functionList'+i).find('li > div').tile(4);
          }
        }
      }
      else {
        var listCount = $(".functionList").length;
        if(listCount){
          $('.functionList').each(function(n) {
            $(this).addClass('functionList' + (n+1));
          });
          for(i=1;i<=listCount;i++){
            $('.functionList'+i).find('li > div').removeAttr('style');
          }
        }
      }
    });


    //appDetailPage point catch
    if ($('body').css('min-width') != '320px') {
      $('.apps_entry .pointList .box .catch').tile(3);
      $(window).load(function() {
        $('.apps_entry .pointList .box .catch').tile(3);
      });
    }else{
      $('.apps_entry .pointList .box .catch').removeAttr('style');
      $(window).load(function() {
        $('.apps_entry .pointList .box .catch').removeAttr('style');
      });
    }
    $(window).resize(function(){
      if ($('body').css('min-width') != '320px') {
        $('.apps_entry .pointList .box .catch').tile(3);
      }else{
        $('.apps_entry .pointList .box .catch').removeAttr('style');
      }
    });


    //appDetailPage reviewList box
    if ($('body').css('min-width') != '320px') {
      $('.apps_entry .reviewList .box .text').tile();
      $(window).load(function() {
        $('.apps_entry .reviewList .box .text').tile();
      });
    }else{
      $('.apps_entry .reviewList .box .text').removeAttr('style');
      $(window).load(function() {
        $('.apps_entry .reviewList .box .text').removeAttr('style');
      });
    }
    $(window).resize(function(){
      if ($('body').css('min-width') != '320px') {
        $('.apps_entry .reviewList .box .text').tile();
      }else{
        $('.apps_entry .reviewList .box .text').removeAttr('style');
      }
    });

    //appDetailPage columnList box a
    if ($('body').css('min-width') != '320px') {
      $('.apps_entry .columnList .box a').tile();
      $(window).load(function() {
        $('.apps_entry .columnList .box a').tile();
      });
    }else{
      $('.apps_entry .columnList .box a').tile();
      $(window).load(function() {
        $('.apps_entry .columnList .box a').tile();
      });
    }
    $(window).resize(function(){
      if ($('body').css('min-width') != '320px') {
        $('.apps_entry .columnList .box a').tile();
      }else{
        $('.apps_entry .columnList .box a').tile();
      }
    });

    //campaignIndexPage memberCampList textArea
    if ($('body').css('min-width') != '320px') {
      $('.campaign .memberCampList .textArea').tile(2);
      $(window).load(function() {
        $('.campaign .memberCampList .textArea').tile(2);
      });
    }else{
      $('.campaign .memberCampList .textArea').removeAttr('style');
      $(window).load(function() {
        $('.campaign .memberCampList .textArea').removeAttr('style');
      });
    }
    $(window).resize(function(){
      if ($('body').css('min-width') != '320px') {
        $('.campaign .memberCampList .textArea').tile(2);
      }else{
        $('.campaign .memberCampList .textArea').removeAttr('style');
      }
    });

    //campaignIndexPage memberCampList term
    if ($('body').css('min-width') != '320px') {
      $('.campaign .memberCampList .term').tile(2);
      $(window).load(function() {
        $('.campaign .memberCampList .term').tile(2);
      });
    }else{
      $('.campaign .memberCampList .term').removeAttr('style');
      $(window).load(function() {
        $('.campaign .memberCampList .term').removeAttr('style');
      });
    }
    $(window).resize(function(){
      if ($('body').css('min-width') != '320px') {
        $('.campaign .memberCampList .term').tile(2);
      }else{
        $('.campaign .memberCampList .term').removeAttr('style');
      }
    });

    //docomoPickupList box
    if ($('body').css('min-width') != '320px') {
      $('.com_docomoPickupList .box').tile(3);
      $(window).load(function() {
        $('.com_docomoPickupList .box').tile(3);
      });
    }else{
      $('.com_docomoPickupList .box').tile(2);
      $(window).load(function() {
        $('.com_docomoPickupList .box').tile(2);
      });
    }
    $(window).resize(function(){
      if ($('body').css('min-width') != '320px') {
        $('.com_docomoPickupList .box').tile(3);
      }else{
        $('.com_docomoPickupList .box').tile(2);
      }
    });

    //cancel featureList text
    if ($('body').css('min-width') != '320px') {
      $('.cancel .featureList .text').tile(2);
      $(window).load(function() {
        $('.cancel .featureList .text').tile(2);
      });
    }else{
      $('.cancel .featureList .text').removeAttr('style');
      $(window).load(function() {
        $('.cancel .featureList .text').removeAttr('style');
      });
    }
    $(window).resize(function(){
      if ($('body').css('min-width') != '320px') {
        $('.cancel .featureList .text').tile(2);
      }else{
        $('.cancel .featureList .text').removeAttr('style');
      }
    });

  });
})(jQuery);
