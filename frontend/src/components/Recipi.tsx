import { Checkbox, Flex, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { RecipeType } from "../types/RecipeType";

type Props = {
  recipe: RecipeType;
  destroyRecipe: (id: number) => void;
}

const Recipe = (props: Props) => {
  return (
    <Flex mb="16px" justifyContent="space-between" alignItems="center">
      <Checkbox colorScheme="blue" size="lg">
        <Text>{props.recipe.title}</Text>
      </Checkbox>
      <CloseIcon onClick={() => props.destroyRecipe(props.recipe.id)} />
    </Flex>
  )
}

export default Recipe
