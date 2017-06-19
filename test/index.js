import test from 'ava'
import * as fs from 'fs'
import plugin from '..';
import {rollup} from 'rollup';

let expectedResult;
let removeNgDecorators;

test.before(t => {
    expectedResult = fs.readFileSync('./test/samples/unit/expected.app.component.txt', 'utf-8');
    removeNgDecorators = plugin({
        sourceMap: false
    });
});

// Unit tests

test('it should replace decorators with an empty string', t => {
    let fixture = fs.readFileSync('./test/samples/unit/app.component.txt', 'utf-8');
    let result = removeNgDecorators.transform(fixture, 'app.component.js');

    t.true(expectedResult === result.code);
});

test('it should return null when no decorators were found', t => {
    let randomString = 'RnpLvEBRRZ';
    let result = removeNgDecorators.transform(randomString, 'app.component.js');

    t.true(result === null);
});

// Integration tests

test('it should tree-shake imports only used in decorators', t => {
    return rollup({
        entry: './test/samples/integration/app.module.js',
        context: "",
        plugins: [removeNgDecorators]
    }).then((bundle) => {
        const code = bundle.generate({
            format: 'es'
        }).code;

        t.true(code.indexOf("__decorate(") === -1);
        t.true(code.indexOf("I'm an unused component") === -1);
    })
});