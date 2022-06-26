import { Stack, Button } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import storeItems from '../data/items.json';

type SingleCartItemProps = {
	id: number;
	quantity: number;
};

export function SingleCartItem({ id, quantity }: SingleCartItemProps) {
	const { RemoveItem } = useShoppingCart();
	const item = storeItems.find((item) => item.id === id);
	//! Checking whether the item exist or not in the cart
	if (item == null) return null;

	return (
		<>
			<Stack
				direction="horizontal"
				gap={2}
				className="d-flex align-items-center"
			>
				<img
					src={item.imgUrl}
					alt="image"
					style={{ width: '125px', height: '75px', objectFit: 'cover' }}
				/>
				<div className="me-auto">
					<div>
						{item.name}
						{quantity > 1 && (
							<span
								className="text-muted"
								style={{ fontSize: '.75rem', margin: '0px 3px' }}
							>
								x{quantity}
							</span>
						)}
					</div>
					<div className="text-muted" style={{ fontSize: '.75rem' }}>
						Rs {item.price}
					</div>
				</div>
				<div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
					Rs {item.price * quantity}{' '}
				</div>
				<Button
					variant="outline-danger"
					size="sm"
					onClick={() => RemoveItem(item.id)}
				>
					&times;
				</Button>
			</Stack>
		</>
	);
}
