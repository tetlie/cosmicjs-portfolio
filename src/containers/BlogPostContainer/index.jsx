import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs';

// import BlogPostContent from '../../components/BlogPostContent'


import {
  Container,
  PageTitle,
  P,
} from '../../components/MyStyledComponents'

function BlogPostContainer({ match }) {

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY 
    });


    bucket.getObject({
      slug: match.params.slug,
      props: 'title,content,metadata'
    })

    .then(data => {
      setPageData(data.object)
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })

  }, []);

  function renderHeaderImage() {
    return (
      <img src={pageData.metadata.header_image.url} alt=""></img>
    );
  }

  function renderSkeleton() {
    return (
      <p>Laster data...</p>
    );
  }
  
  function renderPage() {
    return (
    <main>
      <Container>
          <PageTitle>{pageData.title}</PageTitle>
          {pageData.metadata.header_image && renderHeaderImage()}
          <P dangerouslySetInnerHTML={{__html: pageData.content}}></P>
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

export default BlogPostContainer;