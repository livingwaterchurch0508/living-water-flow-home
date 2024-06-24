import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const getTheme = () => {
  const fonts = {
    heading: `'Noto Sans', sans-serif`,
    body: `'Noto Sans', sans-serif`,
  };

  const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
  };

  return extendTheme({
    config,
    fonts,
    styles: {
      global: {
        "html, body": {},
      },
    },
  });
};

export default getTheme;
