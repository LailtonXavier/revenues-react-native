import { View,Text, StyleSheet } from 'react-native'

interface IIngredients {
  name: string;
  amount: string;
}

const Ingredients = ({ name, amount }: IIngredients) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{ name }</Text>
      <Text style={styles.amount}>{ amount }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 4
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
    marginEnd: 16
  },
  amount: {
  }
})

export default Ingredients;