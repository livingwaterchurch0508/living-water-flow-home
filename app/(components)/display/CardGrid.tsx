"use client";

import {
  AspectRatio,
  Box,
  Card,
  CardBody,
  HStack,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import YoutubeCard from "@/app/(components)/display/YoutubeCard";
import StorageImage from "@/app/(components)/media/StorageImage";
import { formattedDate } from "@/app/(util)/format/date-formatter";
import { getImageName } from "@/app/(util)/format/name-formatter";
import { ICardItem, IMoveTab } from "@/app/(variables)/interfaces";
import { MENU_TAB, SERMON_TAB, SOUL_TYPE } from "@/app/(variables)/enums";
import { SOUL_CATEGORY } from "@/app/(variables)/constants";
import DetailModalButton from "@/app/(components)/button/DetailModalButton";

interface ICardGrid extends IMoveTab {
  list?: ICardItem[];
  isMain?: boolean;
}

export default function CardGrid({
  list = [],
  menuTab,
  detailTab = 0,
  isMain = false,
}: ICardGrid) {
  const t = useTranslations("Menu.Sermon");
  const { colorMode } = useColorMode();
  const columnCount = useBreakpointValue({
    base: 1, // 모바일
    md: 2, // 태블릿
    lg: 3, // PC
  });

  const DataCard = ({
    content,
    createdAt,
    id,
    image,
    title,
    viewCount = SOUL_TYPE.INTRODUCE,
    youtube,
  }: ICardItem) => {
    return (
      <Card
        mb={
          menuTab === MENU_TAB.SERMON && detailTab === SERMON_TAB.SOUL ? 4 : 0
        }
        display="inline-block"
        w="100%"
        border="none"
        bg={colorMode === "light" ? "#F9FAFB" : "#2D3748"}
      >
        {image && (
          <AspectRatio ratio={4 / 3}>
            <StorageImage
              imageName={getImageName(image)}
              id={id}
              menuTab={menuTab}
              detailTab={detailTab}
            />
          </AspectRatio>
        )}
        {youtube && (
          <YoutubeCard
            youtubeId={youtube}
            id={id}
            menuTab={menuTab}
            detailTab={detailTab}
          />
        )}
        <CardBody>
          <VStack alignItems="flex-start">
            {menuTab === MENU_TAB.SERMON && detailTab === SERMON_TAB.SOUL && (
              <Text
                fontSize={{ sm: "xs", md: "2xs", base: "xs" }}
                color={colorMode === "light" ? "midnightblue" : "white"}
              >
                {(viewCount === SOUL_TYPE.MISSION ||
                  viewCount === SOUL_TYPE.INTRODUCE ||
                  viewCount === SOUL_TYPE.SPIRIT) &&
                  t(SOUL_CATEGORY[viewCount])}
              </Text>
            )}
            <Text
              fontSize={{ sm: "lg", md: "sm", base: "lg" }}
              fontWeight="bold"
              color={
                colorMode === "light"
                  ? menuTab === MENU_TAB.SERMON && detailTab === SERMON_TAB.SOUL
                    ? "black"
                    : "midnightblue"
                  : "white"
              }
              whiteSpace="pre-wrap"
            >
              {title}
            </Text>
            {!(
              menuTab === MENU_TAB.SERMON && detailTab === SERMON_TAB.SOUL
            ) && (
              <Text fontSize={{ sm: "md", md: "xs", base: "md" }}>
                {content}
              </Text>
            )}
            {menuTab === MENU_TAB.SERMON && detailTab === SERMON_TAB.SOUL && (
              <DetailModalButton name={title} desc={content} />
            )}
            {!(
              menuTab === MENU_TAB.SERMON && detailTab === SERMON_TAB.SOUL
            ) && (
              <HStack w="100%">
                <Text
                  fontSize={{ sm: "sm", md: "2xs", base: "sm" }}
                  minW="fit-content"
                  color={colorMode === "light" ? "gray" : "white"}
                >
                  {createdAt && formattedDate(createdAt.toString() || "")}
                </Text>
              </HStack>
            )}
          </VStack>
        </CardBody>
      </Card>
    );
  };

  if (menuTab === MENU_TAB.SERMON && detailTab === SERMON_TAB.SOUL && !isMain) {
    return (
      <Box w="90%" maxW="900px" sx={{ columnCount, columnGap: "1rem" }} mb={4}>
        {list.map((item, i) => (
          <DataCard {...item} key={`card-${i}`} />
        ))}
      </Box>
    );
  }

  return (
    <SimpleGrid
      w="90%"
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      mb={4}
    >
      {list.map((item, i) => (
        <DataCard {...item} key={`card-${i}`} />
      ))}
    </SimpleGrid>
  );
}
