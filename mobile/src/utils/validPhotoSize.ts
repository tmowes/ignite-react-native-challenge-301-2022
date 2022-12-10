export function validPhotoSize(size: number, limitInMb = 2) {
  return size / 1024 / 1024 > limitInMb
}
