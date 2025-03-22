import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import styled from "styled-components/native";
import ScreenHeader from "../../components/ScreenHeader";
import FilterButton from "../../components/FilterButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "styled-components/native";
import { posts } from "../../data/posts";
import PostCard from "../../components/PostCard";
import { IPost } from "../../types";

export default function CommunityScreen() {
  const theme = useTheme();

  const [filter, setFilter] = useState<string>("All");
  const [filters, setFilters] = useState<string[]>([
    "All",
    "Screenshots",
    "Artwork",
    "Videos",
    "Guides",
    "Reviews",
  ]);

  const [filteredPosts, setFilteredPosts] = useState<IPost[]>(posts);

  useEffect(() => {
    if (filter === "All") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) => post.tags.some((tag) => tag === filter))
      );
    }
  }, [filter, posts]);

  return (
    <Container>
      <ScreenHeader title="Community" />
      <Subtitle>
        Community and official content for all games and software
      </Subtitle>
      <Filters>
        <SearchButton>
          <AntDesign name="search1" size={22} color={theme.icon} />
        </SearchButton>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filters}
          keyExtractor={(item) => item.toString()}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          renderItem={({ item }) => (
            <FilterButton
              isActive={item == filter}
              label={item}
              onPress={() => setFilter(item)}
            />
          )}
        />
      </Filters>
      <Posts>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => <PostSeparator />}
          ListFooterComponent={() => <PostSeparator />}
          ItemSeparatorComponent={() => <PostSeparator />}
          renderItem={({ item }) => <PostCard post={item} />}
        />
      </Posts>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.secondary};
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
  line-height: 18px;
  padding: 0 15px;
`;

const Filters = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  padding: 0 15px;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.buttonInactive};
  padding: 8px 14px;
  border-radius: 8px;
`;

const Posts = styled.View`
  margin-top: 20px;
  flex: 1;
`;

const PostSeparator = styled.View`
  height: 8px;
  background-color: ${({ theme }) => theme.primary};
`;
