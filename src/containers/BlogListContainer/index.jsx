import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs'

import {
  Container,
  PageTitle,
} from '../../components/MyStyledComponents'

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
      props: 'title,slug'
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
    <main>
      <Container>
          <PageTitle>Mine blogginnlegg</PageTitle>
          <ul>
            {pageData.objects.map(item => {
              return (
                <li key={item.slug}>
                  <a href={`/blog/${item.slug}`}>{item.title}</a>
                </li>
              )
            })}
          </ul>
      </Container>
    </main>
    )
  }

  return (
    <>
      {(pageData == null) ? renderSkeleton() : renderPage()}
    </>
  )
};

export default BlogListContainer;