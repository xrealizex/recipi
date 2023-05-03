import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useToast
} from "@chakra-ui/react";
import { AuthContext } from "../App";
import { signUp } from "../lib/api/auth";
import { SignUpParams } from "../types/SignUpParamsType";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/");

        console.log("Signed in successfully!");
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Invalid email or password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Box borderWidth={1} borderRadius="md" p={4} maxWidth="400px" mx="auto">
          <Text fontSize="2xl" textAlign="center" mb={4}>
            Sign Up
          </Text>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password Confirmation</FormLabel>
              <Input
                type="password"
                value={passwordConfirmation}
                onChange={event =>
                  setPasswordConfirmation(event.target.value)
                }
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              width="100%"
              isDisabled={
                !name || !email || !password || !passwordConfirmation
              }
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </VStack>
        </Box>
      </form>
      {alertMessageOpen && (
        <Box my={4}>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Error</AlertTitle>
            <AlertDescription>Invalid email or password</AlertDescription>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setAlertMessageOpen(false)}
            />
          </Alert>
        </Box>
      )}
    </>
  );
};
