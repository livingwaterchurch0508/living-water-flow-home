"use client";

import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll event handler
  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <IconButton
      aria-label="Scroll to top"
      icon={<FaArrowUp style={{ color: "gray" }} />}
      onClick={scrollToTop}
      position="fixed"
      bottom="30px"
      right="30px"
      size="lg"
      zIndex={1}
      isRound
      bg="white"
      border="1px solid gray"
      opacity={isVisible ? 1 : 0}
      visibility={isVisible ? "visible" : "hidden"}
      transition="opacity 0.3s, visibility 0.3s"
    />
  );
}
