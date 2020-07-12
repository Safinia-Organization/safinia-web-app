import { createContext } from "react"

export const theme = {
  common: {
    palette: {
      brand: "#8f47c9",
      brandGradient: "linear-gradient(0deg, #8E2DE2, #4A00E0)",
      brandGlow: "0px 0px 10px  #8f47c9",
      brandGradientActive: "linear-gradient(0deg, #6617ab, #310094)",
    },
  },
  light: {
    background: "#fff",
    innerShadow: "inset 5px 5px 10px #b3b3b3, inset -5px -5px 10px #ffffff",
    concaveGradient: "linear-gradient(145deg, #ffffff, #e6e6e6)",
    convexGradient: "linear-gradient(145deg, #e6e6e6, #ffffff)",
    dropShadow: "5px 5px 10px #999999, -5px -5px 10px #ffffff",
    plainDropShadow: "5px 5px 5px #999999",
    text: "rgba(0, 0, 0, 0.9)",
    secondaryText: "rgba(0, 0, 0, 0.6)",
    highContrast: "#000",
  },
  dark: {
    background: "#242424",
    innerShadow: "inset 5px 5px 10px #161616, inset -5px -5px 10px #323232",
    concaveGradient: "linear-gradient(145deg, #272727, #202020)",
    convexGradient: "linear-gradient(145deg, #202020, #272727)",
    dropShadow: "5px 5px 10px #161616, -5px -5px 10px #323232",
    plainDropShadow: "5px 5px 10px #161616",
    text: "#fff",
    secondaryText: "rgba(255, 255, 255, 0.7)",
    highContrast: "#fff",
  },
}

export enum ThemeMode {
  Light = "light",
  Dark = "dark",
}

export const ThemeToggle = createContext({
  toggleMode: (): void =>
    console.error("toggleMode must be used within a ThemeToggle context"),
  mode: ThemeMode.Light,
})
