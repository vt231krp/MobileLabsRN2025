import React, { useState } from "react";
import styled from "styled-components/native";
import { IPost } from "../types";
import { View, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "styled-components/native";
import { formatDate } from "../utils/formatDate";

interface PostCardProps {
  post: IPost;
}

export default function PostCard({
  post: {
    userName,
    userImage,
    title,
    description,
    comments,
    likes,
    postImage,
    postedAt,
    isNews,
  },
}: PostCardProps) {
  const theme = useTheme();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Container>
      <Header>
        <CommonInfo>
          <AuthorImage source={userImage} />
          <View>
            <AuthorName>{userName}</AuthorName>
            <PostedAt>{formatDate(postedAt)}</PostedAt>
          </View>
          {isNews && <Tag>NEWS</Tag>}
        </CommonInfo>
        <Tools>
          <Entypo name="dots-three-horizontal" size={24} color={theme.icon} />
        </Tools>
      </Header>
      <PostImage source={postImage} />
      <PostTitle>{title}</PostTitle>
      <PostDescription>{description}</PostDescription>
      <Actions>
        <Reactions>
          <Like
            isLiked={isLiked}
            onPress={() => {
              setIsLiked(!isLiked);
            }}
          >
            <AntDesign
              name="like2"
              size={24}
              color={isLiked ? "#00D44B" : theme.icon}
            />
            {likes}
          </Like>
          <Comment>
            <Feather name="message-square" size={24} color={theme.icon} />
            {comments}
          </Comment>
        </Reactions>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="share-outline"
            size={24}
            color={theme.icon}
          />
        </TouchableOpacity>
      </Actions>
    </Container>
  );
}

const Container = styled.View`
  padding: 10px 15px;
  gap: 10px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CommonInfo = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
`;

const AuthorImage = styled.Image`
  height: 34px;
  width: 34px;
  border-radius: 50px;
`;

const AuthorName = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.textPrimary};
`;

const PostedAt = styled.Text`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 12px;
  line-height: 18px;
`;

const Tag = styled.Text`
  background-color: #b63db6;
  color: #ffffff;
  font-size: 12px;
  line-height: 18px;
  padding: 2px 8px;
  border-radius: 2px;
`;

const PostImage = styled.Image`
  width: 100%;
  border-radius: 8px;
`;

const PostTitle = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.textPrimary};
`;

const PostDescription = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.textSecondary};
  text-align: justify;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.border};
  padding-bottom: 10px;
`;

const Tools = styled.TouchableOpacity``;

const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
`;

const Reactions = styled.View`
  flex-direction: row;
  gap: 35px;
  align-items: center;
`;

const Like = styled.TouchableOpacity<{ isLiked?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 5px;
  width: 16px;
  height: 16px;
  color: ${({ theme, isLiked }) => (isLiked ? "#00D44B" : theme.textSecondary)};
  font-weight: 500;
  font-size: 14px;
  margin-right: 35px;
`;

const Comment = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 5px;
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;
  font-size: 14px;
`;
