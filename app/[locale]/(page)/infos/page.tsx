"use client";

import React from "react";
import { useTranslations } from "next-intl";

import Location from "@/app/(components)/layout/Infos/Location";
import SwiperTabs from "@/app/(components)/display/SwiperTabs";
import Contact from "@/app/(components)/layout/Infos/Contact";

export default function InfosPage() {
  const t = useTranslations("Menu.Info");

  return (
    <SwiperTabs
      tabList={[t("place"), t("inquiry")]}
      panelList={[<Location key="location" />, <Contact key="contact" />]}
    />
  );
}
