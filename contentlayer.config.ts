import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: "author/**/*.mdx",
  contentType: "mdx",
  fields: {
    name: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      required: true,
    },
    avatar_image_url: {
      type: "string",
      required: true,
    },
    website_url: {
      type: "string",
      required: true,
    },
  },
  computedFields,
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
    thumbnail: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    featured: {
      type: "boolean",
      required: true,
    },
    author: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    ...computedFields,
    readingTime: {
      type: "number",
      resolve: (doc) => {
        const content = doc.body.raw as string;
        const wordsPerMinute = 200;
        const numberOfWords = content.split(/\s/g).length;
        const minutes = numberOfWords / wordsPerMinute;
        return Math.ceil(minutes);
      },
    },
  },
}));

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: "page/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
  },
  computedFields,
}));

export const Chapter = defineDocumentType(() => ({
  name: "Chapter",
  filePathPattern: "course/**/*.mdx",
  contentType: "mdx",
  fields: {
    index: {
      type: "number",
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page, Author, Chapter],
});
