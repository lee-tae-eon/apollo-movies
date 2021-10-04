import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOIVES = gql`
  {
    movies {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  font-size: 35px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(1fr, 250px));
  gap: 50px;
  width: 80%;
  position: relative;
  top: -50px;
`;

export default () => {
  const { loading, error, data } = useQuery(GET_MOIVES);
  console.log(data);
  return (
    <Container>
      <Header>
        <Title>Apollo 2021</Title>
        <Subtitle>Graph</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      {!loading && data.movies && (
        <Movies>
          {data.movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              isLiked={movie.isLiked}
              bg={movie.medium_cover_image}
            />
          ))}
        </Movies>
      )}
    </Container>
  );
};
