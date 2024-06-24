"use client";

import {
  Card,
  CardBody,
  SimpleGrid,
  VStack,
  HStack,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

interface ISkeletonCardGrid {
  list?: any[];
}

export default function SkeletonCardGrid({ list = [] }: ISkeletonCardGrid) {
  return (
    <SimpleGrid
      w="90%"
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {list.map((item, i) => (
        <Card key={`card-${i}`} maxW="sm">
          <Skeleton w="100%" h="200px" />
          <CardBody>
            <VStack alignItems="flex-start">
              <SkeletonText fontSize="sm" w="100%"></SkeletonText>
              <HStack w="100%">
                <SkeletonText fontSize="xs" w="100px"></SkeletonText>
                <SkeletonText fontSize="xs" w="40px"></SkeletonText>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
}
