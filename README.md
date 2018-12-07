# PostCSS Propro [![Build Status][ci-img]][ci]

[PostCSS] plugin adds and extends some properties

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/tolking/postcss-propro.svg
[ci]:      https://travis-ci.org/tolking/postcss-propro

## box
``` css
// input
.foo {
  box: 100%;
  min-box: 5rem 2rem;
  max-box: 10rem 20vh;
}
```

``` css
// output
.foo {
  with: 100%;
  height: auto;
  min-width: 5rem;
  min-height: 2rem;
  max-width: 10rem;
  max-height: 20vh;
}
```

## arrow
``` css
// input
.foo {
  arrow: top-left 20px #f0f;
}
```

## btn
``` css
// input
.foo {
  btn: 10rem 4rem 0.5rem #00e;
}
```

## font-cc
``` css
// input
.foo {
  font-cc: 2rem;
}
```

## font-hidden
``` css
// input
.foo {
  font-hidden: 1;
}
```

## position
``` css
// input
.foo {
  position: fixed 0;
}
```

## position-cc
``` css
// input
.foo {
  position-cc: 10rem 4rem;
}
```

## spread
``` css
// input
.foo {
  spread: top-bottom #da3;
}
```

## Plugins
- box

## Usage

```js
postcss([ require('postcss-propro') ])
```

See [PostCSS] docs for examples for your environment.
