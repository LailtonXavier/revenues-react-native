import { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView, Modal, Share } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Entypo, AntDesign, Feather } from '@expo/vector-icons';
import { IFood } from '../Home';
import Ingredients from '../../components/Ingredients';
import Instructions from '../../components/Instructions';
import Video from '../../components/Video';
import { deleteFarovites, getFavorites, isFavorite, saveFarovites } from '../../Utils/storage';

type IDataFood = {
  data: IFood,
}

export default function Detail() {
  const route = useRoute<RouteProp<Record<string, IDataFood>, string>>();
  const datas = route.params?.data;
  const navigation = useNavigation();
  const [showVideo, setShowVideo] = useState<boolean>(false)
  const [hasFavorites, setHasFavorites] = useState<boolean | undefined>(false)

  useLayoutEffect(() => {

    // async function getAll() {
    //   try {
    //     const res = await getFavorites('@appreceitas');
    //     console.log('datas all', res);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // getAll();

    async function getStatusFavorites() {
      try {
        // if(hasFavorites) return;
        const receipeFavorites = await isFavorite(datas)
        console.log('receipt', receipeFavorites)
        setHasFavorites(receipeFavorites)
      } catch (error) {
       console.log(error); 
      }
    }

    getStatusFavorites();

    navigation.setOptions({
      title: 
      route.params?.data ? datas.name : 'Detalhes da receita',
      headerRight: () => (
        <Pressable onPress={ () => handleFavoriteReceipe(datas)}>
          {hasFavorites ? (
            <Entypo
              name="heart"
              size={28}
              color="#FF4141"
            />
          ): (
            <Entypo
              name="heart-outlined"
              size={28}
              color="#FF4141"
            />
          )}
          </Pressable>
      )
    })
  }, [navigation, datas, hasFavorites])

  const handleFavoriteReceipe = async (receipe: IFood) => {
    if (hasFavorites){
      await deleteFarovites(receipe.id)
      setHasFavorites(false);
    } else {
      try {  
        await saveFarovites('@appreceitas', receipe);
        setHasFavorites(true);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleOpenVideo = () => {
    setShowVideo(true)
  }

  const shareRevenues = async () => {
    try {
      const res = await Share.share({
        url: 'https://www.youtube.com/watch?v=gDfE_IbziWk&t=2186s',
        message: 
        `Receita: ${datas.name} 
        \nIngredientes: ${datas.total_ingredients}
        \nVi la no app receita facil`
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 14}}
     >
      <Pressable onPress={handleOpenVideo}>
        <View>
          <View style={styles.playIcon}>
            <AntDesign name='playcircleo' size={48} color="#FAFAFA" />
          </View>
          <Image
            source={{ uri: datas.cover }}
            style={styles.cover}
            />
          </View>
      </Pressable>

      <View style={styles.headerDetails}>
        <View>
          <Text style={styles.name}>{datas.name}</Text>
          <Text style={styles.totalIngredient}>
            ingredientes ({datas.total_ingredients})
          </Text>
        </View>
        <Pressable onPress={shareRevenues}>
          <Feather name="share-2" size={24} color="#121212" />
        </Pressable>
      </View>

      {datas.ingredients.map((item) => 
        <Ingredients
         key={String(item.id)}
         name={item.name}
         amount={item.amount}
       />
      )}

      <View style={styles.instructionsArea}>
        <Text style={styles.instructionsText}>
          Modo de preparo
        </Text>
        <Feather
          name='arrow-down'
          size={24}
          color='#fff'
        />
      </View>
      {datas.instructions.map((item, index) => (
        <Instructions
          key={String(item.id)}
          text={item.text}
          id={Number(index + 1)}
        />
      ))}

      <Modal visible={showVideo} animationType="slide" >
        <Video
          handleClose={ () => setShowVideo(false) }
          dataURL={datas.video}
        />
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F9FF',
    paddingTop: 14,
    paddingStart: 14,
    paddingEnd: 14
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 14
  },
  playIcon: {
    position: 'absolute',
    zIndex: 9,
    top: 0,left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  name: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4
  },
  totalIngredient: {
    fontSize: 16,
    marginBottom: 14
  },
  instructionsArea: {
    backgroundColor: '#4cbe6c',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 4,
    marginBottom: 14
  },
  instructionsText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginRight: 8
  }
});
