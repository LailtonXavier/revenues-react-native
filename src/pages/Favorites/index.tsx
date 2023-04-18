import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import FoodList from '../../components/FoodList';
import { getFavorites } from '../../Utils/storage';
import { IFood } from '../Home';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Favorites() {
  const [fovorites, setFavorites] = useState<IFood[]>()
  const isFocused = useIsFocused(); 

  useEffect(() => {
    if (isFocused) {
      const getAll = async () => {
        const res = await getFavorites('@appreceitas');
        setFavorites(res);
        console.log('carregou')
      }
      getAll();
    }
  }, [isFocused]);




  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Receitas Favoritas</Text>
      
      {fovorites?.length === 0 && (
        <Text style={styles.title}>Você ainda não tem nenhuma receita salva.</Text>
      )}

      <FlatList 
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 14 }}
        data={fovorites}
        keyExtractor={ ( item ) => String(item.id)}
        renderItem={ ({ item }) => <FoodList data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9FF',
    paddingTop: 36,
    paddingStart: 14,
    paddingEnd: 14,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 24
  },
  
});