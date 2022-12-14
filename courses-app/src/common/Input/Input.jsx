import React from 'react';
import { Input } from '@chakra-ui/react';

export const InpuMain = ({ placeholder = '', onChange }) => {
	return <Input onChange={onChange} placeholder={placeholder} />;
};
