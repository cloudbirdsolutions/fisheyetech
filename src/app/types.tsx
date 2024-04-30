export type UserProps = {
  avatar: string;
  online: any;
  name: string;
  userName: string;
};

export type MessageProps = {
  id: number;
  reviewId:number;
  comments: string;
  createdAt: string;
  updatedAt: string;
  createdBy :number;
  users : {
    userName: string;
  } | "You"
};

export type ChatProps = {
  id: string;
  createdAt: string;
  updatedAt: string;
  docId:number;
  createdBy :number;
  summary:string;
  users : {
    userName: string;
  }
  comments: MessageProps[];
};
