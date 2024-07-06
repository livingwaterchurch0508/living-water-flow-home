"use client";

import React from "react";
import { useTranslations } from "next-intl";

import Location from "@/app/(components)/layout/Infos/Location";
import SwiperTabs from "@/app/(components)/display/SwiperTabs";

export default function InfosPage() {
  const t = useTranslations("Menu.Info");

  return (
    <SwiperTabs
      tabList={[t("place")]}
      panelList={[<Location key="location" />]}
    />
  );
}
