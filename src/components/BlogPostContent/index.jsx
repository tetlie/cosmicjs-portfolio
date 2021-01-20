import styled from 'styled-components';

const BlogPostContent = styled.article`

  border-top: 1px solid #aaa;

  img {
    max-width: 100%;
  }

  ul {
    margin: 0 0 1rem;
    list-style: square;
    padding-left: 1rem;
  }

  .fr-inner {
    font-size: 0.75em;
    text-align: center;
    display: block;
  }

  p:empty {
    display: none;
  }

`;

export default BlogPostContent;