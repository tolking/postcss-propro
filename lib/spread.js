const postcss = require('postcss');
const {
    declClone,
    beforeAppend,
    afterAppend,
    hoverBeforeAppend,
    hoverAfterAppend } = require('./Public');
const list1 = [
    'content',
    'display',
    'margin-left',
    'width',
    'height',
    'background-color',
    'transform',
    'transition'
];
const hoverList1 = ['margin-left', 'transform', 'transition'];
const list2 = [
    'content',
    'float',
    'width',
    'height',
    'background-color',
    'transform',
    'transition'
];
const hoverList2 = ['transform', 'transition'];
const list3 = ['position', 'overflow', 'transition'];
const beforeList3 = [
    'content',
    'position',
    'top',
    'bottom',
    'left',
    'right',
    'z-index',
    'width',
    'height',
    'background',
    'transform',
    'transition'
];

function makeValue(values, opts) {
    let width, height, color, time, value1, hoverValue1, value2, hoverValue2, value3, beforeValue3, hoverValue3;

    width = values[1] || '';
    height = values[2] || '';
    color = values[3] || opts.lineColor;
    time = values[4] || '1s';

    if (values[0] === 'top' || values[0] === 'bottom') {
        width = width || '100%';
        height = height || '1px';
        value1 = ['\'\'', 'block', `calc((100% - ${width}) / 2)`, width, height, color, 'scaleX(0)', `transform ${time}`];
        hoverValue1 = [`calc((100% - ${width}) / 2)`, 'scaleX(1)', `transform ${time}`];
    } else if (values[0] === 'left' || values[0] === 'right') {
        width = width || '1px';
        height = height || '100%';
        value2 = ['\'\'', values[0], width, height, color, 'scaleY(0)', `transform ${time}`];
        hoverValue2 = ['scaleY(1)', `transform ${time}`];
    } else {
        width = width || '100%';
        height = height || '100%';
        value3 = ['relative', 'hidden', `transform ${time}`];
        beforeValue3 = ['\'\'', 'absolute', '0', '0', '0', '0', '1', width, height, color, '', `transform ${time}`];
        hoverValue3 = ['translate(0, 0)', `transform ${time}`];
        if (values[0] === 'top-bottom') {
            beforeValue3[10] = 'translate(0, -100%)';
        } else if (values[0] === 'bottom-top') {
            beforeValue3[10] = 'translate(0, 100%)';
        } else if (values[0] === 'left-right') {
            beforeValue3[10] = 'translate(-100%, 0)';
        } else {
            beforeValue3[10] = 'translate(100%, 0)';
        }
    }
    return {
        value1: value1,
        hoverValue1: hoverValue1,
        value2: value2,
        hoverValue2: hoverValue2,
        value3: value3,
        beforeValue3: beforeValue3,
        hoverValue3: hoverValue3
    };
}

module.exports = function (decl, opts, result) {
    const values = postcss.list.space(decl.value);
    const parentDecl = decl.parent;
    const ruleSelectors = parentDecl.selectors;
    const hoverAfter = parentDecl.cloneAfter({
        selector: ruleSelectors + ':hover:after'
    }).removeAll();
    const hoverBefore = parentDecl.cloneAfter({
        selector: ruleSelectors + ':hover:before'
    }).removeAll();
    const afterRule = parentDecl.cloneAfter({
        selector: ruleSelectors + ':after'
    }).removeAll();
    const beforeRule = parentDecl.cloneAfter({
        selector: ruleSelectors + ':before'
    }).removeAll();
    const type = values[0];
    let config =  makeValue(values, opts);

    switch (type) {
    case 'top':
    case 'bottom':
        decl.cloneBefore({
            prop: 'transition',
            value: config.value1[7]
        });
        if (type === 'top') {
            beforeAppend(beforeRule, list1, config.value1);
            hoverBeforeAppend(hoverBefore, hoverList1, config.hoverValue1);
        } else {
            afterAppend(afterRule, list1, config.value1);
            hoverAfterAppend(hoverAfter, hoverList1, config.hoverValue1);
        }
        break;
    case 'left':
    case 'right':
        decl.cloneBefore({
            prop: 'transition',
            value: config.value2[6]
        });
        if (type === 'left') {
            beforeAppend(beforeRule, list2, config.value2);
            hoverBeforeAppend(hoverBefore, hoverList2, config.hoverValue2);
        } else {
            afterAppend(afterRule, list2, config.value2);
            hoverAfterAppend(hoverAfter, hoverList2, config.hoverValue2);
        }
        break;
    case 'top-bottom':
    case 'bottom-top':
    case 'left-right':
    case 'right-left':
        declClone(decl, list3, config.value3);
        beforeAppend(beforeRule, beforeList3, config.beforeValue3);
        hoverBeforeAppend(hoverBefore, hoverList2, config.hoverValue3);
        break;
    default:
        decl.warn(result, `spread-line: ${decl.value}  ${type} is error`);
        break;
    }
    decl.remove();
};
