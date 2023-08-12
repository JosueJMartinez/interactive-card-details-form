import { useState } from 'react';

import styles from '../styles/MainContainer.module.scss';
import { BackCreditCard } from './BackCreditCard';
import { FrontCreditCard } from './FrontCreditCard';
import { CreditCardForm } from './CreditCardForm';

function MainContainer() {
	const [creditFormData, setCreditFormData] = useState({
		cardName: '',
		cardNumber: '',
		cardCvc: '',
		cardExpMonth: '',
		cardExpYear: '',
	});

	const handleCreditCardChange = newCreditData => {
		setCreditFormData(newCreditData);
	};

	return (
		<div className={`container-fluid container-lg d-flex flex-column align-items-center justify-content-center vh-100 ${styles.mobile_background}`}>
			{' '}
			<div className={styles.background_container}>
				<div className={styles.card_holder}>
					<BackCreditCard cardCvc={creditFormData.cardCvc} />
					<FrontCreditCard
						cardInfo={{
							cardNumber: creditFormData.cardNumber,
							cardName: creditFormData.cardName,
							cardExpMonth: creditFormData.cardExpMonth,
							cardExpYear: creditFormData.cardExpYear,
						}}
					/>
				</div>
			</div>
			<CreditCardForm onCreditFormChange={handleCreditCardChange} creditFormData={creditFormData} />
			{/* 0000 0000 0000 0000 Jane Appleseed 00/00 000 Cardholder Name e.g. Jane Appleseed Card Number
			e.g. 1234 5678 9123 0000 Exp. Date (MM/YY) MM YY CVC e.g. 123 Confirm Thank you! We've added
			your card details Continue */}
		</div>
	);
}

export default MainContainer;
