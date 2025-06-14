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

// MODULES //

var bench = require( '@stdlib/bench-harness' );
var isndarrayLike = require( '@stdlib/assert-is-ndarray-like' );
var pow = require( '@stdlib/math-base-special-pow' );
var discreteUniform = require( '@stdlib/random-array-discrete-uniform' );
var shape2strides = require( '@stdlib/ndarray-base-shape2strides' );
var ndarray = require( '@stdlib/ndarray-ctor' );
var isEven = require( '@stdlib/assert-is-even' ).isPrimitive;
var pkg = require( './../package.json' ).name;
var someBy = require( './../lib' );


// VARIABLES //

var types = [ 'float64' ];
var orders = [ 'row-major', 'column-major' ];


// FUNCTIONS //

/**
* Creates a benchmark function.
*
* @private
* @param {PositiveInteger} len - ndarray length
* @param {NonNegativeIntegerArray} shape - ndarray shape
* @param {string} xtype - ndarray data type
* @param {string} order - memory layout
* @param {NonNegativeIntegerArray} dims - list of dimensions to reduce
* @returns {Function} benchmark function
*/
function createBenchmark( len, shape, xtype, order, dims ) {
	var x;

	x = discreteUniform( len, 1, 100 );
	x = new ndarray( xtype, x, shape, shape2strides( shape, order ), 0, order );

	return benchmark;

	/**
	* Benchmark function.
	*
	* @private
	* @param {Benchmark} b - benchmark instance
	*/
	function benchmark( b ) {
		var opts;
		var out;
		var i;

		opts = {
			'dims': dims
		};

		b.tic();
		for ( i = 0; i < b.iterations; i++ ) {
			out = someBy( x, len, opts, isEven );
			if ( typeof out !== 'object' ) {
				b.fail( 'should return an ndarray' );
			}
		}
		b.toc();
		if ( !isndarrayLike( out ) ) {
			b.fail( 'should return an ndarray' );
		}
		b.pass( 'benchmark finished' );
		b.end();
	}
}


// MAIN //

/**
* Main execution sequence.
*
* @private
*/
function main() {
	var dims;
	var len;
	var min;
	var max;
	var ord;
	var sh;
	var t1;
	var f;
	var i;
	var j;
	var k;
	var n;
	var d;

	min = 1; // 10^min
	max = 6; // 10^max

	d = [
		[ 0 ],
		[]
	];

	for ( n = 0; n < d.length; n++ ) {
		dims = d[ n ];
		for ( k = 0; k < orders.length; k++ ) {
			ord = orders[ k ];
			for ( j = 0; j < types.length; j++ ) {
				t1 = types[ j ];
				for ( i = min; i <= max; i++ ) {
					len = pow( 10, i );

					sh = [ len ];
					f = createBenchmark( len, sh, t1, ord, dims );
					bench( pkg+':ndims='+sh.length+',len='+len+',shape=['+sh.join(',')+'],xorder='+ord+',xtype='+t1+',dims=['+dims.join(',' )+']', f );
				}
			}
		}
	}
}

main();
