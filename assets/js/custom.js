function parallax(){
  var scrolled = $(window).scrollTop();
  $('.body-bg').css('top',-(scrolled*0.2)+'px');
}


jQuery(document).ready(function($) {
		
        parallax();
    
        /* teaser image scroll effect */
        /*$(window).on('scroll', function() {
            var top = $(window).scrollTop();
            if (top < 0 || top > 1500) { 
                return;
            }
            $('.teaserimage-image').css('transform', 'translateY('+top+'px)'); .css('opacity', 1-Math.max(top/400, 0));
        });*/
    
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
			window.location = "/"+link.replace(/%20/g, '-').toLowerCase();
		});
    
        /* adding lightbox http://www.lokeshdhakar.com/projects/lightbox2/ */
        $(".content.page .post-content figure.image").each(function(){
            var alt = $(this).children().eq(0).attr('alt');
            var src = $(this).children().eq(0).attr('src');
            $(this).wrap("<a href='"+src+"' data-lightbox='"+document.title+"' data-title='"+alt+"'></a>");
        });
    
        /* fix external links */
        $( 'a[href^="http://"]' ).attr( 'target','_blank' );
        $( 'a[href^="https://"]' ).attr( 'target','_blank' );
});

function buildBibEntry(title, conference, authors, proceedings, authorVersion, abstract) {

    var rowItemStart = '<div class="row item"><div class="twelve columns"><h5>';
    var infoStart = '</h5><p class="info">';
    var infoBullet = '<span>&bull;</span> <em class="date">';
    var paperLinkStart = '</em></p><p class="links"><span class="abstract-toggle">Abstract <i class="fa fa-arrow-down"></i></span><span class="paper-link"><a href="';
    var proceedingsLinkEnd = '"><i class="fa fa-external-link"></i> (Proceedings)</a></span><span class="paper-link"><a href="';
    var authorLinkEnd = '"><i class="fa fa-file-pdf-o"></i> (AuthorVersion)</a></span></p><p class="abstract">';
    var rowItemEnd = '</p></div></div></div>';
    
    var item = rowItemStart + title + infoStart + conference + infoBullet + authors + paperLinkStart + proceedings + proceedingsLinkEnd + authorVersion + authorLinkEnd + abstract + rowItemEnd;
    $('#conference-papers').append(item);
    console.log(item);
   
    /* add toggles */
    
    $('span.abstract-toggle').click(function(){
		$(this).parent().next().toggle('fast');
        $(this).parent().toggleClass('small-abstract-margin');
        $(this).find('i').toggleClass('fa-arrow-down fa-arrow-up');
	});
    
    /* fix external links */
    $( 'a[href^="http://"]' ).attr( 'target','_blank' )
	$( 'a[href^="https://"]' ).attr( 'target','_blank' )
}

function buildBib(entries) {

    var rowItemStart = '<div class="row item"><div class="twelve columns"><h5>';
    var infoStart = '</h5><p class="info">';
    var infoBullet = '<span>&bull;</span> <em class="date">';
    var paperLinkStart = '</em></p><p class="links"><span class="abstract-toggle">Abstract <i class="fa fa-arrow-down"></i></span><span class="paper-link"><a href="';
    var proceedingsLinkEnd = '"><i class="fa fa-external-link"></i> (Proceedings)</a></span><span class="paper-link"><a href="';
    var authorLinkEnd = '"><i class="fa fa-file-pdf-o"></i> (AuthorVersion)</a></span></p><p class="abstract">';
    var rowItemEnd = '</p></div></div></div>';
    
    for (e in entries) {
        var item = rowItemStart + entries[e][0] + infoStart + entries[e][1] + infoBullet + entries[e][3] + paperLinkStart + entries[e][4] + proceedingsLinkEnd + entries[e][5] + authorLinkEnd + entries[e][6] + rowItemEnd;
        $('#conference-papers').append(item);
    }
    
    /* add toggles */
    
    $('span.abstract-toggle').click(function(){
		$(this).parent().next().toggle('fast');
        $(this).parent().toggleClass('small-abstract-margin');
        $(this).find('i').toggleClass('fa-arrow-down fa-arrow-up');
	});
    
    /* fix external links */
    $( 'a[href^="http://"]' ).attr( 'target','_blank' )
	$( 'a[href^="https://"]' ).attr( 'target','_blank' )
}

function readBib(data) {
    var divider = '=====';
//    $.get(f, function(data) {
        var lines = data.split('\n');
        
        /*  
            clean up
            -> remove all empty lines
            -> trim all lines
        */
        lines = lines.filter(Boolean);
        
        var start = 0;
        var result = [];
        while (start != -1) {
            if (start != 0)
                ++start;
            result.push(lines.slice(start,start+6));
            result[result.length-1].push(lines.slice(start+6, lines.indexOf(divider, start+1)).join(' ').trim());
            start = lines.indexOf(divider, start+1);
        }
        /*console.log(result);*/
        buildBib(result);
//    });
}


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

