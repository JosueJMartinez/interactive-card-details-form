import styles from '../styles/CreditCard.module.scss';
import CreditCardIcon from '../images/card-logo.svg';

export function FrontCreditCard({ cardInfo }) {
	const { cardNumber, cardName, cardExp } = { ...cardInfo };

	const formatCreditCardNumber = cardNumber => {
		let result = cardNumber.match(/.{1,4}/g) ?? [];
		result = result.map((digits, idx) => (
			<span key={idx} className='pe-2'>
				{digits}
			</span>
		));
		return result;
	};

	return (
		<div className={`${styles.credit_card_front} ${styles.credit_card}`}>
			<img src={CreditCardIcon} alt='credit-card-logo' className={styles.card_logo} />
			<div className={styles.card_number}>{formatCreditCardNumber(cardNumber)}</div>
			<div className={styles.card_name}>{cardName}</div>
			<div className={styles.card_expiration}>{cardExp}</div>
		</div>
	);
}
