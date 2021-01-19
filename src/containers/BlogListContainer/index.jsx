import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs'
import ProjectThumbnail from '../../components/ProjectThumbnail'
import {
  Container,
  Content,
  H1,
  P,
} from '../../components/ComponentStyle'

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
        <Content>
          <H1>Mine blogginnlegg</H1>
          <ul>
            {pageData.objects.map(item => {
              return (
                <li key={item.slug}>
                  <a href={`/blog/${item.slug}`}>{item.title}</a>
                </li>
              )
            })}
          </ul>
        </Content>
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