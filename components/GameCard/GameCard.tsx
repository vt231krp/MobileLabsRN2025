import React from "react";
import styled from "styled-components/native";
import { IGame } from "../../types";

interface GameCardProps {
  game: IGame;
}

export default function GameCard({ game }: GameCardProps) {
  const { name, image, os, oldPrice, price, discountPercentage } = game;

  return (
    <Container>
      <GameContent>
        <GameImage source={image} />
        <GameInfo>
          <GameName>{name}</GameName>
          <OsContainer>
            <OsImage source={require("../../assets/images/windows.png")} />
            <OsName>{os}</OsName>
          </OsContainer>
        </GameInfo>
      </GameContent>
      <PriceContainer>
        <PriceInfo>
          <OldPrice>${oldPrice}</OldPrice>
          <NewPrice>${price}</NewPrice>
        </PriceInfo>
        <Discount>-{discountPercentage}%</Discount>
      </PriceContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const GameContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 14px;
`;

const GameImage = styled.Image`
  width: 72px;
  height: 50px;
  border-radius: 8px;
`;

const GameInfo = styled.View``;

const GameName = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: ${(props) => props.theme.textPrimary};
`;

const OsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const OsImage = styled.Image`
  width: 14px;
  height: 14px;
`;

const OsName = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: ${(props) => props.theme.textSecondary};
`;

const PriceContainer = styled.View`
  align-items: flex-end;
`;

const PriceInfo = styled.View`
  flex-direction: row;
  gap: 5px;
`;

const OldPrice = styled.Text`
  text-decoration-line: line-through;
  color: #a0a0a0;
`;

const NewPrice = styled.Text`
  color: #ffffff;
`;

const Discount = styled.Text`
  padding: 2px 8px;
  background-color: ${({ theme }) => theme.success};
  color: #ffffff;
  font-weight: 300;
  font-size: 12px;
  line-height: 18px;
  border-radius: 2px;
  text-align: center;
`;
