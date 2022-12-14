import React from 'react';

import { ButtonMain } from '../../../../common/Button/Button';
import { InpuMain } from '../../../../common/Input/Input';
import { Container } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';

export const SearchBar = ({ inputHandler }) => {
	return (
		<Container maxW='2xl'>
			<Flex p='10px'>
				<Flex>
					<InpuMain
						onChange={inputHandler}
						m='10px'
						placeholder='Enter course id or name'
					></InpuMain>
					<ButtonMain buttonText='Search'></ButtonMain>
				</Flex>
				<Spacer />
				<ButtonMain buttonText='Add new Course'></ButtonMain>
			</Flex>
		</Container>
	);
};
