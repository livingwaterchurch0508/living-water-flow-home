import React from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tab,
  TabList,
  Tabs,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useTranslations } from "next-intl";

import { useSearchStore } from "@/app/(store)/search-store";
import { useSoulTypeStore } from "@/app/(store)/soul-type-store";
import { useSelectMenu } from "@/app/(util)/hooks/useSelectMenu";
import { MENU_TAB, SERMON_TAB, SOUL_TYPE } from "@/app/(variables)/enums";
import { SOUL_CATEGORY } from "@/app/(variables)/constants";

export default function SearchBar() {
  const t = useTranslations("Menu.Sermon");
  const { colorMode } = useColorMode();

  const { search, setSearch } = useSearchStore((state) => state);
  const { menuTab, detailTab } = useSelectMenu();
  const { setSoulType } = useSoulTypeStore((state) => state);

  return (
    <VStack my={4}>
      <VStack w="100%">
        {menuTab === MENU_TAB.SERMON && detailTab === SERMON_TAB.SOUL && (
          <Box
            overflowX="auto"
            sx={{
              "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari, Opera
              "-ms-overflow-style": "none", // IE and Edge
              "scrollbar-width": "none", // Firefox
            }}
          >
            <Tabs variant="soft-rounded" size="sm">
              <TabList display="flex">
                <Tab
                  onClick={() => setSoulType(SOUL_TYPE.INTRODUCE)}
                  minW="fit-content"
                >
                  {t(SOUL_CATEGORY[SOUL_TYPE.INTRODUCE])}
                </Tab>
                <Tab
                  onClick={() => setSoulType(SOUL_TYPE.MISSION)}
                  minW="fit-content"
                >
                  {t(SOUL_CATEGORY[SOUL_TYPE.MISSION])}
                </Tab>
                <Tab
                  onClick={() => setSoulType(SOUL_TYPE.SPIRIT)}
                  minW="fit-content"
                >
                  {t(SOUL_CATEGORY[SOUL_TYPE.SPIRIT])}
                </Tab>
              </TabList>
            </Tabs>
          </Box>
        )}
        {menuTab === MENU_TAB.NEWS && (
          <InputGroup w="calc(90% - 28px)">
            <InputLeftElement>
              <BiSearch
                style={{ color: colorMode === "light" ? "gray" : "white" }}
              />
            </InputLeftElement>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} />
            <InputRightElement>
              <AiOutlineCloseCircle
                onClick={() => setSearch("")}
                cursor="pointer"
                style={{ color: colorMode === "light" ? "gray" : "white" }}
              />
            </InputRightElement>
          </InputGroup>
        )}
      </VStack>
    </VStack>
  );
}
