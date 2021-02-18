
  
var tag = document.createElement('script'); //Add a script tag
tag.src = "https://www.youtube.com/iframe_api"; //Set the SRC to get the API
var firstScriptTag = document.getElementsByTagName('script')[0]; //Find the first script tag in the html
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); //Put this script tag before the first one

var player; //The Youtube API player
var ypt_player = document.getElementById('player');
var playlistID = ypt_player.getAttribute('data-pl');
var ypt_thumbs = document.getElementById('ypt_thumbs');
var nowPlaying = "ypt-now-playing"; //For marking the current thumb
var nowPlayingClass = "." + nowPlaying;
var ypt_index = 0; //Playlists begin at the first video by default


//Once the Youtube Iframe API is ready...
window.onYouTubeIframeAPIReady = function() { // Creates an <iframe> (and YouTube player) after the API code downloads. must be globally available
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    playerVars:
    {
      listType:'playlist',
      list: playlistID,
	  suggestedQuality: 'large',
	    modestbranding : '1',
	  rel : '0',
	  disablekb : '0',
	  autoplay : '0'
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
	   'onError': onError
    }
  });
  
	 function onError(event) {
		console.log (event);
	}
	
  // When the player does something...
  function onPlayerStateChange(event) {
	
	document.getElementById('pauseclose').onclick = function() {
		player.pauseVideo();
		player.stopVideo();

	};
	
    //Let's check on what video is playing
    var currentIndex = player.getPlaylistIndex();
    var the_thumbs = ypt_thumbs.getElementsByTagName('li');
    var currentThumb = the_thumbs[currentIndex];

    if (event.data == YT.PlayerState.PLAYING) { //A video is playing

      for (var i = 0; i < the_thumbs.length; i++) { //Loop through the thumbs
        the_thumbs[i].className = ""; //Remove nowplaying from each thumb
      }

      currentThumb.className = nowPlaying; //this will also erase any other class belonging to the li
      //need to do a match looking for now playing
    }

    //if a video has finished, and the current index is the last video, and that thumb already has the nowplaying class
    if (event.data == YT.PlayerState.ENDED && currentIndex == the_thumbs.length - 1 && the_thumbs[currentIndex].className == nowPlaying){
      jQuery.event.trigger('playlistEnd'); //Trigger a global event
    }
  } //function onPlayerStateChange(event)

  //When the user changes the window size...
 /*  window.addEventListener('resize', function(event){
    yptThumbHeight(); //change the height of the thumblist
  });
 */
  //When the user clicks an element with a playlist index...
  jQuery(document).on('click','[data-ypt-index]:not(".ypt-now-playing")',function(e){ //click on a thumb that is not currently playing
    ypt_index = Number(jQuery(this).attr('data-ypt-index')); //Get the ypt_index of the clicked item
    if(navigator.userAgent.match(/(iPad|iPhone|iPod)/g)){ //if IOS
      player.cuePlaylist({ //cue is required for IOS 7
        listType: 'playlist',
        list: playlistID,
        index: ypt_index,
        suggestedQuality: 'hd720' //quality is required for cue to work, for now
        // https://code.google.com/p/gdata-issues/issues/detail?id=5411
      }); //player.cuePlaylist
    } else { //yay it's not IOS!
    player.playVideoAt(ypt_index); //Play the new video, does not work for IOS 7
  }
  jQuery(nowPlayingClass).removeClass(nowPlaying); //Remove "now playing" from the thumb that is no longer playing
  //When the new video starts playing, its thumb will get the now playing class
}); //jQuery(document).on('click','#ypt_thumbs...
};



function getPlaylistData(playlistID, video_list, page_token) { //Makes a single request to Youtube Data API
  var apiKey = 'AIzaSyArQNfmJDkjxP_ZyZIocbyuDeyTanf4Rl8';
  var theUrl =
   'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet' +
  '&maxResults='+ 50 + //Can be anything from 1-50
  '&playlistId=' + playlistID +
  '&key=' + apiKey
  ;
  if(page_token){ theUrl +=('&pageToken=' + page_token );} //If there is page token, start there
  var xmlHttp = null;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, true);
  xmlHttp.send( null );
  xmlHttp.onload = function (e) { //when the request comes back
    buildJSON(xmlHttp.responseText, video_list, playlistID); //send the data to buildJSON
  };
}

function buildJSON(response, list, playlistID){ //Takes the text response and adds it to any existing JSON data
  var results = JSON.parse(response); //Parse it
  if(!list){ list = []; } //If there is no list to add to, make one
  list.push.apply(list,results.items); //Add JSON data to the list
  if(results.nextPageToken){ //If the results included a page token
    getPlaylistData(playlistID, list, results.nextPageToken); //Create another data API request including the current list and page token
  } else { //If there is not a next-page token
    buildHTML(list); //Send the JSON data to buildHTML
  }
}

function buildHTML(data){ //Turns JSON data into HTML elements
  var list_data = ''; //A string container
  for(i = 0; i < 5; i++){ //Do this to each item in the JSON list < data.length;
    var item = data[i].snippet; //Each Youtube playlist item snippet
    if(!item.thumbnails){continue;} //private videos do no reveal thumbs, so skip them
    list_data += '<div class="item"><li data-ypt-index="'+ i +'" ><p>' + item.title + '</p><span><img alt="'+ item.title +'" src="'+ item.thumbnails.medium.url +'"/></span></li></div>'; 
	//create an element and add it to the list
  }
  ypt_thumbs.innerHTML = '<div class="owl-carousel owl-theme vidcarousel">' +list_data+ '</div>'; //After the for loop, insert that list of links into the html
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
}

function onPlayerReady(event) { //Once the player is ready...
 
  $('.mbr-gallery-item').on('click', function () {
	/* document.getElementById('ypt_thumbs').innerHTML='<div id="loaderdiv" style="text-align: center;"><img style="width:auto;" src="assets/images/379.gif" ></div>'; */
	var vidtype = $(this).attr('data-vidtype');
	var viddesc = $(this).attr('data-desc');
	document.getElementById("vidtype-title").innerHTML = vidtype;
	document.getElementById("vidtype-desc").innerHTML = viddesc;
		
	var vidID = $(this).attr('data-video-id');
	var playlistID = $(this).attr('data-pl');

	getPlaylistData(playlistID);
	player.cueVideoById(vidID,0,"large");
	player.cuePlaylist({'listType': 'playlist',
               'list': playlistID,
               'index': 0,
               'startSeconds': 0,
               'suggestedQuality': 'large',
			   'modestbranding' : '1',
				'rel' : '0',
				'disablekb' : '0',
				'autoplay' : '0'});
				
	$('#loaderdiv').remove();		   
	getPlaylistData(playlistID);	
	
	$('#pauseclose').on('click', function () {
		player.pauseVideo();

	});
	
	player.cueVideo(vidID);
	player.play();
	
	});
}



