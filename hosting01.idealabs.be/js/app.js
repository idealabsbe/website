// Scripted By Matthias deckx -> http://matthiasdeckx.be & Emiel Masyn

$(document).ready(function(){
	
	getCreativeSkills();	
	getTweets();
	getFacebook();
	console.log("www");
	var d = new Date();
	var n = d.getDay();
	
	$(".opening-hours li").each(function(i,k){
		if (0 == n) { n = 7; }
		if (i == n-1) {
			$(k).addClass('active');
		}
	});
	$('.intro','.title-class','.title-event').addClass('shown');
	
	// If device is larger than 768px, toggle the header hide/show animation
	/*if(!Modernizr.mq('handheld, only screen and (max-width: 768px)')){
		
			$(window).scroll(function(){
			if($(window).scrollTop() > 0){
				$('#header').addClass('ishidden');
			}else if($(window).scrollTop() == 0){
				$('#header').removeClass('ishidden');
			}
		});
		
		$('#header').hover(function(){
			if($(this).hasClass('ishidden')){
				$(this).removeClass('ishidden');
			}	
		});
		
	}	
	*/
	

	// Enable tabs
	if ($('#tabs')[0]){
		$('#tabs').tabs();
	}
	
	
	// Smooth scrolling
	$('.scroll-link').click(function(e){
		var location = $(e.currentTarget).attr('href');
		$.scrollTo(location, 600);
		e.preventDefault();
	});
	
	// Show more events
	$('.btn.events').click(function(e){
		$('.moreevents').fadeIn("fast").css({"display" : "block"});
	});
	
	// CreativeSkills API
	
	function getCreativeSkills(){
	
		$.get('http://www.creativeskills.be/json/freelance_all.js', function(data) {
			$.each(data.listings, function(index, element) {
				//if(element.company == 'Octopin' || element.company == 'HSHMRK' ) {
				if (index < 3) {
					var html = "<a href='" + element.url + "' target='_blank'><li><h2>" + element.title;		
					html +=  "</h2> &nbsp; <p>" + element.company + "<span class='bold'> (" + element.location  + ')</span></p></li></a>';
					
					$('#creativeskills').append(html);	
				}	
			});
		}, 'jsonp');
	}
	
	// Twitter API
	function getTweets(){	
	
		$.ajax({
		  url: 'https://api.twitter.com/1/statuses/user_timeline.json?screen_name=idealabs_BE&count=3&callback=?',
		  dataType: 'json',
		  success: function(data){		  	
		    $.each(data, function(i,item){
		      tweet = item.text;
	
		      mytime = item.created_at;
		      var strtime = mytime.replace(/(\+\S+) (.*)/, '$2 $1')
		      var mydate = new Date(Date.parse(strtime)).toLocaleDateString();
		      
		      tweet = tweet.replace(/http:\/\/\S+/g,  '<a href="$&" target="_blank">$&</a>');
		      twitterURL = "http://twitter.com/";
		      tweet = tweet.replace(/\s(@)(\w+)/g,    ' @<a href="'+twitterURL+'$2">$2</a>');
		      tweet = tweet.replace(/\s(#)(\w+)/g,    ' #<a href="'+twitterURL+'search?q=%23$2" target="_blank">$2</a>');
		      
		      $("#jstweets").append('<li><p><span class="date">' + mydate + ' - </span>' + tweet + ' </p></li>');
		      
		    });
		  }
		});
		
	}
	
	
	// Facebook API
	function getFacebook(){ 
	
			/* Dit voor in PHP:
			$app_id = "537082852976072";
			$app_secret = "03f68923d65b95b96efe547b5771f4c4";
			*/
			$.ajax({
				url: 'https://graph.facebook.com/idealabsbe/feed?fields=message,likes,comments,link,created_time&limit=3&access_token=406116456140342|nI0zbs5Nbf9s5AL1kyeyiV8Y_g8',
				dataType: 'json',
				success: function(data){
					$.each(data.data,function(i,fb){
						mytime = fb.created_time;
						var strtime = mytime.replace(/(\+\S+) (.*)/, '$2 $1')
						var d = strtime.split(/[^0-9]/);
		      			var mydate = new Date (d[0],d[1]-1,d[2],d[3],d[4],d[5]).toLocaleDateString();
		      			
						var link = '';
						if (fb.link) {
							var caption = fb.link;
							caption = caption.replace(/.*?:\/\//g, "");
							caption = caption.replace("www.", "");
							link = '<a href="'+fb.link+'" target="_blank">'+caption.substring(0, 25)+'...</a>';
						}
						if (fb.message) {
							var message = '<span class="date">'+ mydate +' - </span>'+ fb.message +' '+link;
							var html = "<li><p>" + message + "</p></li>";
							$('#facebookfeed').append(html);
						}
					});
				}
			});		
			
	}
	
});

var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-33039024-1']); _gaq.push(['_trackPageview']);
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();