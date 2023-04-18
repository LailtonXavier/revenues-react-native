import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text as MotiText } from 'moti';
import { Logo } from '../../components/Logo';
import api from '../../services/api';
import FoodList from '../../components/FoodList';

export interface IFood {
  id: string
  name: string
  total_ingredients: string
  time: number
  cover: string
  video: string
  ingredients: Ingredient[]
  instructions: Instruction[]
}

export interface Ingredient {
  id: string
  name: string
  amount: string
}

export interface Instruction {
  id: string
  text: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [foods, setFoods] = useState<IFood[]>([])

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    try {
      setIsLoading(true)
      const fetchApi = async () => {
        const res = await api.get("/foods")
        setFoods(res.data)
        setIsLoading(false) 
      }
      fetchApi()
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [])
  
  function handleSearch() {
    if(!inputValue) return;

    let input = inputValue;
    setInputValue('')
    navigation.navigate('Search', { name: input});
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <MotiText
        style={styles.title}
        from={{
          opacity: 0,
          translateY: 18
        }}
        animate={{
          opacity: 1,
          translateY: 0
        }}
        transition={{
          delay: 500,
          type: 'timing',
          duration: 650
        }}
        >
          Encontre a receita
      </MotiText>
      <MotiText
        style={styles.title}
        from={{
          opacity: 0,
          translateY: 18
        }}
        animate={{
          opacity: 1,
          translateY: 0
        }}
        transition={{
          delay: 600,
          type: 'timing',
          duration: 750
        }}
        >
          que combina com você
      </MotiText>

      <View style={styles.form}>
        <TextInput
          placeholder='Digite o nome da comida...'
          style={styles.input}
          value={inputValue}
          onChangeText={(text) => 
            setInputValue(text)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={28} color="#4CBE6C" />
        </TouchableOpacity> 
      </View>

      { isLoading && <Text>Carregando</Text> }

      <FlatList
        data={foods}
        keyExtractor={(item) => String(item.id)}
        renderItem={ ({ item }) => <FoodList data={item} /> }
        showsVerticalScrollIndicator={false}
      />
      <StatusBar style="auto" />
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0e0e0e',
  },
  form: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '90%',
    maxWidth: '90%',
    height: 54,
  }
});