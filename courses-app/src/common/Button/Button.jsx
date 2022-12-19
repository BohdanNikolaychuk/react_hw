import React from 'react';
import { Button } from '@chakra-ui/react';

export const ButtonMain = ({ buttonText, onClick }) => {
	return (
		<Button onClick={onClick} colorScheme='teal' variant='outline'>
			{buttonText}
		</Button>
	);
};
