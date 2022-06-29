const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.js',
    './components/**/*.js',
    './layouts/**/*.js',
    './lib/**/*.js',
    './context/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: { max: '325px' },
      ...defaultTheme.screens,
    },

    extend: {
      fontSize: {
        '6xl': '3.4rem',
      },
      spacing: {
        '9/16': '56.25%',
        0.75: '0.1875rem',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      backgroundImage: {
        'texture-pattern': "url('/static/images/right-dark-gradient.svg')",
      },
      fontFamily: {
        pjs: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },

      gradientColorStops: {
        // https://coolors.co/2d00f7-6a00f4-8900f2-a100f2-b100e8-bc00dd-d100d1-db00b6-e500a4-f20089
        'gradient-1-start': '#1A29D1',
        'gradient-1-end': '#56BBF1',
        'gradient-2-start': '#FFF338',
        'gradient-2-end': '#99DDCC',
        'gradient-3-start': '#FF5DA2',
        'gradient-3-end': '#D22779',
      },
      colors: {
        primary: colors.violet,
        secondary: colors.gray,
        violet: {
          ...colors.violet,
          30: '#f9f4fc',
          950: '#170a2d',
          1000: '#120724',
        },
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
        spotify: '#1DB954',
      },
      hueRotate: {
        53: '53deg',
      },
      saturate: {
        1000: '10',
      },
      zIndex: {
        '-1': '-1',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '800',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
            },
            p: {
              fontWeight: '400',

              color: theme('colors.gray.600'),
            },
            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '6px',
              paddingRight: '6px',
              paddingTop: '4px',
              paddingBottom: '4px',
              borderRadius: '0.35rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },

            details: {
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.500'),
            },
            strong: { color: theme('colors.gray.600') },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontFamily: theme('fontFamily.Inter'),
              fontWeight: '800',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            p: {
              color: theme('colors.gray.200'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },

            details: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
      keyframes: {
        shrink: {
          '0% , 100%': {
            height: '0.75rem',
          },
          '50%': {
            height: '0.375rem',
          },
        },
        expand: {
          '0% , 100%': {
            height: '0.375rem',
          },
          '50%': {
            height: '0.75rem',
          },
        },
        'gradient-foreground-1': {
          '0%, 16.667%, 100%': {
            opacity: 1,
          },
          '33.333%, 83.333%': {
            opacity: 0,
          },
        },
        'gradient-background-1': {
          '0%, 16.667%, 100%': {
            opacity: 0,
          },
          '25%, 91.667%': {
            opacity: 1,
          },
        },
        'gradient-foreground-2': {
          '0%, 100%': {
            opacity: 0,
          },
          '33.333%, 50%': {
            opacity: 1,
          },
          '16.667%, 66.667%': {
            opacity: 0,
          },
        },
        'gradient-background-2': {
          '0%, to': {
            opacity: 1,
          },
          '33.333%, 50%': {
            opacity: 0,
          },
          '25%, 58.333%': {
            opacity: 1,
          },
        },
        'gradient-foreground-3': {
          '0%, 50%, 100%': {
            opacity: 0,
          },
          '66.667%, 83.333%': {
            opacity: 1,
          },
        },
        'gradient-background-3': {
          '0%, 58.333%, 91.667%, 100%': {
            opacity: 1,
          },
          '66.667%, 83.333%': {
            opacity: 0,
          },
        },
        'gradient-background-4': {
          '0%, 58.333%, 91.667%, 100%': {
            opacity: 1,
          },
          '66.667%, 83.333%': {
            opacity: 0.7,
          },
        },
      },
      animation: {
        shrink: 'shrink 1.5s infinite',
        expand: 'expand 1.5s infinite',
        'gradient-background-1': 'gradient-background-1 8s infinite',
        'gradient-foreground-1': 'gradient-foreground-1 8s infinite',
        'gradient-background-2': 'gradient-background-2 8s infinite',
        'gradient-foreground-2': 'gradient-foreground-2 8s infinite',
        'gradient-background-3': 'gradient-background-3 8s infinite',
        'gradient-foreground-3': 'gradient-foreground-3 8s infinite',
        'gradient-background-4': 'gradient-background-4 4s infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        })
        isFirefoxRule.append(container.nodes)
        container.append(isFirefoxRule)
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(`firefox${separator}${rule.selector.slice(1)}`)}`
        })
      })
    }),
  ],
}
