"use client";

import React from "react";
import { useTranslations } from "next-intl";

import Location from "@/app/(components)/layout/Infos/Location";
import SwiperTabs from "@/app/(components)/display/SwiperTabs";
import { useCookieSetMenu } from "@/app/(util)/hooks/useCookieSetMenu";

export default function InfosPage() {
  useCookieSetMenu();
  const t = useTranslations("Menu.Info");

  return (
    <SwiperTabs
      tabList={[t("place")]}
      panelList={[<Location key="location" />]}
    />
  );
}
