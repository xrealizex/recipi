import { Checkbox, Box, Text } from "@chakra-ui/react";
import { RecipiType } from "../types/RecipiType";

type Props = {
  recipi: RecipiType;
}

const Recipi = (props: Props) => {
  return (
    <Box mb="16px">
      <Checkbox colorScheme="blue" size="lg">
        <Text>{props.recipi.title}</Text>
      </Checkbox>
    </Box>
  )
}

export default Recipi
