import React, { useState } from "react";
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
} from "@chakra-ui/react";

interface RecipeFormProps {
  isNew?: boolean;
  initialValues?: {
    id?: number;
    title: string;
    description: string;
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
  initialValues = { title: "", description: "" },
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  const headers = getAuthHeaders();

  if (isNew) {
    await axiosInstance.post("/recipes", { title, description }, { headers });
  } else {
    // Update the recipe with axios.put() if it's an edit form.
    await axiosInstance.put(`/recipes/${initialValues.id}`, { title, description }, { headers });
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
