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

function splitNumber(data) {
    const value = parseFloat(data);
    const unit = data.split(value)[1];

    return { value: value, unit: unit };
}

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
                    const w = splitNumber(width);
                    const h = splitNumber(height);

                    const listValue = [
                        `${-h.value / 2}${h.unit} 0 0 ${-w.value / 2}${w.unit}`,
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
