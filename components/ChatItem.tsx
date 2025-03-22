import React from "react";
import styled from "styled-components/native";
import { IChat } from "../types";

interface ChatItemProps {
  item: IChat;
}

export default function ChatItem({ item }: ChatItemProps) {
  const {
    id,
    isFriend,
    isOnline,
    isUnread,
    lastMessage,
    lastMessageTime,
    unreadMessages,
    userImage,
    userName,
  } = item;

  return <Container></Container>;
}

const Container = styled.View``;
