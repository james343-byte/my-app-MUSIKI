import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const MOCK_SONGS = [
  { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', plays: 2500 },
  { id: '2', title: 'Heat Waves', artist: 'Glass Animals', plays: 2100 },
  { id: '3', title: 'Anti-Hero', artist: 'Taylor Swift', plays: 1800 },
  { id: '4', title: 'As It Was', artist: 'Harry Styles', plays: 2200 },
  { id: '5', title: 'Sunroof', artist: 'Nicky Youre', plays: 1900 },
  { id: '6', title: 'Flowers', artist: 'Miley Cyrus', plays: 2400 },
];

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState(MOCK_SONGS);

  useEffect(() => {
    if (searchText.trim() === '') {
      setResults(MOCK_SONGS);
    } else {
      const filtered = MOCK_SONGS.filter(
        (song) =>
          song.title.toLowerCase().includes(searchText.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchText.toLowerCase())
      );
      setResults(filtered);
    }
  }, [searchText]);

  const renderSong = ({ item }) => (
    <TouchableOpacity style={styles.songItem}>
      <Image
        source={{ uri: 'https://via.placeholder.com/50' }}
        style={styles.songImage}
      />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.artistName}>{item.artist}</Text>
      </View>
      <Text style={styles.plays}>{item.plays} plays</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Songs</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search your recent songs..."
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#999"
      />

      <FlatList
        data={results}
        renderItem={renderSong}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  artistName: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  plays: {
    fontSize: 12,
    color: '#999',
  },
});

export default SearchScreen;
