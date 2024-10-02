"use client";

import React from "react";
import { useTranslations } from "next-intl";

import News from "@/app/(components)/layout/News/News";
import SwiperTabs from "@/app/(components)/display/SwiperTabs";
import { NEWS_TYPES } from "@/app/(variables)/enums";
import { useCookieSetMenu } from "@/app/(util)/hooks/useCookieSetMenu";

export default function IntroducesPage() {
  useCookieSetMenu();
  const t = useTranslations("Menu.News");

  return (
    <SwiperTabs
      tabList={[t("service"), t("event"), t("story")]}
      panelList={[
        <News key="service" type={NEWS_TYPES.SERVICE} />,
        <News key="event" type={NEWS_TYPES.EVENT} />,
        <News key="story" type={NEWS_TYPES.STORY} />,
      ]}
    />
  );
}
