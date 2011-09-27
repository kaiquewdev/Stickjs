//Test a first behavior
$('#demo1').bind('click', function (){
	Stick.collect('#alert');
});

//Test a second behavior
$('#demo2').bind('click', function (){
	Stick.collect('#confirm');
});

//Test a third behavior
$('#demo3').bind('click', function (){
	Stick.collect('#log');
});

//Test a fourth behavior
$('#demo4').bind('click', function (){
	Stick.collect('#email_field');
});

//Test a fifth behavior
$('#demo5').bind('click', function (){
	Stick.collect('#date_field');
});

//Test a sixth behavior
$('#demo6').bind('click', function (){
	Stick.collect('#url_field');
});

//Test a seventh behavior
$('#demo7').bind('click', function (){
	Stick.collect('#cep_field');
});

//Waint for complete load window object
$(window).load(function() {
	$('header').animate({height:'150px'}, 800).queue(function() {
		$('div.logo').fadeTo('slow', 1);
		$(this).dequeue();
	});
});





