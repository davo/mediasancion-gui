$(function(){

	var $searchCategory = $('#searchCategory');

	$('#searchCatList button').click(function(e){
		var id = $(this).attr('id').split('-');
		var cat = id[1];
		
		$searchCategory.val(cat);
		e.preventDefault();
	});

  var $projects = $('#projects');

  $projects.isotope({
    itemSelector: '.project'
    , animationEngine: 'jquery'
    , resizable: false
    , masonry: {
      columnWidth: $projects.width() / 6
    },  getSortData : {
      date : function ( $elem ) {
        return $elem.attr('data-date');
    }, name : function ( $elem ) {
        return $elem.attr('data-name');
    }

  }});

});