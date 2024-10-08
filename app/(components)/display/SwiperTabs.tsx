"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePathname } from "next/navigation";

import SearchBar from "@/app/(components)/input/SearchBar";
import { useSelectMenu } from "@/app/(util)/hooks/useSelectMenu";
import { MENU_TAB } from "@/app/(variables)/enums";
import { searchPath } from "@/app/(util)/search/search-util";

interface ISwiperTabs {
  tabList?: string[];
  panelList?: React.ReactNode[];
}

export default function SwiperTabs({
  tabList = [],
  panelList = [],
}: ISwiperTabs) {
  const pathname = usePathname();
  const { menuTab, detailTab, handleChange } = useSelectMenu();

  const isSearchBar =
    searchPath(pathname) !== MENU_TAB.INFO &&
    searchPath(pathname) !== MENU_TAB.INTRODUCE;

  // Swiper 인스턴스를 참조할 ref 생성
  const swiperRef = useRef<any | null>(null);

  // 활성화된 슬라이드 인덱스를 상태로 관리
  const [activeIndex, setActiveIndex] = useState<number>(detailTab || 0);

  // 탭 변경 시 Swiper 슬라이드 변경
  const handleTabChange = async (index: number) => {
    await handleChange(index);
    setActiveIndex(index); // 활성화된 슬라이드 인덱스 업데이트
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  useEffect(() => {
    const _setActiveIndex = () => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(detailTab);
        setActiveIndex(detailTab || 0);
      }
    };

    switch (menuTab) {
      case MENU_TAB.INTRODUCE:
      case MENU_TAB.NEWS: {
        if (tabList?.length === 3) {
          _setActiveIndex();
        }
        return;
      }
      case MENU_TAB.HYMN:
      case MENU_TAB.SERMON: {
        if (tabList?.length === 2) {
          _setActiveIndex();
        }
        return;
      }
      case MENU_TAB.INFO: {
        if (tabList?.length === 1) {
          _setActiveIndex();
        }
        return;
      }
    }
  }, [tabList?.length, detailTab, menuTab]);

  return (
    <Tabs index={detailTab} onChange={handleTabChange} isLazy>
      <TabList>
        {tabList.map((tab, i) => (
          <Tab key={`tab-${i + 1}`}>{tab}</Tab>
        ))}
      </TabList>
      {isSearchBar && <SearchBar />}
      <Swiper
        style={{ zIndex: 0 }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={({ activeIndex }) => handleChange(activeIndex)}
      >
        {panelList.map((panel, i) => (
          <SwiperSlide key={`panel-m-${i + 1}`}>
            <Box overflow="auto" h="78vh">
              {activeIndex === i ? panel : null}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Tabs>
  );
}
