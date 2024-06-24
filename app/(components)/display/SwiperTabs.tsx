"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";

import SearchBar from "@/app/(components)/input/SearchBar";
import { useSelectMenu } from "@/app/(util)/hooks/useSelectMenu";
import { MENU_TAB } from "@/app/(variables)/enums";

interface ISwiperTabs {
  menuTab: MENU_TAB;
  tabList?: string[];
  panelList?: React.ReactNode[];
}

export default function SwiperTabs({
  menuTab,
  tabList = [],
  panelList = [],
}: ISwiperTabs) {
  const { detailTab, handleChange } = useSelectMenu({
    menuTab,
  });
  const isSearchBar =
    menuTab !== MENU_TAB.INFO && menuTab !== MENU_TAB.INTRODUCE;

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
    if (swiperRef.current) {
      swiperRef.current.slideTo(detailTab);
      setActiveIndex(detailTab || 0);
    }
  }, [detailTab]);

  return (
    <Tabs index={detailTab} onChange={handleTabChange} isLazy>
      <TabList>
        {tabList.map((tab, i) => (
          <Tab key={`tab-${i + 1}`}>{tab}</Tab>
        ))}
      </TabList>
      {isSearchBar && <SearchBar menuTab={menuTab} />}
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
