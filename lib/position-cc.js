const postcss = require('postcss');
const { declClone } = require('./Public');
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

module.exports = function (decl) {
    const values = postcss.list.space(decl.value);
    const width = values[0];
    const height = values[1] || values[0];
    const baseValue = ['absolute', '50%', '50%'];

    declClone(decl, list, baseValue);
    if (width) {
        const listValue = [
            `calc(-${height} / 2) 0 0 calc(-${width} / 2)`,
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
