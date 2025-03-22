import React from "react";
import ScreenHeader from "../../components/ScreenHeader";
import styled from "styled-components/native";
import RecSlider from "../../components/RecSlider";
import { recommendations } from "../../data/recommendations";

export default function StoreScreen() {
  return (
    <Container>
      <ScreenHeader title="Store" search />
      <RecSlider recs={recommendations} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.secondary};
  padding: 10px;
`;
