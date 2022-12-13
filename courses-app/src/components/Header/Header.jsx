import React from 'react';
import { Logo } from './components/Logo/Logo';

export const Header = () => {
	return (
		<div>
			<Logo></Logo>
			<div>Name</div>
			<button>LogOut</button>
		</div>
	);
};
