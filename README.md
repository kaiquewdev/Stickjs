Stick.js
========

 Experimental lib for control behavior directly in html tag attribute.
 
 ![alt text](http://zapatopi.net/blog/walking-stick_defence_barton-wright_1.gif 'Stick.js')
 
Simple to use:
===============

In your tag, add the simple command '$.bahavior:message', for elements who return one
message.

Examples:
=========

### Alert behavior

&lt;p id="demo" data-stick="$.alert: My personal message !"&gt; My tag ! &lt;/p&gt;

The "data-stick", is a attribute of html5, but this lib to parse all tags marked, 
an are executed in browser who doesn't support this property.

Use an event of jQuery, for run this action:

'$("#demo").bind("load", function () {
	Stick.collect(this);
});'

Done, His appointment was labeled.

Notes:
======

*	'data-stick' - Identification of a behavior to send for stick.js;
*	'$.' - do one call to your object;
*	':' - Separate your mark;
*	'Stick.collect()' - Function to collect and research a method in a tag, who was marked;

	
	
	
	