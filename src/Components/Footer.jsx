import styles from '../styles/Footer.module.scss';

function Footer() {
	return (
		<div className={styles.footer}>
			Challenge by{' '}
			<a href='https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw/hub'>
				Frontend Mentor
			</a>
			. Coded by <a href='https://www.frontendmentor.io/profile/JosueJMartinez'>Josue J Martinez</a>
			.
		</div>
	);
}

export default Footer;
