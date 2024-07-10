import styles from './DialogMenu.module.css';
import ttt from '../Burger/Burger.module.css';
import cn from 'classnames';

export function DialogMenu({ className, ...props }) {
    function closeMenu(e) {
        let t = e.target;
        if (t.tagName.toUpperCase() != 'A') {
            console.log(t.tagName);
            return;
        } else {
            window.menu.classList.remove(ttt.open);
            window.dialog.close();
        }
    }

    return (
        <dialog
            id='dialog'
            className={cn(className, styles.block)}
            {...props}
            onClick={closeMenu}
        >
            <a
                className={cn(styles.anchor, 'not_effect')}
                tabIndex={1}
                href='/#product'
            >
                Что это
            </a>
            <a
                className={cn(styles.anchor, 'not_effect')}
                tabIndex={1}
                href='/#problem'
            >
                Проблема
            </a>
            <a
                className={cn(styles.anchor, 'not_effect')}
                tabIndex={1}
                href='/#solution'
            >
                Решение
            </a>
            <a
                className={cn(styles.anchor, 'not_effect')}
                tabIndex={1}
                href='/#download'
            >
                Скачать
            </a>
            <a
                className={cn(styles.anchor, 'not_effect')}
                tabIndex={1}
                href='/#forwhom'
            >
                Для кого
            </a>
            <a
                className={cn(styles.anchor, 'not_effect')}
                tabIndex={1}
                href='/#support'
            >
                Техподдержка
            </a>
            <a
                className={cn(styles.anchor, 'not_effect')}
                tabIndex={1}
                href='/#sale'
            >
                Где купить
            </a>
            <a
                className={cn(styles.anchor, 'not_effect')}
                tabIndex={1}
                href='/#contacts'
            >
                Контакты
            </a>
        </dialog>
    );
}
