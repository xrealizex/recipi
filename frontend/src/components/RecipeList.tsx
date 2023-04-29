import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Heading, VStack, HStack, Text } from "@chakra-ui/react";
import { RecipeType } from "../types/RecipeType";

export const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  const fetchRecipes = async () => {
    const response = await axios.get<RecipeType[]>("http://localhost:3010/recipes");
    setRecipes(response.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Heading>Recipes List</Heading>
      <VStack spacing={4}>
        {recipes.map((recipe) => (
          <HStack key={recipe.id} justifyContent="space-between" w="100%" boxShadow="md" p={4} borderRadius="md">
            <VStack alignItems="start" spacing={1}>
              <Text fontWeight="bold">{recipe.title}</Text>
              <Text>{recipe.description}</Text>
            </VStack>
            <Button as={Link} to={`/recipes/${recipe.id}`} colorScheme="teal">
              View Details
            </Button>
          </HStack>
        ))}
      </VStack>
      <Link to="/create">
        <Button mt={4} colorScheme="teal">
          Create New Recipe
        </Button>
        <Button mt={4} onClick={goBack} colorScheme="teal">
          back
        </Button>
      </Link>
    </Box>
  );
};
