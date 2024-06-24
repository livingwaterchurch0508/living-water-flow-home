"use client";

import React from "react";
import { useTranslations } from "next-intl";

import Location from "@/app/(components)/layout/Infos/Location";
import SwiperTabs from "@/app/(components)/display/SwiperTabs";
import { MENU_TAB } from "@/app/(variables)/enums";

export default function InfosPage() {
  const t = useTranslations("Menu.Info");

  return (
    <SwiperTabs
      menuTab={MENU_TAB.INFO}
      tabList={[t("place")]}
      panelList={[<Location key="location" />]}
    />
  );
}
