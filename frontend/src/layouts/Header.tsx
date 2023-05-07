import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Box, Flex, IconButton, Button, Link } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { signOut } from "../lib/api/auth";
import { AuthContext } from "../App";

type SignOutButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const SignOutButton: React.FC<SignOutButtonProps> = ({ onClick }) => (
  <Button colorScheme="white" variant="link" color="white" backgroundColor="transparent" _hover={{ backgroundColor: "teal.300" }} onClick={onClick}>
    Sign out
  </Button>
);

const SignInButton: React.FC<SignOutButtonProps> = ({ onClick }) => (
  <Button colorScheme="teal" variant="link" color="white" backgroundColor="transparent" _hover={{ backgroundColor: "teal.300" }} onClick={onClick}>
    Sign in
  </Button>
);

const SignUpButton: React.FC<SignOutButtonProps> = ({ onClick }) => (
  <Button colorScheme="teal" variant="link" color="white" backgroundColor="transparent" _hover={{ backgroundColor: "teal.300" }} onClick={onClick}>
    Sign Up
  </Button>
);

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
        localStorage.removeItem('token');

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

  const renderAuthButtons = () => {
    if (loading) {
      return null;
    }
    if (isSignedIn) {
      return <SignOutButton onClick={handleSignOut} />;
    }
    return null;
  };

  return (
    <Box bg="teal.500" color="white" px={4}>
      <Flex h="4rem" alignItems="center">
      <IconButton
        aria-label="Menu"
        size="md"
        icon={<HamburgerIcon />}
        color="white"
        backgroundColor="transparent"
        _hover={{ backgroundColor: "teal.300" }}
        mr={4}
        onClick={() => {}}
      />
        <Link href="/" color="white" fontWeight="bold" fontSize="xl" mr="auto">
          こんだてChoice!
        </Link>
        {renderAuthButtons()}
      </Flex>
    </Box>
  );
};
