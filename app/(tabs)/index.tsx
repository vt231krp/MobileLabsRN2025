import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { IGame } from "../../types";
import { recommendations } from "../../data/recommendations";
import { games as allGames } from "../../data/games";
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

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [displayedGames, setDisplayedGames] = useState<IGame[]>([]);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);
  const gamesPerPage = 4;

  const filteredGames = React.useMemo(() => {
    if (filter === "Top Sellers") {
      return allGames;
    } else {
      return allGames.filter((game) => {
        if (!game.tags) return false;
        return game.tags.some((tag) =>
          tag.toLowerCase().includes(filter.toLowerCase())
        );
      });
    }
  }, [filter]);

  const getAllAvailableGames = useCallback(() => {
    return [...Array(5)].flatMap(() => filteredGames);
  }, [filteredGames]);

  useEffect(() => {
    loadInitialGames();
  }, [filteredGames]);

  const loadInitialGames = useCallback(() => {
    setLoading(true);
    setHasMoreToLoad(true);

    const availableGames = getAllAvailableGames();

    setTimeout(() => {
      setDisplayedGames(availableGames.slice(0, gamesPerPage));
      setLoading(false);
    }, 800);
  }, [getAllAvailableGames]);

  const loadMoreGames = useCallback(() => {
    if (loading || !hasMoreToLoad) return;

    setLoading(true);

    const availableGames = getAllAvailableGames();

    if (displayedGames.length >= availableGames.length) {
      setHasMoreToLoad(false);
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const nextPage = page + 1;
      const newGames = availableGames.slice(
        displayedGames.length,
        displayedGames.length + gamesPerPage
      );

      if (newGames.length === 0) {
        setHasMoreToLoad(false);
      } else {
        setDisplayedGames((current) => [...current, ...newGames]);
        setPage(nextPage);
      }

      setLoading(false);
    }, 800);
  }, [
    page,
    loading,
    displayedGames.length,
    hasMoreToLoad,
    getAllAvailableGames,
  ]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    setHasMoreToLoad(true);

    setTimeout(() => {
      loadInitialGames();
      setRefreshing(false);
    }, 1000);
  }, [loadInitialGames]);

  const renderFooter = () => {
    if (loading) {
      return (
        <LoadingContainer>
          <ActivityIndicator size="small" color="#66c0f4" />
          <LoadingText>Loading more games...</LoadingText>
        </LoadingContainer>
      );
    }

    if (!hasMoreToLoad && displayedGames.length > 0) {
      return (
        <EndMessageContainer>
          <EndMessageText>No more games to load</EndMessageText>
        </EndMessageContainer>
      );
    }

    return null;
  };

  return (
    <Container>
      <ScreenHeader title="Store" search />
      <Content>
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
                  onPress={() => {
                    setFilter(item);
                    setPage(1);
                    setHasMoreToLoad(true);

                    setTimeout(() => {
                      const repeatedGames = [...Array(5)].flatMap(() =>
                        item === "Top Sellers"
                          ? allGames
                          : allGames.filter((game) =>
                              game.tags?.some((tag) =>
                                tag.toLowerCase().includes(item.toLowerCase())
                              )
                            )
                      );
                      setDisplayedGames(repeatedGames.slice(0, gamesPerPage));
                    }, 100);
                  }}
                  isActive={item === filter}
                />
              )}
            />
          </Filters>

          <GamesList
            data={displayedGames}
            renderItem={({ item }) => <GameCard game={item} />}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReached={loadMoreGames}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </GamesContainer>
      </Content>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.secondary};
`;

const Content = styled.View`
  flex: 1;
`;

const SliderContainer = styled.View`
  padding: 0 15px;
`;

const GamesContainer = styled.View`
  margin-top: 10px;
  flex: 1;
  padding: 0 15px;
`;

const Filters = styled.View`
  padding: 10px 0;
`;

const GamesList = styled(FlatList)`
  flex: 1;
` as unknown as typeof FlatList;

const LoadingContainer = styled.View`
  padding: 20px;
  align-items: center;
`;

const LoadingText = styled.Text`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
  margin-top: 5px;
`;

const EndMessageContainer = styled.View`
  padding: 20px;
  align-items: center;
`;

const EndMessageText = styled.Text`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
`;
