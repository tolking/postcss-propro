var postcss = require('postcss');
const list = [
    'text-align',
    'line-height'
];

module.exports = postcss.plugin('postcss-tolking',  () => {
  	return root => {
        root.walkRules(rule => {
            rule.walkDecls('font-cc', decl => {
                const values = postcss.list.space(decl.value);
                values.splice(0, 0, 'center');

                list.forEach((item, index) => {
                    decl.cloneBefore({
                        prop: item,
                        value: values[index]
                    });
                });
                decl.remove();
            });
        });
  	};
});
