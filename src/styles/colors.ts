const colors = {
  black: '#000000',
  white: '#ffffff',
  textBlack: '#383838',
  lightBrown: '#fff8f3',
  sand: '#fce4d2',
  scrollBrown: '#e7c9b4',
  peach: '#ffe0cc',
  brown: '#d0936a',
  darkBrown: '#ae6636',
  green: '#92a962',
  lightGreen: '#c4d4a3',
  red: '#f17b81',
  grayishBlue: '#5f7d8a',
  lightRed: '#f8a4a8',
};

export const shadowColors = {
  darkBrown: 'rgba(174, 102, 54, 0.15)',
  brown: 'rgba(208, 147, 106, 0.2)',
  grey: 'rgba(56, 56, 56, 0.15)',
  borderSand: 'rgba(252, 228, 210, 0.7)',
  sand: 'rgba(252, 228, 210, 0.3)',
};

export const halfOpacityColors = {
  brown: 'rgba(208, 147, 106, 0.5)',
  lightBrown: 'rgba(255, 248, 243, 0.5)',
  lightBlue: 'rgba(210, 235, 252, 0.5)', // d2ebfc
  sand: 'rgba(252, 228, 210, 0.5)',
};

export const transparentColors: Record<
  string,
  string | Record<number, string>
> = {
  blueHover: 'rgba(210, 235, 252, 0.5)',
  white: {
    0.8: 'rgba(255, 255, 255, 0.8)',
  },
};

export default colors;
