/* eslint-disable sonarjs/no-duplicate-string */
import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    $blue: {
      700: '#647AC7',
      500: '#364D9D',
      100: '#E0E1EB',
    },
    $alpha: {
      60: '#1A181B99',
      50: '#1A181B80',
      33: '#1A181B54',
    },
    $gray: {
      700: '#1A181B',
      600: '#3E3A40',
      500: '#5F5B62',
      400: '#9F9BA1',
      300: '#D9D8DA',
      200: '#EDECEE',
      100: '#F7F7F8',
    },
    $white: '#FFFFFF',
    $red: {
      500: '#EE7979',
    },
  },
  fonts: {
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148,
  },
  components: {
    Button: {
      baseStyle: () => ({
        mb: 3,
        h: 12,
        w: 'full',

        variant: '$solid',
        _text: {
          color: '$white',
          fontFamily: 'heading',
          fontSize: 'sm',
        },
      }),
      defaultProps: () => ({
        variant: '$solid',
      }),
      variants: {
        $solid: (props: any) => ({
          rounded: 'md',
          bg: '$blue.700',
          _pressed: {
            bg: '$blue.500',
          },
          _text: {
            color: '$white',
            fontFamily: 'heading',
            fontSize: 'sm',
          },
          ...props,
        }),
        $cancel: (props: any) => ({
          rounded: 'md',
          bg: '$gray.300',
          _pressed: {
            bg: '$gray.400',
          },
          _text: {
            color: '$gray.700',
            fontFamily: 'heading',
            fontSize: 'sm',
          },
          ...props,
        }),
        $continue: (props: any) => ({
          rounded: 'md',
          bg: '$gray.700',
          _pressed: {
            bg: '$gray.600',
          },
          _text: {
            color: '$gray.100',
            fontFamily: 'heading',
            fontSize: 'sm',
          },
          ...props,
        }),
        $outline: (props: any) => ({
          rounded: 'md',
          bg: 'transparent',
          borderWidth: 1,
          borderColor: '$blue.700',
          _pressed: {
            borderWidth: 1,
            borderColor: '$gray.500',
            bg: '$gray.500',
          },
          _text: {
            color: '$blue.500',
          },
          ...props,
        }),
        $link: (props: any) => ({
          _text: {
            color: '$blue.500',
            fontWeight: 'bold',
            fontSize: 'md',
          },
          _pressed: {
            _text: {
              color: '$blue.700',
            },
          },
          ...props,
        }),
      },
    },
    Input: {
      baseStyle: {},
      defaultProps: {
        placeholderTextColor: '$gray.400',
        bg: '$gray.100',
        h: 12,
        px: 4,
        borderWidth: 0,
        borderColor: '$gray.600',
        fontFamily: 'body',
        color: '$gray.600',
        fontSize: 'sm',
        rounded: 'md',
        w: 'full',
        _focus: {
          borderColor: '$gray.500',
          bg: '$gray.100',
          borderWidth: 1,
        },
        _invalid: {
          borderColor: '$red.500',
          bg: '$gray.100',
          borderWidth: 1,
        },
      },
    },
    Avatar: {
      defaultProps: {
        borderWidth: 2,
        borderColor: '$blue.700',
      },
    },
    TextArea: {
      baseStyle: {},
      defaultProps: {
        placeholderTextColor: '$gray.400',
        bg: '$gray.100',
        borderColor: '$gray.600',
        px: 4,
        borderWidth: 0,
        fontFamily: 'body',
        color: '$gray.600',
        fontSize: 'sm',
        rounded: 'md',
        w: 'full',
        h: 48,
        _focus: {
          borderColor: '$gray.500',
          bg: '$gray.100',
          borderWidth: 1,
        },
        _invalid: {
          borderColor: '$red.500',
          bg: '$gray.100',
          borderWidth: 1,
        },
      },
    },
    IconButton: {
      defaultProps: {
        colorScheme: 'gray',
        bg: 'transparent',
        borderRadius: 'full',
      },
    },
    Heading: {
      defaultProps: {
        color: '$gray.700',
        fontFamily: 'Karla_700Bold',
        letterSpacing: 'xl',
      },
    },
    Text: {
      defaultProps: {
        color: '$gray.700',
        fontFamily: 'Karla_400Regular',
      },
    },
    ScrollView: {
      defaultProps: {
        contentContainerStyle: {
          flexGrow: 1,
          paddingBottom: 32,
        },
        showsVerticalScrollIndicator: false,
      },
    },
    FlatList: {
      defaultProps: {
        bg: 'transparent',
        showsVerticalScrollIndicator: false,
        contentContainerStyle: {
          flexGrow: 1,
          paddingBottom: 32,
        },
      },
      variants: {
        horizontal: {
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          my: '8',
          _contentContainerStyle: {
            px: '8',
          },
        },
        vertical: {
          showsVerticalScrollIndicator: false,
          _contentContainerStyle: {
            pb: '12',
          },
        },
      },
    },
    SectionList: {
      defaultProps: {
        contentContainerStyle: {
          flexGrow: 1,
          paddingBottom: 32,
        },
        showsVerticalScrollIndicator: false,
      },
    },
    Radio: {
      defaultProps: {
        size: 'md',
        colorScheme: 'muted',
        borderColor: '$gray.400',
        borderWidth: 1.5,
        bg: '$gray.200',
        p: '0.5',
        _checked: {
          borderColor: '$blue.700',
          _icon: {
            color: '$blue.700',
            size: 3,
            rounded: 'full',
          },
        },
        _icon: {
          color: '$blue.700',
          size: 3,
          rounded: 'full',
        },
      },
    },
    Checkbox: {
      defaultProps: {
        size: 'md',
        colorScheme: 'muted',
        borderColor: '$gray.400',
        borderWidth: 2,
        my: '1',
        bg: 'transparent',
        p: '0.5',
        _text: {
          color: '$gray.600',
          fontSize: 'sm',
          ml: '0',
        },
        _checked: {
          borderColor: '$blue.700',
          bg: '$blue.700',
          _icon: {
            color: '$gray.100',
            size: 3,
          },
        },
        _icon: {
          color: 'transparent',
          size: 3,
        },
      },
    },
  },
  config: {
    initialColorMode: 'dark',
  },
})

type CustomThemeType = typeof theme

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
