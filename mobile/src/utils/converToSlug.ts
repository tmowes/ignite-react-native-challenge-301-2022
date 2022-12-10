export const convertToSlug = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .toLowerCase()
    .replace(/\s+/g, '-') // spaces to dashes
    .replace(/&/g, '-and-') // ampersand to and
    .replace(/[^\w-]+/g, '') // remove non-words
    .replace(/--+/g, '-') // collapse multiple dashes
    .replace(/^-+/, '') // trim starting dash
    .replace(/-+$/, '') // trim ending dash
