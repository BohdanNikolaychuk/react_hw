import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { IAuthors } from '../../@types'

type AuthorsProps = {
	authors: IAuthors
	onClick: (id: string) => void
	buttonText: string
}

export const Authors = ({ authors, onClick, buttonText }: AuthorsProps) => {
	return (
		<>
			<Box w='100%' key={authors.id}>
				<Flex justify='space-around'>
					<Text align='center'>{authors.name}</Text>
					<Button onClick={() => onClick(authors.id)}>{buttonText}</Button>
				</Flex>
			</Box>
		</>
	)
}
