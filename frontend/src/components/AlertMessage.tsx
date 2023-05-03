import React from "react";
import { useToast } from "@chakra-ui/react";

interface AlertMessageProps {
  severity: "error" | "success" | "info" | "warning";
  message: string;
}

// アラートメッセージ（何かアクションを行なった際の案内用に使い回す）
const AlertMessage: React.FC<AlertMessageProps> = ({ severity, message }) => {
  const toast = useToast();

  React.useEffect(() => {
    toast({
      title: severity.toUpperCase(),
      description: message,
      status: severity,
      duration: 6000,
      isClosable: true,
      position: "bottom",
    });
  }, [severity, message, toast]);

  return null;
};

export default AlertMessage;
