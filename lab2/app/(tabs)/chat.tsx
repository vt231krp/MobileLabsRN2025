import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import Tabs from "../../components/Tabs";
import ChatItem from "../../components/ChatItem";
import { chats } from "../../data/chats";

export default function ChatScreen() {
  const [type, setType] = useState("opened");
  const [activeChats, setActiveChats] = useState(
    chats.sort((a, b) => {
      if (b.isUnread !== a.isUnread) {
        return b.isUnread ? 1 : -1;
      }
      if (b.isMyLastMessage !== a.isMyLastMessage) {
        return b.isMyLastMessage ? 1 : -1;
      }
      return (b.unreadMessages || 0) - (a.unreadMessages || 0);
    })
  );

  useEffect(() => {
    setActiveChats(
      chats
        .filter((chat) => (type === "opened" ? true : chat.isFriend))
        .sort((a, b) => {
          if (b.isUnread !== a.isUnread) {
            return b.isUnread ? 1 : -1;
          }
          if (b.isMyLastMessage !== a.isMyLastMessage) {
            return b.isMyLastMessage ? 1 : -1;
          }
          return (b.unreadMessages || 0) - (a.unreadMessages || 0);
        })
    );
  }, [type]);

  return (
    <Container>
      <ScreenHeader title="Chat" search />
      <Tabs
        tabs={[
          { id: "opened", label: "Open chats" },
          { id: "friends", label: "My friends" },
        ]}
        onPressTab={() => {
          setType(type === "opened" ? "friends" : "opened");
        }}
      />
      <Chats
        data={activeChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem item={item} />}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.secondary};
`;

const Chats = styled.FlatList`` as unknown as typeof FlatList;
