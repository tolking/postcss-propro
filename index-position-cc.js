var postcss = require('postcss');
const list = [
    'position',
    'top',
    'left'
];
const list1 = [
    'margin',
    'width',
    'height'
];

module.exports = postcss.plugin('postcss-tolking',  () => {
  	return root => {
        root.walkRules(rule => {
            rule.walkDecls('position-cc', decl => {
                const values = postcss.list.space(decl.value);
                const width = values[0];
                const height = values[1] || values[0];
                const baseValue = ['absolute', '50%', '50%'];

                list.forEach((item, index) => {
                    decl.cloneBefore({
                        prop: item,
                        value: baseValue[index]
                    });
                });
                if (width) {
                    let _width = parseInt(width);
                    let _height = parseInt(height);

                    const listValue = [
                        `${-_height / 2} 0 0 ${-_width / 2}`,
                        width,
                        height
                    ];

                    list1.forEach((item, index) => {
                        decl.cloneBefore({
                            prop: item,
                            value: listValue[index]
                        });
                    });
                } else {
                    decl.cloneBefore({
                        prop: 'transform',
                        value: 'translate(-50%, -50%)'
                    });
                }
                decl.remove();
            });
        });
  	};
});
