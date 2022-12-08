import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetch = () => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [refresh, setRefresh] = useState(1);

	useEffect(() => {
		(async () => {
			try {
				const {
					data: {
						results: [user],
					},
				} = await axios.get('https://randomuser.me/api');
				setUser(user);
			} catch (error) {
				setError(error.message);
			}
		})();
	}, [refresh]);
	return [user, error, setRefresh];
};
