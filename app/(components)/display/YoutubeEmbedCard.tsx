"use client";

import { useRef, useState } from "react";
import { AspectRatio, Button, VStack } from "@chakra-ui/react";
import { YOUTUBE_URL } from "@/app/(variables)/constants";

interface IYoutubeCard {
  youtubeId: string;
  w?: string;
  isAutoPlay?: boolean;
}

export default function YoutubeEmbedCard({
  youtubeId,
  w = "100%",
  isAutoPlay = false,
}: IYoutubeCard) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [muted, setMuted] = useState(isAutoPlay);

  const unmuteVideo = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"unMute","args":""}',
        "*",
      );
      setMuted(false);
    }
  };

  return (
    <VStack>
      <AspectRatio w={w} ratio={4 / 3}>
        <iframe
          ref={iframeRef}
          src={`${YOUTUBE_URL.EMBED}${youtubeId}?autoplay=${isAutoPlay}&mute=1&enablejsapi=1`}
          allow={`${isAutoPlay ? "autoplay" : ""}`}
        />
      </AspectRatio>
      {muted && <Button onClick={unmuteVideo}>🔊 소리 켜기</Button>}
    </VStack>
  );
}
