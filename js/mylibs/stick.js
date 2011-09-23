/* 
*	Stick.js 
*	Copyright (C) 2011  Kaique Silva: kaique.developer@gmail.com
*	
* 	Stick.js Help with behaviors performed directly in the html tags.
* 
*	This program is free software: you can redistribute it and/or modify
*	it under the terms of the GNU General Public License as published by
*	the Free Software Foundation, either version 3 of the License, or
*	(at your option) any later version.
*
*	This program is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*	GNU General Public License for more details.
*
*	You should have received a copy of the GNU General Public License
*	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var Stick = {
	//Events for use
	newEvent: function () {		
		var handlers = {
			msg: '',
			content: '',
			'alert': function () {
				//Message from you
				this.msg = arguments[0] || '';
				//Content from object
				this.content = window.alert(this.msg);
				
				return this;
			},
			'confirm': function () {
				//Message from you
				this.msg = arguments[0] || '';
				//Content from object
				this.content = window.confirm(this.msg);
				
				return this;
			},
			'log': function () {
				//Message from you
				this.msg = arguments[0];
				//Content from object
				this.content = console.log(this.msg);
			 
				return this;	
			}
		};
		
		//Verify arguments
		if (arguments === [] || arguments.length === 0) {
			return false;
		} else {
			var i;			
			for (i in handlers) {
				var h = handlers[arguments[0]];
				return h(arguments[1]);
			}
		}
	},
	//Identify the marking
	parse: function () {
		//Get a target and execute one handler
		var str = arguments[0],
			p = /^[$][.]+[a-z:]/,
			result = [],
			callback = [];
		
		//Find for special markation
		if (p.test(str) == true) {
			/*Filter to result*/
			result.push(str.match(/^[($.)]+[a-z]+[:]/));
			result.push(str.match(/[:].*$/));
			/*Replace to clean results*/
			callback.push(result[0][0].replace(/[$]+[.]/,'').replace(/[:]/,''));
			callback.push(result[1][0].replace(/[:]/,''));
			
			//Return a array object if true
			if (callback !== []) {
				return callback;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	//Collecting information in the tag to the process behavior
	collect: function () {
		var parse = this.parse,
			newEvent = this.newEvent,
			target = $(arguments[0]),
			get = target.attr('title');
		
		return newEvent(parse(get)[0], parse(get)[1]);
	}
};
