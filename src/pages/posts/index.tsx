import Link from "next/link";
import React from "react";
import { trpc } from "../../utils/trpc";

function PostListPage() {
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {data?.map((post) => {
        return (
          <article key={post.id}>
            <p>{post.title}</p>
            <Link href={`/posts/${post.id}`}>
              <a>Read post</a>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export default PostListPage;
