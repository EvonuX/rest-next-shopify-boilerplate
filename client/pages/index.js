import { useEffect } from 'react'
import axios from 'axios'

export default function Home() {
	useEffect(() => {
		async function getCustomers() {
			const { data } = await axios.get('/api/list-customers')
			console.log(data.customers)
		}

		getCustomers()
	}, [])

	return (
		<div>
			<h1>Hello</h1>
		</div>
	)
}
