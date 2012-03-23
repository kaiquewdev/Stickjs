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

var Stick = (function Stick() {
	var _stick = function _stick() {};

	_stick.prototype.compilation = function compilation( pattern ) {
		var that = this;

		pattern = pattern || '';
		that.pattern = new RegExp;

		if ( pattern && that.pattern ) {
			that.pattern.compile( pattern );
		}

		return that;
	};

	_stick.prototype.parse = function parse( input ) {
		// Parse stickjs syntax: bahavior:property(value)
		input = input || '';

		if ( input ) {
			var that = this,
				_input = input,
				_compile = that.compilation,
				compilation = {
					value: [
						_compile(/[(].*.[)]/).pattern,
						_compile(/^[\(]/).pattern,
						_compile(/[\)]$/).pattern,
					]
				};
			
			input = {
				behavior: _input.split(':')[0],
				property: _input.split(':')[1].replace(compilation.value[0], ''),
				value: _input.split(':')[1].match(compilation.value[0]).join('').replace(compilation.value[1], '').replace(compilation.value[2], '')
			}
		}

		return input;
	};
	
	return new _stick();
} ());

console.log(Stick.parse('behavior:property(value)'))

var vows = require('vows'),
	assert = require('assert');

vows.describe('Stick js').addBatch({
	'Compilation test': {
		topic: Stick.compilation(/[a-z]/).pattern,

		'Return a regex obect': function ( topic ) {
			assert.equal( topic, '/[a-z]/' );
		},

		'Recompile': function ( topic ) {
			var topic = Stick.compilation(/[A-Z]/).pattern;
			assert.equal( topic, '/[A-Z]/');
		}
	},

	'Parse test': {
		topic: Stick.parse('behavior:property(value)'),

		'Return o anilize': function ( topic ) {
			var output = {
				 behavior: 'behavior',  
				 value: 'value',
				 property: 'property' 
			};

			assert.deepEqual( topic, output);
		}
	}
}).run();