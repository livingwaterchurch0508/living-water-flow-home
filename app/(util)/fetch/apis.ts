import { Fetcher } from "swr";

import { SermonsGetResponse } from "@/app/api/sermons/route";
import { CommunitiesGetResponse } from "@/app/api/communities/route";
import { IMoveTab } from "@/app/(variables)/interfaces";
import { HymnsGetResponse } from "@/app/api/hymns/route";

export const sermonsFetcher: Fetcher<SermonsGetResponse, string> = (
  url: string,
) => fetch(url).then((res) => res.json());

export const communitiesFetcher: Fetcher<CommunitiesGetResponse, string> = (
  url: string,
) => fetch(url).then((res) => res.json());

export const hymnsFetcher: Fetcher<HymnsGetResponse, string> = (url: string) =>
  fetch(url).then((res) => res.json());

export const setMenuCookie = async ({ menuTab, detailTab }: IMoveTab) => {
  try {
    await fetch("/api/setCookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { menuTab, detailTab } }),
    });
  } catch (error) {
    console.error("Failed to set cookie:", error);
  }
};

export const getMenuCookie = async () => {
  try {
    const response = await fetch("/api/getCookie");
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Failed to fetch cookie:", error);
  }
};
