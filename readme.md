## What it does

Command-line script that creates an ES6-style `index.js` file, containing exports for all siblings and recursive children.

## Example
For the following file structure:
```
.
├── target_folder/
│   ├── Component1.js
│   ├── non_js_file.css
│   ├── subfolder1
│   │   └── Component2.js
│   └── subfolder2
│       └── Component3.js
└── other_folder/
    └── Component4.js
```

The command:
`npm create-es6-index target_folder/`

Will generate the following `index.js` in `target_folder/`:
```js
export { default as Component1 } from './Component1';
export { default as Component2 } from './subfolder1/Component2';
export { default as Component3 } from './subfolder2/Component3';
```

And the resulting tree will be:
```
.
├── target_folder/
│   ├── index.js
│   ├── Component1.js
│   ├── non_js_file.css
│   ├── subfolder1
│   │   └── Component2.js
│   └── subfolder2
│       └── Component3.js
└── other_folder/
    └── Component4.js
```
