import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { AuthContext } from "../App";
import Cookies from "js-cookie";

interface Recipe {
  id: number;
  title: string;
  description: string;
}

export const RecipeDetail: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useContext(AuthContext);

  const fetchRecipe = async () => {
    if (currentUser) {
      const accessToken = localStorage.getItem("token");
      const client = Cookies.get("_client");
      const uid = Cookies.get("_uid");

      const response = await axios.get<Recipe>(`http://localhost:3010/api/v1/users/${currentUser.id}/recipes/${id}`, {
        headers: {
          "access-token": accessToken,
          client: client,
          uid: uid,
        },
      });
      setRecipe(response.data);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id, currentUser]);

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
