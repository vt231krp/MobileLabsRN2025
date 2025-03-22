import React from "react";
import { AntDesign } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";

interface CardActionsProps {
  actions: string[];
}

export default function CardActions({ actions }: CardActionsProps) {
  const theme = useTheme();

  return (
    <ActionContainer>
      {actions.map((action, index) => (
        <React.Fragment key={action}>
          <ActionButton onPress={() => console.log(`Pressed ${action}`)}>
            <ActionButtonText>{action}</ActionButtonText>
            <AntDesign name="right" size={15} color={theme.icon} />
          </ActionButton>
          {index < actions.length - 1 && <ActionSeparator />}
        </React.Fragment>
      ))}
    </ActionContainer>
  );
}

const ActionContainer = styled.View`
  border-radius: 8px;
  overflow: hidden;
  margin: 0 15px;
  background-color: ${({ theme }) => theme.cardBackground};
`;

const ActionButton = styled.TouchableOpacity`
  padding: 15px 18px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ActionButtonText = styled.Text`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 14px;
  line-height: 22px;
`;

const ActionSeparator = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.border};
`;
