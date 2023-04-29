import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

export const RecipeForm: React.FC<RecipeFormProps> = ({
  isNew = true,
  initialValues = { title: "", description: "" },
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew) {
      await axios.post("http://localhost:3010/recipes", { title, description });
    } else {
      // Update the recipe with axios.put() if it's an edit form.
      await axios.put(`http://localhost:3010/recipes/${initialValues.id}`, {
        title,
        description,
      });
    }
    navigate("/");
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
      </Box>
    </Box>
  );
};
