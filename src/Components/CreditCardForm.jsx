import { useState } from 'react';
import { Form, Button, Col, InputGroup, Row } from 'react-bootstrap';

export function CreditCardForm({ onCreditFormChange, creditFormData }) {
	const { cardName, cardNumber, cardCvc, cardExpMonth, cardExpYear } = { ...creditFormData };
	const [isValid, setIsValid] = useState({
		cardName: true,
		cardNumber: true,
		cardCvc: true,
		cardExpMonth: true,
		cardExpYear: true,
	});

	const handleFormInputChange = e => {
		let { name, value } = e.target;
		if (name === 'cardNumber') value = formatCardNumber(value);
		if (!isValid[name]) {
			setIsValid(prevState => {
				return { ...prevState, [name]: true };
			});
		}
		const newData = {
			...creditFormData,
			[name]: value,
		};
		onCreditFormChange(newData);
	};

	const validateNumberString = inputString => {
		const numberPattern = /^[0-9]+$/;
		return numberPattern.test(inputString);
	};

	const formatCardNumber = value => {
		let v = value.replace(/\s+/g, '');
		let matches = v.match(/.{4,16}/g);
		let match = (matches && matches[0]) || '';
		let parts = [];
		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}

		if (parts.length) return parts.join(' ');
		else return value;
	};

	const isNumberSpecificLen = (str, len) => {
		const regexPattern = new RegExp(`^\\d{${len}}$`);
		return regexPattern.test(str);
	};

	const handleSubmit = evt => {
		evt.preventDefault();
		if (!cardName) {
			console.log('error on name');
			setIsValid(prevState => {
				return { ...prevState, cardName: false };
			});
		}
		if (!isNumberSpecificLen(cardCvc, 3)) {
			console.log('error CVC');
			setIsValid(prevState => {
				return { ...prevState, cardCvc: false };
			});
		}
		if (!isNumberSpecificLen(cardExpMonth, 2)) {
			console.log('error cardExpMonth');
			setIsValid(prevState => {
				return { ...prevState, cardExpMonth: false };
			});
		} else {
			const testMonth = +cardExpMonth;
			if (testMonth < 1 || testMonth > 12) {
				console.log('error cardExpMonth not a valid month');
				setIsValid(prevState => {
					return { ...prevState, cardExpMonth: false };
				});
			}
		}
		if (!isNumberSpecificLen(cardExpYear, 2)) {
			console.log('error cardExpYear');
			setIsValid(prevState => {
				return { ...prevState, cardExpYear: false };
			});
		} else {
			const testYear = +cardExpYear;
			if (testYear < 0 || testYear > 99) {
				console.log('error cardExpYear not a valid month');
				setIsValid(prevState => {
					return { ...prevState, cardExpYear: false };
				});
			}
		}
		const cardNumberWithOutSpaces = cardNumber.replace(/\s/g, '');
		if (!isNumberSpecificLen(cardNumberWithOutSpaces, 16)) {
			console.log('error with card number');
			setIsValid(prevState => {
				return { ...prevState, cardNumber: false };
			});
		}

		for (const key in isValid) {
			console.log(`${key}: ${isValid[key]}`);
		}
	};

	return (
		<Form className='w-100' onSubmit={handleSubmit}>
			<Form.Group className='mb-3' controlId='cardName'>
				<Form.Label>CARDHOLDER NAME</Form.Label>
				<Form.Control
					// id='cardName'
					type='text'
					placeholder='e.g. Jane Appleseed'
					name='cardName'
					value={cardName}
					onChange={handleFormInputChange}
				/>
				{!isValid.cardName && <div>Error</div>}
			</Form.Group>
			<Form.Group className='mb-3' controlId='cardNumber'>
				<Form.Label>CARD NUMBER</Form.Label>
				<Form.Control
					// id='cardNumber'
					type='text'
					placeholder='e.g. 1234 5678 9123 0000'
					name='cardNumber'
					value={cardNumber}
					onChange={handleFormInputChange}
					maxLength='19'
				/>
				{!isValid.cardNumber && <div>Error</div>}
			</Form.Group>

			<Row className='align-items-center mb-3'>
				<fieldset className='my-1 col'>
					<Row className='align-items-center'>
						<Form.Label htmlFor='cardExpMonth'>EXP. DATE (MM/YY)</Form.Label>
						<Col className='my-1 px-1'>
							<Form.Control
								id='cardExpMonth'
								type='text'
								placeholder='MM'
								maxLength='2'
								name='cardExpMonth'
								value={cardExpMonth}
								onChange={handleFormInputChange}
							/>
							{!isValid.cardExpMonth && <div>Error</div>}
						</Col>
						<Col className='my-1 px-1'>
							<InputGroup>
								<Form.Control
									id='cardExpYear'
									type='text'
									placeholder='YY'
									maxLength='2'
									name='cardExpYear'
									value={cardExpYear}
									onChange={handleFormInputChange}
								/>
								{!isValid.cardExpYear && <div>Error</div>}
							</InputGroup>
						</Col>
					</Row>
				</fieldset>
				<Col className='my-1 ps-1'>
					<Form.Label htmlFor='cardCvc'>CVC</Form.Label>
					<InputGroup>
						<Form.Control
							id='cardCvc'
							type='text'
							placeholder='e.g. 123'
							maxLength='3'
							name='cardCvc'
							value={cardCvc}
							onChange={handleFormInputChange}
						/>
						{!isValid.cardCvc && <div>Error</div>}
					</InputGroup>
				</Col>
			</Row>
			<Button variant='primary w-100' type='submit'>
				Submit
			</Button>
		</Form>
	);
}
