import styles from '../styles/MainContainer.module.scss';
import { BackCreditCard } from './BackCreditCard';
import { FrontCreditCard } from './FrontCreditCard';

function MainContainer() {
	return (
		<div
			className={` container-fluid container-lg d-flex flex-column align-items-center justify-content-center vh-100 ${styles.mobile_background}`}
		>
			{' '}
			<div className={styles.background_container}>
				<div className={styles.card_holder} >
					<BackCreditCard cvc={345} />
					<FrontCreditCard creditCard={`0000000000000000`} />
				</div>
			</div>
			{/* 0000 0000 0000 0000 Jane Appleseed 00/00 000 Cardholder Name e.g. Jane Appleseed Card Number
			e.g. 1234 5678 9123 0000 Exp. Date (MM/YY) MM YY CVC e.g. 123 Confirm Thank you! We've added
			your card details Continue */}
		</div>
	);
}

export default MainContainer;
