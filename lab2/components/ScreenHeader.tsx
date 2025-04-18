import React from "react";
import styled, { useTheme } from "styled-components/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable } from "react-native";

interface ScreenHeaderProps {
  title: string;
  search?: boolean;
  onSearch?: () => void;
}

export default function ScreenHeader({
  title,
  search,
  onSearch,
}: ScreenHeaderProps) {
  const theme = useTheme();

  return (
    <Container>
      <LogoContainer>
        <ImageContainer>
          <LogoImage source={require("./../assets/images/SteamIcon.png")} />
        </ImageContainer>
        <Title>{title}</Title>
      </LogoContainer>
      {search && (
        <Pressable onPress={onSearch}>
          <AntDesign
            name="search1"
            size={22}
            color={theme.icon}
            style={{ marginRight: 10 }}
          />
        </Pressable>
      )}
    </Container>
  );
}

const Container = styled.View`
  background-color: ${(props) => props.theme.secondary};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 20px;
`;

const ImageContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: #1c202c;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
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
