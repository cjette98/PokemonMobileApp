import * as React from 'react'
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

export const themes = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'teal',
    secondary: 'yellow',
  },
}
