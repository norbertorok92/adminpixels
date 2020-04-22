const switchOptions = [
  {
    id: 'lineNumbers',
    title: 'Line Numbers',
    trueValue: true,
    falseValue: false,
    value: true,
  },
  {
    id: 'readOnly',
    title: 'Read Only',
    trueValue: false,
    falseValue: true,
    value: true,
  },
];
const selectOptions = [
  {
    id: 'tabSize',
    title: 'Tab Size',
    options: ['2', '4', '6', '8'],
    value: 2,
  },
  {
    id: 'mode',
    title: 'Language',
    options: ['javascript', 'xml', 'markdown', 'php', 'python', 'ruby'],
    value: 'javascript',
  },
  {
    id: 'theme',
    title: 'Select themes',
    options: [
      'default',
      'zenburn',
      'solarized',
      'rubyblue',
      'paraiso-dark',
      'midnight',
      'material',
      'hopscotch',
      'twilight',
    ],
    value: 'zenburn',
  },
];

const defaultValues = {
  basic: `const component = {
    name: 'AdminPixels',
    author: 'Pixelstocode Team',
    website: 'https://www.pixelstocode.com/'
};`,
  javascript: `const component = {
    name: 'AdminPixels',
    author: 'Pixelstocode Team',
    website: 'https://www.pixelstocode.com/'
};`,
  markdown: `# AdminPixels
###This is a Pixelstocode Team production
[have a look](https://www.pixelstocode.com/)
  `,
  xml: `<isomprphic>
    <to>Tove</to>
    <name>AdminPixels</name>
    <author>Pixelstocode Team</author>
    <website>pixelstocode.com</website>
</isomprphic>`,
  php: `<html>
 <head>
  <title> v</title>
 </head>
 <body>
 <h1>https://www.pixelstocode.com/</h1>
 <p>This is a Pixelstocode Team production</p>
 <a href="https://www.pixelstocode.com/">visit ou site</a>
 </body>
</html>
`,
  python: `
print("AdminPixels")
print("This is a Pixelstocode Team production")
print("visit us https://www.pixelstocode.com ")
`,
  ruby: `rint "AdminPixels"
print "This is a Pixelstocode Team production"
print "visit us https://www.pixelstocode.com "
`,
};

export { switchOptions, selectOptions, defaultValues };
