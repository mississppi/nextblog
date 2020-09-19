import path from "path";
import remark from "remark";
import html from "remark-html";
import matter from "gray-matter";

import { formatDate } from "./date";

const DIR = path.join(process.cwd(), "pages/posts");
const EXTENSION = ".md";

const listContentFiles = ({ fs }) => {
  const filenames = fs.readdirSync(DIR);
  return filenames.filter((filename) => path.parse(filename).ext === EXTENSION);
};

const readContentFile = async ({ fs, slug, filename }) => {
  if (slug === undefined) {
    slug = path.parse(filename).name;
  }
  const raw = fs.readFileSync(path.join(DIR, `${slug}${EXTENSION}`), "utf8");
  const matterResult = matter(raw);

  const { title, published: rawPublished, category } = matterResult.data;
  const parsedContent = await remark().use(html).process(matterResult.content);
  const content = parsedContent.toString();

  return {
    title,
    published: formatDate(rawPublished),
    content,
    slug,
    category,
  };
};

const readContentFiles = async ({ fs }) => {
  const promisses = listContentFiles({ fs }).map((filename) =>
    readContentFile({ fs, filename })
  );
  const contents = await Promise.all(promisses);
  return contents.sort(sortWithProp("published", true));
};

const sortWithProp = (name, reversed) => (a, b) => {
  if (reversed) {
    return a[name] < b[name] ? 1 : -1;
  } else {
    return a[name] < b[name] ? -1 : 1;
  }
};

const readCategoryArchives = async ({ fs }) => {};

export {
  listContentFiles,
  readContentFile,
  readContentFiles,
  readCategoryArchives,
};
