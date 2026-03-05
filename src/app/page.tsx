import { Header } from '@/components/layout/header';
import { SideBySideView } from '@/components/layout/side-by-side-view';

export default function page() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <Header />
      <SideBySideView />
    </div>
  );
}
