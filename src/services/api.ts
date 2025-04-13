
/**
 * Place an order with the items in the cart
 */
export async function checkoutOrder(orderData: {
  items: any[];
  totalPrice: number;
  userId: string;
  userEmail: string;
}) {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to process checkout');
    }

    return await response.json();
  } catch (error) {
    console.error('Checkout API error:', error);
    throw error;
  }
}

/**
 * Get all orders for a user
 */
export async function getUserOrders(userId: string) {
  try {
    const response = await fetch(`/api/orders?userId=${userId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch orders');
    }

    return await response.json();
  } catch (error) {
    console.error('Get orders API error:', error);
    throw error;
  }
}

/**
 * Get a specific order by ID
 */
export async function getOrderById(orderId: string) {
  try {
    const response = await fetch(`/api/orders/${orderId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch order');
    }

    return await response.json();
  } catch (error) {
    console.error('Get order API error:', error);
    throw error;
  }
}

/**
 * Update an order's status
 */
export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update order');
    }

    return await response.json();
  } catch (error) {
    console.error('Update order API error:', error);
    throw error;
  }
}
