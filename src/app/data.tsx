import { ChatProps, UserProps } from './types';

export const users: UserProps[] = [
  {
    userName: 'Anand',
    avatar: '',
    online: undefined,
    name: ''
  }
];

export const chats: ChatProps[] = [
  {
    id: "1",
    users: users[0],
    createdAt : "Wednesday 9:00am",
    updatedAt : "Wednesday 9:00am",
    createdBy: 2,
    docId: 1,
    summary: "This is the summary",
    comments: [
      {
        id: 1,
        comments: 'Hi Olivia, I am currently working on the project.',
        createdAt: 'Wednesday 9:00am',
        users: users[0],
        createdBy : 2,
        reviewId:1,
        updatedAt:'Wednesday 9:00am'
      }
    ],
  },
 
];
