import styles from './App.module.css';
import { ShowData } from './components/ShowData/ShowData';
import { useSetRecoilState } from 'recoil';
import { dataState } from './store/atom';
import { useEffect } from 'react';

function App() {
	const setData = useSetRecoilState(dataState);
	let pre;
	useEffect(() => {
		pre = document.querySelector('#pre');
	}, []);

	window.electronAPI.lineDrow(v => {
		console.log(v);
		setData(s => s + '\n' + v);
		if (window.pre) {
			pre.scrollTop = pre.scrollHeight;
		}
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
