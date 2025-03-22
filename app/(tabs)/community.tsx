import { View } from "react-native";
import styled from "styled-components/native";
import ScreenHeader from "../../components/ScreenHeader";

export default function CommunityScreen() {
  return (
    <Container>
      <ScreenHeader title="Community" />
      <Subtitle>
        Community and official content for all games and software
      </Subtitle>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.secondary};
  padding: 20px;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
  line-height: 18px;
`;
