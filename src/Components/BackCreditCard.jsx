import styles from '../styles/CreditCard.module.scss';

export function BackCreditCard({ cardCvc }) {
	return (
		<div className={`${styles.credit_card_back} ${styles.credit_card}`}>
			<div className={styles.cvc}>{cardCvc ? cardCvc : '000'}</div>
		</div>
	);
}
