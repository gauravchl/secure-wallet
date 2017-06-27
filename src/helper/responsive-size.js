

const Size = {
  XLG: 1440,
  LG: 1280,
  MD: 960,
  SM: 840,
  XSM: 600,
  XXSM: 480,
}

const Screen = {
  XLG: `@media screen and (max-width:${Size.XLG}px)`,
  LG: `@media screen and (max-width:${Size.LG}px)`,
  MD: `@media screen and (max-width:${Size.MD}px)`,
  SM: `@media screen and (max-width:${Size.SM}px)`,
  XSM: `@media screen and (max-width:${Size.XSM}px)`,
  XXSM: `@media screen and (max-width:${Size.XXSM}px)`,
}

export default { Screen, Size }
export  { Screen, Size }
