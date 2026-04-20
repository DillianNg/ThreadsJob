"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  content: string;
  url: string;
  createdAt: string;
};

export default function SearchPage() { {
  return <div>Search</div>;
}
  const params = useSearchParams();
  const q = params.get("q") || "";

  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4000/search?q=${q}`)
      .then((res) => res.json())
      .then(setData);
  }, [q]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <input
        defaultValue={q}
        className="w-full p-3 border rounded-full mb-6"
      />

      <p className="mb-4 text-gray-500">
        Results for "{q}"
      </p>

      <div className="flex flex-col gap-4">
        {data.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <p>{post.content}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
<p
  dangerouslySetInnerHTML={{ __html: post.content }}
/>
