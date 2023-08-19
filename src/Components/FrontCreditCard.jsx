import styles from '../styles/CreditCard.module.scss';
import CreditCardIcon from '../images/card-logo.svg';

export function FrontCreditCard({ cardInfo }) {
	const { cardNumber, cardName, cardExpMonth, cardExpYear } = { ...cardInfo };

	return (
		<div className={`${styles.credit_card_front} ${styles.credit_card}`}>
			<img src={CreditCardIcon} alt='credit-card-logo' className={styles.card_logo} />
			<div className={styles.card_number}>{cardNumber ? cardNumber : '1234 5678 9123 0000'}</div>
			<div className={styles.card_name}>{cardName ? cardName : 'Jane Appleseed'}</div>
			<div className={styles.card_expiration}>
				{cardExpMonth ? cardExpMonth : 'MM'}/{cardExpYear ? cardExpYear : 'YY'}
			</div>
		</div>
	);
}
