// set active class
$(document).ready(function(){
	var curURL = window.location.pathname;
	var url = '/'+curURL.toLowerCase().split('/')[1];
	$('ul.sidebar__menu a').each(function(){
		if(url === this.pathname.toLowerCase()) {
		    $(this).parent().addClass('active');
            $(this).parent().parent().addClass('in');
		    $(this).parent().parent().parent().addClass('has-active');
		    return false;
		}
	});	
});