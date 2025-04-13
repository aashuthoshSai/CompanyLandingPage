import { NextRequest, NextResponse } from 'next/server';
import { initAdmin } from '../../../config/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, totalPrice, userId, userEmail } = body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid cart items' },
        { status: 400 }
      );
    }
    
    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: 'User authentication required' },
        { status: 401 }
      );
    }
    
    const { db } = initAdmin();
    
    const orderRef = await db.collection('orders').add({
      userId,
      userEmail,
      items,
      totalPrice,
      status: 'pending',
      createdAt: new Date(),
    });
    
    return NextResponse.json({
      success: true,
      orderId: orderRef.id,
      message: 'Order placed successfully',
    });
  } catch (error) {
    console.error('Error processing checkout:', error);
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    );
  }
}
