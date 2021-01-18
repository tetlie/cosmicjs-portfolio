import React from 'react'
import styled from 'styled-components'

const ThumbNailContainer = styled.article`
  width: 30vw;
  padding: 2rem;
  background-color: lightgrey;
  display: flex;
  text-align: left;
  flex-direction: column;
  align-items: center;

`

const ThumbNailImage = styled.img`
  width: 100%;
`

const TechnologiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  gap: 0.5em;
`

const Technology = styled.p`
  display: inline;
  background: black;
  color: white;
  padding: 0.3em;
  border-radius: 0.3em;
`

export default function ProjectThumbnail({ title, description, imageUrl, technologies }) {

  // console.log(technologies.map(tech => tech.title))

  return (
    <ThumbNailContainer>
      <ThumbNailImage src={imageUrl} ></ThumbNailImage>
      <h3>{title}</h3>
      <p>{description}</p>

      <TechnologiesContainer>
        <Technology>React</Technology>
        <Technology>React</Technology>
        <Technology>React</Technology>
        {technologies.map(technology => {
          <Technology>{technology.title}</Technology>
        })}
      </TechnologiesContainer>

    </ThumbNailContainer>
  )
}
