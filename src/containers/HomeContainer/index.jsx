import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs'
import ProjectThumbnail from '../../components/ProjectThumbnail'
import {
  Container,
  Content,
  H1,
  P,
} from '../../components/ComponentStyle'

function HomeContainer() {

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY 
    });

    bucket.getObject({
      slug: 'home-page',
      props: 'slug,title,content,metadata'
    })

    .then(data => {
      setPageData(data.object)
      console.log(data.object.metadata.projects)
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
          {pageData.metadata.projects.map(el => 
            <ProjectThumbnail
              key={el._id}
              title={el.title}
              description={el.metadata.project_description}
              imageUrl={el.metadata.project_image.url}
              technologies={el.metadata.technologies}
            />
          )}
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

export default HomeContainer;