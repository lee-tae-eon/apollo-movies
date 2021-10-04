import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_MOIVES = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      language
      rating
      medium_cover_image
      description_intro
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin: 50px 0;
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-size: cover;
  background-position: center center;
  border-radius: 20px;
`;

const Suggest = styled.div`
  margin: 50px 0;
  display: flex;
  justify-content: space-evenly;
  width: 80%;
`;

const SuggestPoster = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 20px;
  transition: all 0.3s linear;
  &:hover {
    width: 300px;
    height: 300px;
  }
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOIVES, {
    variables: { id },
  });
  if (!loading) {
    console.log(data);
  }
  return (
    <Container>
      <Column>
        <Title>{loading ? "loading" : data.movie.title}</Title>{" "}
        <Subtitle>
          {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
      <Suggest>
        {data?.suggestions?.map((suggest) => (
          <SuggestPoster
            src={suggest?.medium_cover_image}
            alt=""
          ></SuggestPoster>
        ))}
      </Suggest>
    </Container>
  );
};
