"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { VStack } from "@chakra-ui/react";

import CardGrid from "@/app/(components)/display/CardGrid";
import SkeletonCardGrid from "@/app/(components)/display/SkeletonCardGrid";
import { API_PATHS } from "@/app/(variables)/constants";
import {
  API_ROUTES,
  LOCALE_TYPE,
  MENU_TAB,
  NEWS_TYPES,
} from "@/app/(variables)/enums";
import { useScrollRestoration } from "@/app/(util)/hooks/useScrollRestoration";
import { ICommunities } from "@/app/(util)/db/lib/communities";
import { useSearchStore } from "@/app/(store)/search-store";
import { includeByCho } from "@/app/(util)/search/search-util";
import { communitiesFetcher } from "@/app/(util)/fetch/apis";
import useAbortableSWR from "@/app/(util)/hooks/useAbortableSWR";

interface INews {
  type: NEWS_TYPES;
}

export default function News({ type }: INews) {
  useScrollRestoration();
  const { search } = useSearchStore((state) => state);
  const locale = useLocale();
  const [communities, setCommunities] = useState<ICommunities["communities"]>(
    [],
  );
  const [filterCommunities, setFilterCommunities] = useState<
    ICommunities["communities"]
  >([]);

  const { data, isLoading } = useAbortableSWR(
    `${API_PATHS[API_ROUTES.GET_COMMUNITIES]}?page=1&limit=1000&type=${type}`,
    communitiesFetcher,
    { revalidateOnFocus: false },
  );

  useEffect(() => {
    if (data && data.payload) {
      const payload = data.payload as ICommunities;
      if (Array.isArray(payload?.communities)) {
        setCommunities(payload.communities);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!search) {
      setFilterCommunities([...communities]);
      return;
    }

    setFilterCommunities(
      communities.filter(
        (community) =>
          includeByCho(search, community.name) ||
          includeByCho(search, community.nameEn) ||
          includeByCho(search, community.desc) ||
          includeByCho(search, community.name),
      ),
    );
  }, [search, communities]);

  const displayData = () => {
    return (
      <VStack>
        {communities.length === 0 ? (
          <SkeletonCardGrid list={Array.from({ length: 12 })} />
        ) : (
          <CardGrid
            list={filterCommunities.map((community) => ({
              title:
                locale === LOCALE_TYPE.KO ? community.name : community.nameEn,
              content:
                locale === LOCALE_TYPE.KO ? community.desc : community.descEn,
              createdAt: community.createdAt,
              image:
                community.files.length > 0
                  ? `${community.files[0].url}|${community.files[0].caption}`
                  : "",
              id: community.id,
              youtube: community.url,
            }))}
            menuTab={MENU_TAB.NEWS}
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
