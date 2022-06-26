import { Stack } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { SingleCartItem } from './SingleCartItem';

type ShoppingCartProps = {
	isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
	const { closeCart, cartItems } = useShoppingCart();
	return (
		<Offcanvas show={isOpen} onHide={closeCart} placement="end">
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Your Cart</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Stack gap={3}>
					{cartItems.map((item) => {
						return <SingleCartItem key={item.id} {...item} />;
					})}
					<div className="ms-auto fw-bold fs-5">TOTAL</div>
				</Stack>
			</Offcanvas.Body>
		</Offcanvas>
	);
}
