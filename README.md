# rollup-plugin-angular-aot-decorators

Remove TypeScript decorators when compiling Angular with Ahead-Of-Time compilation

## Installation

```bash
npm install --save-dev rollup-plugin-angular-aot-decorators
```

## Usage


```js
import removeNgDecorators from './rollup-plugin-angular-aot-decorators';

export default {
  entry: 'src/main.js',
  plugins: [
      removeNgDecorators({
          include: '**/src/app/**',
          sourceMap: true
      })
  ]
}
```

## Options
```js
{
    // Include files or directories to check for decorators
    include: '**/src/app/**',

    // Excluded files or directories to check for decorators
    exclude: 'node_modules/**',

    // Whether or not to generate an updated source map 
    sourceMap: false
}
```

## License

MIT