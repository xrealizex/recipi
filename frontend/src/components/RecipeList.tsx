import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Heading, VStack, HStack, Text } from "@chakra-ui/react";
import { RecipeType } from "../types/RecipeType";
import { AuthContext } from "../App";
import Cookies from "js-cookie"

export const RecipeList: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  // const fetchRecipes = async () => {
  //   const response = await axios.get<RecipeType[]>("http://localhost:3010/recipes");
  //   setRecipes(response.data);
  //   console.log("recipeList")
  // };
  const fetchRecipes = async () => {
    if (currentUser) {
      const accessToken = localStorage.getItem("token");
      const client = Cookies.get("_client");
      const uid = Cookies.get("_uid");
      const response = await axios.get<RecipeType[]>(`http://localhost:3010/api/v1/users/${currentUser.id}/recipes`, {
      headers: {
        "access-token": accessToken,
        client: client,
        uid: uid,
      },
    });
      setRecipes(response.data);
      console.log("recipeList");
    } else {
      setRecipes([]);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [currentUser]);

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
            <Link to={`/recipes/${recipe.id}`}>
              <Button colorScheme="teal">View Details</Button>
            </Link>
        </HStack>
        ))}
      </VStack>
      <Link to="/recipes/new">
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
