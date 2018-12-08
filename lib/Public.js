function declClone(decl, arr, value) {
    return arr.forEach((item, index) => {
        decl.cloneBefore({
            prop: item,
            value: value[index]
        });
    });
}
function beforeAppend(beforeRule, arr, value) {
    return arr.forEach((item, index) => {
        beforeRule.append({
            prop: item,
            value: value[index]
        });
    });
}
function afterAppend(afterRule, arr, value) {
    arr.forEach((item, index) => {
        afterRule.append({
            prop: item,
            value: value[index]
        });
    });
}
function hoverAppend(hoverRule, arr, value) {
    arr.forEach((item, index) => {
        hoverRule.append({
            prop: item,
            value: value[index]
        });
    });
}
function activeAppend(activeRule, arr, value) {
    arr.forEach((item, index) => {
        activeRule.append({
            prop: item,
            value: value[index]
        });
    });
}
function hoverBeforeAppend(hoverBefore, arr, value) {
    arr.forEach((item, index) => {
        hoverBefore.append({
            prop: item,
            value: value[index]
        });
    });
}
function hoverAfterAppend(hoverAfter, arr, value) {
    arr.forEach((item, index) => {
        hoverAfter.append({
            prop: item,
            value: value[index]
        });
    });
}
// 12.5rem -> { value: 12.5, unit: rem }
function splitNumber(data) {
    const value = parseFloat(data);
    const unit = data.split(value)[1];
    return { value: value, unit: unit };
}
// is color
function isColor(str) {
    return /(^#[0-9a-fA-F]{6}$)|(^#[0-9a-fA-F]{3}$)|(^[rR][gG][Bb])|(^[hH][sS][lL])/i.test(str);
}

module.exports = {
    declClone,
    beforeAppend,
    afterAppend,
    hoverAppend,
    activeAppend,
    hoverBeforeAppend,
    hoverAfterAppend,
    splitNumber,
    isColor
};
