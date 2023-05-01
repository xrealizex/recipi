import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

interface Recipe {
  id: number;
  title: string;
  description: string;
}

export const RecipeDetail: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get<Recipe>(`http://localhost:3010/recipes/${id}`);
      setRecipe(response.data);
    };
    fetchRecipe();
  }, [id]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box>
      <Heading>{recipe.title}</Heading>
      <Text mt={4}>{recipe.description}</Text>
      <Link to={`/recipes/${recipe.id}/edit`}>
        <Button mt={4} colorScheme="teal">
          Edit
        </Button>
        <Button mt={4} onClick={goBack} colorScheme="teal">
          back
        </Button>
      </Link>
    </Box>
  );
};
