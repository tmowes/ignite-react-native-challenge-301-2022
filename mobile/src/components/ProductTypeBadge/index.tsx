import { Flex, Heading } from 'native-base'

import { ProductTypeBadgeProps } from './types'

export function ProductTypeBadge(props: ProductTypeBadgeProps) {
  const { type = 'used', ...attrs } = props
  return (
    <Flex
      bgColor={type === 'used' ? '$gray.600' : '$blue.500'}
      rounded="full"
      px="2"
      align="center"
      {...attrs}
    >
      <Heading fontSize="10px" color="$gray.100" textTransform="uppercase">
        {type === 'used' ? 'Usado' : 'Novo'}
      </Heading>
    </Flex>
  )
}
