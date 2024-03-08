import Link from "next/link";

import { baseConfig } from "@/config/base";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer>
      <div className="container py-8 text-sm">
        <div className="flex flex-wrap justify-between gap-8 pb-16">
          <div className="flex max-w-96 flex-col gap-6">
            <Link href="/" className="font-heading text-xl font-bold">
              {siteConfig.name}
            </Link>
            <p>{siteConfig.description}</p>
            <div className="text-muted-foreground flex gap-6">
              <a href="https://www.facebook.com/ikyawthetpaing">
                <Icons.facebook className="size-5" />
              </a>
              <a href="https://www.instagram.com/ikyawthetpaing">
                <Icons.instagram className="size-5" />
              </a>
              <a href="https://www.twitter.com/ikyawthetpaing">
                <Icons.twitter className="size-5" />
              </a>
              <a href="https://www.youtube.com/ikyawthetpaing">
                <Icons.youtube className="size-5" />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 lg:gap-12">
            {baseConfig.footerLinkGroups.map(({ title, links }, index) => (
              <div className="flex flex-col gap-4" key={index}>
                <h3 className="font-semibold">{title}</h3>
                <ul className="flex flex-col gap-4 font-light">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.url}
                        className="underline-offset-4 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row">
          <div className="text-center">
            © Copyright {new Date().getFullYear()} {siteConfig.name}. All
            rights reserved.
          </div>
          <div className="flex flex-col gap-6 md:flex-row">
            {baseConfig.legalLinks.map(({ label, url }, index) => (
              <Link
                key={index}
                href={url}
                className="underline-offset-4 hover:underline"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
