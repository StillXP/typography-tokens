const StyleDictionaryPackage = require('style-dictionary');

// Style Dictionary Config Generation
function getStyleDictionaryConfig() {
    return {
        "source": [
            "tokens/typography/variables.json"
        ],
        "platforms": {
            "web/scss": {
                "buildPath": `variables/scss/`,
                "transformGroup": "scss",
                "files": [
                    {
                        "destination": "variables.module.scss",
                        "format": "scss/variables",
                    }
                ]
            },
        }
    };
}

// Custom transformation for changing Percentage values to a regular integer multiplier
StyleDictionaryPackage.registerTransform({
  name: 'size/percentToNum',
  type: 'value', 
  
  matcher: (token) => {   
    return token.attributes.type === 'height';
  },

  transformer: (token) => {
    var outString = token.value.replace('%', '');
    const index = outString.length - 2;
    outString = outString.slice(0, index) + '.' + outString.slice(index);
    
    if(outString.length === 3){
      return `0${outString}`;
    }
    return outString;
  }
}),

// Scales non-zero numbers to ch, and adds 'ch' to the end.
StyleDictionaryPackage.registerTransform({
    name:'size/pxToCh',
    type: 'value',
    matcher: (token) => {
      return token.attributes.type === 'spacing';
    }, 
    transformer: (prop, options) => {
      const baseFont = (options && options.basePxFontSize) || 8;
      const floatVal = parseFloat(prop.value);

      if (isNaN(floatVal)) {
        throwSizeError(prop.name, prop.value, 'ch');
      }

      if (floatVal === 0) {
        return '0';
      }

      return `${floatVal / baseFont}ch`;
    }
})

// Override of the built-in SCSS Transform group, adds the 'size/pxToCh' and 'percentToNum' transforms 
StyleDictionaryPackage.registerTransformGroup({
  name: 'scss',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/pxToCh',
    'color/css',
    'size/percentToNum'
  ]
});

// Build Tokens!
const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig());
StyleDictionary.buildPlatform('web/scss');