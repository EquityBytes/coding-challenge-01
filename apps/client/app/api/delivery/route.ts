import { NextRequest, NextResponse } from 'next/server';

/**
 * POST handler to create a new delivery
 *
 * @param req
 * @param res
 * @returns
 */
export const POST = async (
  req: Request | NextRequest,
  res: Response | NextResponse
) => {
  const body = {
    webhook_url: 'http://127.0.0.1:4200/api/revalidate',
  };

  const response = await fetch('http://127.0.0.1:3000/api/delivery', {
    method: 'POST',
    headers: {
      'x-api-key': 'secretkey',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const delivery = await response.json();

  return NextResponse.json(delivery);
};
