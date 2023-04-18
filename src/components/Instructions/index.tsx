import { View,Text, StyleSheet } from 'react-native'

interface IInstructions {
  text: string;
  id: number;
}

const Instructions = ({ text, id }: IInstructions) => {
  return (
    <View style={styles.container}>
      <Text style={styles.id}>{ id }- </Text>
      <Text style={styles.text}>{ text }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
    flexDirection: 'row',
    padding: 8,
  },
  id: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    lineHeight: 20,
    marginEnd: 16
  }
})

export default Instructions;