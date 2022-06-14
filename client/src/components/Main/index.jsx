import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {
	const navigate = useNavigate();
	const user = localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate('/login')
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<ul className={styles.navarea}>
					<li><Link to='/dashboard'>Dashboard</Link></li>
					<li><Link to='/catagories'>Catagories</Link></li>
					<li><Link to='/cars' >Cars</Link></li>
					<li><Link onClick={handleLogout} to='/login' >{user ? 'logout' : 'login'}</Link></li>
				</ul>
			</nav>
		</div>
	);
};

export default Main;
