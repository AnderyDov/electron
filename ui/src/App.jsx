import styles from './App.module.css';
import { ShowData } from './components/ShowData/ShowData';

function App() {
	return (
		<div className={styles.block}>
			<h1>Electron</h1>
			<ShowData />
		</div>
	);
}

export default App;
