import { NextRequest, NextResponse } from 'next/server';

/**
 * GET handler to retrieve a delivery
 *
 * @param req
 * @param res
 * @returns
 */
export const GET = async (
  req: Request | NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  const response = await fetch(`http://127.0.0.1:3000/api/delivery/${id}`, {
    headers: {
      'x-api-key': 'secretkey',
      'Content-Type': 'application/json',
    },
  });

  const delivery = await response.json();

  return NextResponse.json(delivery);
};
