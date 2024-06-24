"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Script from "next/script";
import { Box, Divider, Text, VStack } from "@chakra-ui/react";

import { YOUTUBE_URL } from "@/app/(variables)/constants";

declare global {
  interface Window {
    naver: any;
    initMap: () => void;
  }
}

export default function Location() {
  const t = useTranslations("Footer");
  const mapElement = useRef<HTMLDivElement | null>(null);

  const contentString = `
          <div style="padding: 10px; max-width: 300px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0; color: #2c3e50; font-weight: bold">${t("church")}</h3>
            <p style="margin: 5px 0; font-size: small">
           ${t("address")}<br />
            <div style="display: flex; align-items: center; justify-content: space-between">
                <a href="https://naver.me/5XDOtpPO" target="_blank" style="color: #3498db; text-decoration: none;">${t("detail")}</a>
                <a href="${YOUTUBE_URL.CHANNEL}" target="_blank" style="color: #3498db; text-decoration: none;">${t("youtube")}</a>
                <img src="/cross.jpeg" alt="${t("church")}" style="width: 40px; height: 40px" />
            </div>
          </p>
        </div>
        `;

  useEffect(() => {
    const initMap = () => {
      if (mapElement.current && window.naver) {
        const mapOptions = {
          center: new window.naver.maps.LatLng(37.3975783, 126.9873792),
          zoom: 17,
        };
        const map = new window.naver.maps.Map(mapElement.current, mapOptions);

        // 마커 추가 예시
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(37.3975783, 126.9873792),
          map,
        });

        const infowindow = new window.naver.maps.InfoWindow({
          content: contentString,
        });

        window.naver.maps.Event.addListener(marker, "click", function () {
          if (infowindow.getMap()) {
            infowindow.close();
          } else {
            infowindow.open(map, marker);
          }
        });

        infowindow.open(map, marker);
      }
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      window.initMap = initMap;
    }
  }, []);

  return (
    <VStack mt={4}>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        strategy="lazyOnload"
        onLoad={() => {
          if (window.initMap) {
            window.initMap();
          }
        }}
      />
      <Box
        ref={mapElement}
        width="100%"
        height="400px"
        border="1px solid #ccc"
        borderRadius="md"
      />
      <VStack alignItems="flex-start" w="100%" px={2}>
        <Text fontSize="xs">{`${t("address")}`}</Text>
        <Divider my={2} />
        <Text fontSize="sm" fontWeight="bold">
          {t("public")}
        </Text>
        <Text fontSize="xs">{t("location")}</Text>
        <Text fontSize="sm" fontWeight="bold">
          {t("car")}
        </Text>
        <Text fontSize="xs">{t("carDesc")}</Text>
      </VStack>
    </VStack>
  );
}
