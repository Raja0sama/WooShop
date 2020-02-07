import AsyncStorage from '@react-native-community/async-storage';


const Dark = {
    Primary : "#121212",
    PLight : "#1e1e1e",
    PDark : "#000000",
    PrimaryF:"white",
    Secondary : "#fafafa",
    SLight:"#ffffff",
    SDark:"#c7c7c7",
    SecondaryF:"#000000",
    stutsbarContent: "light-content",
    BtnG : ['#283048','#859398']

}

const Light = {
    Secondary : "#212121",
    SLight : "#484848",
    SDark : "#000000",
    SecondaryF:"white",
    Primary : "#fafafa",
    PLight:"#ffffff",
    PDark:"#c7c7c7",
    PrimaryF:"#000000",
    stutsbarContent: "dark-content",
    BtnG : ['#EC6F66','#F3A183']
}

let ThemeColor = Light

const Logic = async () => {

        try {
          const value = await AsyncStorage.getItem('@theme')
          if(value !== null) {
              if(value == "Dark"){

                  return ThemeColor = Dark
            }else{

                return ThemeColor = Light
            }
          }
        } catch(e) {
          // error reading value
        }
      
} 

Logic()
// export {Light,Dark}
export {ThemeColor}
