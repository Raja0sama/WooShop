import React, {  } from "react";
import { Button } from '@ui-kitten/components';


const ButtonC = ({onPress,Text}) => {
    return (
        <Button
        onPress={onPress}
        status='danger'>
          {Text}
        </Button>
    )
}

export default ButtonC