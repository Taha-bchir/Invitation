import { Amiri, Tajawal, Scheherazade_New, Aref_Ruqaa } from 'next/font/google';
import './globals.css';

const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ['arabic', 'latin'],
  variable: '--font-amiri',
  display: 'swap',
});

const tajawal = Tajawal({
  weight: ['300', '400', '500', '700'],
  subsets: ['arabic', 'latin'],
  variable: '--font-tajawal',
  display: 'swap',
});

const scheherazade = Scheherazade_New({
  weight: ['400', '600', '700'],
  subsets: ['arabic', 'latin'],
  variable: '--font-scheherazade',
  display: 'swap',
});

const arefRuqaa = Aref_Ruqaa({
  weight: ['400', '700'],
  subsets: ['arabic', 'latin'],
  variable: '--font-aref',
  display: 'swap',
});

export const metadata = {
  title: 'دعوة زفاف فاخرة | فلان بن فولان & فلانة بنت فولان',
  description: 'يتشرفان بدعوتكم لحضور حفل زفاف فلان بن فولان و فلانة بنت فولان — بارك الله لهما وبارك عليهما وجمع بينهما في خير',
  keywords: 'wedding, invitation, arabic, زفاف, دعوة',
  openGraph: {
    title: 'دعوة زفاف | فلان بن فولان & فلانة بنت فولان',
    description: 'يتشرفان بدعوتكم لحضور حفل زفافهما المبارك',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${amiri.variable} ${tajawal.variable} ${scheherazade.variable} ${arefRuqaa.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
