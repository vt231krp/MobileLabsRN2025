import React from "react";
import styled from "styled-components/native";

interface ScreenTitleProps {
  title: string;
}

export default function ScreenTitle({ title }: ScreenTitleProps) {
  return (
    <Container>
      <LogoImage source={require("./../assets/images/SteamIcon.png")} />
      <Title>{title}</Title>
    </Container>
  );
}

const Container = styled.View`
  background-color: ${(props) => props.theme.primary};
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const LogoImage = styled.Image`
  width: 50px;
  height: 50px;
`;

const Title = styled.Text`
  font-weight: 400;
  font-size: 28px;
  line-height: 39px;
  color: ${(props) => props.theme.textPrimary};
`;
