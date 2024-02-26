import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Avatar, Icon} from '@rneui/themed';
import useStyles from './styles';
import {UserI} from '../../../../../redux';
import {useAppDispatch} from '../../../../../hooks';
import {ChatActions} from '../../../../../redux/reducer/chat.reducer';

const UserItem: FunctionComponent<UserI> = props => {
  const styles = useStyles();
  const status = props.status ? 'online' : 'offline';
  const [name, setName] = useState(props.fullname || 'Anonymous');
  const dispatch = useAppDispatch();
  const handleCreateRoom = () => {
    dispatch(ChatActions.handleCreateConversation({joined_uuid: props.uuid}));
  };
  return (
    <TouchableOpacity
      onPress={() => {
        handleCreateRoom();
      }}
      style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.avatarStyle}>
          <Avatar
            source={{
              uri:
                props.image_url ||
                'data:image/jpeg;base64,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',
            }}
            rounded
            size={42}
            containerStyle={{backgroundColor: '#9A9A9A', borderRadius: 100}}
          />
          <View
            style={[
              styles.status,
              status === 'online'
                ? styles.status_online
                : styles.status_offline,
            ]}
          />
        </View>
        <Text style={styles.textStyle}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserItem;
