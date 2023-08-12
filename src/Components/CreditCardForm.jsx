import { useState } from 'react';
import { Form, Button, Col, InputGroup, Row } from 'react-bootstrap';

export function CreditCardForm({ onCreditFormChange, creditFormData }) {
	const { cardName, cardNumber, cardCvc, cardExpMonth, cardExpYear } = { ...creditFormData };
	const [isValid, setIsValid] = useState(true);

	const handleFormInputChange = e => {
		let { name, value } = e.target;
		if (name === 'cardCvc') console.log(validateNumberString(value));

		if (name === 'cardNumber') {
			console.log('value', value);
			seperateEveryFour(value);
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

	const seperateEveryFour = input => {
		console.log(input.match(/.{1,4}/g));
	};

	return (
		<Form className='w-100'>
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
			</Form.Group>
			{/* <Form.Group className='mb-3' controlId='formBasicCheckbox'>
				<Form.Check type='checkbox' label='Check me out' />
			</Form.Group> */}

			<Row className='align-items-center mb-3'>
				<fieldset className='my-1 col'>
					<Row className='align-items-center'>
						<Form.Label for='cardExpMonth'>EXP. DATE (MM/YY)</Form.Label>
						<Col className='my-1 px-1'>
							<Form.Control
								// id='cardExpMonth'
								type='number'
								placeholder='MM'
								min='1'
								max='12'
								step='any'
								name='cardExpMonth'
								value={cardExpMonth}
								onChange={handleFormInputChange}
							/>
						</Col>
						<Col className='my-1 px-1'>
							<InputGroup>
								<Form.Control
									// id='cardExpYear'
									type='number'
									placeholder='YY'
									min='1'
									max='12'
									step='any'
									name='cardExpYear'
									value={cardExpYear}
									onChange={handleFormInputChange}
								/>
							</InputGroup>
						</Col>
					</Row>
				</fieldset>
				<Col className='my-1 ps-1'>
					<Form.Label htmlFor='cardCvc'>CVC</Form.Label>
					<InputGroup>
						<Form.Control
							// id='cardCvc'
							type='text'
							placeholder='e.g. 123'
							maxLength='3'
							name='cardCvc'
							value={cardCvc}
							onChange={handleFormInputChange}
						/>
					</InputGroup>
				</Col>
			</Row>
			<Button variant='primary w-100' type='submit'>
				Submit
			</Button>
		</Form>
	);
}
