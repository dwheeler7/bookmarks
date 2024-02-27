import styles from './ItemWrap.module.scss'

const ItemWrap = ({children}) => {
    return (
        <div className={styles.itemwrap}>            
            {children}            
        </div>
    )
}

export default ItemWrap