# Project Reveneus using Expo

# Map
  - Setup:
    - TypeScript
    - React navegation
      - npm install @react-navigation/native
      - npx expo install react-native-screens react-native-safe-area-context
      - npm install @react-navigation/bottom-tabs
      - npm install @react-navigation/native-stack
    - Json server
      - npm install json-server
      - create file db.joson
      - npx json-server --watch -d 180 --host 10.0.0.172 db.json
    - expo install expo-linear-gradient
      - add a gradient in the photo
    - icons expo
      - https://icons.expo.fyi/
    - webview
      - component web
      - npx expo install react-native-webview
        - react-native-youtube-iframe nos da **poder** pra ter 
          - todos os controles do youtube
        - npm i react-native-youtube-iframe
      - ScreenOrientation = lidar com orientacao de tela
          - npx expo install expo-screen-orientation
    - asyncStorage
      - npx expo install @react-native-async-storage/async-storage
    - moti https://moti.fyi/
      - yarn add moti or npm i moti --legacy-peer-deps
      - npx expo install react-native-reanimated
      - npx expo install react-native-gesture-handler
      - config babel.config.js
        - plugins: ['react-native-reanimated/plugin']
          - import: 'react-native-gesture-handler' in `@App.tsx`
          - Anima `Home`

# Structure
  - src
    - pages
      - Home
      - Details
      - Favorities
      - Search
    - routes
      - import in main file
    - components/Logo
      - create a new component
      - import in Home
  - db.json
    - services
      - api
      - components/FoodList
        - add linear gradient in the photo
    - routes
      - stack open in front
      - `stackRotes` 
      - get this functionality whenclicking on the post `FoodList`
        - send params data
      - Details take params
        - create all components
        - create component `Ingredient`
        - create component `Instructions`
      - Video insede component
        - in `Details` create Modal to call the `Video`
      - in `Details` add btn to SHARE
    - create file `utils` to add the methods
      - insede create file `storage` to add the methods
      - in `Details` call the methods
    - To do logic `Search`
      - `Home` goes to `Search`
    - Add animation using the `Moti`

# Explanation
  - Navegation: 
    - `npm install @react-navigation/native`
    - `npx expo install react-native-screens react-native-safe-area-context`
    - tabar (navegation underneath)
      - `npm install @react-navigation/bottom-tabs`
    - stack navegation (header navegation)
      - `npm install @react-navigation/native-stack`

  