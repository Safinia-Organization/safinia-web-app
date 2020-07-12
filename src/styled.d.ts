import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    common: {
      palette: {
        brand: string
        brandGradient: string
        brandGlow: string
        active: string
      }
    }
    mode: {
      background: string
      dropShadow: string
      innerShadow: string
      concaveGradient: string
      text: string
      secondaryText: string
    }
  }
}
