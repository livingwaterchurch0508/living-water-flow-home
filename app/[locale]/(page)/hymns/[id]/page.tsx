"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import YoutubeEmbedCard from "@/app/(components)/display/YoutubeEmbedCard";
import DetailCard from "@/app/(components)/display/DetailCard";
import { hymnsFetcher } from "@/app/(util)/fetch/apis";
import { IHymnsById } from "@/app/(util)/db/mysql/hymns";
import { API_PATHS } from "@/app/(variables)/constants";
import { API_ROUTES, MENU_TAB } from "@/app/(variables)/enums";
import { useLocale } from "next-intl";

interface IHymnPage {
  params: {
    id: string;
  };
}

export default function HymnPage({ params: { id } }: IHymnPage) {
  const searchParams = useSearchParams();
  const locale = useLocale();

  const { data, isLoading } = useSWR(
    `${API_PATHS[API_ROUTES.GET_HYMN_BY_ID]}/${id}?type=${searchParams.get("type")}`,
    hymnsFetcher,
    { revalidateOnFocus: false },
  );

  const displayData = () => {
    if (data && data.payload) {
      const payload = data.payload as IHymnsById;
      const findIdx = payload.ids.findIndex((idItem) => idItem.id === +id);
      const isPrev = !!payload.ids[findIdx - 1];
      const isNext = !!payload.ids[findIdx + 1];
      const item = payload.hymns.find((hymn) => hymn.id === +id);

      return (
        <DetailCard
          isPrev={isPrev}
          isNext={isNext}
          findIdx={findIdx}
          ids={payload.ids}
          type={searchParams.get("type") || "0"}
          menuTab={MENU_TAB.HYMN}
          title={locale === "ko" ? item?.name : item?.nameEn}
        >
          {payload.hymns.map((item, i) => (
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

  if (isLoading) return <section>loading...</section>;

  return <section>{data && data.payload && displayData()}</section>;
}
