import { BsFillBookmarkHeartFill } from 'react-icons/bs'
import { useFavorites } from '../../hooks/useFavorites.js'
import styles from './Header.module.css'

const Header = () => {
	const { favorites } = useFavorites()

	return (
		<header className={styles.header}>
			<BsFillBookmarkHeartFill style={{ fontSize: '24px' }} />
			<span>{favorites.length}</span>
		</header>
	)
}

export default Header
