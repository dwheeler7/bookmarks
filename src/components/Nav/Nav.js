import styles from './Nav.module.scss'
import { Link } from 'react-router-dom'
import ItemWrap from '../../components/ItemWrap/ItemWrap'

const Nav = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.nav__wrap}>
            <ItemWrap><Link to='/'>Bookmarks</Link></ItemWrap>                
            <ItemWrap><Link to='/sign-up'>Sign up</Link></ItemWrap>                
            </div>
        </div>
    )
}

export default Nav