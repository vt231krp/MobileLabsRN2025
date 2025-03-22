import React, { useState, useRef } from "react";
import { ImageBackground } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import ScreenHeader from "../../components/ScreenHeader";
import Tabs from "../../components/Tabs";
import CardActions from "../../components/CardActions";

export default function SafetyScreen() {
  const [activeTab, setActiveTab] = useState("guard");

  const actions = ["Remove Authenticator", "My Recovery Code", "Help"];

  return (
    <Container contentContainerStyle={{ paddingBottom: 30 }}>
      <ScreenHeader title="Safety" />
      <Tabs
        tabs={[
          { id: "guard", label: "Guard" },
          { id: "confirmations", label: "Confirmations" },
        ]}
        onPressTab={(tabId) => setActiveTab(tabId)}
      />
      <ContentContainer>
        <BackgroundImageContainer>
          <BackgroundImage
            source={require("../../assets/images/safety-bg.png")}
            resizeMode="cover"
          />
          <GradientOverlay
            colors={[
              "rgba(28, 32, 44, 1)",
              "rgba(28, 32, 44, 0.5)",
              "rgba(28, 32, 44, 0)",
            ]}
            locations={[0, 0.6, 1]}
          />
        </BackgroundImageContainer>

        <Content>
          <CodeLabel>Logged in as player</CodeLabel>
          <Code>N5KCV</Code>
          <ProgressBar>
            <ProgressBarFill />
          </ProgressBar>
        </Content>
      </ContentContainer>
      <Label>
        You'll enter your code each time you enter your password to sign in to
        your Steam account.
      </Label>
      <Tip>
        Tip: If you don't share your PC, you can select "Remember my password"
        when you sign in to the PC client to enter your password and
        authenticator code less often.
      </Tip>
      <CardActions actions={actions} />
    </Container>
  );
}

const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.secondary};
  flex: 1;
`;

const ContentContainer = styled.View`
  height: 167px;
`;

const BackgroundImageContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const BackgroundImage = styled(ImageBackground)`
  width: 100%;
  height: 100%;
`;

const GradientOverlay = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Content = styled.View`
  flex: 1;
  padding-top: 20px;
  align-items: center;
`;

const CodeLabel = styled.Text`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
  line-height: 18px;
`;

const Code = styled.Text`
  font-size: 57px;
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
`;

const ProgressBar = styled.View`
  width: 157px;
  border-radius: 3.5px;
  background-color: ${({ theme }) => theme.primary};
  height: 7px;
  overflow: hidden;
  margin-top: 11px;
`;

const ProgressBarFill = styled.View`
  width: 70%;
  height: 100%;
  background-color: ${({ theme }) => theme.accent};
  border-radius: 3.5px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 14px;
  line-height: 22px;
  margin-top: 20px;
  padding: 0 15px;
`;

const Tip = styled(Label)`
  color: ${({ theme }) => theme.accent};
  margin-bottom: 20px;
`;
