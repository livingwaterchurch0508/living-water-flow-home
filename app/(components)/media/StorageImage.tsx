"use client";

import { useEffect, useRef, useState } from "react";
import { Image, Skeleton } from "@chakra-ui/react";
import Link from "next/link";
import { useLocale } from "next-intl";

import { ROUTER_PATHS } from "@/app/(variables)/constants";
import { IMoveTab } from "@/app/(variables)/interfaces";

interface ImageDisplayProps extends IMoveTab {
  imageName: string;
  id?: number;
}

export default function StorageImage({
  imageName,
  id = -1,
  menuTab,
  detailTab,
}: ImageDisplayProps) {
  const locale = useLocale();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || imageUrl) return;

    const fetchImageUrl = async () => {
      const response = await fetch(`/api/image?imageName=${imageName}`);
      const data = await response.blob();
      const url = URL.createObjectURL(data);
      setImageUrl(url);
    };

    fetchImageUrl();

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl); // 메모리 정리
      }
    };
  }, [isVisible, imageName]);

  if (!isVisible) {
    return (
      <div
        ref={imgRef}
        style={{
          width: "100%",
          paddingBottom: "75%",
          backgroundColor: "#e0e0e0",
        }}
      />
    );
  }

  if (!imageUrl) {
    return <Skeleton w="100%" h="200px" />;
  }

  if (id === -1) {
    return (
      <Image
        borderTopRadius={4}
        src={imageUrl}
        alt="image"
        objectFit="cover"
        cursor="pointer"
        w="100%"
        h="100%"
      />
    );
  }

  return (
    <Link href={`/${locale}${ROUTER_PATHS[menuTab]}/${id}?type=${detailTab}`}>
      <Image
        borderTopRadius={4}
        src={imageUrl}
        alt="image"
        objectFit="cover"
        cursor="pointer"
        w="100%"
        h="100%"
      />
    </Link>
  );
}
