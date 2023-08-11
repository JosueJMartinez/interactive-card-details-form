import styles from '../styles/CreditCard.module.scss';
import CreditCardIcon from '../images/card-logo.svg';

export function FrontCreditCard({ cvc }) {
	return (
		<div className={`${styles.credit_card_front} ${styles.credit_card}`}>
      <img src={CreditCardIcon} alt='credit-card-logo' className={styles.card_logo} />
			<div className={styles.card_number}>
				<span>2342</span>
				<span>5466</span>
				<span>3235</span>
				<span>8676</span>
			</div>
      <div className={styles.card_name}>Jane Appleseed</div>
      <div className={styles.card_expiration}>05/23</div>
		</div>
	);
}
