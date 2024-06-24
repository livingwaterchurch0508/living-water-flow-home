import { AspectRatio, VStack } from "@chakra-ui/react";
import { YOUTUBE_URL } from "@/app/(variables)/constants";

interface IYoutubeCard {
  youtubeId: string;
  w?: string;
}

export default function YoutubeEmbedCard({
  youtubeId,
  w = "100%",
}: IYoutubeCard) {
  return (
    <VStack>
      <AspectRatio w={w} ratio={4 / 3}>
        <iframe src={`${YOUTUBE_URL.EMBED}${youtubeId}`} />
      </AspectRatio>
    </VStack>
  );
}
