import {PayloadAction} from '@reduxjs/toolkit';
import {EventChannel, Task, eventChannel} from 'redux-saga';
import {
  call,
  cancel,
  fork,
  put,
  race,
  take,
  takeLatest,
} from 'redux-saga/effects';
import {Socket, io} from 'socket.io-client';
import {routes} from '../../constants';
import {BASE_URL} from '../../environment';
import {NavigationService} from '../../navigation';
import {AuthActions, LoadingActions} from '../reducer';
import {ChatActions} from '../reducer/chat.reducer';
import {ConversationService} from '../services/conversation.service';
import {
  Accesstoken,
  ConversationI,
  MessageI,
  MessageType,
  PayloadHttp,
  ShareLinkI,
} from '../types';
import {store} from '../store';
import {Http} from '../../types';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {CustomToastBottom} from '../../utils';
function connect(token: string) {
  //const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkX2F0IjoiMjAyMy0xMC0xOSAyMDo0NCIsInV1aWQiOiJjZmY2NDkyZi02MzdiLTRmZDItODc0Yi0wZTNiNTMyZTIxZmMiLCJ1cGRhdGVkX2F0IjoiMjAyMy0xMC0xOSAyMDo0NCIsImRlbGV0ZWRfYXQiOm51bGwsImVtYWlsIjoicDNuaG94OTlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMmc3dnFVdzFwM2x3TmxNRlVXOGhlLnYwUlRBZm5IVHNmRHpQMjFoSUw1VC52SWo2NTVwaW0iLCJyb2xlcyI6InVzZXIiLCJmdWxsbmFtZSI6ImtoYWkiLCJwaG9uZSI6IjA5NDIzODQyIiwic3VtbWFyeSI6bnVsbCwiZ2VuZGVyIjoiZmFtYWxlIiwic3RhdHVzIjpmYWxzZSwiZG9iIjoiMjAwMy0wMy0wMyIsImRldmljZV90b2tlbiI6IjExMTEiLCJpbWFnZV91cmwiOiJodHRwOi8vcmVzLmNsb3VkaW5hcnkuY29tL2R6eWNpYnB1Yy9pbWFnZS91cGxvYWQvdjE2OTc4ODM1NzAvYXZhdGFyL3AzbmhveDk5JTQwZ21haWwuY29tL2ZpbGVfenowamxpLmpwZyIsInB1YmxpY19pZCI6ImF2YXRhci9wM25ob3g5OUBnbWFpbC5jb20vZmlsZV96ejBqbGkiLCJpc1VwZGF0ZSI6dHJ1ZSwiaXNQYXNzd29yZCI6dHJ1ZSwiaWF0IjoxNzAwMDcwMjA3LCJleHAiOjE3MDAwNzM4MDd9.uoTqfm5ScgHkd0tOhMT95WttPmF5MUtEt3i3aOYLRYI`;
  const socket = io(BASE_URL, {
    extraHeaders: {
      Authorization: `${token}`,
    },
  });

  return new Promise(resolve => {
    socket.on('connect', () => {
      console.log('connected');
      resolve(socket);
    });
  });
}

function* handleIO(socket: Socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* write(socket: Socket) {
  while (true) {
    const {join, leave, add, create} = yield race({
      join: take(ChatActions.handleJoinConversation.type),
      add: take(ChatActions.handleAddMessage.type),
      leave: take(ChatActions.handleLeaveConversation),
      create: take(ChatActions.handleCreateConversation.type),
    });

    // console.log(leave.payload);
    if (join) {
      yield socket.emit('joinConversation', {
        uuid: join.payload.uuid,
        last_message_uuid: join.payload.last_message_uuid,
      });
    }
    if (leave) {
      yield socket.emit('leaveRoom');
    }

    if (create) {
      try {
        yield put(LoadingActions.showLoading());
        yield socket.emit('createConversation', {
          joined_uuid: create.payload.joined_uuid,
        });
      } catch (error) {
        CustomToastBottom('Server have error, please try again later');
      } finally {
        yield put(LoadingActions.hideLoading());
      }
    }

    if (add) {
      yield socket.emit('addMessage', {
        conversation_uuid: add.payload.conversation_uuid,
        message: add.payload.message,
        type: add.payload.type,
      });
    }
  }
}

function* read(socket: Socket) {
  console.log('read');
  const channel: EventChannel<any> = yield call(subscribe, socket);
  //console.log(channel);
  while (true) {
    let action: PayloadAction = yield take(channel);
    //console.log(action);
    yield put(action);
  }
}

function subscribe(socket: Socket) {
  console.log('subscribe');
  return eventChannel(emitter => {
    socket.on('conversations', conversations => {
      if (conversations) {
        console.log('error at here');
        emitter(ChatActions.handleGetListConversationSuccess(conversations));
      }
    });

    socket.on('messages', (listMessage: MessageI[]) => {
      if (listMessage) {
        emitter(ChatActions.handleJoinConversationSuccess(listMessage));
      }
    });

    socket.on('newConversation', (newConversation: ConversationI) => {
      if (newConversation) {
        emitter(ChatActions.handleCreateConversationSuccess(newConversation));
      }
    });

    socket.on('messageAdd', newMessage => {
      if (newMessage) {
        emitter(ChatActions.handleAddMessageSuccess(newMessage));
      }
    });

    return () => {
      console.log('unsubscribe');
    };
  });
}

function* handleGetListConversation(): Generator {
  const {data}: any = yield call(ConversationService.getConversation);
  console.log(data);
  yield put(ChatActions.handleGetListConversationSuccess(data.data));
}

// function* handleGetListMessages(
//   action: PayloadAction<RequestJoinConversationI>,
// ): Generator {
//   console.log('payload:            ' + action.payload.last_message_uuid);
//   const {data}: any = yield call(
//     ConversationService.getMessage,
//     action.payload.uuid,
//   );

//   yield put(ChatActions.handleJoinConversationSuccess(data));
// }

function* handleAddNewConversationSuccess(
  action: PayloadAction<ConversationI>,
) {
  try {
    yield put(LoadingActions.showLoading());
    NavigationService.navigate(routes.CHAT, action.payload);
  } catch (error) {
    console.log(error);
  } finally {
    yield put(LoadingActions.hideLoading());
  }
}

function* flowSocket() {
  console.log('flow socket');
  const data: Accesstoken = yield take(ChatActions.handleGetListConversation);

  const socket: Socket = yield call(connect, data.payload);

  const task: Task = yield fork(handleIO, socket);
  yield take(AuthActions.handleLogout);
  //yield take(ChatActions.handleJoinConversation);

  yield cancel(task);
}

function* shareLinkMessage(action: PayloadAction<ShareLinkI>): Generator {
  try {
    console.log('link', action.payload.message['_j']);
    console.log('test 😂😂😂😂😂' + action.payload.message['_j']);
    yield put(LoadingActions.showLoading());
    const {data}: any = yield call(ConversationService.createConversation, {
      joined_uuid: action.payload.joined_uuid,
    });
    console.log(data);
    let conversation_uuid = data.data.uuid;
    if (data.code === 200) {
      const {data}: any = yield call(ConversationService.addMessage, {
        conversation_uuid: conversation_uuid,
        message: action.payload.message['_j'],
        type: MessageType.LINK,
      });
      console.log('data: ', data);
      // yield put(ChatActions.handleCreateConversationSuccess(data.data));
    } else {
      console.log('fail');
    }
    // yield put(ChatActions.handleCreateConversationSuccess(data.data));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(LoadingActions.hideLoading());
  }
}

function* flow(): Generator {
  // const accessToken = store.getState().auth.accessToken;
  // console.log(accessToken);

  while (true) {
    const data: any = yield take(ChatActions.handleGetStatus);
    if (data.payload) {
      console.log('come');

      yield takeLatest(ChatActions.handleShareLink, shareLinkMessage);
      yield takeLatest(
        ChatActions.handleGetListConversation,
        handleGetListConversation,
      );
      // yield takeLatest(ChatActions.handleJoinConversation, handleGetListMessages);
      yield takeLatest(
        ChatActions.handleCreateConversationSuccess,
        handleAddNewConversationSuccess,
      );

      yield call(flowSocket);
    }
  }
}

export default function* watchChatSaga() {
  yield fork(flow);
}
