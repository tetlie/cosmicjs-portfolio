import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs'

import {
  Container,
  PageTitle,
  P,
} from '../../components/MyStyledComponents'

function AboutContainer() {

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY 
    });

    bucket.getObject({
      slug: 'about-me',
      props: 'slug,title,content'
    })

    .then(data => {
      setPageData(data.object)
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
            <PageTitle>{pageData.title}</PageTitle>
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

export default AboutContainer;