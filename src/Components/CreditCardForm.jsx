import { useCallback, useEffect, useRef, useState } from 'react';
import { Form, Button, Col, InputGroup, Row } from 'react-bootstrap';

export function CreditCardForm({
	onCreditFormChange,
	creditFormData,
	onFormComplete,
	isFormComplete,
}) {
	const { cardName, cardNumber, cardCvc, cardExpMonth, cardExpYear, complete } = {
		...creditFormData,
	};
	const [isValid, setIsValid] = useState({
		cardName: { isEmpty: false },
		cardNumber: { isEmpty: false, isFormatted: true },
		cardCvc: { isEmpty: false, isFormatted: true },
		cardExpMonth: { isEmpty: false, isFormatted: true },
		cardExpYear: { isEmpty: false, isFormatted: true },
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const isInitialMount = useRef(true);

	const checkValidationExpDate = useCallback(() => {
		const blankError = document.querySelector('#expiration-group #blankId');
		const invalidError = document.querySelector('#expiration-group #notValidId');
		if (isValid.cardExpMonth.isEmpty || isValid.cardExpYear.isEmpty) {
			if (blankError) blankError.classList.add('display-invalid');
		} else {
			if (blankError) blankError.classList.remove('display-invalid');
		}

		if (!isValid.cardExpMonth.isFormatted || !isValid.cardExpYear.isFormatted) {
			if (invalidError) invalidError.classList.add('display-invalid');
		} else {
			if (invalidError) invalidError.classList.remove('display-invalid');
		}

		if (
			(isValid.cardExpMonth.isEmpty || isValid.cardExpYear.isEmpty) &&
			(!isValid.cardExpMonth.isFormatted || !isValid.cardExpYear.isFormatted)
		) {
			if (invalidError) invalidError.classList.add('display-invalid-shift');
		} else {
			if (invalidError) invalidError.classList.remove('display-invalid-shift');
		}
	}, [isValid]);

	const checkIfFormComplete = useCallback(() => {
		let complete = true;
		outerLoop: for (const fieldName in isValid) {
			if (isValid.hasOwnProperty(fieldName)) {
				const fieldValue = isValid[fieldName];
				// console.log(`${fieldName}: ${fieldValue}`);

				// If fieldValue is an object, loop through its properties
				if (typeof fieldValue === 'object') {
					for (const prop in fieldValue) {
						if (fieldValue.hasOwnProperty(prop)) {
							if (prop === 'isEmpty' && fieldValue[prop] === true) {
								onFormComplete(false);
								complete = false;
								break outerLoop;
							} else if (prop === 'isFormatted' && fieldValue[prop] === false) {
								onFormComplete(false);
								complete = false;
								break outerLoop;
							}
							// const propValue = fieldValue[prop];
							// console.log(`  ${prop}: ${propValue}`);
						}
					}
				}
			}
		}
		if (complete) onFormComplete(true);
	}, [onFormComplete, isValid]);

	useEffect(() => {
		checkValidationExpDate();
	}, [checkValidationExpDate, isSubmitted]);
	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			console.log('check to submit');
			checkIfFormComplete();
		}
	}, [isSubmitted, checkIfFormComplete]);

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
		setIsSubmitted(prevState => !prevState);
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
		<Form className='w-100 mt-5' onSubmit={handleSubmit}>
			<Form.Group className='mb-4' controlId='cardName'>
				<Form.Label>CARDHOLDER NAME</Form.Label>
				<div className='custom-form-control-wrapper'>
					<Form.Control
						type='text'
						placeholder='e.g. Jane Appleseed'
						name='cardName'
						value={cardName}
						onChange={handleFormInputChange}
						isInvalid={isValid.cardName.isEmpty}
					/>
					<Form.Control.Feedback type='invalid'>Name can't be blank</Form.Control.Feedback>
				</div>
			</Form.Group>
			<Form.Group className='mb-4' controlId='cardNumber'>
				<Form.Label>CARD NUMBER</Form.Label>
				<div className='custom-form-control-wrapper'>
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
				</div>
			</Form.Group>
			<Row className='align-items-center mb-4'>
				<fieldset className='my-1 col'>
					<Form.Label htmlFor='cardExpMonth'>EXP. DATE (MM/YY)</Form.Label>
					<Form.Group controlId='cardExpMonth' className='w-100 input-month'>
						<Row
							id='expiration-group'
							className='align-items-center justify-content-around exp-row-wrapper'
						>
							<div className='custom-form-control-wrapper exp-wrapper'>
								<Form.Control
									// id='cardExpMonth'
									type='text'
									placeholder='MM'
									name='cardExpMonth'
									value={cardExpMonth}
									onChange={handleFormInputChange}
									isInvalid={isValid.cardExpMonth.isEmpty || !isValid.cardExpMonth.isFormatted}
								/>
							</div>
							<div className='custom-form-control-wrapper exp-wrapper'>
								<Form.Control
									// id='cardExpYear'
									type='text'
									placeholder='YY'
									name='cardExpYear'
									value={cardExpYear}
									onChange={handleFormInputChange}
									isInvalid={isValid.cardExpYear.isEmpty || !isValid.cardExpYear.isFormatted}
								/>
							</div>
							{(isValid.cardExpYear.isEmpty || isValid.cardExpMonth.isEmpty) && (
								<Form.Control.Feedback type='invalid' id='blankId'>
									Can't be blank
								</Form.Control.Feedback>
							)}
							{(!isValid.cardExpYear.isFormatted || !isValid.cardExpMonth.isFormatted) && (
								<Form.Control.Feedback type='invalid' id='notValidId'>
									Is not valid Date
								</Form.Control.Feedback>
							)}
						</Row>
					</Form.Group>
				</fieldset>
				<Col className=''>
					<Form.Label htmlFor='cardCvc'>CVC</Form.Label>
					<div className='custom-form-control-wrapper'>
						<Form.Control
							// id='cardCvc'
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
					</div>
				</Col>
			</Row>
			<Button variant='primary w-100' type='submit'>
				Confirm
			</Button>
		</Form>
	);
}
