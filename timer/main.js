var time = 10; 
var initialOffset = '280';
var i = 1
var interval = setInterval(function() {
    $('.timer-circle').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
    $('.timer-time').text(10-i);
    if (i == time) { clearInterval(interval); }　// 連続の場合： i=1; 
    i++;  
}, 1000);