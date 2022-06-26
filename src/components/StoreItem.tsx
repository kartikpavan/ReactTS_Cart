import { Button, Card } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';

type StoreItemProps = {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
	const {
		getItemQuantity,
		IncreaseItemQuantity,
		DecreaseItemQuantity,
		RemoveItem,
	} = useShoppingCart();

	const quantity = getItemQuantity(id);

	return (
		<Card style={{ width: '18rem' }}>
			<Card.Img
				variant="top"
				src={imgUrl}
				height="200px"
				style={{ objectFit: 'cover' }}
			/>
			<Card.Body className="d-flex justify-content-between ">
				<Card.Title>{name}</Card.Title>
				<Card.Text> Rs {price}</Card.Text>
			</Card.Body>
			<div className="mx-auto mb-4">
				{quantity === 0 ? (
					<Button onClick={() => IncreaseItemQuantity(id)}>
						{' '}
						Add to Cart{' '}
					</Button>
				) : (
					<div
						className="d-flex align-items-center flex-column"
						style={{ gap: '0.5rem' }}
					>
						<div
							className="d-flex align-items-center justify-content-center"
							style={{ gap: '0.5rem' }}
						>
							<Button size="sm" onClick={() => DecreaseItemQuantity(id)}>
								-
							</Button>
							<div>
								<span> {quantity} </span> in Cart
							</div>
							<Button size="sm" onClick={() => IncreaseItemQuantity(id)}>
								+
							</Button>
						</div>
						<Button variant="danger" size="sm" onClick={() => RemoveItem(id)}>
							Remove
						</Button>
					</div>
				)}
			</div>
		</Card>
	);
}
