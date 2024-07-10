import styles from './Checkbox.module.css';
import cn from 'classnames';

export function Checkbox({ value, checked, onChange, text, disabled, ...props }) {
	return (
		<label
			className={cn(styles.block, {
				[styles.dis]: disabled,
			})}
			{...props}
		>
			<input value={value} checked={checked} onChange={onChange} className={styles.input} type="checkbox" />
			{text}
		</label>
	);
}
