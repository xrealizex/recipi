import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { RecipeType } from "../types/RecipeType";
import { AuthContext } from "../App";

export const RecipeChoice: React.FC = () => {
  const [randomRecipe, setRandomRecipe] = useState<RecipeType | null>(null);
  const { currentUser } = useContext(AuthContext);

  const fetchRandomRecipe = async () => {
    if (currentUser) {
      const accessToken = localStorage.getItem("token");
      const client = Cookies.get("_client");
      const uid = Cookies.get("_uid");

      const response = await axios.get<RecipeType>(`http://localhost:3010/api/v1/users/${currentUser.id}/recipes/random`, {
        headers: {
          "access-token": accessToken,
          client: client,
          uid: uid,
        },
      });
      setRandomRecipe(response.data);
    }
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, [currentUser]);

  return (
    <Box>
      <VStack spacing={5} align="start">
        <Heading>Today's Recipe</Heading>
        {randomRecipe && (
          <>
            <Text fontSize="xl" fontWeight="bold">
              {randomRecipe.title}
            </Text>
            <Text>{randomRecipe.description}</Text>
          </>
        )}
        <HStack spacing={3}>
          <Button colorScheme="teal" onClick={fetchRandomRecipe}>
            Get Another Recipe
          </Button>
          <Link to="/recipes">
            <Button>View All Recipes</Button>
          </Link>
          <Link to="/recipes/new">
            <Button>Create New Recipe</Button>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};
