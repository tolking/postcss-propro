var postcss = require('postcss');
const list = [
    'position',
    'top',
    'right',
    'bottom',
    'left'
];

function declClone(decl, arr, value) {
    return arr.forEach((item, index) => {
        decl.cloneBefore({
            prop: item,
            value: value[index]
        });
    });
}

module.exports = postcss.plugin('postcss-tolking',  () => {
  	return root => {
        root.walkRules(rule => {
            rule.walkDecls('position', decl => {
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
            });
        });
  	};
});
