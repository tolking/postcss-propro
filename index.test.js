var postcss = require('postcss');
var plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('arrow', () => {
    return run(
        'a{ arrow: top 1rem #ccc }',
        'a{ width: 0; height: 0; border-left: 1rem solid transparent; border-right: 1rem solid transparent; border-bottom: 1rem solid #ccc }'
    );
});

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

it('position', function () {
    return run(
        'a { position: absolute 1rem }',
        'a { position: absolute; top: 1rem; right: 1rem; bottom: 1rem; left: 1rem }'
    );
});
