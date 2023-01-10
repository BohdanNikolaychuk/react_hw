import React from 'react';
// ui
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  Flex,
  Container,
  Box,
  Button,
} from '@chakra-ui/react';
import { useNavigate, NavLink } from 'react-router-dom';
// helpers
import toHoursAndMinutes from '../../helpers/toHoursAndMinutes';
import createId from '../../helpers/createId';

// types
import { IAuthors } from '../../@types/IAuthors';
// store
import { selectAuthorsData } from '../../store/authors/selectors';
import { useSelector } from 'react-redux';
import { addCourse } from '../../store/courses/slice';
import { useAppDispatch } from '../../store/store';
import { addAuthor } from '../../store/authors/slice';

// CONST

import { ROUTES } from '../../router/_Routes';

export const CreateCourse = () => {
  const { authorsList } = useSelector(selectAuthorsData);

  const dispatch = useAppDispatch();

  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [selectedAuthors, setSelectedAuthors] = React.useState<IAuthors[]>([]);
  const [duration, setDuration] = React.useState<number>(0);
  const [newAuthorName, setNewAuthorName] = React.useState<string>('');

  //function
  const navigate = useNavigate();

  let handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inputValue = e.target.value;
    setTitle(inputValue);
  };
  let handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    let inputValue = e.target.value;
    setDescription(inputValue);
  };

  let handleAuthorsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inputValue = e.target.value;
    setNewAuthorName(inputValue);
  };

  let handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inputValue = e.target.value;
    setDuration(+inputValue);
  };

  const createNewCourse = async () => {
    if (!title || !description || !authorsList || !selectedAuthors || !duration) {
      alert('Add all fileds');
    } else {
      const courseAuthors =
        selectedAuthors.length > 0 ? selectedAuthors.map((author) => author.id) : [];

      dispatch(
        addCourse({
          id: createId(),
          title,
          description,
          duration,
          authors: courseAuthors,
          creationDate: new Date().toLocaleDateString(),
        }),
      );
      navigate(ROUTES.main);
    }
  };

  const createAuthor = (): void => {
    if (!newAuthorName) {
      alert('Pass author name');
    } else {
      const newAuthors = {
        id: createId(),
        name: newAuthorName,
      };
      dispatch(addAuthor(newAuthors));
      setNewAuthorName('');
    }
  };

  const AddAuthors = (id: string) => {
    const selected = authorsList.find((author) => author.id === id);
    if (selected == null) {
      return <></>;
    }
    setSelectedAuthors([...selectedAuthors, selected]);
  };

  const RemoveAuthors = (id: string) => {
    setSelectedAuthors((prev) => prev.filter((author) => author.id !== id));
  };

  const getAddAuthors = (authors: IAuthors[]) => {
    return authors.map((author) => {
      const isSelected = selectedAuthors.find((selected) => author.id === selected.id);
      if (isSelected != null) return <></>;

      return (
        <Box w="100%" key={author.id}>
          <Flex justify="space-around">
            <Text align="center">{author.name}</Text>
            <Button key={author.id} onClick={() => AddAuthors(author.id)}>
              Add
            </Button>
          </Flex>
        </Box>
      );
    });
  };

  const hendelSelectedAuthors = (selectedAuthors: IAuthors[]) => {
    if (selectedAuthors.length === 0) {
      return <Text align="center">Authors list is empty</Text>;
    }

    return selectedAuthors.map((selectedAuthor) => {
      return (
        <Box w="100%" key={selectedAuthor.id}>
          <Flex justify="space-around">
            <Text align="center">{selectedAuthor.name}</Text>
            <Button key={selectedAuthor.id} onClick={() => RemoveAuthors(selectedAuthor.id)}>
              Remove
            </Button>
          </Flex>
        </Box>
      );
    });
  };

  const authorsInfo = getAddAuthors(authorsList);
  const selectedListOfAuthors = hendelSelectedAuthors(selectedAuthors);

  return (
    <Container maxW="1220px">
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Flex minWidth="max-content" justify={'space-between'}>
          <Input onChange={handleTitleChange} value={title} maxW="30%" placeholder="Title" />
          <Button as={NavLink} to="/">
            To Main
          </Button>
          <Button onClick={createNewCourse}>Add Course</Button>
        </Flex>
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
          size="sm"
        />
      </FormControl>
      <Flex mt="5" justify="space-between">
        <Box w="100%">
          <Text align="center">Add author</Text>
          <FormControl>
            <FormLabel> Author name</FormLabel>
            <Input
              onChange={handleAuthorsChange}
              value={newAuthorName}
              placeholder="Author name "
            />
          </FormControl>
          <Button onClick={createAuthor}>Create Author</Button>

          <FormControl>
            <FormLabel>Duration</FormLabel>

            <Input onChange={handleDurationChange} placeholder="Duration" />

            <Text>
              Duration:<strong>{toHoursAndMinutes(duration)}</strong>
            </Text>
          </FormControl>
        </Box>
        <Box w="100%">
          <Text align="center">Authors</Text>

          {authorsInfo}

          <Text pt="5" align="center">
            Course Authors
          </Text>
          {selectedListOfAuthors}
        </Box>
      </Flex>
    </Container>
  );
};
