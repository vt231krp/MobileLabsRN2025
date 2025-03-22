import { IGame } from "../types";
import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import React, { useState, useEffect } from "react";
import GameCard from "./GameCard";
import FilterButton from "./FilterButton";

interface GameListProps {
  games: IGame[];
}

export default function GameList({ games }: GameListProps) {
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
    console.log("Current filter:", filter);

    if (filter === "Top Sellers") {
      setFilteredGames(games);
      console.log("Showing all games (Top Sellers)");
    } else {
      const filtered = games.filter((game) => {
        if (!game.tags) return false;

        const hasTag = game.tags.some((tag) => {
          const tagMatch = tag.toLowerCase().includes(filter.toLowerCase());
          console.log(`Game: ${game.name}, Tag: ${tag}, Match: ${tagMatch}`);
          return tagMatch;
        });

        return hasTag;
      });

      console.log(`Filter: ${filter}. Found ${filtered.length} games`);
      setFilteredGames(filtered);
    }
  }, [filter, games]);

  return (
    <Container>
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
    </Container>
  );
}

const Container = styled.View`
  margin-top: 20px;
  flex: 1;
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
