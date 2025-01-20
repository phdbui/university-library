'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { cn, getInitials } from '@/lib/utils';

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              'cursor-pointer text-base capitalize',
              pathname === '/library' ? 'text-light-200' : 'text-light-100'
            )}
          >
            Library
          </Link>
        </li>

        <li>
          <Link href="/my-profile">
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback className="bg-amber-100">
                {getInitials(session?.user?.name || 'Unknown User')}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
