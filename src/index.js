import {createFilter} from 'rollup-pluginutils';
import MagicString from 'magic-string';

const __decorateRegex = /.*__decorate\([\s\S]*\);/g;

export default function removeNgDecorators(options = {}) {
    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'rollup-plugin-angular-aot-decorators',
        transform (code, id) {
            if(!filter(id)) return null;
            const magicString = new MagicString(code);
            
            let match = __decorateRegex.exec(code);
            if(match !== Object(match)) return null;

            const start = match.index;
            magicString.overwrite(start, start + match[0].length, '');

            const res = {code: magicString.toString()};
            if( options.sourceMap !== false ) res.map = magicString.generateMap({hires: true});
            
            return res;
        }
    }
}