import fs from "fs";
import Link from "next/link";
import path from "path";

import Layout from "../../components/Layout";
import { readCategoryArchives } from "../../lib/content-loader";
import {
  listContentFiles,
  readContentFile,
  readContentFiles,
} from "../../lib/content-loader";
export default function Post(params) {
  return (
    <Layout>
      <div id="content" className="wrapper">
        <div id="content-inner">
          <article className="article-container">
            <div className="article-inner">
              <div className="article">
                <div className="inner">
                  <header className="article-header">
                    <h1 className="article-title">{params.title}</h1>
                  </header>
                  <div></div>
                  <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: params.content }}
                  ></div>
                  <footer className="article-footer">
                    <time className="article-footer-updated">
                      {params.published}
                    </time>
                  </footer>
                </div>
              </div>
              <aside></aside>
            </div>
          </article>
          <aside id="sidebar">
            <div className="inner">
              <strong className="sidebar-title">{params.category}</strong>
              {params.archivePost.map((post) => (
                <Link href="/posts/[id]" as={`/posts/${post.slug}`}>
                  {(() => {
                    if (post.slug === params.slug) {
                      return (
                        <a className="sidebar-link current">{post.title}</a>
                      );
                    } else {
                      return <a className="sidebar-link">{post.title}</a>;
                    }
                  })()}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
      <style jsx>{`
        #content-wrap {
          background: #fff;
          border-top: 1px solid #161d24;
          border-bottom: 1px solid #161d24;
          margin: -1px 0;
        }
        #content {
          position: relative;
        }
        .wrapper {
          max-width: 1240px;
          margin: 0 auto;
        }
        #content-inner {
          margin-left: 220px;
        }
        .article-container {
          float: right;
          width: 100%;
        }
        .article-inner {
          margin-right: 220px;
        }
        .article {
          float: left;
          width: 100%;
          padding: 40px 0;
        }
        .inner,
        #article-toc-inner {
          padding: 0 20px;
        }
        .article-header {
          padding-bottom: 20px;
        }
        .article-content {
          line-height: 1.6em;
          color: #444;
        }
        .sidebar-title {
          margin-top: 40px;
          padding: 10px 0;
          font-family: Lato, "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: bold;
          color: #0e83cd;
          display: inline-block;
          line-height: 1;
        }
      `}</style>
    </Layout>
  );
}
/**
 * ページコンポーネントで使用する値を用意する
 */
export async function getStaticProps({ params }) {
  const content = await readContentFile({ fs, slug: params.slug });
  const archivePosts = await readContentFiles({ fs });
  const result = [];
  for (var i in archivePosts) {
    if (archivePosts[i]["category"] === content["category"]) {
      result.push(archivePosts[i]);
    }
  }
  content["archivePost"] = result;
  return {
    props: {
      ...content,
    },
  };
}
/**
 * 有効な URL パラメータを全件返す
 */
export async function getStaticPaths() {
  const paths = listContentFiles({ fs }).map((filename) => ({
    params: {
      slug: path.parse(filename).name,
    },
  }));
  return { paths, fallback: false };
}

export async function getArcivePosts(category) {
  // const arcivePost = readContentFiles({ fs });
  // console.log(arcivePost);
  return "fugafuga";
}
