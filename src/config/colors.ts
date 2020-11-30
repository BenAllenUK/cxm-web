const Colors = {
  primary: '#EAEDF7',
  primaryHighlight: '#fbfbfb',

  primaryText: '#37352F',

  text1: '#3B3B3B',

  text2: '#7C7C7C',

  line: '#ECECEC',

  controls: '#C0C0BE',

  background: '#FFF',
}

export function hexToRGB(hex: string, alpha: number) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16)

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
  }
}

export default Colors
