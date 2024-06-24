import React from "react";
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useTranslations } from "next-intl";

import { useSearchStore } from "@/app/(store)/search-store";
import { useSoulTypeStore } from "@/app/(store)/soul-type-store";
import { useSelectMenu } from "@/app/(util)/hooks/useSelectMenu";
import { MENU_TAB, SERMON_TAB, SOUL_TYPE } from "@/app/(variables)/enums";
import { SOUL_CATEGORY } from "@/app/(variables)/constants";

interface ISearchBar {
  menuTab: MENU_TAB;
}

export default function SearchBar({ menuTab }: ISearchBar) {
  const t = useTranslations("Menu.Sermon");
  const { colorMode } = useColorMode();

  const { search, setSearch } = useSearchStore((state) => state);
  const { detailTab } = useSelectMenu({
    menuTab,
  });
  const { soulType, setSoulType } = useSoulTypeStore((state) => state);

  return (
    <VStack my={4}>
      {menuTab === MENU_TAB.SERMON && detailTab === SERMON_TAB.SOUL ? (
        <HStack w="calc(90% - 28px)">
          <Menu>
            <MenuButton
              gap={4}
              as={Button}
              minW={120}
              fontSize={{ sm: "sm", md: "sm", base: "sm" }}
              rightIcon={<BiChevronDown />}
            >
              {t(SOUL_CATEGORY[soulType])}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setSoulType(SOUL_TYPE.ALL)}>
                {t(SOUL_CATEGORY[SOUL_TYPE.ALL])}
              </MenuItem>
              <MenuItem onClick={() => setSoulType(SOUL_TYPE.PRINCIPLE)}>
                {t(SOUL_CATEGORY[SOUL_TYPE.PRINCIPLE])}
              </MenuItem>
              <MenuItem onClick={() => setSoulType(SOUL_TYPE.LESSON)}>
                {t(SOUL_CATEGORY[SOUL_TYPE.LESSON])}
              </MenuItem>
            </MenuList>
          </Menu>
          <InputGroup>
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
        </HStack>
      ) : (
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
  );
}
