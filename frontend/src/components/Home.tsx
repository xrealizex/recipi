import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { RecipeType } from "../types/RecipeType";

export const Home: React.FC = () => {
  const [randomRecipe, setRandomRecipe] = useState<RecipeType | null>(null);

  const fetchRandomRecipe = async () => {
    const response = await axios.get<RecipeType>("http://localhost:3010/recipes/random");
    setRandomRecipe(response.data);
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  return (
    <Box>
      <Heading>Today's Recipe</Heading>
      {randomRecipe && (
        <>
          <Text>{randomRecipe.title}</Text>
          <Text>{randomRecipe.description}</Text>
        </>
      )}
      <Button onClick={fetchRandomRecipe}>Get Another Recipe</Button>
      <Link to="/recipes">
        <Button>View All Recipes</Button>
      </Link>
      <Link to="/create">
        <Button>Create New Recipe</Button>
      </Link>
    </Box>
  );
};
