import * as preBuild from './scripts/next-data/generatePreBuildFiles.mjs';

import getLocalisationData from './scripts/next-data/getLocalisationData.mjs';
import getNodeVersionData from './scripts/next-data/getNodeVersionData.mjs';
import getBlogData from './scripts/next-data/getBlogData.mjs';

const cachedBlogData = getBlogData();

// generates pre-build files for blog year pages (pagination)
preBuild.generateBlogYearPages(cachedBlogData);
preBuild.generateWebsiteFeeds(cachedBlogData);

const cachedNodeVersionData = getNodeVersionData();
const cachedLocalisationData = getLocalisationData();

const getNextData = async (content, { route }) => {
  const localisationData = await cachedLocalisationData(route);
  const nodeVersionData = await cachedNodeVersionData(route);
  const blogData = await cachedBlogData(route);

  const props = { ...localisationData, ...nodeVersionData, ...blogData };

  return `
    // add the mdx file content
    ${content}

    export const getStaticProps = () => {
      return { props: ${JSON.stringify(props)} };
    }
  `;
};

export default getNextData;
