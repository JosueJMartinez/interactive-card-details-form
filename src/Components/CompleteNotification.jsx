import { Button, Card } from 'react-bootstrap';
import SVG from '../images/icon-complete.svg';

export function CompleteNotification({ onCompleteChange, creditFormData }) {
	const handleButtonClick = evt => {
		onCompleteChange({ ...creditFormData, complete: false });
	};
	return (
		<div className='w-100 mt-5'>
			<Card className='text-center'>
				<Card.Body>
					<Card.Title>
						<img src={SVG} alt='icon' />
					</Card.Title>
					<Card.Title>THANK YOU!</Card.Title>
					<Card.Text>We've added your card details</Card.Text>
					<Button variant='primary' onClick={handleButtonClick} className='w-75 p-3'>
						Continue
					</Button>
				</Card.Body>
			</Card>
		</div>
	);
}
