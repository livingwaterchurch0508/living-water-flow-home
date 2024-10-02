"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { VStack } from "@chakra-ui/react";

import CardGrid from "@/app/(components)/display/CardGrid";
import SkeletonCardGrid from "@/app/(components)/display/SkeletonCardGrid";
import { API_PATHS } from "@/app/(variables)/constants";
import {
  API_ROUTES,
  HYMN_TAB,
  LOCALE_TYPE,
  MENU_TAB,
} from "@/app/(variables)/enums";
import { useScrollRestoration } from "@/app/(util)/hooks/useScrollRestoration";
import { IHymns } from "@/app/(util)/db/lib/hymns";
import { useSearchStore } from "@/app/(store)/search-store";
import { includeByCho } from "@/app/(util)/search/search-util";
import useAbortControllerSWR from "@/app/(util)/hooks/useAbortControllerSWR";
import { hymnsFetcher } from "@/app/(util)/fetch/apis";

interface IHymnsProps {
  type: HYMN_TAB;
}

export default function Hymns({ type }: IHymnsProps) {
  useScrollRestoration();
  const { search } = useSearchStore((state) => state);
  const locale = useLocale();
  const [hymns, setHymns] = useState<IHymns["hymns"]>([]);
  const [filterHymns, setFilterHymns] = useState<IHymns["hymns"]>([]);

  const { data, isLoading } = useAbortControllerSWR(
    `${API_PATHS[API_ROUTES.GET_HYMNS]}?page=1&limit=1000&type=${type}`,
    hymnsFetcher,
    { revalidateOnFocus: false },
  );

  useEffect(() => {
    if (data && data.payload) {
      const payload = data.payload as IHymns;
      if (Array.isArray(payload?.hymns)) {
        setHymns(payload.hymns);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!search) {
      setFilterHymns([...hymns]);
      return;
    }

    setFilterHymns(
      hymns.filter(
        (hymn) =>
          includeByCho(search, hymn.name) ||
          includeByCho(search, hymn.nameEn) ||
          includeByCho(search, hymn.desc) ||
          includeByCho(search, hymn.name),
      ),
    );
  }, [search, hymns]);

  const displayData = () => {
    return (
      <VStack>
        {hymns.length === 0 ? (
          <SkeletonCardGrid list={Array.from({ length: 12 })} />
        ) : (
          <CardGrid
            list={filterHymns.map((hymn) => ({
              title: locale === LOCALE_TYPE.KO ? hymn.name : hymn.nameEn,
              content: locale === LOCALE_TYPE.KO ? hymn.desc : hymn.descEn,
              createdAt: hymn.createdAt,
              id: hymn.id,
              youtube: hymn.url,
            }))}
            menuTab={MENU_TAB.HYMN}
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
