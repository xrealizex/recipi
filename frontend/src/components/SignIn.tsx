import React, { useState, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  useToast
} from "@chakra-ui/react";
import { AuthContext } from "../App";
import { signIn } from "../lib/api/auth";
import { SignInParams } from "../types/SignInParamsType";

// サインイン用ページ
export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const toast = useToast();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInParams = {
      email: email,
      password: password
    };

    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        // トークンをlocalStorageに保存する
        localStorage.setItem('token', res.headers["access-token"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/");

        console.log("Signed in successfully!",`status:${res.status}`);
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password",
          status: "error",
          duration: 5000,
          isClosable: true
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Invalid email or password",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <VStack spacing={5}>
        <Heading textAlign="center" size="lg">
          Sign In
        </Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <Button
          width="100%"
          colorScheme="teal"
          onClick={handleSubmit}
          isDisabled={!email || !password}
        >
          Submit
        </Button>
        <Text textAlign="center">
          Don't have an account?{" "}
          <Link as={RouterLink} to="/signup" textDecoration="underline">
            Sign Up now!
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};
