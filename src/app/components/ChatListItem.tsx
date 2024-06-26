import * as React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import AvatarWithStatus from './AvatarWithStatus';
import { ChatProps, MessageProps, UserProps } from '../types';
import { toggleMessagesPane } from '../utils';

type ChatListItemProps = ListItemButtonProps & {
  id: string;
  createdAt: string;
  updatedAt: string;
  docId:number;
  createdBy :number;
  summary:string;
  users: {
    userName: string;
  }
  comments: MessageProps[];
  selectedChatId?: string;
  setSelectedChat: (chat: ChatProps) => void;
};

export default function ChatListItem (props: ChatListItemProps) {
  const { id, users, comments,createdAt,updatedAt,docId,createdBy,summary,  selectedChatId, setSelectedChat } = props;
  const selected = selectedChatId === id;
  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            // toggleMessagesPane();
            setSelectedChat({ id, users, comments,createdAt,updatedAt,docId,createdBy,summary });
          }}
          selected={selected}
          color="neutral"
          sx={{
            flexDirection: 'column',
            alignItems: 'initial',
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus online={false} src={users.userName} />
            <Box sx={{ flex: 1 }}>
              <Typography level="body-sm">{users.userName}</Typography>
            </Box>
            <Box
              sx={{
                lineHeight: 1.5,
                textAlign: 'right',
              }}
            >
              {/* {comments[0].unread && (
                <CircleIcon sx={{ fontSize: 12 }} color="primary" />
              )} */}
              <Typography
                level="body-xs"
                display={{ xs: 'none', md: 'block' }}
                noWrap
              >
                5 mins ago
              </Typography>
            </Box>
          </Stack>
          <Typography
            level="body-sm"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {summary}
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
