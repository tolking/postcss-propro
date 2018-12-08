const postcss = require('postcss');
const { declClone } = require('./Public');
const list = ['text-align', 'line-height'];

module.exports = function (decl, opts, result) {
    const values = postcss.list.space(decl.value);

    values.splice(0, 0, 'center');
    declClone(decl, list, values);
    decl.remove();
};
