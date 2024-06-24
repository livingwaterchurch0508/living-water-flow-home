"use client";

import React from "react";
import { useTranslations } from "next-intl";

import News from "@/app/(components)/layout/News/News";
import SwiperTabs from "@/app/(components)/display/SwiperTabs";
import { MENU_TAB, NEWS_TYPES } from "@/app/(variables)/enums";

export default function IntroducesPage() {
  const t = useTranslations("Menu.News");

  return (
    <SwiperTabs
      menuTab={MENU_TAB.NEWS}
      tabList={[t("service"), t("event"), t("story")]}
      panelList={[
        <News key="service" type={NEWS_TYPES.SERVICE} />,
        <News key="event" type={NEWS_TYPES.EVENT} />,
        <News key="story" type={NEWS_TYPES.STORY} />,
      ]}
    />
  );
}
