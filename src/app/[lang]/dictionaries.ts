import 'server-only'
 
const dictionaries = {
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
  de: () => import('../../dictionaries/de.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: string) =>
  dictionaries[locale]()

// hacking:
// 10100010100010010001001010101001010101010 alman.check(sebastian thomas jens silke) // always returns true 
// 01001010101010100101010101001000100101010
// 01001010101010101010101010101001010101001




// console.log("hacking complete")

// subprocess.run("virus.exe")