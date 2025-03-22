import React, { useMemo } from "react";
import styled from "styled-components/native";
import { IChat, UserStatus } from "../types";
import Entypo from "@expo/vector-icons/Entypo";
import { formatDate } from "../utils/formatDate";
import { useTheme } from "styled-components/native";

interface ChatItemProps {
  item: IChat;
}

export default function ChatItem({ item }: ChatItemProps) {
  const theme = useTheme();

  const {
    id,
    isFriend,
    isUnread,
    status,
    lastMessage,
    lastMessageTime,
    isMyLastMessage,
    unreadMessages,
    userImage,
    userName,
  } = item;

  const truncateMessage = useMemo(() => {
    if (lastMessage.length > 20) {
      return lastMessage.slice(0, 20) + "...";
    }
    return lastMessage;
  }, [lastMessage]);

  return (
    <Container>
      <UserImage source={userImage} />
      {status && <Status status={status} />}
      <ChatInfo>
        <UserName>{userName}</UserName>
        <MessageInfo>
          {isMyLastMessage ? (
            <>
              <YourMessage>You:</YourMessage>
              <Message>{truncateMessage}</Message>
            </>
          ) : (
            <Message>{truncateMessage}</Message>
          )}
          <Entypo name="dot-single" size={18} color={theme.icon} />
          <MessageTime>{formatDate(lastMessageTime)}</MessageTime>
        </MessageInfo>
      </ChatInfo>
      {isUnread && (
        <UnreadMessages>
          {unreadMessages > 9 ? "9+" : unreadMessages}
        </UnreadMessages>
      )}
      {isMyLastMessage && <YourMessageStatus />}
    </Container>
  );
}

const Container = styled.View`
  padding: 10px 15px 0;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const UserImage = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 50%;
`;

const ChatInfo = styled.View`
  flex: 1;
`;

const UserName = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.textPrimary};
`;

const MessageInfo = styled.View`
  flex-direction: row;
  align-items: center;
  font-weight: 500;
`;

const Message = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.textSecondary};
`;

const YourMessage = styled(Message)`
  color: ${({ theme }) => theme.textPrimary};
  margin-right: 5px;
`;

const MessageTime = styled.Text`
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.textSecondary};
`;

const Status = styled.View<{ status: UserStatus }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ status }) =>
    status === UserStatus.ONLINE
      ? "#31BCFC"
      : status === UserStatus.OFFLINE
      ? "#A0A0A0"
      : status === UserStatus.IN_GAME
      ? "#00D44B"
      : status === UserStatus.BUSY
      ? "#FF4D4D"
      : "#FFD700"};
  position: absolute;
  top: 50px;
  left: 54px;
  border: 2px solid ${({ theme }) => theme.secondary};
`;

const UnreadMessages = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.accent};
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const YourMessageStatus = styled.View`
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.textPrimary};
  border-radius: 50%;
`;
