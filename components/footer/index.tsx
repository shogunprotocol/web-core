import Link from 'next/link';
import cn from 'clsx';
import s from '@/components/footer/footer.module.scss';
import { Twitter } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className={cn(s.footer, 'layout-block')}>
      <div className={cn(s.footerLinks, '')}>
        {/* <Link href="mailto:shogun@shogun.fi" className="link">
          <Mail />
        </Link> */}

        <Link href="https://x.com/shogun_fi" className="link">
          <Twitter />
        </Link>
      </div>
      <Image
        src="/images/shogun logo.png"
        alt="Shogun Logo"
        width={70}
        height={70}
      />
    </footer>
  );
}
