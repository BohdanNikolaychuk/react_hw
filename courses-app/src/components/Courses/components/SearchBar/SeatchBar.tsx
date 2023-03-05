import { Button, Container, Flex, Input } from '@chakra-ui/react'
import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../../hooks/redux.hooks'

interface SearchBar {
	inputHandler: (filter: string) => void
}

export const SearchBar = ({ inputHandler }: SearchBar) => {
	const [filter, setFilter] = React.useState('')
	const role = useAppSelector(state => state.auth.role)
	const handlerSetFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value)
	}

	const filterCourse = (event: FormEvent) => {
		event.preventDefault()
		inputHandler(filter)
	}

	const permissionForSearch = (role: string | null) => {
		if (role === 'admin') {
			return (
				<Button as={Link} to='course/create'>
					Add new Course
				</Button>
			)
		}
	}

	return (
		<Container maxW='2xl'>
			<Flex p='10px'>
				<form onSubmit={filterCourse}>
					<Flex alignItems='center'>
						<Input
							onChange={handlerSetFilter}
							value={filter}
							m='10px'
							placeholder='Enter course id or name'
						/>
						<Button type='submit'>Search</Button>
					</Flex>
					{permissionForSearch(role)}
				</form>
			</Flex>
		</Container>
	)
}
