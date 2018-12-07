const postcss = require('postcss');
const arrow = require('./lib/arrow');
const box = require('./lib/box');
const btn = require('./lib/btn');
const fontCC = require('./lib/font-cc');
const fontHidden = require('./lib/font-hidden');
const positionCC = require('./lib/position-cc');
const position = require('./lib/position');
const spread = require('./lib/spread');

module.exports = postcss.plugin('postcss-propro',  opts => {
  	return (root, result) => {
        root.walkRules(rule => {
            rule.walkDecls(decl => {
                switch (decl.prop) {
                case 'arrow':
                    arrow(decl, opts, result);
                    break;
                case 'box':
                case 'min-box':
                case 'max-box':
                    box(decl, opts, result);
                    break;
                case 'btn':
                    btn(decl, opts, result);
                    break;
                case 'font-cc':
                    fontCC(decl, opts, result);
                    break;
                case 'font-hidden':
                    fontHidden(decl, opts, result);
                    break;
                case 'position-cc':
                    positionCC(decl, opts, result);
                    break;
                case 'position':
                    position(decl, opts, result);
                    break;
                case 'spread':
                    spread(decl, opts, result);
                    break;
                default:
                    break;
                }
            });
        });
  	};
});
