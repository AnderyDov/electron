import styles from './Burger.module.css';
import cn from 'classnames';

export function Burger({ className, ...props }) {
    function openMenu(e) {
        let t = e.currentTarget;
        t.classList.toggle(styles.open);
        if (window.dialog) {
            if (t.classList.contains(styles.open)) {
                window.dialog.show();
            } else {
                window.dialog.close();
            }
        }
    }

    return (
        <button
            id='menu'
            data-testid='menu'
            className={cn(className, styles.block)}
            {...props}
            tabIndex={1}
            onClick={openMenu}
        >
            <div className={cn(styles.item, styles.i1)}></div>
            <div className={cn(styles.item, styles.i2)}></div>
            <div className={cn(styles.item, styles.i3)}></div>
            <div className={cn(styles.item, styles.i4)}></div>
            <div className={cn(styles.item, styles.i5)}></div>
        </button>
    );
}
