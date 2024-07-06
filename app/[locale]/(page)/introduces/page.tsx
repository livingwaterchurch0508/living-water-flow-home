"use client";

import { useTranslations } from "next-intl";

import Church from "@/app/(components)/layout/Introduces/Church";
import Pastor from "@/app/(components)/layout/Introduces/Pastor";
import SwiperTabs from "@/app/(components)/display/SwiperTabs";
import Worship from "@/app/(components)/layout/Introduces/Worship";

export default function IntroducesPage() {
  const t = useTranslations("Menu.Introduce");

  return (
    <SwiperTabs
      tabList={[t("pastor"), t("introduce"), t("worship")]}
      panelList={[
        <Pastor key="pastor" />,
        <Church key="church" />,
        <Worship key="worship" />,
      ]}
    />
  );
}
