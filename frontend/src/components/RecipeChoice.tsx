//ライブラリ
import React, { useEffect, useState, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
//UI
import { Box, Button, Heading, Text, VStack, HStack } from "@chakra-ui/react";
//型
import { RecipeType } from "../types/RecipeType"
//関数
import { AuthContext } from "../App";

export const RecipeChoice: React.FC = () => {
  const [randomRecipe, setRandomRecipe] = useState<RecipeType | null>(null);
  const { currentUser } = useContext(AuthContext);

  const fetchRandomRecipe = useCallback(async () => {
    if (!currentUser) {
      console.log("ログインしてください。");
      return;
    }
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
    console.log("fetchRandomRecipe!");
  }, [currentUser])

  useEffect(() => {
    fetchRandomRecipe();
  }, [fetchRandomRecipe]);

  return (
    <Box>
      <Heading mb={6} color="teal.500">今日の献立はこれ！</Heading>
      <VStack spacing={6} align="start">
        {randomRecipe && (
          <Box
            w="100%"
            boxShadow="md"
            p={6}
            borderRadius="md"
            bgColor="gray.100"
          >
            <VStack alignItems="start" spacing={4}>
              <Text fontSize="2xl" fontWeight="bold" color="blue.700">
                {randomRecipe.title}
              </Text>
            </VStack>
          </Box>
        )}
        <HStack spacing={6}>
          <Button colorScheme="blue" onClick={fetchRandomRecipe}>
            他の献立にする
          </Button>
          <Link to="/recipes">
            <Button colorScheme="blue">献立一覧</Button>
          </Link>
          <Link to="/recipes/new">
            <Button colorScheme="blue">献立作成</Button>
          </Link>
          <Link to="/favorites">
            <Button colorScheme="blue">お気に入り一覧</Button>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};
