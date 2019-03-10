var postcss = require('postcss');
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
            rule.walkDecls('font-hidden', decl => {
                const values = postcss.list.space(decl.value);
                const count = values[0];

                if (count === '1') {
                    const value1 = [
                        'hidden',
                        'nowrap',
                        'ellipsis'
                    ];

                    declClone(decl, list1, value1);
                } else {
                    const value2 = [
                        '-webkit-box',
                        count,
                        'vertical',
                        'hidden',
                        'normal',
                        'ellipsis'
                    ];

                    declClone(decl, list2, value2);
                }
                decl.remove();
            });
        });
  	};
});
