# PostCSS Propro [![Build Status][ci-img]][ci]

[PostCSS] plugin adds and extends some properties

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/tolking/postcss-propro.svg
[ci]:      https://travis-ci.org/tolking/postcss-propro

## [Documentation](https://ououe.com/postcss-propro)
Click on the Documentation to learn more

## Example
### box
``` css
// input
.foo {
  box: 100%;
  min-box: 5rem 2rem;
  max-box: 10rem;
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
  max-height: none;
}
```

### font-cc
``` css
// input
.foo {
  font-cc: 2rem;
}
```

``` css
// output
.foo {
  text-align: center;
  line-height: 2rem;
}
```

### font-hidden
``` css
// input
.foo {
  font-hidden: 1;
}
```

``` css
// output
.foo {
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
}
```

### position
``` css
// input
.foo {
  position: fixed 0;
}
```

``` css
// output
.foo {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

### position-cc
``` css
// input
.foo {
  position-cc: 10rem 4rem;
}
```

``` css
// output
.foo {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -2rem 0 0 -5rem;
}
```

### arrow
``` css
// input
:root {
  --c-line: #ccc;
}
.foo {
  arrow: top-left 20px var(--c-line);
}
```

### btn
``` css
// input
:root {
  --c-blue: #0074d9;
}
.foo {
  btn: 10rem 4rem 0.5rem var(--c-blue);
}
```

### spread
``` css
// input
:root {
  --c-line: #da3;
}
.foo {
  spread: top-bottom 100% 100% var(--c-line);
}
```

## Options
``` js
  // default color
  backgroundColor: '#0074d9', // for btn
  lineColor: '#ccc' // for arrow and spread
```

## Usage
``` js
postcss([ require('postcss-propro') ])

// or postcss.config.js
plugins: {
  'postcss-propro': {
    backgroundColor: '#0074d9',
    lineColor: '#ccc'
  },
  'autoprefixer': {}
}
```

See [PostCSS] docs for examples for your environment.
