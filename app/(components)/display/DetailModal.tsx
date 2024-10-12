import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Button, Text, useBreakpointValue } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface IDetailModal {
  name: string | null;
  desc: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailModal({
  name,
  desc,
  isOpen,
  onClose,
}: IDetailModal) {
  const t = useTranslations("Common");
  const columnCount = useBreakpointValue({
    base: 1, // 모바일
    md: 2, // 태블릿
    lg: 3, // PC
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={columnCount === 1 ? "full" : "lg"}
      scrollBehavior="inside"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            {name}
          </Text>
          <Text whiteSpace="pre-wrap">{desc}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>{t("close")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
