const postcss = require('postcss');
const {
    declClone,
    afterAppend,
    hoverAppend,
    activeAppend} = require('./Public');
const list = [
    'position',
    'overflow',
    'width',
    'height',
    'border-radius',
    'background-color',
    'text-align',
    'line-height',
    'cursor',
    'user-select',
    '-webkit-tap-highlight-color',
    'transition'
];
const afterList = [
    'content',
    'position',
    'top',
    'bottom',
    'left',
    'right',
    'z-index',
    'display',
    'width',
    'height',
    'border-radius',
    'background',
    'opacity',
    'transform',
    'pointer-events',
    'transition'
];
const hoverList = [
    'opacity',
    'transition'
];
const activeList = [
    'opacity',
    'transform',
    'transition'
];

module.exports = function (decl, opts, result) {
    const values = postcss.list.space(decl.value);
    const parentDecl = decl.parent;
    const ruleSelectors = parentDecl.selectors;
    const activeRule = parentDecl.cloneAfter({
        selector: ruleSelectors + ':active:after'
    }).removeAll();
    const hoverRule = parentDecl.cloneAfter({
        selector: ruleSelectors + ':hover'
    }).removeAll();
    const afterRule = parentDecl.cloneAfter({
        selector: ruleSelectors + ':after'
    }).removeAll();

    const value = [
        'relative',
        'hidden',
        values[0],
        values[1] || values[0],
        values[2] || '0',
        values[3] || opts.backgroundColor,
        'center',
        values[1],
        'pointer',
        'none',
        'transparent',
        values[4] ? 'all ' + values[4] : 'all 1s'
    ];
    const afterValues = [
        '\'\'',
        'absolute',
        '0',
        '0',
        '0',
        '0',
        '1',
        'block',
        '100%',
        values[1] || values[0],
        values[2] || '0',
        'radial-gradient(circle, #fff 10%, transparent 11%) center no-repeat',
        '0',
        'scale(10)',
        'none',
        values[4] ? 'all ' + values[4] : 'all 1s'
    ];
    const hoverValues = [
        '.8',
        values[4] ? 'all ' + values[4] : 'all 1s'
    ];
    const activeValues = [
        '.4',
        'scale(0)',
        'all 0s'
    ];

    declClone(decl, list, value);
    afterAppend(afterRule, afterList, afterValues);
    hoverAppend(hoverRule, hoverList, hoverValues);
    activeAppend(activeRule, activeList, activeValues);
    decl.remove();
};
