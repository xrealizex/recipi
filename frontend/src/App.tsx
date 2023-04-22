import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Recipi from './component/Recipi'
import { Center, Box, CheckboxGroup, Text } from "@chakra-ui/react";

const App = () => {
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
            <Recipi title="カレー" />
            <Recipi title="ラーメン" />
            <Recipi title="オムライス" />
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
};

export default App;
