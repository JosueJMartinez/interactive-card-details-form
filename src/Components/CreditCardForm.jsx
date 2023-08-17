import { useState } from 'react';
import { Form, Button, Col, InputGroup, Row } from 'react-bootstrap';

export function CreditCardForm({ onCreditFormChange, creditFormData }) {
	const { cardName, cardNumber, cardCvc, cardExpMonth, cardExpYear } = { ...creditFormData };
	const [isValid, setIsValid] = useState({
		cardName: { isEmpty: false },
		cardNumber: { isEmpty: false, isFormatted: true },
		cardCvc: { isEmpty: false, isFormatted: true },
		cardExpMonth: { isEmpty: false, isFormatted: true },
		cardExpYear: { isEmpty: false, isFormatted: true },
	});

	const handleFormInputChange = e => {
		let { name, value } = e.target;
		if (name === 'cardNumber') value = formatCardNumber(value);

		if (name === 'cardExpYear' || name === 'cardExpMonth') {
			value = modifyTwoDigit(value);
		}

		setIsValid(prevState => ({
			...prevState,
			[name]: { ...prevState[name], isEmpty: false, isFormatted: true },
		}));

		onCreditFormChange({
			...creditFormData,
			[name]: value,
		});
	};

	const handleSubmit = evt => {
		evt.preventDefault();

		genericValidate(cardName, { name: 'cardName' });

		genericValidate(cardCvc, { name: 'cardCvc', checkForLengthAndNumber: 3 });

		genericValidate(cardExpMonth, {
			checkForLengthAndNumber: 2,
			name: 'cardExpMonth',
			checkForValueLimit: { min: 1, max: 12 },
		});

		genericValidate(cardExpYear, {
			checkForLengthAndNumber: 2,
			name: 'cardExpYear',
			checkForValueLimit: { min: 0, max: 99 },
		});

		genericValidate(cardNumber, {
			checkForLengthAndNumber: 16,
			formatCardNumber: true,
			name: 'cardNumber',
		});
	};

	const genericValidate = (value, args) => {
		const { checkForLengthAndNumber, checkForValueLimit, formatCardNumber, name } = { ...args };

		if (formatCardNumber) {
			value = value.replace(/\s/g, '');
		}

		if (!value) {
			setIsValid(prevState => ({
				...prevState,
				[name]: { ...prevState[name], isEmpty: true },
			}));
		} else if (checkForLengthAndNumber && !isNumberSpecificLen(value, checkForLengthAndNumber)) {
			setIsValid(prevState => ({
				...prevState,
				[name]: { ...prevState[name], isFormatted: false },
			}));
		} else if (checkForValueLimit) {
			const testValue = +value;
			if (testValue < checkForValueLimit.min || testValue > checkForValueLimit.max) {
				setIsValid(prevState => ({
					...prevState,
					[name]: { ...prevState[name], isFormatted: false },
				}));
			}
		}
	};

	const modifyTwoDigit = value => {
		if (value.length === 1) value = '0' + value;
		else if (value.length === 3 && value[0] === '0') value = value.slice(1);
		else value = value.slice(0, value.length - 1);
		return value;
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

	return (
		<Form className='w-100' onSubmit={handleSubmit}>
			<Form.Group className='mb-3' controlId='cardName'>
				<Form.Label>CARDHOLDER NAME</Form.Label>
				<Form.Control
					type='text'
					placeholder='e.g. Jane Appleseed'
					name='cardName'
					value={cardName}
					onChange={handleFormInputChange}
					isInvalid={isValid.cardName.isEmpty}
				/>
				<Form.Control.Feedback type='invalid'>Name can't be blank</Form.Control.Feedback>
			</Form.Group>
			<Form.Group className='mb-3' controlId='cardNumber'>
				<Form.Label>CARD NUMBER</Form.Label>
				<Form.Control
					type='text'
					placeholder='e.g. 1234 5678 9123 0000'
					name='cardNumber'
					value={cardNumber}
					onChange={handleFormInputChange}
					maxLength='19'
					isInvalid={isValid.cardNumber.isEmpty || !isValid.cardNumber.isFormatted}
				/>
				{isValid.cardNumber.isEmpty && (
					<Form.Control.Feedback type='invalid'>Card number can't be blank</Form.Control.Feedback>
				)}
				{!isValid.cardNumber.isFormatted && (
					<Form.Control.Feedback type='invalid'>Card number is not valid</Form.Control.Feedback>
				)}
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
								name='cardExpMonth'
								value={cardExpMonth}
								onChange={handleFormInputChange}
								isInvalid={isValid.cardExpMonth.isEmpty || !isValid.cardExpMonth.isFormatted}
							/>
							{isValid.cardExpMonth.isEmpty && (
								<Form.Control.Feedback type='invalid'>Can't be blank</Form.Control.Feedback>
							)}
							{!isValid.cardExpMonth.isFormatted && (
								<Form.Control.Feedback type='invalid'>Month is not valid</Form.Control.Feedback>
							)}
						</Col>
						<Col className='my-1 px-1'>
							<InputGroup>
								<Form.Control
									id='cardExpYear'
									type='text'
									placeholder='YY'
									name='cardExpYear'
									value={cardExpYear}
									onChange={handleFormInputChange}
									isInvalid={isValid.cardExpYear.isEmpty || !isValid.cardExpYear.isFormatted}
								/>
								{isValid.cardExpYear.isEmpty && (
									<Form.Control.Feedback type='invalid'>Can't be blank</Form.Control.Feedback>
								)}
								{!isValid.cardExpYear.isFormatted && (
									<Form.Control.Feedback type='invalid'>Year is not valid</Form.Control.Feedback>
								)}
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
							isInvalid={isValid.cardCvc.isEmpty || !isValid.cardCvc.isFormatted}
						/>
						{isValid.cardCvc.isEmpty && (
							<Form.Control.Feedback type='invalid'>CVC can't be blank</Form.Control.Feedback>
						)}
						{!isValid.cardCvc.isFormatted && (
							<Form.Control.Feedback type='invalid'>CVC is not valid</Form.Control.Feedback>
						)}
					</InputGroup>
				</Col>
			</Row>
			<Button variant='primary w-100' type='submit'>
				Submit
			</Button>
		</Form>
	);
}
