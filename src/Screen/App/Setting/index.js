import React, { Component } from 'react';
import { View } from 'react-native';
import { HeaderC } from '../../../component/index';
import { ThemeColor as color } from '../../../colors'
import { ListItem, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart'; // Import package from node modules


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dark: false
        };
    }
    componentDidMount() {
        AsyncStorage.getItem("@theme").then(res => {
            console.log(res)
            this.setState({ dark: res == "Dark" ? true : false })
        })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: color.Primary }}>
                <View style={{ backgroundColor: color.Primary, paddingBottom: 20 }} >
                    <HeaderC navigation={this.props.navigation} heading={"Settings"} />
                </View>
                <View style={{}}>
                    <Image
                        source={{ uri: !this.state.dark ? "https://www.wallpaperup.com/uploads/wallpapers/2016/09/04/1015008/e0762b78d0ac964769482437a042c358-700.jpg" : "https://media.istockphoto.com/vectors/vector-illustration-of-the-night-town-skyline-with-a-full-moon-over-vector-id1030315010?k=6&m=1030315010&s=612x612&w=0&h=10BpeFAYi2FBWcDBgc8HG01fhMrY704D0JbezqOBArw=" }}
                        style={{ height: 200 }}
                    />
                </View>

                <ListItem
                    containerStyle={{ backgroundColor: color.PLight }} titleStyle={{ color: color.PrimaryF }}
                    roundAvatar
                    title={"Theme Dark Mod "}
                    rightIcon={{
                        name: this.state.dark ? "toggle-switch" : "toggle-switch-off", onPress: () => {

                            if (this.state.dark) {
                                AsyncStorage.setItem('@theme', 'Light')

                            } else {
                                AsyncStorage.setItem('@theme', 'Dark')
                            }
                            // this.setState({ dark: !this.state.dark })
                            RNRestart.Restart();


                        }, type: "material-community", iconStyle: { color: this.state.dark ? color.BtnG[0] : color.PrimaryF, fontSize: 50 }
                    }}

                />

            </View>
        );
    }
}

export default Settings;