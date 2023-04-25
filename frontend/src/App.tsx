import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Recipi from './component/Recipi'
import { Center, Box, CheckboxGroup, Text } from "@chakra-ui/react";
import axios from "axios";
import { RecipiType } from './types/RecipiType'; 

const App = () => {
  const [recipis, setRecipis] = useState<RecipiType[]>([]);

  const fetch = async () => {
    const res = await axios.get<RecipiType[]>("http://localhost:3010/recipis");
    setRecipis(res.data)
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Box mt="64px">
      <Center>
        <Box>
          <Box mb="24px">
            <Text fontSize="24px" fontWeight="bold">
              料理一覧
            </Text>
          </Box>
          <CheckboxGroup>
            {recipis.map((recipe) => (
            <Recipi key={recipe.id} recipi={recipe}  />
          ))}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
};

export default App;
