import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Welcome from "../screens/Welcome";
import SignUp from "../screens/SignUp";
import Settings from "../screens/Settings";
import Mobil from "../screens/Mobil";
import Codes from "../screens/Codes";
import loginCode from "../screens/loginCode";
import loginNumber from "../screens/loginNumber";

import { theme } from "../constants";

const screens = createStackNavigator(
  {
    Welcome,
    Mobil,
    Codes,
    SignUp,
    loginNumber,
    loginCode,
    Settings
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
      headerBackImage: <Image source={require("../assets/icons/back.png")} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base
      }
    }
  }
);

export default createAppContainer(screens);
