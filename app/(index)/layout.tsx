import { baseConfig } from "@/config/base";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

interface Props {
  children: React.ReactNode;
}

export default function IndexLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader navItems={baseConfig.navItems} />
      <main className="mb-16 flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
