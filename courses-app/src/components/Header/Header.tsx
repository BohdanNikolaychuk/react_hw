import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Logo } from './components/Logo/Logo'

import { LogOut } from '../../store/user/asyncActions'

import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks'
import { ROUTES } from '../../router/ROUTES'

export default function Header() {
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const userName = useAppSelector(state => state.auth.userName)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const logOut = () => {
		dispatch(LogOut())
		navigate(ROUTES.courses)
	}

	const renderButton = (isAuth: boolean | null) => {
		if (isAuth) {
			return (
				<Stack
					flex={{ base: 1, md: 0 }}
					justify={'flex-end'}
					direction={'row'}
					spacing={6}
				>
					<Text p={2}>{userName}</Text>
					<Button onClick={logOut}>LogOut</Button>
				</Stack>
			)
		}

		if (!isAuth) {
			return (
				<Stack
					flex={{ base: 1, md: 0 }}
					justify={'flex-end'}
					direction={'row'}
					spacing={6}
				>
					<Button as={NavLink} to={ROUTES.login}>
						Login
					</Button>
					<Button as={NavLink} to={ROUTES.register}>
						Register
					</Button>
				</Stack>
			)
		}
	}

	return (
		<Box>
			<Flex
				minH={'60px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={'solid'}
				align={'center'}
			>
				<Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
					<NavLink to='/'>
						<Logo></Logo>
					</NavLink>
				</Flex>
				{renderButton(isAuth)}
			</Flex>
		</Box>
	)
}
