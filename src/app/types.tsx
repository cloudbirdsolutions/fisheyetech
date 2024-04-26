export type UserProps = {
  userName: string;
  };

export type MessageProps = {
  id: number;
  reviewId:number;
  comments: string;
  createdAt: string;
  updatedAt: string;
  createdBy :number;
  users: UserProps | 'You';
  
};

export type ChatProps = {
  id: number;
  createdAt: string;
  updatedAt: string;
  docId:number;
  createdBy :number;
  summary:string;
  users: UserProps;
  comments: MessageProps[];
};
