import React, { useState } from "react"
import { Helmet } from "react-helmet"

import { ThemeProvider, createGlobalStyle } from "styled-components"
import { theme, ThemeToggle } from "../theme"

import "normalize.css"
import "focus-visible/dist/focus-visible.js"

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
  }
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }
`

enum ThemeMode {
  Light = "light",
  Dark = "dark",
}

const App: React.FC = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(ThemeMode.Light)
  const toggleMode = (): void => {
    mode === ThemeMode.Light
      ? setMode(ThemeMode.Dark)
      : setMode(ThemeMode.Light)
  }
  return (
    <React.Fragment>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />
      <ThemeToggle.Provider value={toggleMode}>
        <ThemeProvider
          theme={Object.assign(
            {},
            { mode: theme[mode] },
            { common: theme.common }
          )}
        >
          {children}
        </ThemeProvider>
      </ThemeToggle.Provider>
    </React.Fragment>
  )
}
export default App
