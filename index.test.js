var postcss = require('postcss');
var plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('box', function () {
    return run(
        'a { box: 2rem 1rem }',
        'a { width: 2rem; height: 1rem }'
    );
});

it('font-cc', function () {
    return run(
        'a { font-cc: 3rem }',
        'a { text-align: center; line-height: 3rem }'
    );
});

