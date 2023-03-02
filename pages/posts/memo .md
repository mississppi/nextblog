ローカルにchkrauiを作ってみた

# プロジェクト作成からplugin導入まで
yarn create react-app chakra-react-practice --template @chakra-ui/typescript

yarn add react-router-dom

## chakraメモ

```
//とりあえずこれで包む
<ChakraProvider theme={theme}></ChakraProvider>

//Flexで横幅制御
<Flex w="100vw" h="100wh">

//Boxはただのdivと考える
<Box w="20vw" m="20px">
<Box w="70vw">

//ルーティングにこれ必要
import { BrowserRouter, Routes, Route } from "react-router-dom";

//これもいる
<BrowserRouter>

  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>

```