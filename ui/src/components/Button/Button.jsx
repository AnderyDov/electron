import styles from './Button.module.css';
import cn from 'classnames';

export function Button({
    children,
    className,
    disabled = false,
    fake = false,
    ...props
}) {
    if (fake) {
        return (
            <div
                className={cn(className, styles.block, {
                    [styles.disabled]: disabled === true,
                })}
                {...props}
            >
                {children}
            </div>
        );
    }
    return (
        <button
            className={cn(className, styles.block, {
                [styles.disabled]: disabled === true,
            })}
            {...props}
        >
            {children}
        </button>
    );
}
