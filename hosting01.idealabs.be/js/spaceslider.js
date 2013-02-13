
	
var slideshowSpeed = 4000;
var photos = [
{	
	"title" : "Coffeelabs",
	"subtitle" : "Coffeebar / Coworking",
	"image" : "floor0.png",
	"floor" : "1st"
}, {
	"title" : "2nd floor",
	"subtitle" : "Event and workshop area",
	"image" : "floor2.png",
	"floor" : "2nd"			
}, {
	"title" : "3rd floor",
	"subtitle" : "Accelerator Area",
	"image" : "floor3.png",
	"floor" : "3rd"			

}

	//Room for more floors, if any
];

	
$(document).ready(function() {
	var images = new Array();
	preload(photos);
			
	var interval;
	$("#control").toggle(function(){
		stopAnimation();
	}, function() {

		// Show the next image
		navigate("next");
		
		// Start playing the animation
		interval = setInterval(function() {
			navigate("next");
		}, slideshowSpeed);
	});
	
	
	var activeContainer = 1;	
	var currentImg = 0;
	var animating = false;
	
	var navigate = function(direction) {
		// Check if no animation is running. If it is, prevent the action
		if(animating) {
			return;
		}
		
		// Check which current image we need to show
		if(direction == "next") {
			currentImg++;
			if(currentImg == photos.length + 1) {
				currentImg = 1;
			}
		} else {
			currentImg--;
			if(currentImg == 0) {
				currentImg = photos.length;
			}
		}
		
		// Check which container we need to use
		var currentContainer = activeContainer;
		if(activeContainer == 1) {
			activeContainer = 2;
		} else {
			activeContainer = 1;
		}
		
		showImage(photos[currentImg - 1], currentContainer, activeContainer);
		
	};
	
	function preload (photos) {
		for (i = 0; i < photos.length; i++) {
			images[i] = new Image();
			images[i].src = "images/_space/" +photos[i].image;
		}
	}
	
	
	var currentZindex = -1;
	var floorList = $("ul.floor-list").find('li');
	
	$(floorList).click(function(goToFloor){
		switch($(this).attr('tag')){
			
			case '1st':
				showImage(photos[currentImg = 0], currentContainer = 1, activeContainer = 2);
				break;
			
			case '2nd':
				showImage(photos[currentImg = 1], currentContainer = 2, activeContainer = 1);
				break;
				
			case '3rd':
				showImage(photos[currentImg = 2], currentContainer = 2, activeContainer = 1);
				break;
				
			case '4th':
				showImage(photos[currentImg = 3], currentContainer = 4, activeContainer = 1);
				break;
		}	
		
	});
	
		
	
	var showImage = function(photoObject, currentContainer, activeContainer) {
		animating = true;
		
		// Make sure the new container is always on the background
		currentZindex--;
		
		var background = "url('images/_space/" + photoObject.image + "')";
		
		// Set the background image of the new active container
		$("#spaceimg" + activeContainer).css({
			"background-image" : background,
			"display" : "block",
			"z-index" : currentZindex
		});
		
		//console.log(background + 'photos = ' + photoObject + 'currentContainer = ' + currentContainer + 'activeContainer = ' + activeContainer );
		
		floorList.removeClass('active');
		
		$(floorList).each(function(i){
			//console.log($(this).text());
			//console.log($(this).attr('tag'));
			var currentFloor = $(this).attr('tag') == photoObject.floor;
			if( currentFloor == true){
				$(this).addClass('active');
				
			}
		});
		
	
		// Hide the slider-content
		$("#slider-content").css({"display" : "none"});
		
		// Set the information in slider-content (Floor information)
		$("#floor-title").html(photoObject.title);
		$("#floor-subtitle").html(photoObject.subtitle);
		
		
		// Fade out the current container
		// and display the header text when animation is complete
		$("#spaceimg" + currentContainer).fadeOut(function() {
			setTimeout(function() {
				$("#slider-content").css({"display" : "block"});
				animating = false;
			}, 500);
	
		});
	};
	
	
	
	
	// Set the first image
	navigate("next");
	
	// Start playing the animation
	interval = setInterval(function() {
		navigate("next");
	}, slideshowSpeed);
	
});