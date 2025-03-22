import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { IGame } from "../../types";
import { recommendations } from "../../data/recommendations";
import { games } from "../../data/games";
import styled from "styled-components/native";
import ScreenHeader from "../../components/ScreenHeader";
import SliderCard from "../../components/SliderCard";
import FilterButton from "../../components/FilterButton";
import GameCard from "../../components/GameCard";

export default function StoreScreen() {
  const [filter, setFilter] = useState<string>("Top Sellers");
  const [filters] = useState<string[]>([
    "Top Sellers",
    "Action",
    "Strategy",
    "Adventure",
    "RPG",
    "Sports",
    "Simulation",
    "Puzzle",
    "Casual",
  ]);
  const [filteredGames, setFilteredGames] = useState<IGame[]>(games);

  useEffect(() => {
    if (filter === "Top Sellers") {
      setFilteredGames(games);
    } else {
      const filtered = games.filter((game) => {
        if (!game.tags) return false;

        const hasTag = game.tags.some((tag) => {
          const tagMatch = tag.toLowerCase().includes(filter.toLowerCase());
          return tagMatch;
        });

        return hasTag;
      });

      setFilteredGames(filtered);
    }
  }, [filter, games]);

  return (
    <Container>
      <ScreenHeader title="Store" search />
      <SliderContainer>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recommendations}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          renderItem={({ item }) => <SliderCard recommendation={item} />}
        />
      </SliderContainer>
      <GamesContainer>
        <Filters>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            data={filters}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <FilterButton
                label={item}
                onPress={() => setFilter(item)}
                isActive={item === filter}
              />
            )}
          />
        </Filters>
        <Games>
          {filteredGames.length > 0 ? (
            <FlatList
              data={filteredGames}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <GameCard game={item} />}
            />
          ) : (
            <NoGamesText>No games found for this filter</NoGamesText>
          )}
        </Games>
      </GamesContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.secondary};
`;

const SliderContainer = styled.View`
  padding: 0 15px;
`;

const GamesContainer = styled.View`
  margin-top: 20px;
  flex: 1;
  padding: 10px 15px 0;
`;

const Filters = styled.View`
  padding: 10px 0;
`;

const Games = styled.View`
  padding: 10px 0;
  flex: 1;
`;

const NoGamesText = styled.Text`
  color: ${(props) => props.theme.textSecondary};
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;
