import { preset } from '@rebass/preset'

export const theme = {
  ...preset,
  fonts: {
    ...preset.fonts,
    body: `Niramit, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    heading: `Kanit, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
  },
  text: {
    ...preset.text,
  },
  variants: {
    ...preset.variants,
    card: {
      p: 0,
      fontSize: 2,
      fontFamily: 'body',
      lineHeight: 'body',
    },
    link: {
      fontFamily: 'body',
      lineHeight: 'body',
    },
  },
}
