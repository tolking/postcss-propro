# PostCSS Tolking [![Build Status][ci-img]][ci]

[PostCSS] plugin test postcss.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/tolking/postcss-tolking.svg
[ci]:      https://travis-ci.org/tolking/postcss-tolking

## box

```css
.foo {
  box: 100%;
  min-box: 5rem 2rem;
  max-box: 10rem;
}
```

```css
.foo {
  with: 100%;
  height: 100%;
  min-width: 5rem;
  min-height: 2rem;
  max-width: 10rem;
  max-height: 10rem;
}
```

## Plugins
- box

## Usage

```js
postcss([ require('postcss-tolking') ])
```

See [PostCSS] docs for examples for your environment.
