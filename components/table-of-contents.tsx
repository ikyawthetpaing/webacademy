"use client";

import { useState } from "react";

import { TableOfContentsItem } from "@/lib/toc";

interface Props {
  tocItems: TableOfContentsItem[];
}

export function TableOfContents({ tocItems }: Props) {
  const [showAll, setShowAll] = useState(true);

  return (
    <div className="relative flex flex-col gap-4 border-b pb-6">
      {!showAll && (
        <button
          className="bg-secondary text-secondary-foreground absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full px-2 text-sm"
          onClick={() => setShowAll(true)}
        >
          See More
        </button>
      )}

      {showAll && (
        <>
          <h2 className="font-heading font-bold">Table of Contents</h2>
          <ul className="flex flex-col gap-2">
            {tocItems.map(({ depth, slug, title }, index) => (
              <li
                key={index}
                style={{ marginLeft: `${depth * 20}px` }}
                className="text-muted-foreground hover:text-foreground leading-4 transition-all duration-150"
              >
                <a href={`#${slug}`}>{title}</a>
              </li>
            ))}
          </ul>
          <button
            className="bg-secondary hover:bg-secondary/75 text-secondary-foreground absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full px-2 text-sm"
            onClick={() => setShowAll(false)}
          >
            Show Less
          </button>
        </>
      )}
    </div>
  );
}
