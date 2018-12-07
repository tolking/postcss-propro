const postcss = require('postcss');
const { declClone, splitNumber } = require('./Public');
const list = [
    'position',
    'top',
    'left'
];
const list1 = [
    'margin',
    'width',
    'height'
];

module.exports = function (decl, opts, result) {
    const values = postcss.list.space(decl.value);
    const width = values[0];
    const height = values[1] || values[0];
    const baseValue = ['absolute', '50%', '50%'];

    declClone(decl, list, baseValue);
    if (width) {
        const w = splitNumber(width);
        const h = splitNumber(height);
        const listValue = [
            `${-h.value / 2}${h.unit} 0 0 ${-w.value / 2}${w.unit}`,
            width,
            height
        ];

        declClone(decl, list1, listValue);
    } else {
        decl.cloneBefore({
            prop: 'transform',
            value: 'translate(-50%, -50%)'
        });
    }
    decl.remove();
};
