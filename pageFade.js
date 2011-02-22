(function($) {

		$.fn.pageFade = function( direction , speed , callback ) {

			var	defaults = {
				direction: ( direction ? direction : 'out' ),
				speed	 : ( speed ? speed : 1000 ),
				callback : ( typeof callback == 'function' ? callback : null )
			}

			var options = $.extend( {}, $.fn.pageFade.settings, defaults ),
				o = options;

			// Internals
			
			var direction = o.direction,
				// make sure the callback is actually a function
				callback = o.callback,
				content	= $(o.pageWrapper),
				shade 	=   $("<div />", {
								'id' : o.shadeId.replace('#',''),
								'css': {
									'position':'absolute',
									'top':0,
									'left':0,
									'width':'100%',
									'height':'100%',
									'background-color': o.shadeColor,
									'z-index':'-1'
								}
							});
					
			// do stuff
			if ( o.direction == 'out' ) { 

				// fade out of content then next page
				$(shade)
					.appendTo('body').hide();

				content.css({
					'position':'absolute',
					'top': content.offset().top - content.css('padding-top'),
					'left': content.offset().left
				})
				.animate({
					'top':'-'+content.outerHeight(true)+'px'
				}, o.speed , function() { 
					$(shade).fadeIn( o.speed , callback );
				});
		
			} else {
		
				// on next page fade in the content (would be fired on load)
				content.hide();
				$(shade)
					.appendTo('body').show();
				$(shade).fadeOut( o.speed*1.5 , function() {
					content.fadeIn( o.speed , callback );
				} );
		
		
			}
	
		} // pageFade()
		

		// defaults
		$.fn.pageFade.settings = {
			pageWrapper	: '#main',
			shadeId		: '#shade',
			shadeColor	: '#fff',
			direction	: 'out',
			speed		: 1000
		};
		
})(jQuery);