import React from "react";
import styled from "styled-components/native";

interface FilterButtonProps {
  label: string;
  icon?: any;
  isActive: boolean;
  onPress: () => void;
}

export default function FilterButton({
  label,
  icon,
  isActive,
  onPress,
}: FilterButtonProps) {
  return (
    <Button onPress={onPress} isActive={isActive}>
      <ButtonText isActive={isActive}>
        {label ?? <Icon source={icon} />}
      </ButtonText>
    </Button>
  );
}

const Button = styled.Pressable<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? props.theme.buttonActive : props.theme.buttonInactive};
  padding: 8px 14px;
  border-radius: 8px;
`;

const ButtonText = styled.Text<{ isActive: boolean }>`
  color: ${(props) => props.theme.textPrimary};
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`;

const Icon = styled.Image`
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.icon};
`;
