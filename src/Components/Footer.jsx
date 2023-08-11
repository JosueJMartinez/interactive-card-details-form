import styles from '../styles/Footer.module.scss';

function Footer() {
	return (
		<div className={styles.footer}>
			Challenge by{' '}
			<a href='https://www.frontendmentor.io?ref=challenge' target='#'>
				Frontend Mentor
			</a>
			. Coded by <a href='https://www.frontendmentor.io?ref=challenge'>Your Name Here</a>.
		</div>
	);
}

export default Footer;
