import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box, Button, Chip, FormControl, FormLabel, IconButton, Input, Textarea } from '@mui/joy';
import List from '@mui/joy/List';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChatListItem from './ChatListItem';
import { ChatProps } from '../types';
import { toggleMessagesPane } from '../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { API_BASE_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';


type ChatsPaneProps = {
  chats: ChatProps[];
  setSelectedChat: (chat: ChatProps) => void;
  selectedChatId: number;
  permissionId: number;
  docId: number
};

export default function ChatsPane(props: ChatsPaneProps) {
  const { chats, setSelectedChat, selectedChatId, permissionId, docId } = props;
  const logintype = useSelector((state: RootState) => state?.user.data);
  const [newReviewSummary, setNewReviewSummary] = React.useState('');
  const [showNewReviewForm, setShowNewReviewForm] = React.useState(false);

  const updateSummary = (e: any) => {
    setNewReviewSummary(e.target.value)
  }

  const saveReview = async ()=>{
    try {
      const response = await fetch(`${API_BASE_URL}/review/create`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({docId,createdBy:logintype.data.id,summary:newReviewSummary})
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
        borderRight: '1px solid',
        borderColor: 'divider',
        height: 'calc(100dvh - var(--Header-height))',
        overflowY: 'auto',
      }}
    >
      <ToastContainer/>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        p={2}
        pb={1.5}
      >
        <Typography
          fontSize={{ xs: 'md', md: 'lg' }}
          component="h1"
          fontWeight="lg"
          endDecorator={
            <Chip
              variant="soft"
              color="primary"
              size="md"
              slotProps={{ root: { component: 'span' } }}
            >
              {chats.length}
            </Chip>
          }
          sx={{ mr: 'auto' }}
        >
          Reviews
        </Typography>
        <IconButton
          variant="plain"
          aria-label="edit"
          color="neutral"
          size="sm"
          sx={{ display: { xs: 'none', sm: 'unset' } }}
        >
          <EditNoteRoundedIcon />
        </IconButton>
        {/* <IconButton
          variant="plain"
          aria-label="edit"
          color="neutral"
          size="sm"
          onClick={() => {
            toggleMessagesPane();
          }}
          sx={{ display: { sm: 'none' } }}
        >
          <CloseRoundedIcon />
        </IconButton> */}
      </Stack>
      <Box sx={{ px: 2, pb: 1.5 }}>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Search"
          aria-label="Search"
        />
      </Box>
      <List
        sx={{
          py: 0,
          '--ListItem-paddingY': '0.75rem',
          '--ListItem-paddingX': '1rem',
        }}
      >
        {/* {permissionId} */}
        {
          [2, 3].includes(permissionId) && <Box sx={{ px: 2, pb: 1.5 }}> <Button size="sm" onClick={() => { setShowNewReviewForm(true) }}>Add New Review</Button></Box>
        }
        {showNewReviewForm && <>
          <FormControl>
            <FormLabel> Review Summary  </FormLabel>
            <Input value={newReviewSummary} onChange={(e) => updateSummary(e)} />
            <Stack direction={'row'} spacing={1} marginTop={2} justifyContent={'flex-end'}>
              <Button size='sm' variant='solid' color='success' onClick={()=>{saveReview()}}> Save Review </Button>
              <Button size='sm' variant='outlined' color='neutral' onClick={() => { setShowNewReviewForm(false) }}> Cancel </Button>
            </Stack>

          </FormControl>
        </>}
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            {...chat}
            setSelectedChat={setSelectedChat}
            selectedChatId={selectedChatId}
          />
        ))}
      </List>
    </Sheet>
  );
}
