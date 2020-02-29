import React, { Component } from "react";
import {
  Button,Icon
} from '@ui-kitten/components';
import { Spinner } from '@ui-kitten/components';


const GButton = ({onPress,Text,loading}) => {

  const spinnerIcon = (style) => (
    <Icon
      {...style}
      name={'loader-outline'}
    />
  );
    return (
        <Button
            onPress={onPress}
            style={{marginTop:20}}
            rounded={true}
            icon={loading && spinnerIcon}
            title={Text}
            loading={loading}
            
          >
           
            {loading ? ( <Spinner/>) :  Text}
          </Button>
    )
}
export default GButton