import { Checkbox, Box, Text } from "@chakra-ui/react";

type Props = {
  title: string
}

const Recipi = (props: Props) => {
  return (
    <Box mb="16px">
      <Checkbox colorScheme="blue" size="lg">
        <Text>{props.title}</Text>
      </Checkbox>
    </Box>
  )
}

export default Recipi
