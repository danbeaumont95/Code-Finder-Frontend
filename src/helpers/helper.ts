import { backwardsLanguageLookup } from '../Constants/languageOptions';
import Lookups from '../Lookups/lookups'
const { placeholderLookup } = Lookups;

function objectFlip(obj: {[key: string]: string}) {
  return Object.entries(obj).reduce((acc: any, [key, value]) => (acc[value] = key, acc), {})
}

const replaceString = (str: string, field: string) => {
  return str.replace(/this field/gi, objectFlip(placeholderLookup)[field])
}

export const changeTitleToFileType = (title: string) => {
  const subString = title.split('.')[1];;
  const fileType = backwardsLanguageLookup[subString];
  return fileType
}

const Helpers = {
  objectFlip,
  replaceString
};

export default Helpers;
