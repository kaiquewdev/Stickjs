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
	newEvent: function (behavior, param, elem) {
		//Behaviors		
		this.handlers = {
			'alert': function () {
				this.msg = param || '';
				this.content = window.alert(this.msg);
			},
			'confirm': function () {
				this.msg = param || '';
				this.content = window.confirm(this.msg);
			},
			'log': function () {
				this.msg = param;
				this.content = console.log(this.msg);
			},
			'valid': function () {
				//
				var keys = [
							//Email Validation
							['email',
							/[a-z0-9]+@[a-z0-9]+(([\.][a-z]{2,3}){1,2})$/],
							//Date Validation
							['date',
							/([0][0-9]|[1-2][0-9]|[3][0-1])\/([0][0-9]|[1][0-2])\/([0-9]{4})/,
							/([0][0-9]|[1-2][0-9]|[2][0-9])\/([0][2])\/([0-9]{4})/],
                            //URL Validation
                            ['url',
                            /^(htt(p|ps)\:\/\/)([a-z0-9]{1,255})\.(([a-z]{2,3}))/,
                            /^(htt(p|ps)\:\/\/)([a-z]{2,4})\.([a-z0-9]{1,255})\.(([a-z]{2,3}))/],
	                        //CEP Validation
	                        ['cep',
	                        /[0-9]{1,1}/]
				];

				var dStyle = [
								//Style test
								{boxShadow:'0 0 4px #e7056b'},
								{boxShadow:'none'}];
				
				if (typeof elem.val() != 'undefined' || elem.attr('type') == 'text') {
					if (param == keys[0][0]) {
						//Email validation
						if (keys[0][1].test(elem.val())) {
							elem.css(dStyle[1]);
							alert('Tested input email !');
						} else {
							elem.css(dStyle[0]);
						}
					} else if (param == keys[1][0]) {
						//Date validation
						if (keys[1][1].test(elem.val()) && keys[1][2].test(elem.val())) {
							elem.css(dStyle[1]);
							alert('Tested input date !');
						} else {
							elem.css(dStyle[0]);
						}
					} else if(param == keys[2][0]) {
                        //Url validation
                        if(keys[2][1].test(elem.val()) || keys[2][2].test(elem.val())) {
                            elem.css(dStyle[1]);
							alert('Tested input url !');
                        } else {
							elem.css(dStyle[0]);
                        }
                    } else if(param == keys[3][0]) {
                        //CEP validation
                        if(keys[3][1].test(elem.val())) {
                            elem.css(dStyle[1]);
							alert('Tested input CEP !');
                        } else {
							elem.css(dStyle[0]);
                        }
                    } else {
						return false;
					}
				} else {
					return false;
				}
			}
		};
		
		//Verify arguments
		if (typeof behavior !== 'undefined' && typeof param !== 'undefined') {
			return this.handlers[behavior](param);
		} else {
			return false;
		}

		return this;
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
			//Select a behavior in title, rel or data attribute
			get = target.attr('title') || target.attr('data-stick');
		
		return newEvent(parse(get)[0], parse(get)[1], target);
	}
};
