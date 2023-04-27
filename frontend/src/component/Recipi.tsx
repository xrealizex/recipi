import { Checkbox, Flex, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { RecipiType } from "../types/RecipiType";

type Props = {
  recipi: RecipiType;
  destroyRecipi: (id: number) => void;
}

const Recipi = (props: Props) => {
  return (
    <Flex mb="16px" justifyContent="space-between" alignItems="center">
      <Checkbox colorScheme="blue" size="lg">
        <Text>{props.recipi.title}</Text>
      </Checkbox>
      <CloseIcon onClick={() => props.destroyRecipi(props.recipi.id)} />
    </Flex>
  )
}

export default Recipi
