import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import FoodList from '../../components/FoodList';
import api from '../../services/api';
import { IFood } from '../Home';

type IInput = {
  name: string;
}

export default function Search() {
  const route = useRoute<RouteProp<Record<string, IInput>>>()
  const inputValue = route.params.name;
  const [receipes, setReceipes] = useState<IFood[]>([]);

  useEffect(() => {
    async function fetchReceipes(){
      const res = await api.get(`/foods?name_like=${inputValue}`)
      console.log('datas', res.data);
      setReceipes(res.data);
    }

    fetchReceipes();
  }, [inputValue])

  return (
    <View style={styles.container}>
      <FlatList 
        data={receipes}
        keyExtractor={( item ) => String(item.id)}
        renderItem={ ({ item }) => <FoodList data={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ () => 
        <Text style={styles.notFound}>
          Não encontramos o que está buscando...
        </Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9FF',
    paddingTop: 14,
    paddingStart: 14,
    paddingEnd: 14
  },
  notFound: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  }
});