const postcss = require('postcss');
const { declClone } = require('./Public');
const list1 = [
    'overflow',
    'white-space',
    'text-overflow'
];
const list2 = [
    'display',
    '-webkit-line-clamp',
    '-webkit-box-orient',
    'overflow',
    'white-space',
    'text-overflow'
];

module.exports = function (decl, opts, result) {
    const values = postcss.list.space(decl.value);

    if (values[0] === '1') {
        const value1 = [
            'hidden',
            'nowrap',
            'ellipsis'
        ];

        declClone(decl, list1, value1);
    } else {
        const value2 = [
            '-webkit-box',
            values[0],
            'vertical',
            'hidden',
            'normal',
            'ellipsis'
        ];

        declClone(decl, list2, value2);
    } 
    decl.remove();
};
