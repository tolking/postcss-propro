var postcss = require('postcss');

module.exports = postcss.plugin('postcss-tolking',  opts => {
    opts = opts || {};
    const prefix = 'prefix' in Object(opts) ? `-${opts.prefix}-` : '';
    const boxPropertyRegExp = new RegExp(`^${prefix}((?:max|min)-)?box$`, 'i');
  	// Work with options here
  	return root => {
    	// Transform CSS AST here
        root.walkRules(rule => {
            rule.walkDecls(boxPropertyRegExp, decl => {
                const minmax = decl.prop.match(boxPropertyRegExp)[1] || '';
                const values = postcss.list.space(decl.value);
                let width = values[0];
                let height = values[1] || values[0];
                // We work with the `decl` object here.
                // rule.append({
                //     prop: 'width',
                //     value: decl.value
                // });
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
