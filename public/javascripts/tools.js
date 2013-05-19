$(function(){

	var $searchCategory = $('#searchCategory');

	$('#searchCatList button').click(function(e){
		var id = $(this).attr('id').split('-');
		var cat = id[1];
		
		$searchCategory.val(cat);
		e.preventDefault();
	});

});
