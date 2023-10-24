import Link from 'next/link';

import { Delivery, Address, Article } from '@prisma/client';

const statuses = {
  DRAFT: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  PENDING: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
  FULFILLED: 'text-green-700 bg-green-50 ring-green-600/20',
  CANCELLED: 'text-red-700 bg-red-50 ring-red-600/20',
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type ExpandedDelivery = Delivery & {
  From: Address;
  To: Address;
  Articles: Article[];
};

async function getDeliveries(): Promise<ExpandedDelivery[]> {
  const res = await fetch('http://127.0.0.1:3000/api/delivery', {
    next: { tags: ['deliveries'] },
    headers: {
      'x-api-key': 'secretkey',
    },
  });

  if (!res.ok) {
    console.error('Failed to fetch deliveries');
  }

  return res.json();
}

export default async function Page() {
  const deliveries = await getDeliveries();

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {deliveries.map((delivery, index) => (
        <li
          key={delivery.id}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                Delivery #{index + 1}
              </p>
              <p
                className={classNames(
                  statuses[delivery.status as keyof typeof statuses],
                  'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                )}
              >
                {delivery.status}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="">From:</p>
              <p className="text-black">{delivery.From.address_line_1}</p>
              <p className="">To:</p>
              <p className="text-black">{delivery.To.address_line_1}</p>
              <p className="">Articles:</p>
              <p className="text-black">{delivery.Articles.length}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <Link
              prefetch={false}
              href={`/dashboard/${delivery.id}`}
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View delivery<span className="sr-only">, {delivery.id}</span>
            </Link>
            <div className="relative flex-none">
              <button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
