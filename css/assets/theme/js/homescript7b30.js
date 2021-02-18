
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-104491755-1', 'auto');
  ga('send', 'pageview');

  function CounterNumberChanger () {
  var timer = $('.timer');
  if(timer.length) {
	var element = document.createElement("script");
	element.src = "assets/web/assets/jquery/jquery.countTo.js";
	document.body.appendChild(element);
	timer.appear(function () {
	  $('.count-number').data('countToOptions', {
		formatter: function (value, options) {
		  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
		}
	  });
	  // start all the timers
	  $('.timer').each(count);
	  function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	  }
	})
  }
  setTimeout(function(){ $('#newsletter').modal('show') }, 2000);
}

$(document).ready(function() {

	setInterval(prealoader, 400);
	CounterNumberChanger ();
	 $("label").click(function() {
		var labelID = $(this).attr('for');
		$(this).hide();
		document.getElementById(labelID).style.height = "100%";
		 $('label[for=' + labelID + ']').hide();
	});

	if($('#features-special').length) {
	 $('#features-special').appear(function () {
		//flipbox
			setInterval(function() {
			$( '.flipbox :first-child' ).addClass( 'flip-first' );
			$( '.flipbox :nth-child(2)' ).addClass( 'flip-second' );
			setTimeout(function() {
			$( '.flipbox :nth-child(2)' ).removeClass( 'flip-second' );
			$( '.flipbox :last-child' ).prependTo( '.flipbox' );
			$( '.flipbox :nth-child(2)' ).removeClass( 'flip-first' );
			}, 1500 )
		}, 2500 );
		//flipbox
		$("#content-full").fadeIn();
	})
	};

	// Loop selectors
var videos = document.querySelectorAll(".youtube");
for (var i=0; i<videos.length; i++) {
  var youtube = videos[i];
  // Get function
  getVideos(youtube);
}

// Get videos function
function getVideos(el){
  var img = document.createElement("img");
  // Get images
  img.setAttribute('src', 'https://www.ilmgroups.com/assets/images/youtube-thumbnail.jpg?v=1');
  // Add class to img
  img.setAttribute('class', 'thumb');
  // Make div to embed videos
  var video = document.createElement("div");
  // Remove this if you like
  video.setAttribute("class","video_here");
  // Insert tags
  el.appendChild(img);
  el.appendChild(video);
  // On click get video
  el.addEventListener('click',function(){
    var iframe = document.createElement("iframe");
    iframe.setAttribute('class','youtube_video ');
    iframe.setAttribute('src','https://www.youtube.com/embed/'+
    this.id +'?autoplay=1&autohide=1&border=0&wmode=opaque&modestbranding=1&controls=0&enablejsapi=1');
    // Remplace img for video
    this.parentNode.replaceChild(iframe, this);
  },false);
}



	if($('#features-client').length) {
		var element = document.createElement("script");
		element.src = "assets/owlcarousel/owl.carousel.min.js";
		document.body.appendChild(element);
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		window.fbAsyncInit = function() {
		   FB.init({
			  appId      : '970267749755472', status     : true, cookie     : true, version    : 'v2.6', xfbml      : true, oauth		 : true
		   });
			FB.Canvas.setSize({height:200});
			setTimeout("FB.Canvas.setAutoGrow()",200);
		};

	 $('#features-client').appear(function () {
		$("#client-row").fadeIn();
		$('.owl-carousel-load').owlCarousel({
			loop: true,
			margin: 10,
			/* lazyLoad:true, */
			autoplay:true,
			autoplaySpeed:1100,
			responsiveClass: true,
			dots: false,
			pagination: false,
			nav: false,
			responsive: {
			  0: 	{	items: 1	},
			  600: 	{	items: 2	},
			  1000: {	items: 3	}}
		});
	})
	};

	$('.mbr-gallery-item').on('click', function () {
		var element = document.createElement("script");
		element.src = "assets/owlcarousel/owl.carousel.min.js";
		document.body.appendChild(element);
	$('.vidcarousel').owlCarousel({
		loop: true,
		margin: 10,
		autoplay:true,
		autoplayHoverPause:true,
		responsiveClass: true,
		autoplaySpeed:800,
		dots: false,
		pagination: false,
		nav: true,
		responsive: {
			  0: 	{	items: 1	},
			  600: 	{	items: 3	},
			  1000: {	items: 3	}}
	  });
		document.getElementById('ypt_thumbs').innerHTML='<div id="loaderdiv" style="text-align: center;"><img style="width:auto;" src="assets/images/379.gif" ></div>';
		var vidtype = $(this).attr('data-vidtype');
		var viddesc = $(this).attr('data-desc');
		document.getElementById("vidtype-title").innerHTML = vidtype;
		document.getElementById("vidtype-desc").innerHTML = viddesc;
		downloadJSAtOnload();
	});

});

function submitCForm(){
	var reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
	var reg_url = /\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i;
	var c_name = $('#c_name').val();
	var c_email = $('#c_email').val();
	var c_phone = $('#c_phone').val();
	var c_msg = $('#c_msg').val();
	if(c_name == '' ){
		$('.contactMsg').html('<span style="color:rgb(221, 160, 216);">Please enter your name / company name.</p>');
		$('#c_name').focus();
	return false;}else if(c_email.trim() == '' ){
		$('.contactMsg').html('<span style="color:rgb(221, 160, 216);">Please enter your email.</p>');
		$('#c_email').focus();
	return false;}else if(c_email.trim() != '' && !reg.test(c_email)){
		$('.contactMsg').html('<span style="color:rgb(221, 160, 216);">Please enter valid email.</p>');
		$('#c_email').focus();
	return false;}else if(c_msg == '' ){
		$('.contactMsg').html('<span style="color:rgb(221, 160, 216);">Please enter your inquiries.</p>');
		$('#c_msg').focus();
	return false;}else{
		$.ajax({
			type:'POST',
			url:'contact_form.php',
			data:'contactFrmSubmit=1&c_name='+c_name+'&c_email='+c_email+'&c_phone='+c_phone+'&c_msg='+c_msg,
			beforeSend: function () {
				$('.contactMsg').html('<img id="loader-img" alt="" src="assets/images/form-loader.gif" height="20" align="center" /> <span style="color:#ec5857">Sending</span>');
				$('#contactBtn').attr("disabled","disabled");
			},success:function(msg){
				if(msg == 'ok'){
					$('#contact_success').html('Dear '+c_name+', thank you for your inquiry, we\'ll get back to you soon.');
					$('#contact_success').removeAttr("hidden");
					$('.contactMsg').html('<span style="color:rgb(190, 119, 184)">Sent.</span>');
					$("#contact-form")[0].reset();
					$('#contactBtn').removeAttr("disabled");
				}else{
				$('.contactMsg').html('<span style="color:rgb(221, 160, 216);">Some problem occurred, please try again.</span>');
				$('#contactBtn').removeAttr("disabled");}
				$('#contactBtn').removeAttr("disabled");
			}
		});
	}
}
