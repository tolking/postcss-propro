var postcss = require('postcss');
const list = [
    'position',
    'overflow',
    'width',
    'height',
    'border-radius',
    'background-color',
    'text-align',
    'line-height',
    'cursor',
    'user-select',
    '-webkit-tap-highlight-color',
    'transition'
];
const afterList = [
    'content',
    'position',
    'top',
    'bottom',
    'left',
    'right',
    'z-index',
    'display',
    'width',
    'height',
    'border-radius',
    'background',
    'opacity',
    'transform',
    'pointer-events',
    'transition'
];
const hoverList = [
    'opacity',
    'transition'
];
const activeList = [
    'opacity',
    'transform',
    'transition'
];

module.exports = postcss.plugin('postcss-tolking',  opts => {
    opts = Object.assign({ backgroundColor: '#0074d9' }, opts);
  	return root => {
        root.walkRules(rule => {
            rule.walkDecls('btn', decl => {
                const values = postcss.list.space(decl.value);
                const parentDecl = decl.parent;
                const ruleSelectors = parentDecl.selectors;
                const activeRule = parentDecl.cloneAfter({
                    selector: ruleSelectors + ':active:after'
                }).removeAll();
                const hoverRule = parentDecl.cloneAfter({
                    selector: ruleSelectors + ':hover'
                }).removeAll();
                const afterRule = parentDecl.cloneAfter({
                    selector: ruleSelectors + ':after'
                }).removeAll();

                values.splice(0, 0, 'relative', 'hidden');
                // height value
                values[3] = values[3] || values[2];
                // radius valus
                values[4] = values[4] || '0';
                // bgcolor value
                values[5] = values[5] || opts.backgroundColor;
                values.splice(
                    6,
                    0,
                    'center',
                    values[3],
                    'pointer',
                    'none',
                    'transparent'
                );
                // transition value
                values[11] = values[11] ? 'all ' + values[11] : 'all 1s';

                const afterValues = [
                    '\'\'',
                    'absolute',
                    '0',
                    '0',
                    '0',
                    '0',
                    '1',
                    'block',
                    '100%',
                    values[3],
                    values[4],
                    'radial-gradient(circle, #fff 10%, transparent 11%) center no-repeat',
                    '0',
                    'scale(10)',
                    'none',
                    values[11]
                ];
                const hoverValues = [
                    '.8',
                    values[11]
                ];
                const activeValues = [
                    '.4',
                    'scale(0)',
                    'all 0s'
                ];

                list.forEach((item, index) => {
                    decl.cloneBefore({
                        prop: item,
                        value: values[index]
                    });
                });
                // after
                afterList.forEach((item, index) => {
                    afterRule.append({
                        prop: item,
                        value: afterValues[index]
                    });
                });
                // hover
                hoverList.forEach((item, index) => {
                    hoverRule.append({
                        prop: item,
                        value: hoverValues[index]
                    });
                });
                // active
                activeList.forEach((item, index) => {
                    activeRule.append({
                        prop: item,
                        value: activeValues[index]
                    });
                });
                decl.remove();
            });
        });
  	};
});
