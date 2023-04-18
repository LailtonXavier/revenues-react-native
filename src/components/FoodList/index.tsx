import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IFood } from '../../pages/Home'

interface IFoodList {
  data: IFood;
}

const FoodList = ({ data }: IFoodList) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleNavigate = () => {
    navigation.navigate('Detail', { data: data });
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={handleNavigate}
      >
      <Image
        source={{ uri: data.cover}}
        style={styles.cover}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.desc}>
          {data.total_ingredients} ingredientes | {data.time} min
        </Text>
      </View>
      <LinearGradient
        style={styles.gradient}
        colors={['transparent', 'rgba(0,0,0, 0.70)', 'rgba(0,0,0, 0.95)']}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 14
  },
  info: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    zIndex: 99
  },
  name: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  desc: {
    color: '#FFFFFF',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
    borderRadius: 14,
    zIndex: 1,
    backgroundColor: 'transparent'
  }
})

export default FoodList;