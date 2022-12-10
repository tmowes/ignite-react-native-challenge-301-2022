import { Heading, Text, Center } from 'native-base'

export function PreviewHeader() {
  return (
    <Center bg="$blue.700" w="full" pl="6" pr="2.5" pt="8" pb="2">
      <Heading fontSize="md" color="$gray.100" lineHeight="xl">
        Pré visualização do anúncio
      </Heading>
      <Text fontSize="sm" color="$gray.100">
        É assim que seu produto vai aparecer!
      </Text>
    </Center>
  )
}
