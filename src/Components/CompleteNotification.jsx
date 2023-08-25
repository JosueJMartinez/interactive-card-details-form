import { Button, Card } from 'react-bootstrap';
import SVG from '../images/icon-complete.svg';

export function CompleteNotification({ onCompleteChange, creditFormData, mainFormStyle }) {
	const cardName = creditFormData.cardName;
	const handleButtonClick = evt => {
		onCompleteChange({
			cardName: '',
			cardNumber: '',
			cardCvc: '',
			cardExpMonth: '',
			cardExpYear: '',
			complete: false,
		});
	};
	return (
		<div id='complete-notification' className='w-100 mt-5' style={mainFormStyle}>
			<Card className='text-center'>
				<Card.Body>
					<Card.Title>
						<img src={SVG} alt='icon' />
					</Card.Title>
					<Card.Title>THANK YOU {cardName}!</Card.Title>
					<Card.Text>We've added your card details</Card.Text>
					<Button variant='primary' onClick={handleButtonClick} className='w-75 p-3'>
						Continue
					</Button>
				</Card.Body>
			</Card>
		</div>
	);
}
