"use client";

import useSWR from "swr";
import { VStack } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

import StorageImage from "@/app/(components)/media/StorageImage";
import DetailCard from "@/app/(components)/display/DetailCard";
import YoutubeEmbedCard from "@/app/(components)/display/YoutubeEmbedCard";
import { communitiesFetcher } from "@/app/(util)/fetch/apis";
import { ICommunitiesById } from "@/app/(util)/db/lib/communities";
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
              />
            ))}
          </DetailCard>
        );
      }

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
          <VStack gap={4}>
            {payload.communities.length > 0 &&
              payload.communities[0].files.map((file) => {
                const array = [];
                if (file.caption === null) return <></>;
                const count = +file?.caption || 1;

                for (let i = 1; i < count + 1; i++) {
                  if (file.url === null) return <></>;

                  array.push(
                    <StorageImage
                      key={`image-${i}`}
                      imageName={getImageName(file.url, i)}
                      menuTab={MENU_TAB.NEWS}
                    />,
                  );
                }

                return array;
              })}
          </VStack>
        </DetailCard>
      );
    }

    return null;
  };

  if (isLoading) return <section>loading...</section>;

  return <section>{data && data.payload && displayData()}</section>;
}
