"use client";

import { useEffect, useState } from "react";
import { Image, Skeleton } from "@chakra-ui/react";
import { PhotoView } from "react-photo-view";

import { IMoveTab } from "@/app/(variables)/interfaces";

interface ImageDisplayProps extends IMoveTab {
  imageNames: string[];
}

export default function StorageArrayImage({ imageNames }: ImageDisplayProps) {
  const [imageUrls, setImageUrls] = useState<string[]>(
    new Array(imageNames.length).fill(""),
  );

  useEffect(() => {
    async function loadImages() {
      const urls = await Promise.all(
        imageNames.map(async (imageName) => {
          const response = await fetch(`/api/image?imageName=${imageName}`);
          const data = await response.blob();
          return URL.createObjectURL(data);
        }),
      );

      setImageUrls(urls); // 한 번에 업데이트하여 순서 유지
    }

    loadImages();
  }, [imageNames]);

  return (
    <>
      {imageUrls.map((url, i) => {
        if (url === "") {
          return <Skeleton key={`image-loading-${i}`} w="100%" h="200px" />;
        }

        return (
          <PhotoView key={`image-${url}-${i}`} src={url}>
            <Image
              borderTopRadius={4}
              src={url}
              alt="image"
              objectFit="cover"
              cursor="pointer"
              w="100%"
              h="100%"
            />
          </PhotoView>
        );
      })}
    </>
  );
}
