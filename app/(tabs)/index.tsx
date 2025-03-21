import React from "react";
import ScreenHeader from "../../components/ScreenHeader";
import styled from "styled-components/native";

export default function StoreScreen() {
  return (
    <Container>
      <ScreenHeader title="Store" search />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.secondary};
`;
