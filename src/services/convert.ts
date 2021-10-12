export function convertString(str: string): string {
  let newString = str.replace(/&quot;/g, '"');
  newString = newString.replace(/&#039;/g, "'");
  newString = newString.replace(/&shy;/g, "");

  return newString;
}
