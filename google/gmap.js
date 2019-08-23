jQuery(function($){
	//google maps
	google.maps.event.addDomListener(window,'load',function(){
		var latlng = new google.maps.LatLng(35.781167, 140.211805);
		var mapOptions = {
			zoom: 14,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false
		};
		var mp = new google.maps.Map(document.getElementById('map'), mapOptions);
		// マーカー設置
		var marker = new google.maps.Marker({
			position: latlng,
			map: mp
		});
	});
});
