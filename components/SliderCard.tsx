import React from "react";
import styled from "styled-components/native";
import { IRecommendation } from "../types";

interface SliderCardProps {
  recommendation: IRecommendation;
}

export default function SliderCard({ recommendation }: SliderCardProps) {
  const {
    os,
    image,
    name,
    price,
    discountPercentage,
    oldPrice,
    recommendedBy,
  } = recommendation;

  return (
    <Container>
      <Image source={image} />
      <Content>
        <Title>{name}</Title>
        <Subtitle>Recommended by your friend, {recommendedBy}</Subtitle>
        <PriceContainer>
          <Discount>-{discountPercentage}%</Discount>
          <PriceInfo>
            <OldPrice>${oldPrice}</OldPrice>
            <NewPrice>${price}</NewPrice>
          </PriceInfo>
        </PriceContainer>
      </Content>
      <OsContainer>
        {os === "Windows" && (
          <OsImage source={require("../assets/images/windows.png")} />
        )}
      </OsContainer>
    </Container>
  );
}

const Container = styled.View`
  width: 327px;
  height: 230px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const OsContainer = styled.View`
  position: absolute;
  bottom: 15px;
  right: 10px;
`;

const OsImage = styled.Image`
  width: 20px;
  height: 20px;
`;

const Content = styled.View`
  position: absolute;
  bottom: 15px;
  left: 10px;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 20px;
  line-height: 39px;
  color: white;
`;

const Subtitle = styled.Text`
  font-size: 13px;
  line-height: 18px;
  color: #a0a0a0;
`;

const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const Discount = styled.Text`
  padding: 2px 8px;
  background-color: ${({ theme }) => theme.success};
  color: #ffffff;
  font-weight: 300;
  font-size: 12px;
  line-height: 18px;
  border-radius: 2px 0 0 2px;
`;

const PriceInfo = styled.View`
  flex-direction: row;
  align-items: center;
  color: #ffffff;
  font-size: 12px;
  line-height: 18px;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 0 2px 2px 0;
  padding: 2px 8px;
  gap: 4px;
`;

const OldPrice = styled.Text`
  text-decoration-line: line-through;
  color: #a0a0a0;
`;

const NewPrice = styled.Text`
  color: ${({ theme }) => theme.textPrimary};
`;
