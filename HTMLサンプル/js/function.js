(function() {
  'use strict';

  var $btns = []; 
  var allElements = targetNode.getElementsByTagName('*');
  for (var i = 0, j = 0; i < allElements.length; i++){
    if (searchNodes[i].className == 'btn'){
      $btns[j] = searchNodes[i];
      j++;
    }
  }

  for( var i = 0; i < $btns.length; i++ ) {
    $btns[i].addEventListener('mousedown', function() {
      this.className = 'btn pushed';
    });
    $btns[i].addEventListener('mouseup', function() {
      this.className = 'btn';
    });
  }
})();