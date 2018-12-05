var postcss = require('postcss');
const list = ['width', 'height'];

module.exports = postcss.plugin('postcss-tolking',  opts => {
    opts = opts || {};
    const boxRegExp = new RegExp('^((?:max|min)-)?box$', 'i');
  	return root => {
        root.walkRules(rule => {
            rule.walkDecls(boxRegExp, decl => {
                const minmax = decl.prop.match(boxRegExp)[1] || '';
                const values = postcss.list.space(decl.value);

                // height value
                values.length === 1 && values.push('auto');
                values[1] === '*' && (values[1] = values[0]);

                list.forEach((item, index) => {
                    decl.cloneBefore({
                        prop: `${minmax}${item}`,
                        value: values[index]
                    });
                });
                decl.remove();
            });
        });
  	};
});
