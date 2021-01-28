import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs';

import {
  Container,
  PageTitle,
} from '../../components/MyStyledComponents';

import PostLink from '../../components/PostLink';

function BlogListContainer() {

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY 
    });

    bucket.getObjects({
      type: 'blog-posts',
      limit: 5,
      props: 'title,slug,content',
      sort: '-created_at'
    })
    .then(data => {
      setPageData(data)
    })
    .catch(error => {
      console.log(error)
    })

  }, []);

  function renderSkeleton() {
    return (
      <p>Laster data...</p>
    );
  }
  
  function renderPage() {
    return (
    <>
      <Container>
          <PageTitle>Mine blogginnlegg</PageTitle>
            {pageData.objects.map(item => {
              return (
                <PostLink 
                url={`/blog/${item.slug}`} 
                title={item.title} 
                date={`01.01.2021`}
                key={item.slug}
              />

                // <li key={item.slug}>
                //   <a href={`/blog/${item.slug}`}>{item.title}</a>
                // </li>
              )
            })}
      </Container>
    </>
    )
  }

  return (
    <>
      {(pageData == null) ? renderSkeleton() : renderPage()}
    </>
  )
};

export default BlogListContainer;