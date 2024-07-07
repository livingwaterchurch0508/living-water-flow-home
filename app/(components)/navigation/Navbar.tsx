"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiMoon, FiSun } from "react-icons/fi";
import Link from "next/link";

import LocaleSwitcher from "@/app/(components)/button/LocaleSwitcher";
import { Menus, ROUTER_PATHS, YOUTUBE_URL } from "@/app/(variables)/constants";
import { useSelectMenu } from "@/app/(util)/hooks/useSelectMenu";
import { FaYoutube } from "react-icons/fa6";

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations("Menu");
  const { colorMode, toggleColorMode } = useColorMode();
  const { handleMenuChange } = useSelectMenu();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <HStack
      px={{ base: "8", sm: "4" }}
      py={{ base: "2", sm: "2" }}
      alignItems="center"
      justifyContent="space-between"
      gap={{ base: "4", sm: "2" }}
      position="sticky"
      top="0"
      backgroundColor={colorMode === "light" ? "white" : "#1a202c"}
      boxShadow={`box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, .1)`}
      backdropFilter={`saturate(180%) blur(8px)`}
      zIndex={1}
    >
      <HStack alignItems="center">
        <Menu>
          <MenuButton
            display={{ sm: "flex", md: "none", base: "flex" }}
            as={IconButton}
            aria-label="Options"
            icon={<RxHamburgerMenu />}
            bg="transparent"
          />
          <MenuList display={{ sm: "block", md: "none" }}>
            <Accordion allowToggle>
              {Menus(t).map((group, i) => (
                <AccordionItem
                  borderTop="none"
                  borderBottom="none"
                  key={`menu-group-${i}`}
                  isFocusable={openIndex === i}
                >
                  <AccordionButton onClick={() => handleToggle(i)}>
                    {group.name}
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    {group.items.map((item, i) => (
                      <MenuItem
                        key={`menu-item-${i}`}
                        onClick={() => handleMenuChange({ ...item })}
                      >
                        <Link
                          href={`/${locale}${ROUTER_PATHS[item.menuTab]}`}
                          style={{ width: "100%" }}
                        >
                          <Text>{item.name}</Text>
                        </Link>
                      </MenuItem>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </MenuList>
        </Menu>

        <Link href={`/${locale}`}>
          <Text fontSize={{ base: "sm", sm: "md" }} fontWeight="bold">
            {t("name")}
          </Text>
        </Link>
      </HStack>
      <HStack>
        <HStack
          gap={{ sm: "4", md: "8" }}
          display={{ sm: "none", md: "flex", base: "none" }}
        >
          {Menus(t).map((group, i) => (
            <Menu key={`menu--b-group-${i}`}>
              <MenuButton>{group.name}</MenuButton>
              <Portal>
                <MenuList>
                  {group.items.map((item, i) => (
                    <MenuItem
                      key={`menu-b-item-${i}`}
                      onClick={() => handleMenuChange({ ...item })}
                    >
                      <Link
                        href={`/${locale}${ROUTER_PATHS[item.menuTab]}`}
                        style={{ width: "100%" }}
                      >
                        <Text>{item.name}</Text>
                      </Link>
                    </MenuItem>
                  ))}
                </MenuList>
              </Portal>
            </Menu>
          ))}
        </HStack>
        <HStack ml={4} gap={0}>
          <LocaleSwitcher />
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            bg="transparent"
          />
          <IconButton
            as="a"
            href={YOUTUBE_URL.CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="youtube"
            icon={
              <FaYoutube
                style={{
                  color: colorMode === "light" ? "#2c3e50" : "white",
                }}
              />
            }
            bg="transparent"
          />
        </HStack>
      </HStack>
    </HStack>
  );
}
