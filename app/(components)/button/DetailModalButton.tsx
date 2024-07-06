import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import DetailModal from "@/app/(components)/display/DetailModal";

interface IDetailModal {
  name: string | null;
  desc: string | null;
  mt?: number;
  size?: string;
}

export default function DetailModalButton({
  name,
  desc,
  mt = 4,
  size = "sm",
}: IDetailModal) {
  const t = useTranslations("Common");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} size={size} mt={mt}>
        {t("detail")}
      </Button>
      <DetailModal name={name} desc={desc} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
