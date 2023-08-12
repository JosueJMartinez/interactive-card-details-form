import styles from '../styles/CreditCard.module.scss';
import CreditCardIcon from '../images/card-logo.svg';

export function FrontCreditCard({ cardInfo }) {
	const { cardNumber, cardName, cardExpMonth, cardExpYear } = { ...cardInfo };

	const formatCreditCardNumber = cardNumber => {
		// let result = cardNumber.split(" ")
		console.log(cardNumber);
		console.log(typeof cardNumber);
		// result = result.map((digits, idx) => (
		// 	<span key={idx} className='pe-2'>
		// 		{digits}
		// 	</span>
		// ));
		// return result;
		return cardNumber
	};

	return (
		<div className={`${styles.credit_card_front} ${styles.credit_card}`}>
			<img src={CreditCardIcon} alt='credit-card-logo' className={styles.card_logo} />
			<div className={styles.card_number}>{cardNumber ? cardNumber : '0000000000000000'}</div>
			<div className={styles.card_name}>{cardName ? cardName : 'Jane Doe'}</div>
			<div className={styles.card_expiration}>
				{cardExpMonth ? cardExpMonth : '00'}/{cardExpYear ? cardExpYear : '00'}
			</div>
		</div>
	);
}
