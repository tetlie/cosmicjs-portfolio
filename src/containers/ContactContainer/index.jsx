import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs'
import Mapbox from 'mapbox-gl'

import {
  Container,
  PageTitle,
  P,
} from '../../components/MyStyledComponents'

let map = null;

function ContactContainer() {

  const [pageData, setPageData] = useState(null);

  Mapbox.accessToken = process.env.MAPBOX_API_KEY;
  const mapElement = useRef(null);

  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY 
    });

    bucket.getObject({
      slug: 'contact-information',
      props: 'slug,title,content'
    })

    .then(data => {
      setPageData(data.object)
    })
    .catch(error => {
      console.log(error)
    })

  }, []);

  useEffect(() => {
    if(pageData !== null){
      map = new Mapbox.Map({
        container: mapElement.current,
        style: 'mapbox://styles/mapbox/dark-v10',
        zoom: 10,
        center: [12.492285, 41.890466]
      });
    };
  }, [pageData]);

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
            <div style={{height='500px', width='500px' }} ref={mapElement}></div>
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

export default ContactContainer;