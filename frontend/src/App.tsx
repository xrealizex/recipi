import React, { useState, useEffect } from 'react';
import './App.css';
import Recipi from './component/Recipi'
import {
  Flex,
  Center,
  Box,
  CheckboxGroup,
  Text,
  Input,
  Button,
  Stack
} from "@chakra-ui/react";
import axios from "axios";
import { RecipiType } from './types/RecipiType';
import { InputRecipiType } from "./types/InputRecipiType"

const App = () => {
  const [recipis, setRecipis] = useState<RecipiType[]>([]);
  const [inputRecipi, setInputRecipi] = useState<InputRecipiType>({title: "", description: "", category: "", easiness: undefined});

  const fetch = async () => {
    const res = await axios.get<RecipiType[]>("http://localhost:3010/recipis");
    setRecipis(res.data)
  };

  const createRecipi = async () => {
    await axios.post("http://localhost:3010/recipis", {
      title: inputRecipi.title,
      description: inputRecipi.description,
      category: inputRecipi.category,
      easiness: inputRecipi.easiness
    });
    setInputRecipi({title: "", description: "", category: "", easiness: undefined});
    fetch();
  };

  const destroyRecipi = async (id: number) => {
    await axios.delete(`http://localhost:3010/recipis/${id}`);
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Box mt="64px">
      <Center>
        <Box w="50%">
          <Text fontSize="24px" fontWeight="bold" mb="24px">
            献立一覧
          </Text>
          <CheckboxGroup>
            {recipis.map((recipe) => (
              <Recipi key={recipe.id} recipi={recipe} destroyRecipi={destroyRecipi} />
            ))}
          </CheckboxGroup>
          <Stack mt="40px" spacing="24px">
            <Input
              placeholder="名前"
              value={inputRecipi.title}
              onChange={(e) => setInputRecipi({...inputRecipi, title: e.target.value})}
            />
            <Input
              placeholder="献立の詳細"
              value={inputRecipi.description}
              onChange={(e) => setInputRecipi({...inputRecipi, description: e.target.value})}
            />
            <Input
              placeholder="カテゴリー"
              value={inputRecipi.category}
              onChange={(e) => setInputRecipi({...inputRecipi, category: e.target.value})}
            />
            <Input
              type="number"
              placeholder="手軽さ (1 ~ 5)"
              value={inputRecipi.easiness}
              onChange={(e) => setInputRecipi({...inputRecipi, easiness: Number(e.target.value)})}
            />
            <Button colorScheme="teal" onClick={createRecipi}>
              献立を作成
            </Button>
          </Stack>
        </Box>
      </Center>
    </Box>
  );
};

export default App;
