import React from 'react';

import { ButtonMain } from '../../../../common/Button/Button';
import { InpuMain } from '../../../../common/Input/Input';

import { Flex, Spacer, Container } from '@chakra-ui/react';

export const SearchBar = ({ handleOpenModal, inputHandler }) => {
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
				<ButtonMain
					onClick={handleOpenModal}
					buttonText='Add new Course'
				></ButtonMain>
			</Flex>
		</Container>
	);
};
