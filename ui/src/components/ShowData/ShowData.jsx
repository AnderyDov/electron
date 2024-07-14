import styles from './ShowData.module.css';
import { useRecoilState } from 'recoil';
import { dataState } from '../../store/atom';

export function ShowData() {
	const [data] = useRecoilState(dataState);

	return <pre className={styles.block}>{data}</pre>;
}
