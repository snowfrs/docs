import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src="/assets/images/logo.svg"
            alt="Wiki Logo"
            width={80}
            height={30}
            className="w-auto h-8"
          />
          <span className="font-bold">Wiki - The Power of Many</span>
        </>
      ),
      transparentMode: 'top',
    },
  };
}
