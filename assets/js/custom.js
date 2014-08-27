jQuery(document).ready(function($) {
    
        /* add div elements to h2 elements in pages */
        $('h2').each(function(){
            var tmp = $(this).next();
            var toWrap = $(this);
            while (tmp.prop("tagName") && tmp.prop("tagName").toLowerCase() !== "h2" && tmp.prop("tagName").toLowerCase() !== "h1") {
                toWrap = toWrap.add(tmp);
                tmp = tmp.next();
            }
            toWrap.wrapAll('<div class="h2-level"/>');
        });
    
        /* add div elements to h1 elements in pages */
        $('h1').each(function(){
            var tmp = $(this).next();
            var toWrap = $(this);
            while (tmp.prop("tagName") && tmp.prop("tagName").toLowerCase() !== "h1") {
                toWrap = toWrap.add(tmp);
                tmp = tmp.next();
            }
            toWrap.wrapAll('<div class="h1-level"/>');
        });
    
		/* toggle function for publication abstracts */
		$('.publications h4').click(function(){
			$(this).next().toggle('fast');
		});
		
		/* tile animation for travel site */
//		$(".post-content.travel figure.image").hover(
//			function() {
//				$(this).stop().animate({width:"50%"}, 200);
//				if ($(this).position().left < $(document).width()/2-10)
//					$(this).next().stop().animate({width:"48%"}, 200);
//				else
//					$(this).prev().stop().animate({width:"48%"}, 200);
//			}, function() {
//				$(this).stop().animate({width:"49%"}, 200);
//				if ($(this).position().left < $(document).width()/2-10)
//					$(this).next().stop().animate({width:"49%"}, 200);
//				else
//					$(this).prev().stop().animate({width:"49%"}, 200);
//		});

		/* travel image hover animation */
		$(".post-content.travel figure.image").hover(
			function() {
				$(this).children().eq(1).stop().animate({fontSize: "20px"}, 200);
			}, function() {
				$(this).children().eq(1).stop().animate({fontSize: "15px"}, 200);
		});
		
		/* travel image link */
		$(".post-content.travel figure.image").click(function(){
			var link = encodeURIComponent($(this).children().eq(1).text());
			window.location = blogUrl+"/"+link.replace(/%20/g, '-').toLowerCase();
		});
    
        /* adding lightbox pages http://www.lokeshdhakar.com/projects/lightbox2/ */
        $(".content.page .post-content figure.image").each(function(){
            var alt = $(this).children().eq(0).attr('alt');
            var src = $(this).children().eq(0).attr('src');
            $(this).wrap("<a href='"+src+"' data-lightbox='"+document.title+"' data-title='"+alt+"'></a>");
        });
    
        /* adding lightbox to blog posts http://www.lokeshdhakar.com/projects/lightbox2/ */
        $(".content.post .post-content figure.image").each(function(){
            var alt = $(this).children().eq(0).attr('alt');
            var src = $(this).children().eq(0).attr('src');
            $(this).wrap("<a href='"+src+"' data-lightbox='"+document.title+"' data-title='"+alt+"'></a>");
        });
    
        /* fix external links */
        $( 'a[href^="http://"]' ).not('a[href*="'+location.host+'"]').attr( 'target','_blank' );
        $( 'a[href^="https://"]' ).not('a[href*="'+location.host+'"]').attr( 'target','_blank' );
});

function UnCryptMailto(s){
	var n = 0;
	var r = "";
	for( var i = 0; i < s.length; i++){
		n = s.charCodeAt( i );
		if( n >= 8364 ){
			n = 128;
		}
		r += String.fromCharCode( n - 1 );
    }
	return r;
}

function linkTo_UnCryptMailto(s){
	var mail = UnCryptMailto(s);
	location.href=mail;
}

