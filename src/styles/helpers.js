import { css } from 'styled-components';

export const DEVICE_SIZES = {
  desktopXL: 1800,
  desktop: 1200,
  tablet: 900,
  phone: 625
};

for (let px = 350; px <= 1800; px += 50) {
  DEVICE_SIZES[`px${px}`] = px;
}

// Iterate DEVICE_SIZES and create a media template
export const mediaQuery = {};
mediaQuery.above = Object.keys(DEVICE_SIZES).reduce((obj, label) => {
  obj[label] = (...args) => css`
    @media (min-width: ${DEVICE_SIZES[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return obj;
}, {});
mediaQuery.below = Object.keys(DEVICE_SIZES).reduce((obj, label) => {
  obj[label] = (...args) => css`
    @media (max-width: ${DEVICE_SIZES[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return obj;
}, {});

const parseHslString = hsl => {
  const values = /hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*)?([\d.]+)?\)/g.exec(hsl);
  if (values) {
    return values.slice(1).map(v => (v === undefined ? null : Number(v)));
  } else {
    console.warn('Invalid HSL value, returning black');
    return [0, 0, 0, 0];
  }
};

export const adjustHsl = (hsl, values) => {
  values = { h: 0, s: 0, l: 0, a: 1, ...values };
  const [h, s, l, a] = parseHslString(hsl);
  const dH = h + values.h;
  const dS = s + values.s;
  const dL = l + values.l;
  const dA = values.a;
  return `hsla(${dH}, ${dS}%, ${dL}%, ${dA})`;
};
