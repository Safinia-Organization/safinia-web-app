import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    common: {
      palette: {
        brand: string
        brandGradient: string
        brandGlow: string
        brandGradientActive: string
      }
    }
    mode: {
      background: string
      dropShadow: string
      plainDropShadow: string
      innerShadow: string
      concaveGradient: string
      convexGradient: string
      text: string
      secondaryText: string
      highContrast: string
    }
  }
}
