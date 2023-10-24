import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Webhook handler to trigger revalidation of /delivery sub-routes
 *
 * @param req
 * @param res
 * @returns
 */
export const POST = async (
  req: Request | NextRequest,
  res: Response | NextResponse
) => {
  try {
    const signature = req.headers.get('x-delivery-signature');

    if (signature !== process.env['X_DELIVERY_SIGNATURE']) {
      return NextResponse.json({ msg: 'Invalid request!' });
    }

    const body = await req.json();

    switch (body.event) {
      case 'CREATE':
        console.log(`Revalidating tag: deliveries`);
        revalidateTag('deliveries');
        break;
      case 'UPDATE':
        console.log(`Revalidating tag: delivery/${body.data.id}`);
        revalidateTag(`delivery/${body.data.id}`);
    }

    return NextResponse.json({ msg: 'Product pages revalidated.' });
  } catch (error) {
    return NextResponse.json({ err: 'Something went Wrong!' });
  }
};
