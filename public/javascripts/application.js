// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(function() {

	cur = 0;
	appendTo = ['left', 'mid', 'right', 'mid', 'right'];
	colHeight = [1500, 2000, 2000];
	postHeight = 400;
	show = 0;
	
	$('.feed-5 img').each(function() {
		$(this).removeAttr('height').removeAttr('width');
		var $src = $(this).attr('src');
		var $index = $src.indexOf('-thumb');
		var $new_src = $src.substring(0,$index) + '.jpg';
		
		$(this).attr('src',  $new_src.replace("assets_c", "men/images") );
	});

	$("#hide .post").each(function() {
		var $this = $(this);
		
		// Append first image in post to the beginning
		$('em:first', this).after( $('img:first', this).remove().addClass('feat-img') );
		
		// Distribute posts across columns
		if ( $('#'+appendTo[cur]).height() > colHeight[cur] ) {		
			cur++;
			if (cur == 3) { cur = 0; colHeight[0] += colHeight[0]; colHeight[1] += colHeight[1]; colHeight[2] += colHeight[2]; }
		}
		
		// Finally, append to current column
		if ( $this.is('.feed-25,.feed-6') )
			$this.remove().appendTo( '#'+appendTo[(Math.floor(Math.random()*2)+1)] );
		else
			$this.remove().appendTo('#'+appendTo[cur]);
		
		// Cutoff height
		if ($this.find('.post-body').height() > 120)
			$this.find('.post-body').addClass('too-tall').after('<a href="#" class="toggle_full">Full &darr;</a>');
	});
	
	// Resize images
	$('#left img').load(function(){ resizeImage( this, 550 ); });
	$('#mid img').load(function(){ resizeImage( this, 230 ); });
	$('#right img').load(function(){ resizeImage( this, 200 ); });
	
	// Remove fluff
	$('.related_post, p:empty, .post:contains(<object), .post:not(:has(img)), .post br').remove();
	
	$('a.toggle_full').toggle(function(){ 
		$(this).html('&uarr; Less').prev().addClass('show');
	}, function() {
		var $this = $(this);
		$this.html('Full &darr;').prev().removeClass('show');
		
		if ( ($this.position().top - $this.parent().position().top) > 900 )
			$.scrollTo( $(this).parent(), 500  );
	});
	
	$('a.zoom').click(function(){
		$('#overlay').show();
		$('#post_modal').html( $(this).parent().html() ).show();
		$('#post_modal').find('.toggle_full,.zoom').remove();
		$('#post_modal img').each(function(){ $(this).removeAttr('style'); resizeImage( this, 780 ); });
		return false;
	});
	
	$('#overlay').click(function(){
		$('#overlay,#post_modal').hide();
	});
	
	// Layout resizing
	$('#head li.wider a').click(function(){
		$('#mid,#right').css('width', 390).find('img').each(function(){ $(this).removeAttr('style'); resizeImage( this, 390 ); });
		$('#left').css('width', 200).find('img').each(function(){ $(this).removeAttr('style'); resizeImage( this, 200 ); });
		return false;
	});
	
	$('#head li.thinner a').click(function(){
		$('#mid,#right').css('width', 210).find('img').each(function(){ $(this).removeAttr('style'); resizeImage( this, 210 ); });
		$('#left').css('width', 550).find('img').each(function(){ $(this).removeAttr('style'); resizeImage( this, 550 ); });
		return false;
	});
	
	// Font sizing
	$('#head li.font-plus a').click(function(){
		$('p').attr('style', 	'font-size:'+ (parseFloat($('p').css('font-size').substring(0,2)) + 2) + 'px;' + 
								'line-height:' + (parseFloat($('p').css('line-height').substring(0,2)) + 2) + 'px');
		return false;
	});
	
	$('#head li.font-minus a').click(function(){
		$('p').attr('style', 	'font-size:'+ (parseFloat($('p').css('font-size').substring(0,2)) - 2) + 'px;' + 
								'line-height:' + (parseFloat($('p').css('line-height').substring(0,2)) - 2) + 'px');
		return false;
	});
	
	// Show menu
	$('#head li.expand a').click(function(){ return false; });
	$('#show-default').click(function(){ $('div.post-body').show().removeClass('show'); return false; });
	$('#show-full').click(function(){ $('div.post-body').show().addClass('show'); return false; });
	$('#show-pics').click(function(){ $('div.post-body').hide(); return false; });
});

function resizeImage( image, maxWidth ) {
	var $this = $(image);
	if ( $this.width() > maxWidth ) {
		newHeight = $this.height() / ( $this.width() / maxWidth ); 
		$this.height(newHeight).width(maxWidth);
	}
}