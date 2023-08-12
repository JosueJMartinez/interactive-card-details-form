import { useState } from 'react';
import { Form, Button, Col, InputGroup, Row } from 'react-bootstrap';

export function CreditCardForm({ onCreditCardChange }) {
	return (
		<Form className='w-100'>
			<Form.Group className='mb-3' controlId='formBasicEmail'>
				<Form.Label>CARDHOLER NAME</Form.Label>
				<Form.Control type='text' placeholder='e.g. Jane Appleseed' />
			</Form.Group>
			<Form.Group className='mb-3' controlId='formBasicPassword'>
				<Form.Label>CARD NUMBER</Form.Label>
				<Form.Control type='number' placeholder='e.g. 1234 5678 9123 0000' />
			</Form.Group>
			{/* <Form.Group className='mb-3' controlId='formBasicCheckbox'>
				<Form.Check type='checkbox' label='Check me out' />
			</Form.Group> */}
			<Row className='align-items-center'>
				<Col className='my-1'>
					<Form.Label htmlFor='inlineFormInputName'>EXP. DATE</Form.Label>
					<Form.Control id='inlineFormInputName' placeholder='Jane Doe' />
				</Col>
				<Col className='my-1'>
					<Form.Label htmlFor='inlineFormInputGroupUsername'>(MM/YY)</Form.Label>
					<InputGroup>
						<InputGroup.Text>@</InputGroup.Text>
						<Form.Control id='inlineFormInputGroupUsername' placeholder='Username' />
					</InputGroup>
				</Col>
				<Col className='my-1'>
					<Form.Label htmlFor='inlineFormInputGroupUsername'>CVC</Form.Label>
					<InputGroup>
						<InputGroup.Text>@</InputGroup.Text>
						<Form.Control id='inlineFormInputGroupUsername' placeholder='Username' />
					</InputGroup>
				</Col>
			</Row>
			<Button variant='primary w-100' type='submit'>
				Submit
			</Button>
		</Form>
	);
}
