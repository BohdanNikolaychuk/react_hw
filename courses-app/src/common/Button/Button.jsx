import React from 'react';
import { Button } from '@chakra-ui/react';

export const ButtonMain = ({ buttonText }) => {
	return (
		<Button colorScheme='teal' variant='outline'>
			{buttonText}
		</Button>
	);
};
