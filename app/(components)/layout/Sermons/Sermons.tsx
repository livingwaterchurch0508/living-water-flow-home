"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { VStack } from "@chakra-ui/react";

import CardGrid from "@/app/(components)/display/CardGrid";
import SkeletonCardGrid from "@/app/(components)/display/SkeletonCardGrid";
import { useSearchStore } from "@/app/(store)/search-store";
import { useSoulTypeStore } from "@/app/(store)/soul-type-store";
import { ISermons } from "@/app/(util)/db/lib/sermons";
import { useScrollRestoration } from "@/app/(util)/hooks/useScrollRestoration";
import { includeByCho } from "@/app/(util)/search/search-util";
import { sermonsFetcher } from "@/app/(util)/fetch/apis";
import useAbortableSWR from "@/app/(util)/hooks/useAbortableSWR";
import { API_PATHS } from "@/app/(variables)/constants";
import {
  API_ROUTES,
  LOCALE_TYPE,
  MENU_TAB,
  SERMON_TAB,
  SOUL_TYPE,
} from "@/app/(variables)/enums";

interface ISermonsProps {
  type: SERMON_TAB;
}

export default function Sermons({ type }: ISermonsProps) {
  useScrollRestoration();
  const { search } = useSearchStore((state) => state);
  const { soulType } = useSoulTypeStore((state) => state);
  const locale = useLocale();
  const [sermons, setSermons] = useState<ISermons["sermons"]>([]);
  const [filterSermons, setFilterSermons] = useState<ISermons["sermons"]>([]);

  const { data, isLoading } = useAbortableSWR(
    `${API_PATHS[API_ROUTES.GET_SERMONS]}?page=1&limit=1000&type=${type}`,
    sermonsFetcher,
    { revalidateOnFocus: false },
  );

  useEffect(() => {
    if (data && data.payload) {
      const payload = data.payload as ISermons;
      if (Array.isArray(payload?.sermons)) {
        setSermons(payload.sermons);
      }
    }
  }, [data]);

  useEffect(() => {
    if (+type === SERMON_TAB.SOUL) {
      setFilterSermons(
        soulType === SOUL_TYPE.ALL
          ? sermons.filter(
              (sermon) =>
                includeByCho(search, sermon.name) ||
                includeByCho(search, sermon.nameEn) ||
                includeByCho(search, sermon.desc) ||
                includeByCho(search, sermon.name),
            )
          : sermons.filter(
              (sermon) =>
                (includeByCho(search, sermon.name) ||
                  includeByCho(search, sermon.nameEn) ||
                  includeByCho(search, sermon.desc) ||
                  includeByCho(search, sermon.name)) &&
                sermon.viewCount === soulType,
            ),
      );
      return;
    }
    if (!search) {
      setFilterSermons([...sermons]);
      return;
    }

    setFilterSermons(
      sermons.filter(
        (sermon) =>
          includeByCho(search, sermon.name) ||
          includeByCho(search, sermon.nameEn) ||
          includeByCho(search, sermon.desc) ||
          includeByCho(search, sermon.name),
      ),
    );
  }, [search, sermons, soulType, type]);

  const displayData = () => {
    return (
      <VStack>
        {sermons.length === 0 ? (
          <SkeletonCardGrid list={Array.from({ length: 12 })} />
        ) : (
          <CardGrid
            list={filterSermons.map((sermon) => ({
              title: locale === LOCALE_TYPE.KO ? sermon.name : sermon.nameEn,
              content: locale === LOCALE_TYPE.KO ? sermon.desc : sermon.descEn,
              createdAt: sermon.createdAt,
              youtube: sermon.url,
              id: sermon.id,
              viewCount: sermon.viewCount,
            }))}
            menuTab={MENU_TAB.SERMON}
            detailTab={+type}
          />
        )}
      </VStack>
    );
  };

  if (isLoading)
    return (
      <section>
        <VStack>
          <SkeletonCardGrid list={Array.from({ length: 12 })} />
        </VStack>
      </section>
    );
  return <section>{data && data.payload && displayData()}</section>;
}
