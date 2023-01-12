import { Button, Text, Flex, Box } from '@chakra-ui/react';
import { IAuthors } from '../../@types';

type Props = {
  authors: IAuthors;
  onClick: (id: string) => void;
  buttonText: string;
};

export const Authors = ({ authors, onClick, buttonText }: Props) => {
  return (
    <>
      <Box w="100%" key={authors.id}>
        <Flex justify="space-around">
          <Text align="center">{authors.name}</Text>
          <Button onClick={() => onClick(authors.id)}>{buttonText}</Button>
        </Flex>
      </Box>
    </>
  );
};
