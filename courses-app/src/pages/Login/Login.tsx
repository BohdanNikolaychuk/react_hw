import {
	Alert,
	AlertDescription,
	AlertIcon,
	Button,
	Flex,
	Heading,
	Input,
	Text,
} from '@chakra-ui/react'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

//store

import { userLogin } from '../../store/user/asyncActions'
//const
import { ROUTES } from '../../router/ROUTES'

//types
import { ILogin } from '../../@types/IAuth'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks'

export const Login: React.FC = () => {
	const navigate = useNavigate()

	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const [Show, setShow] = React.useState(false)

	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Email is required').email('Email is invalid'),
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Password must be at least 7 characters')
			.max(40, 'Password must not exceed 40 characters'),
	})
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ILogin>({
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	})

	const onSubmit = async (UserData: ILogin) => {
		await dispatch(userLogin(UserData))
	}
	if (isAuth) {
		navigate(ROUTES.main)
	}

	return (
		<Flex h='100vh' alignItems='center' justifyContent='center'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex flexDirection='column' p={12} borderRadius={8} boxShadow='lg'>
					<Heading mb={6}>Log In</Heading>

					<Input
						{...register('email')}
						placeholder='johndoe@gmail.com'
						type='email'
						variant='filled'
						mb={3}
					/>

					{errors.email?.message && (
						<Alert status='error'>
							<AlertIcon />

							<AlertDescription>{errors.email?.message}</AlertDescription>
						</Alert>
					)}

					<Input
						{...register('password')}
						placeholder='******'
						type='password'
						autoComplete='on'
						variant='filled'
						autoCorrect='on'
						mb={6}
					/>

					{errors.password?.message && (
						<Alert status='error'>
							<AlertIcon />

							<AlertDescription>{errors.password?.message}</AlertDescription>
						</Alert>
					)}

					<Button disabled={!isValid} type='submit' colorScheme='teal' mb={8}>
						Log In
					</Button>

					<Text mb={6}>
						If you not have an account you can
						<Button as={NavLink} to={ROUTES.register}>
							Register
						</Button>
					</Text>
				</Flex>
			</form>
		</Flex>
	)
}
