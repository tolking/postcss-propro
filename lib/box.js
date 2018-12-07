const postcss = require('postcss');
const { declClone } = require('./Public');
const boxRegExp = new RegExp('^((?:max|min)-)?box$', 'i');

module.exports = function (decl, opts, result) {
    const minmax = decl.prop.match(boxRegExp)[1] || '';
    const values = postcss.list.space(decl.value);
    let list = ['width', 'height'];

    if (minmax) {
        for (let i = 0; i < list.length; i++) {
            list[i] = minmax + list[i];
        }
    }
    values.length === 1 && values.push('auto');
    declClone(decl, list, values);
    decl.remove();
};