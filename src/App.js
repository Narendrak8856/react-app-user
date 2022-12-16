import { useEffect } from 'react';
import { useFetch } from './Hooks/useFetch';
import { useLocalStorage } from './Hooks/useLocalStorage';
import { useThrottle } from './Hooks/useThrottling';
function App() {
	const [user, error, setRefresh] = useFetch();
	function refreshPage() {
		setRefresh(Math.random());
	}

	const [, setValue, remove] = useLocalStorage('user', []);
	useEffect(() => {
		if (user) {
			setValue(prev => {
				if (prev) return [...prev, user];
				return [user];
			});
		}
	}, [setValue, user]);

	const throttlingFn = useThrottle(refreshPage, 1000);
	if (error) {
		return <h1>{error}</h1>;
	}

	return (
		<>
			{user ? (
				(({ name: { title, first, last } } = user) => (
					<div>
						<h1>Fullname : {`${title} ${first} ${last}`}</h1>
						<h1>Email : {user.email}</h1>
					</div>
				))()
			) : (
				<h1>Loading...</h1>
			)}
			<button onClick={throttlingFn}>Click to Reload</button>
			<br />
			<button onClick={remove}>Clear LocalStorage</button>
		</>
	);
}

export default App;
