'use client';
import * as React from 'react';
import Sheet from '@mui/joy/Sheet';

import MessagesPane from './MessagesPane';
import ChatsPane from './ChatsPane';
import { ChatProps } from '../types';
import { chats } from '../data';

interface MyMessagesProps {
  chats : ChatProps[]
}

export default function MyMessages(props:MyMessagesProps) {
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
        <ChatsPane
          chats={props.chats}
          selectedChatId={selectedChat.id}
          setSelectedChat={setSelectedChat}
        />
      </Sheet>
      <MessagesPane chat={selectedChat} />
    </Sheet>
  );
}
