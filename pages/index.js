import fs from "fs";
import Link from "next/link";
import Layout from "../components/Layout";
import { readContentFiles } from "../lib/content-loader";
export default function Home(props) {
  const { posts } = props;
  return (
    <Layout title="">
      <div className="wrapper">
        <div className="inner">
          <article className="article post">
            <header className="article-header">
              <h1>
                <a className="article-title">{posts[0].title}</a>
              </h1>
            </header>
            <div></div>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: posts[0].content }}
            ></div>
          </article>
          <div>
            {posts.map((post) => (
              <article className="article post archive-post">
                <Link href="/posts/[id]" as={`/posts/${post.slug}`}>
                  <a className="archive-post-link">
                    <strong className="archive-post-title">{post.title}</strong>
                  </a>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
/**
 * ページコンポーネントで使用する値を用意する
 */
export async function getStaticProps({ params }) {
  const MAX_COUNT = 200;
  const posts = await readContentFiles({ fs });
  return {
    props: {
      posts: posts.slice(0, MAX_COUNT),
    },
  };
}
