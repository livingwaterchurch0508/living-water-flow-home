"use client";

import { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
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

  useEffect(() => {
    const fetchImageUrl = async () => {
      const response = await fetch(`/api/image?imageName=${imageName}`);
      const data = await response.blob();
      const url = URL.createObjectURL(data);
      setImageUrl(url);
    };

    fetchImageUrl();
  }, [imageName]);

  if (!imageUrl) {
    return <div>Loading...</div>;
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
