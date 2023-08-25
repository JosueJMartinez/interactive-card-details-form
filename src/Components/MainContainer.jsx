import { useState, useEffect, useRef } from 'react';

import { BackCreditCard } from './BackCreditCard';
import { FrontCreditCard } from './FrontCreditCard';
import { CreditCardForm } from './CreditCardForm';
import styles from '../styles/MainContainer.module.scss';
import { CompleteNotification } from './CompleteNotification';

function MainContainer() {
	const [creditFormData, setCreditFormData] = useState({
		cardName: '',
		cardNumber: '',
		cardCvc: '',
		cardExpMonth: '',
		cardExpYear: '',
		complete: false,
	});

	const [mainFormStyle, setMainFormStyle] = useState({});

	const isInitialMount = useRef(true);

	useEffect(() => {
		const handleWindowResize = () => {
			if (window.innerWidth < 1200) {
				setMainFormStyle({});
			} else if (window.innerWidth < 1340) {
				setMainFormStyle({
					right: `${window.innerWidth - 1190}px`,
				});
			} else {
				setMainFormStyle({
					right: `${(window.innerWidth - 983) / 2}px`,
				});
			}
		};

		if (isInitialMount.current) {
			handleWindowResize();
		}
		window.addEventListener('resize', handleWindowResize);
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	const handleCreditCardChange = newCreditData => {
		setCreditFormData(newCreditData);
	};

	return (
		<div
			className={`container-fluid container-sm d-flex flex-column align-items-center justify-content-center vh-100 ${styles.mobile_background}`}
		>
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
			{!creditFormData.complete && (
				<CreditCardForm
					onCreditFormChange={handleCreditCardChange}
					creditFormData={creditFormData}
					mainFormStyle={mainFormStyle}
				/>
			)}
			{creditFormData.complete && (
				<CompleteNotification
					onCompleteChange={setCreditFormData}
					creditFormData={creditFormData}
					mainFormStyle={mainFormStyle}
				></CompleteNotification>
			)}
		</div>
	);
}

export default MainContainer;
