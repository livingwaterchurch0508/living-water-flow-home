import Link from "next/link";
import { useLocale } from "next-intl";
import { AspectRatio, Image, VStack } from "@chakra-ui/react";

import { ROUTER_PATHS, YOUTUBE_URL } from "@/app/(variables)/constants";
import { IMoveTab } from "@/app/(variables)/interfaces";

interface IYoutubeCard extends IMoveTab {
  youtubeId: string;
  w?: string;
  id?: number;
}

export default function YoutubeCard({
  youtubeId,
  w = "100%",
  id,
  menuTab,
  detailTab,
}: IYoutubeCard) {
  const locale = useLocale();
  return (
    <VStack overflow="hidden" borderTopRadius={4}>
      <AspectRatio w={w} ratio={24 / 14} style={{ scale: 1.1 }}>
        <Link
          href={`/${locale}${ROUTER_PATHS[menuTab]}/${id}?type=${detailTab}`}
        >
          <Image
            src={`${YOUTUBE_URL.THUMB_NAIL}${youtubeId}/0.jpg`}
            objectFit="cover"
            alt="youtube"
          />
        </Link>
      </AspectRatio>
    </VStack>
  );
}
