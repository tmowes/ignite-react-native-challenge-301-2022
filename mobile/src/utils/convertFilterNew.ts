export function convertFilterNewQuery(isNew: boolean, isUsed: boolean) {
  if (isNew && isUsed) {
    return ''
  }
  if (isNew && !isUsed) {
    return 'is_new=true'
  }
  if (!isNew && isUsed) {
    return 'is_new=false'
  }
  return ''
}
