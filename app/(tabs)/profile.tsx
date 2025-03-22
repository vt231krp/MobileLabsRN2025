import { View } from "react-native";
import styled from "styled-components/native";
import CardActions from "../../components/CardActions";

export default function ProfileScreen() {
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
      <CardActions actions={["Settings", "Logout"]} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.secondary};
  padding: 20px 15px;
`;

const Profile = styled.View`
  align-items: center;
  margin-bottom: 30px;
  postion: relative;
`;

const ProfileImage = styled.Image`
  width: 98px;
  heigh: 98px;
  border-radius: 50%;
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
  border-radius: 50%;
  background-color: ${({ theme }) => "#00D44B"};
  border: 2px solid ${({ theme }) => theme.secondary};
  position: absolute;
  bottom: 53px;
  right: 38%;
`;
