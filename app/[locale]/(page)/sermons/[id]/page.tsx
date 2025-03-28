"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import YoutubeEmbedCard from "@/app/(components)/display/YoutubeEmbedCard";
import DetailCard from "@/app/(components)/display/DetailCard";
import { ISermonsById } from "@/app/(util)/db/mysql/sermons";
import { sermonsFetcher } from "@/app/(util)/fetch/apis";
import { API_PATHS } from "@/app/(variables)/constants";
import { API_ROUTES, MENU_TAB } from "@/app/(variables)/enums";
import { useLocale } from "next-intl";
import { Skeleton } from "@chakra-ui/react";

interface ISermonPage {
  params: {
    id: string;
  };
}

export default function SermonPage({ params: { id } }: ISermonPage) {
  const searchParams = useSearchParams();
  const locale = useLocale();

  const { data, isLoading } = useSWR(
    `${API_PATHS[API_ROUTES.GET_SERMON_BY_ID]}/${id}?type=${searchParams.get("type")}`,
    sermonsFetcher,
    { revalidateOnFocus: false },
  );

  const displayData = () => {
    if (data && data.payload) {
      const payload = data.payload as ISermonsById;
      const findIdx = payload.ids.findIndex((idItem) => idItem.id === +id);
      const isPrev = !!payload.ids[findIdx - 1];
      const isNext = !!payload.ids[findIdx + 1];
      const item = payload.sermons.find((sermon) => sermon.id === +id);

      return (
        <DetailCard
          isPrev={isPrev}
          isNext={isNext}
          findIdx={findIdx}
          ids={payload.ids}
          type={searchParams.get("type") || "0"}
          menuTab={MENU_TAB.SERMON}
          title={locale === "ko" ? item?.name : item?.nameEn}
        >
          {payload.sermons.map((item, i) => (
            <YoutubeEmbedCard
              key={`sermon-${i}`}
              youtubeId={item?.url || ""}
              isAutoPlay={searchParams.get("autoplay") === "1"}
            />
          ))}
        </DetailCard>
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
