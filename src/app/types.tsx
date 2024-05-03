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


export type Field = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "parameterId": number,
  "fieldId": string,
  "fieldName": string,
  "fieldValue": string,
  "filedValueType": string,
  "readingMaster": Reading[]
}

export type Reading = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "fieldId": number,
  "readingName": string,
}

export type Parameter = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "groupId": number,
  "parameterName": string,
  "fieldMaster": Field[]
}

export type Group = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "sheetId": number,
  "groupName": string,
  "parameterMaster": Parameter[]
}

export type FormData = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "sheetName": string,
  "description": string,
  "groupMaster": Group[]
}