jQuery(document).ready(function($) {
		$('h4').click(function(){
		$(this).next().toggle('fast');
	});
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

