import React, { useState } from "react";
import styled from "styled-components/native";
import { ITab } from "../types";
import { FlatList, Text, View } from "react-native";

interface TabsProps {
  tabs: ITab[];
  onPressTab: (tabId: string) => void;
}

export default function Tabs({ tabs, onPressTab }: TabsProps) {
  const [activeId, setActiveId] = useState<string>(tabs[0].id);

  return (
    <Container>
      <TabsContainer
        horizontal={false}
        scrollEnabled={false}
        data={tabs}
        numColumns={tabs.length}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Tab
            isActive={activeId === item.id}
            onPress={() => {
              setActiveId(item.id);
              onPressTab(item.id);
            }}
            style={{ flex: 1 / tabs.length }}
          >
            <TabText isActive={activeId === item.id}>{item.label}</TabText>
          </Tab>
        )}
      />
    </Container>
  );
}

const Container = styled.View`
  background-color: ${({ theme }) => theme.buttonInactive};
  border-radius: 8px;
  margin: 10px 15px;
  padding: 2px;
`;

const TabsContainer = styled(FlatList)`
  width: 100%;
` as unknown as typeof FlatList;

const Tab = styled.TouchableOpacity<{ isActive?: boolean }>`
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.primary : theme.buttonInactive};
  border-radius: 8px;
  padding: 8px 0;
  align-items: center;
  justify-content: center;
  margin: 0 1px;
`;

const TabText = styled.Text<{ isActive?: boolean }>`
  color: ${({ theme, isActive }) =>
    isActive ? theme.textPrimary : theme.textSecondary};
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
`;
