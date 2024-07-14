import styles from './App.module.css';
import { ShowData } from './components/ShowData/ShowData';
import { useSetRecoilState } from 'recoil';
import { dataState } from './store/atom';

function App() {
	const setData = useSetRecoilState(dataState);

	window.electronAPI.lineDrow(v => {
		console.log(v);
		setData(s => s + '\n' + v);
	});

	async function func() {
		setData('');
		await window.electronAPI.getData();
	}

	return (
		<div className={styles.block}>
			<h1>Electron</h1>
			<button onClick={func}>click</button>
			<ShowData />
		</div>
	);
}

export default App;
