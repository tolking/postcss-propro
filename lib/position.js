const postcss = require('postcss');
const { declClone } = require('./Public');
const list = [
    'position',
    'top',
    'right',
    'bottom',
    'left'
];

module.exports = function (decl) {
    const values = postcss.list.space(decl.value);

    if (values.length <= 1) {
        return;
    } else {
        const value = [
            values[0],
            values[1] || 'auto',
            values[2] || values[1] || 'auto',
            values[3] || values[1] || 'auto',
            values[4] || values[2] || values[1] || 'auto'
        ];

        declClone(decl, list, value);
    }
    decl.remove();
};
