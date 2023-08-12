import { useState } from 'react';

import styles from '../styles/MainContainer.module.scss';
import { BackCreditCard } from './BackCreditCard';
import { FrontCreditCard } from './FrontCreditCard';
import { CreditCardForm } from './CreditCardForm';

function MainContainer() {
	const [creditCardInfo, setCreditCardInfo] = useState({
		cardName: 'Jane Doe',
		cardNumber: '0000000000000000',
		cardCvc: '000',
		cardExp: '00/00',
	});

	const handleCreditCardChange = newCreditInformation => {
		setCreditCardInfo(handleCreditCardChange);
	};

	return (
		<div
			className={`container-fluid container-lg d-flex flex-column align-items-center justify-content-center vh-100 ${styles.mobile_background}`}
		>
			{' '}
			<div className={styles.background_container}>
				<div className={styles.card_holder}>
					<BackCreditCard cardCvc={creditCardInfo.cardCvc} />
					<FrontCreditCard
						cardInfo={{
							cardNumber: creditCardInfo.cardNumber,
							cardName: creditCardInfo.cardName,
							cardExp: creditCardInfo.cardExp,
						}}
					/>
				</div>
			</div>
			<CreditCardForm onCreditCardChange={handleCreditCardChange} />
			{/* 0000 0000 0000 0000 Jane Appleseed 00/00 000 Cardholder Name e.g. Jane Appleseed Card Number
			e.g. 1234 5678 9123 0000 Exp. Date (MM/YY) MM YY CVC e.g. 123 Confirm Thank you! We've added
			your card details Continue */}
		</div>
	);
}

export default MainContainer;
