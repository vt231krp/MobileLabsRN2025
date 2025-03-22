import React from "react";
import styled from "styled-components/native";
import { IRecommendation } from "../types";
import { FlatList, View } from "react-native";
import SliderCard from "./SliderCard";

interface RecSliderProps {
  recs: IRecommendation[];
}

export default function RecSlider({ recs }: RecSliderProps) {
  return (
    <Container>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recs}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => <SliderCard recommendation={item} />}
      />
    </Container>
  );
}

const Container = styled.View``;
