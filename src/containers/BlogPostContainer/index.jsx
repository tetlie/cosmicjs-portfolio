import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs';

import {
  Container,
  Content,
  H1,
  P,
} from '../../components/ComponentStyle'

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
      props: 'title,content'
    })

    .then(data => {
      setPageData(data.object)
      console.log(data)
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
          <H1>{pageData.title}</H1>
          <P dangerouslySetInnerHTML={{__html: pageData.content}}></P>
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

export default BlogPostContainer;