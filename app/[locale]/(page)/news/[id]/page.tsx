"use client";

import useSWR from "swr";
import { Skeleton, VStack } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import DetailCard from "@/app/(components)/display/DetailCard";
import StorageArrayImage from "@/app/(components)/media/StorageArrayImage";
import YoutubeEmbedCard from "@/app/(components)/display/YoutubeEmbedCard";
import { communitiesFetcher } from "@/app/(util)/fetch/apis";
import { ICommunitiesById } from "@/app/(util)/db/mysql/communities";
import { getImageName } from "@/app/(util)/format/name-formatter";
import { API_PATHS } from "@/app/(variables)/constants";
import { API_ROUTES, MENU_TAB } from "@/app/(variables)/enums";

interface INewsPage {
  params: {
    id: string;
  };
}

export default function NewsPage({ params: { id } }: INewsPage) {
  const searchParams = useSearchParams();
  const locale = useLocale();

  const { data, isLoading } = useSWR(
    `${API_PATHS[API_ROUTES.GET_COMMUNITY_BY_ID]}/${id}?type=${searchParams.get("type")}`,
    communitiesFetcher,
    { revalidateOnFocus: false },
  );
  const displayData = () => {
    if (data && data.payload) {
      const payload = data.payload as ICommunitiesById;

      const findIdx = payload.ids.findIndex((idItem) => idItem.id === +id);
      const isPrev = !!payload.ids[findIdx - 1];
      const isNext = !!payload.ids[findIdx + 1];
      const item = payload.communities.find(
        (community) => community.id === +id,
      );

      if (item?.url) {
        return (
          <DetailCard
            isPrev={isPrev}
            isNext={isNext}
            findIdx={findIdx}
            ids={payload.ids}
            type={searchParams.get("type") || "0"}
            menuTab={MENU_TAB.NEWS}
            title={locale === "ko" ? item?.name : item?.nameEn}
          >
            {payload.communities.map((item, i) => (
              <YoutubeEmbedCard
                key={`sermon-${i}`}
                youtubeId={item?.url || ""}
                isAutoPlay={searchParams.get("autoplay") === "1"}
              />
            ))}
          </DetailCard>
        );
      }

      const imageNames: string[] = [];
      payload.communities[0].files.forEach((file) => {
        if (!file.caption || !file.url) return <></>;
        const count = +file?.caption || 1;

        for (let i = 1; i < count + 1; i++) {
          imageNames.push(getImageName(file.url, i));
        }
      });

      return (
        <PhotoProvider>
          <DetailCard
            isPrev={isPrev}
            isNext={isNext}
            findIdx={findIdx}
            ids={payload.ids}
            type={searchParams.get("type") || "0"}
            menuTab={MENU_TAB.NEWS}
            title={locale === "ko" ? item?.name : item?.nameEn}
          >
            <VStack gap={4}>
              <StorageArrayImage
                imageNames={imageNames}
                menuTab={MENU_TAB.NEWS}
              />
            </VStack>
          </DetailCard>
        </PhotoProvider>
      );
    }

    return null;
  };

  if (isLoading)
    return (
      <section>
        <Skeleton w="100%" h="200px" />
      </section>
    );

  return <section>{data && data.payload && displayData()}</section>;
}
