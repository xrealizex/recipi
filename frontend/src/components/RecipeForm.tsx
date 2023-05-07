import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select
} from "@chakra-ui/react";
import { AuthContext } from "../App";

interface RecipeFormProps {
  isNew?: boolean;
  initialValues?: {
    id?: number;
    title: string;
    description: string;
    category: string;
    easiness: number;
  };
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:3010",
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const client = Cookies.get("_client");
  const uid = Cookies.get("_uid");

  if (token && client && uid) {
    return {
      "access-token": token,
      client: client,
      uid: uid,
    };
  } else {
    return {};
  }
};

export const RecipeForm: React.FC<RecipeFormProps> = ({
  isNew = true,
  initialValues = { title: "", description: "", category: "", easiness: 1 },
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [category, setCategory] = useState(initialValues.category);
  const [easiness, setEasiness] = useState(initialValues.easiness);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  const headers = getAuthHeaders();

  if (!currentUser) {
    return;
  }

  if (isNew) {
    await axiosInstance.post(`/api/v1/users/${currentUser.id}/recipes`, { title, description, category, easiness }, { headers });
  } else {
    await axiosInstance.put(`/api/v1/users/${currentUser.id}/recipes/${initialValues.id}`, { title, description, category, easiness }, { headers });
  }
  navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Heading>{isNew ? "Create New Recipe" : "Edit Recipe"}</Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl id="title" mt={4}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl id="description" mt={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl id="category" mt={4}>
            <FormLabel>Category</FormLabel>
          <Input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormControl>
        <FormControl id="easiness" mt={4}>
          <FormLabel>Easiness (1-5)</FormLabel>
          <Select
            value={easiness}
            onChange={(e) => setEasiness(parseInt(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          {isNew ? "Create Recipe" : "Update Recipe"}
        </Button>
        <Button mt={4} onClick={goBack} colorScheme="teal">
          back
        </Button>
      </Box>
    </Box>
  );
};
