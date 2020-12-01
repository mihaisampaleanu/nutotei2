const mnemonics = {
  AB: "Alba",
  AG: "Argeș",
  AR: "Arad",
  B: "București",
  BC: "Bacău",
  BH: "Bihor",
  BN: "Bistrița-Năsăud",
  BR: "Brăila",
  BT: "Botoșani",
  BV: "Brașov",
  BZ: "Buzău",
  CJ: "Cluj",
  CL: "Călărași",
  CS: "Caraș-Severin",
  CT: "Constanța",
  CV: "Covasna",
  DB: "Dâmbovița",
  DJ: "Dolj",
  GJ: "Gorj",
  GL: "Galați",
  GR: "Giurgiu",
  HD: "Hunedoara",
  HR: "Harghita",
  IF: "Ilfov",
  IL: "Ialomița",
  IS: "Iași",
  MH: "Mehedinți",
  MM: "Maramureș",
  MS: "Mureș",
  NT: "Neamț",
  OT: "Olt",
  PH: "Prahova",
  SB: "Sibiu",
  SJ: "Sălaj",
  SM: "Satu Mare",
  SV: "Suceava",
  TL: "Tulcea",
  TM: "Timiș",
  TR: "Teleorman",
  VL: "Vâlcea",
  VN: "Vrancea",
  VS: "Vaslui",
}

const getCountyCodeByName = (name: string) => {
  const foundCountyCode = Object.keys(mnemonics).find((item) => {
    return mnemonics[item] === name
  })

  return foundCountyCode
}

export { getCountyCodeByName }