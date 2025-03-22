import React, { useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import Tabs from "../../components/Tabs";

export default function ChatScreen() {
  const [chats, setChats] = useState([]);
  const [type, setType] = useState("opened");

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
