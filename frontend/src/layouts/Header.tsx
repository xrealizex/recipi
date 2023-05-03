import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Box, Flex, IconButton, Button, Link } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { signOut } from "../lib/api/auth";
import { AuthContext } from "../App";

export const Header: React.FC = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        navigate("/signin");

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <Button colorScheme="teal" variant="link" onClick={handleSignOut}>
            Sign out
          </Button>
        );
      } else {
        return (
          <>
            <Button colorScheme="teal" variant="link" onClick={() => navigate("/signin")}>
              Sign in
            </Button>
            <Button colorScheme="teal" variant="link" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <Box bg="teal.500" color="white" px={4}>
      <Flex h="4rem" alignItems="center">
        <IconButton
          aria-label="Menu"
          size="md"
          icon={<HamburgerIcon />}
          mr={4}
          onClick={() => {}}
        />
        <Link href="/" color="white" fontWeight="bold" fontSize="xl" mr="auto">
          Sample
        </Link>
        <AuthButtons />
      </Flex>
    </Box>
  );
};
