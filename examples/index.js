/**
* @license Apache-2.0
*
* Copyright (c) 2025 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

var discreteUniform = require( '@stdlib/random-base-discrete-uniform' ).factory;
var isEven = require( '@stdlib/assert-is-even' ).isPrimitive;
var ndarray2array = require( '@stdlib/ndarray-to-array' );
var scalar2ndarray = require( '@stdlib/ndarray-from-scalar' );
var fillBy = require( '@stdlib/ndarray-fill-by' );
var zeros = require( '@stdlib/ndarray-zeros' );
var someBy = require( './../lib' );

var x = zeros( [ 2, 4, 5 ], {
	'dtype': 'float64'
});
x = fillBy( x, discreteUniform( 0, 10 ) );
console.log( ndarray2array( x ) );

var n = scalar2ndarray( 4, {
	'dtype': 'int8'
});
var y = someBy( x, n, isEven );
console.log( y.get() );
