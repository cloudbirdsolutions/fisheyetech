'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import AvatarWithStatus from './AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import MessagesPaneHeader from './MessagesPaneHeader';
import { ChatProps, MessageProps } from '../types';
import { API_BASE_URL } from '../config';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

type MessagesPaneProps = {
  chat: ChatProps;
};

export default function MessagesPane(props: MessagesPaneProps) {
  const { chat } = props;
  const [chatMessages, setChatMessages] = React.useState(chat?.comments);
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const logintype = useSelector((state: RootState) => state?.user.data);

  React.useEffect(() => {
    setChatMessages(chat?.comments);
  }, [chat?.comments]);

  const auth = useAuth();

  const saveComment = async ()=>{
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/comments/create`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer "  + auth,
        },
        body: JSON.stringify({ reviewId: parseInt(chat.id), createdBy: logintype.data.id ,comments:textAreaValue})
      });
      
      toast.success("Review Created successfully please add comments");
      if (!response.ok) {
        throw new Error(
          "Failed to save record changes: " + response.statusText
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  return (
    <Sheet
      sx={{
        height: { xs: 'calc(100dvh - var(--Header-height))', lg: '100dvh' },
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.level1',
      }}
    >
      {/* <MessagesPaneHeader sender={chat.users} /> */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          
          {chatMessages?.map((message: MessageProps, index: number) => {
            const isYou = message.users === 'You';
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? 'row-reverse' : 'row'}
              >
                {message.users !== 'You' && (
                  <AvatarWithStatus
                    online={false}
                    src={message.users.userName}
                  />
                )}
                <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => {
          saveComment()
          const newId = chatMessages.length + 1;
          setChatMessages([
            ...chatMessages,
            {
              id: newId,
              users: 'You',
              comments: textAreaValue,
              createdAt: 'Just now',
              createdBy:2,
              reviewId:1,
              updatedAt:'Just now'
            },
          ]);
        }}
      />
    </Sheet>
  );
}
