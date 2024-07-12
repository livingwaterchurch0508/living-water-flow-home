"use client";

import {
  Button,
  Icon,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import { SiKakao, SiNaver } from "react-icons/si";
import { FaGoogle } from "react-icons/fa";
import { signInWithApp } from "@/app/(components)/button/actions/signInAction";
import { useSession } from "next-auth/react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useTranslations } from "next-intl";

export default function Inquiry() {
  const t = useTranslations("Menu.Info");
  const session = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignIn = async (provider: string) => {
    await signInWithApp(provider);
  };

  if (!session.data) {
    return (
      <>
        <Button onClick={onOpen}>{t("inquiry")}</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{t("needLogin")}</Text>
              <VStack spacing={4} p={4}>
                <Button
                  width="full"
                  colorScheme="yellow"
                  leftIcon={<Icon as={SiKakao} />}
                  onClick={() => handleSignIn("kakao")}
                >
                  {t("kakao")}
                </Button>
                <Button
                  width="full"
                  colorScheme="green"
                  leftIcon={<Icon as={SiNaver} />}
                  onClick={() => handleSignIn("naver")}
                >
                  {t("naver")}
                </Button>
                <Button
                  width="full"
                  colorScheme="blue"
                  leftIcon={<Icon as={FaGoogle} />}
                  onClick={() => handleSignIn("google")}
                >
                  {t("google")}
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <VStack>
      <Button onClick={onOpen}>{t("inquiry")}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{t("inquiry")}</Text>
            <VStack spacing={4} p={4}>
              <FormControl isRequired>
                <FormLabel>{t("email")}</FormLabel>
                <Input
                  type="email"
                  defaultValue={session.data.user?.email || ""}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t("inquiryTitle")}</FormLabel>
                <Input />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t("inquiryContent")}</FormLabel>
                <Textarea />
              </FormControl>
              <Checkbox defaultChecked>{t("secret")}</Checkbox>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4}>
              <Button onClick={onClose}>{t("close")}</Button>
              <Button onClick={onClose}>{t("inquiry")}</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
