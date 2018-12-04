var postcss = require('postcss');

module.exports = postcss.plugin('postcss-tolking',  opts => {
    opts = opts || {};
    const boxRegExp = new RegExp('^((?:max|min)-)?box$', 'i');
  	return root => {
        root.walkRules(rule => {
            rule.walkDecls(boxRegExp, decl => {
                const minmax = decl.prop.match(boxRegExp)[1] || '';
                const values = postcss.list.space(decl.value);
                const width = values[0];
                const height = values[1] || values[0];

                decl.cloneBefore({
                    prop: `${minmax}width`,
                    value: width
                });
                decl.cloneBefore({
                    prop: `${minmax}height`,
                    value: height
                });

                decl.remove();
            });
        });
  	};
});
