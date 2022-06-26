import { createContext, ReactNode, useContext, useState } from 'react';
import { ShoppingCart } from '../components/Shoppingcart';

type ShoppingCartProviderProps = {
	children: ReactNode;
};

type ShoppingCartContext = {
	openCart: () => void;
	closeCart: () => void;
	getItemQuantity: (id: number) => number;
	IncreaseItemQuantity: (id: number) => void;
	DecreaseItemQuantity: (id: number) => void;
	RemoveItem: (id: number) => void;
	cartTotalQuantity: number;
	cartItems: CartItem[];
};

type CartItem = {
	id: number;
	quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
	return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
	//? State Variables
	const [isOpen, setIsOpen] = useState(false);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	//! Opening and closing cart Sidebar
	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	//! Calculating total quantity in the cart
	const cartTotalQuantity = cartItems.reduce((quantity, item) => {
		return item.quantity + quantity;
	}, 0);

	//! Get Item Quantity
	function getItemQuantity(id: number) {
		return cartItems.find((item) => item.id === id)?.quantity || 0; // If find method evaluats to something then get me the quantity else return 0
	}
	//! Increasing item quantity
	function IncreaseItemQuantity(id: number) {
		setCartItems((currentItems) => {
			if (currentItems.find((item) => item.id === id) == null) {
				return [...cartItems, { id, quantity: 1 }];
			} else {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	}

	//! Decreasing Item Quantity
	function DecreaseItemQuantity(id: number) {
		setCartItems((currentItems) => {
			if (currentItems.find((item) => item.id === id)?.quantity === 1) {
				return currentItems.filter((item) => item.id !== id);
			} else {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	}

	//! Removing all the items From the cart
	function RemoveItem(id: number) {
		setCartItems((currentItems) => {
			return currentItems.filter((item) => item.id !== id);
		});
	}

	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				IncreaseItemQuantity,
				DecreaseItemQuantity,
				RemoveItem,
				cartItems,
				cartTotalQuantity,
				closeCart,
				openCart,
			}}
		>
			{children}
			<ShoppingCart isOpen={isOpen} />
		</ShoppingCartContext.Provider>
	);
}
