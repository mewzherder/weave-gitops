// Typescript will handle type-checking/linting for this file
/* eslint-disable */
import { createMuiTheme } from "@material-ui/core";
import { createGlobalStyle, DefaultTheme } from "styled-components";
// @ts-ignore
import ProximaNovaBold from "url:../fonts/ProximaNovaBold.otf";
// @ts-ignore
import ProximaNovaRegular from "url:../fonts/ProximaNovaRegular.otf";
// @ts-ignore
import robotomono from "url:../fonts/roboto-mono-regular.woff";

const baseSpacingNumber = 16;

export const theme: DefaultTheme = {
  fontFamilies: {
    monospace: "'Roboto Mono', monospace",
    regular: "'proxima-nova', Helvetica, Arial, sans-serif",
  },
  fontSizes: {
    huge: "48px",
    extraLarge: "32px",
    large: "22px",
    normal: "16px",
    small: "14px",
    tiny: "12px",
  },
  colors: {
    black: "#1a1a1a",
    white: "#fff",
    primary: "#00b3ec",
    success: "#27AE60",
  },
  spacing: {
    // 16px
    base: `${baseSpacingNumber}px`,
    // 32px
    large: `${baseSpacingNumber * 2}px`,
    // 24px
    medium: `${baseSpacingNumber * 1.5}px`,
    none: "0",
    // 12px
    small: `${baseSpacingNumber * 0.75}px`,
    // 48px
    xl: `${baseSpacingNumber * 3}px`,
    // 8px
    xs: `${baseSpacingNumber * 0.5}px`,
    // 64px
    xxl: `${baseSpacingNumber * 4}px`,
    // 4px
    xxs: `${baseSpacingNumber * 0.25}px`,
  },
};

export default theme;

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'proxima-nova';
    src: url(${ProximaNovaRegular})
  }
  @font-face {
    font-family: 'proxima-nova';
    src: url(${ProximaNovaBold});
    font-weight: bold;
  }
  @font-face {
    font-family: 'Roboto Mono';
    src: url(${robotomono})
  }

  html,
  body {
    height: 100%;
    margin: 0;
  }

  #app {
    display: flex;
    flex-flow: column;
    height: 100%;
    margin: 0;
  }
  
  body {
    font-family: ${(props) => props.theme.fontFamilies.regular};
    font-size: ${theme.fontSizes.normal};
    padding: 0;
    margin: 0;
    min-width: fit-content;
  }
`;

export const muiTheme = createMuiTheme({
  typography: { fontFamily: "proxima-nova" },
});
