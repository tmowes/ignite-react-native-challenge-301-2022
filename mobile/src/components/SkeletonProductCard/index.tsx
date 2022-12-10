import { Box, Skeleton, VStack } from 'native-base'

export function SkeletonProductCard() {
  return (
    <VStack flex={1} maxW="48%" mb="3" alignItems="center" justifyContent="center" h="144px">
      <Box rounded="md" overflow="hidden" w="full" position="relative">
        <Skeleton startColor="$gray.300" endColor="$gray.100" w="full" h="100px" />
        <Skeleton
          startColor="$gray.100"
          endColor="$gray.300"
          size="6"
          rounded="full"
          position="absolute"
          top="1"
          left="1"
        />
        <Skeleton.Text
          lines={1}
          startColor="$gray.300"
          position="absolute"
          top="1"
          right="1"
          w="50%"
          h="3"
          rounded="lg"
          px="2"
        />
      </Box>
      <VStack flex={1} w="full">
        <Skeleton.Text lines={2} px="0" mt="2" startColor="$gray.300" endColor="$gray.100" />
      </VStack>
    </VStack>
  )
}
