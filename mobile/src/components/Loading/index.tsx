import { Center, Spinner } from 'native-base'

export function Loading() {
  return (
    <Center flex={1} bg="transparent">
      <Spinner color="$blue.500" size={48} />
    </Center>
  )
}
