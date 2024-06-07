'use client';
import * as React from 'react';
import Sheet from '@mui/joy/Sheet';

import MessagesPane from './MessagesPane';
import ChatsPane from './ChatsPane';
import { ChatProps, ShiftDetails } from '../types';
import { chats } from '../data';

interface MyMessagesProps {
  chats : ChatProps[],
  permissionId : number,
  docId:number;
  selectedShift:ShiftDetails;
  allowAddNew : boolean
}

export default function MyMessages(props:MyMessagesProps) {
  const {permissionId,docId} = props
  const [selectedChat, setSelectedChat] = React.useState<ChatProps>(props.chats[0]);
  return (
    <Sheet
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: { xs: 'var(--Header-height)', sm: 0 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(min-content, min(30%, 400px)) 1fr',
        },
      }}
    >
      <Sheet
        sx={{
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '100%',
          top: 52,
        }}
      >
        {/* { chats.length > 0 && <>
        
        </>} */}
        <ChatsPane
          chats={props.chats}
          selectedChatId={selectedChat?.id}
          setSelectedChat={setSelectedChat}
          permissionId={permissionId}
          docId={docId}
          selectedShift = {props.selectedShift}
          allowAddNew = {props.allowAddNew}
        />
      </Sheet>
     {props.chats.length > 0 && <MessagesPane chat={selectedChat} />}
    </Sheet>
  );
}
