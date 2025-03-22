import React, { useContext } from "react";
import { Switch } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import CardActions from "../../components/CardActions";
import { ThemeContext } from "../_layout";

export default function ProfileScreen() {
  const theme = useTheme();
  const { mode, setMode } = useContext(ThemeContext);
  const isDarkMode = mode === "dark";

  const toggleTheme = () => {
    setMode(isDarkMode ? "light" : "dark");
  };

  return (
    <Container>
      <Profile>
        <ProfileImage
          source={require("../../assets/images/profile-user.png")}
        />
        <UserStatus />
        <ProfileInfo>
          <ProfileName>Roman Karbivskyi</ProfileName>
          <ProfileGroup>VT-23-1</ProfileGroup>
        </ProfileInfo>
      </Profile>

      <ThemeToggleCard>
        <ThemeToggleContent>
          <ThemeIcon>
            <Ionicons
              name={isDarkMode ? "moon" : "sunny"}
              size={24}
              color={theme.textPrimary}
            />
          </ThemeIcon>
          <ThemeText>{isDarkMode ? "Dark Theme" : "Light Theme"}</ThemeText>
        </ThemeToggleContent>
        <Switch
          trackColor={{ false: "#767577", true: "#2A428C" }}
          thumbColor={isDarkMode ? "#66c0f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkMode}
        />
      </ThemeToggleCard>

      <CardActions actions={["Settings", "Logout"]} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.secondary};
`;

const Profile = styled.View`
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  padding: 20px 15px 0;
`;

const ProfileImage = styled.Image`
  width: 98px;
  height: 98px;
  border-radius: 50px;
  margin-bottom: 10px;
`;

const ProfileInfo = styled.View`
  align-items: center;
`;

const ProfileName = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.textPrimary};
`;

const ProfileGroup = styled(ProfileName)``;

const UserStatus = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #00d44b;
  border: 2px solid ${({ theme }) => theme.secondary};
  position: absolute;
  bottom: 53px;
  right: 38%;
`;

const ThemeToggleCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  margin: 0 15px 10px;
`;

const ThemeToggleContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ThemeIcon = styled.View`
  margin-right: 12px;
`;

const ThemeText = styled.Text`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 14px;
  line-height: 22px;
`;
