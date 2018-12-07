var postcss = require('postcss');

module.exports = function (decl, opts, result) {
    opts = Object.assign({ lineColor: '#ccc' }, opts);

    const values = postcss.list.space(decl.value);
    const type = values[0];
    const size = values[1];
    const color = values[2] || opts.lineColor;

    decl.cloneBefore({
        prop: 'width',
        value: '0'
    });
    decl.cloneBefore({
        prop: 'height',
        value: '0'
    });
    switch (type) {
    case 'top':
        decl.cloneBefore({
            prop: 'border-left',
            value: `${size} solid transparent`
        });
        decl.cloneBefore({
            prop: 'border-right',
            value: `${size} solid transparent`
        });
        decl.cloneBefore({
            prop: 'border-bottom',
            value: `${size} solid ${color}`
        });
        break;
    case 'bottom':
        decl.cloneBefore({
            prop: 'border-left',
            value: `${size} solid transparent`
        });
        decl.cloneBefore({
            prop: 'border-right',
            value: `${size} solid transparent`
        });
        decl.cloneBefore({
            prop: 'border-top',
            value: `${size} solid ${color}`
        });
        break;
    case 'left':
        decl.cloneBefore({
            prop: 'border-top',
            value: `${size} solid transparent`
        });
        decl.cloneBefore({
            prop: 'border-bottom',
            value: `${size} solid transparent`
        });
        decl.cloneBefore({
            prop: 'border-right',
            value: `${size} solid ${color}`
        });
        break;
    case 'right':
        decl.cloneBefore({
            prop: 'border-top',
            value: `${size} solid transparent`
        });
        decl.cloneBefore({
            prop: 'border-bottom',
            value: `${size} solid transparent`
        });
        decl.cloneBefore({
            prop: 'border-left',
            value: `${size} solid ${color}`
        });
        break;
    case 'top-left':
        decl.cloneBefore({
            prop: 'border-bottom',
            value: `${size} solid transparent`
        });
        decl.cloneBefore({
            prop: 'border-left',
            value: `${size} solid ${color}`
        });
        break;
    case 'top-right':
        decl.cloneBefore({
            prop: 'border-bottom',
            value: `${size} solid transparent`
        });
        decl.cloneBefore({
            prop: 'border-right',
            value: `${size} solid ${color}`
        });
        break;
    case 'bottom-left':
        decl.cloneBefore({
            prop: 'border-top',
            value: `${size} solid transparent`
        });
        decl.cloneBefore({
            prop: 'border-left',
            value: `${size} solid ${color}`
        });
        break;
    case 'bottom-right':
        decl.cloneBefore({
            prop: 'border-top',
            value: `${size} solid transparent`
        });
        decl.cloneBefore({
            prop: 'border-right',
            value: `${size} solid ${color}`
        });
        break;
    default:
        decl.warn(result, `${decl}  ${type} error`);
        break;
    }
    decl.remove();
};
