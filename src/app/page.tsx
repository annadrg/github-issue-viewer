import { Suspense } from "react";
import Image from "next/image";

import SearchInput from "@/components/search-input";
import SearchResults from "@/components/search-results";

export default function Home() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 flex flex-col items-center justify-center gap-5 text-center text-3xl font-bold sm:flex-row">
        <Image
          src="/github-logo.png"
          alt="GitHub logo"
          width={500}
          height={500}
          className="w-12"
        />
        GitHub Issue Viewer
      </h1>
      <Suspense>
        <SearchInput />
        <SearchResults />
      </Suspense>
    </main>
  );
}
