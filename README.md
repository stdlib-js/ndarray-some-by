<!--

@license Apache-2.0

Copyright (c) 2025 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# someBy

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Test whether at least `n` elements along one or more [`ndarray`][@stdlib/ndarray/ctor] dimensions pass a test implemented by a predicate function.

<section class="intro">

</section>

<!-- /.intro -->

<section class="installation">

## Installation

```bash
npm install @stdlib/ndarray-some-by
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm`][esm-url] branch (see [README][esm-readme]).
-   If you are using Deno, visit the [`deno`][deno-url] branch (see [README][deno-readme] for usage intructions).
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd`][umd-url] branch (see [README][umd-readme]).

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

To view installation and usage instructions specific to each branch build, be sure to explicitly navigate to the respective README files on each branch, as linked to above.

</section>

<section class="usage">

## Usage

```javascript
var someBy = require( '@stdlib/ndarray-some-by' );
```

#### someBy( x, n\[, options], predicate\[, thisArg] )

Tests whether at least `n` elements along one or more [`ndarray`][@stdlib/ndarray/ctor] dimensions pass a test implemented by a predicate function.


```javascript
var array = require( '@stdlib/ndarray-array' );

function predicate( value ) {
    return value > 0.0;
}

// Create an input ndarray:
var x = array( [ [ [ 1.0, 2.0 ] ], [ [ 3.0, 4.0 ] ], [ [ 0.0, 6.0 ] ] ] );
// returns <ndarray>

// Perform reduction:
var out = someBy( x, 2, predicate );
// returns <ndarray>

console.log( out.get() );
// => true
```

The function accepts the following arguments:

-   **x**: input [`ndarray`][@stdlib/ndarray/ctor].
-   **n**: number of elements which must pass the test implemented by a predicate function. May be either a scalar or an [`ndarray`][@stdlib/ndarray/ctor]. Must be [broadcast-compatible][@stdlib/ndarray/base/broadcast-shapes] with the non-reduced dimensions of input [`ndarray`][@stdlib/ndarray/ctor]. Must have an integer [data type][@stdlib/ndarray/dtypes].
-   **options**: function options (_optional_).
-   **predicate**: predicate function.
-   **thisArg**: predicate execution context (_optional_).

The function accepts the following `options`:

-   **dims**: list of dimensions over which to perform a reduction.
-   **keepdims**: boolean indicating whether the reduced dimensions should be included in the returned [`ndarray`][@stdlib/ndarray/ctor] as singleton dimensions. Default: `false`.

By default, the function performs a reduction over all elements in a provided [`ndarray`][@stdlib/ndarray/ctor]. To reduce specific dimensions, set the `dims` option.

```javascript
var array = require( '@stdlib/ndarray-array' );
var ndarray2array = require( '@stdlib/ndarray-to-array' );

function predicate( value ) {
    return value > 0.0;
}

// Create an input ndarray:
var x = array( [ [ [ 1.0, 2.0 ] ], [ [ 3.0, 4.0 ] ], [ [ 0.0, 6.0 ] ] ] );
// returns <ndarray>

var opts = {
    'dims': [ 0, 1 ]
};

// Perform reduction:
var out = someBy( x, 2, opts, predicate );
// returns <ndarray>

var v = ndarray2array( out );
// returns [ true, true ]
```

By default, the function returns an [`ndarray`][@stdlib/ndarray/ctor] having a shape matching only the non-reduced dimensions of the input [`ndarray`][@stdlib/ndarray/ctor] (i.e., the reduced dimensions are dropped). To include the reduced dimensions as singleton dimensions in the output [`ndarray`][@stdlib/ndarray/ctor], set the `keepdims` option to `true`.

```javascript
var array = require( '@stdlib/ndarray-array' );
var ndarray2array = require( '@stdlib/ndarray-to-array' );

function predicate( value ) {
    return value > 0.0;
}

// Create an input ndarray:
var x = array( [ [ [ 1.0, 2.0 ] ], [ [ 3.0, 4.0 ] ], [ [ 0.0, 6.0 ] ] ] );
// returns <ndarray>

var opts = {
    'dims': [ 0, 1 ],
    'keepdims': true
};

// Perform reduction:
var out = someBy( x, 2, opts, predicate );
// returns <ndarray>

var v = ndarray2array( out );
// returns [ [ [ true, true ] ] ]
```

To set the predicate function execution context, provide a `thisArg`.

<!-- eslint-disable no-invalid-this -->

```javascript
var array = require( '@stdlib/ndarray-array' );

function predicate( value ) {
    this.count += 1;
    return value > 0.0;
}

// Create an input ndarray:
var x = array( [ [ [ 1.0, 2.0 ] ], [ [ 3.0, 4.0 ] ], [ [ 0.0, 6.0 ] ] ] );
// returns <ndarray>

// Create a context object:
var ctx = {
    'count': 0
};

// Perform operation:
var out = someBy( x, 2, predicate, ctx );
// returns <ndarray>

var v = out.get();
// returns true

var count = ctx.count;
// returns 2
```

#### someBy.assign( x, n, out\[, options], predicate\[, thisArg] )

Tests whether at least `n` elements along one or more [`ndarray`][@stdlib/ndarray/ctor] dimensions pass a test implemented by a predicate function and assigns results to a provided output [`ndarray`][@stdlib/ndarray/ctor].


```javascript
var array = require( '@stdlib/ndarray-array' );
var empty = require( '@stdlib/ndarray-empty' );

function predicate( value ) {
    return value > 0.0;
}

// Create an input ndarray:
var x = array( [ [ [ 1.0, 2.0 ] ], [ [ 3.0, 4.0 ] ], [ [ 0.0, 6.0 ] ] ] );
// returns <ndarray>

// Create an output ndarray:
var y = empty( [], {
    'dtype': 'bool'
});

// Perform reduction:
var out = someBy.assign( x, 2, y, predicate );
// returns <ndarray>

var bool = ( out === y );
// returns true

var v = y.get();
// returns true
```

The function accepts the following arguments:

-   **x**: input [`ndarray`][@stdlib/ndarray/ctor].
-   **n**: number of elements which must pass the test implemented by a predicate function. May be either a scalar or an [`ndarray`][@stdlib/ndarray/ctor]. Must be [broadcast-compatible][@stdlib/ndarray/base/broadcast-shapes] with the non-reduced dimensions of input [`ndarray`][@stdlib/ndarray/ctor]. Must have an integer [data type][@stdlib/ndarray/dtypes].
-   **out**: output [`ndarray`][@stdlib/ndarray/ctor]. The output [`ndarray`][@stdlib/ndarray/ctor] must have a shape matching the non-reduced dimensions of the input [`ndarray`][@stdlib/ndarray/ctor].
-   **options**: function options (_optional_).
-   **predicate**: predicate function.
-   **thisArg**: predicate execution context (_optional_).

The function accepts the following `options`:

-   **dims**: list of dimensions over which to perform a reduction.

By default, the function performs a reduction over all elements in a provided [`ndarray`][@stdlib/ndarray/ctor]. To reduce specific dimensions, set the `dims` option.

```javascript
var array = require( '@stdlib/ndarray-array' );
var empty = require( '@stdlib/ndarray-empty' );
var ndarray2array = require( '@stdlib/ndarray-to-array' );

function predicate( value ) {
    return value > 0.0;
}

// Create an input ndarray:
var x = array( [ [ [ 1.0, 2.0 ] ], [ [ 3.0, 4.0 ] ], [ [ 0.0, 6.0 ] ] ] );
// returns <ndarray>

// Create an output ndarray:
var y = empty( [ 2 ], {
    'dtype': 'bool'
});

var opts = {
    'dims': [ 0, 1 ]
};

// Perform reduction:
var out = someBy.assign( x, 2, y, opts, predicate );

var bool = ( out === y );
// returns true

var v = ndarray2array( y );
// returns [ true, true ]
```

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   The predicate function is provided the following arguments:

    -   **value**: current array element.
    -   **indices**: current array element indices.
    -   **arr**: the input ndarray.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var discreteUniform = require( '@stdlib/random-base-discrete-uniform' ).factory;
var isEven = require( '@stdlib/assert-is-even' ).isPrimitive;
var ndarray2array = require( '@stdlib/ndarray-to-array' );
var scalar2ndarray = require( '@stdlib/ndarray-from-scalar' );
var fillBy = require( '@stdlib/ndarray-fill-by' );
var zeros = require( '@stdlib/ndarray-zeros' );
var someBy = require( '@stdlib/ndarray-some-by' );

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
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2025. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/ndarray-some-by.svg
[npm-url]: https://npmjs.org/package/@stdlib/ndarray-some-by

[test-image]: https://github.com/stdlib-js/ndarray-some-by/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/ndarray-some-by/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/ndarray-some-by/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/ndarray-some-by?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/ndarray-some-by.svg
[dependencies-url]: https://david-dm.org/stdlib-js/ndarray-some-by/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/ndarray-some-by/tree/deno
[deno-readme]: https://github.com/stdlib-js/ndarray-some-by/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/ndarray-some-by/tree/umd
[umd-readme]: https://github.com/stdlib-js/ndarray-some-by/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/ndarray-some-by/tree/esm
[esm-readme]: https://github.com/stdlib-js/ndarray-some-by/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/ndarray-some-by/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/ndarray-some-by/main/LICENSE

[@stdlib/ndarray/ctor]: https://github.com/stdlib-js/ndarray-ctor

[@stdlib/ndarray/base/broadcast-shapes]: https://github.com/stdlib-js/ndarray-base-broadcast-shapes

[@stdlib/ndarray/dtypes]: https://github.com/stdlib-js/ndarray-dtypes

<!-- <related-links> -->

<!-- </related-links> -->

</section>

<!-- /.links -->
