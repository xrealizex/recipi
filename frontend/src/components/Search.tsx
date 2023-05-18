import React, { useState } from 'react';
import axios from 'axios';
import { Box, Input, Button, List, ListItem, Image } from "@chakra-ui/react";

type Recipe = {
  foodImageUrl: string;
  recipeTitle: string;
};

export const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const searchRecipes = async () => {
    const response = await axios.get(`/rakutens?keyword=${keyword}`);
    setRecipes(response.data);
  };

  return (
    <Box p={5}>
      <Input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        mb={4}
        placeholder="Search for recipes"
      />
      <Button onClick={searchRecipes} colorScheme="teal" mb={4}>Search</Button>
      <List spacing={3}>
        {recipes.map(recipe => (
          <ListItem key={recipe.foodImageUrl}>
            <Image src={recipe.foodImageUrl} alt={recipe.recipeTitle} boxSize="100px" objectFit="cover" />
            {recipe.recipeTitle}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
