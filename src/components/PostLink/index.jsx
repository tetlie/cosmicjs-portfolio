import React from 'react';
import styled from 'styled-components';

export const PostLinkBase = styled.a`
  display: block;
  padding: 1rem;
  border: 2px solid black;
  border-radius: 0.5rem;
  margin: 0 0 1.5rem;
  color: black;
  text-decoration: none;
  &:hover {
    border: 2px solid blue;
  }
`;

export const PostLinkTitle = styled.span`
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
`;

export const PostLinkDate = styled.span`
  display: block;
  font-size: 0.9rem;
  color: #333333;
`;

function PostLink({ title, date, url }) {
  return (
    <PostLinkBase href={url}>
      <PostLinkTitle>{title}</PostLinkTitle>
      <PostLinkDate>{date}</PostLinkDate>
    </PostLinkBase>
  );
}

export default PostLink;