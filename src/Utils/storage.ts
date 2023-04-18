import AsyncStorage from '@react-native-async-storage/async-storage';
import { IFood } from '../pages/Home';

export async function getFavorites (key: string) {
  const favorites = await AsyncStorage.getItem(key)
  return JSON.parse(String(favorites)) || [];
};

export async function saveFarovites(key: any, newItem: any){
  try {
    let myFavorites = await getFavorites(key);
    const arr = [];
    const hasItem = myFavorites.some( (item: any) => item.id === newItem.id);
    
    if (hasItem) {
      console.log('ESSE ITEM JA ESTA SALVO NA LISTA');
      return;
    }
    
    arr.push(...myFavorites, newItem)
    await AsyncStorage.setItem(key,  JSON.stringify(arr));
  } catch (error) {
    console.log(error);
  }
};

export async function deleteFarovites(id: string){
  let receips = await getFavorites('@appreceitas');

  let myFavorites = receips.filter((item: IFood) => {
    return (item.id !== id);
  })

  await AsyncStorage.setItem('@appreceitas', JSON.stringify(myFavorites));
  return myFavorites;
};

export async function isFavorite(receipe: IFood){
  try {
    const myReceipes = await getFavorites('@appreceitas');
    let hasFovorite = false;

    const checke = myReceipes.find((item: any) => item.id === receipe.id);
    
    if (checke) return hasFovorite = true;
    return hasFovorite;
  } catch (error) { 
   console.log(error); 
  }
};
