import React, { useCallback } from 'react';
import * as Linking from 'expo-linking';
import { Button, IButtonProps } from 'native-base';

interface Props extends IButtonProps {
  href: string;
}

const LinkButton: React.FC<Props> = ({ href, ...rest }) => {
  const handlePress = useCallback(() => {
    Linking.openURL(href);
  }, [href]);

  return <Button {...rest} onPress={handlePress} />;
};

export default LinkButton;
