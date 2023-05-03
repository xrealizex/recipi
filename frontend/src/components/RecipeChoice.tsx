import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { RecipeType } from "../types/RecipeType";

export const RecipeChoice: React.FC = () => {
  const [randomRecipe, setRandomRecipe] = useState<RecipeType | null>(null);

  const fetchRandomRecipe = async () => {
    const response = await axios.get<RecipeType>(
      "http://localhost:3010/recipes/random"
    );
    setRandomRecipe(response.data);
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

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
