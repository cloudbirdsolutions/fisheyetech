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


export type ReadingMaster = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "readingName": string
}


export type FieldReading =   {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "fieldId": number,
  "readingId": number,
  "readingMaster": ReadingMaster
}

export type FieldMaster = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "fieldId": string,
  "fieldName": string,
  "fieldValue": string,
  "filedValueType": string,
  "fieldReading": FieldReading[]
}

export type ParameterField = 
  {
    "id": number,
    "createdAt": string,
    "updatedAt": string,
    "parameterId": number,
    "fieldId": number,
    "fieldMaster" : FieldMaster
}


export type ParameterMaster = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "parameterName": string,
  "paramterFields" : ParameterField[]

}

export type GroupParameter = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "groupId": number,
  "parameterId": number,
  "parameterMaster": ParameterMaster
}

export type GroupMaster = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "groupName": string,
  "groupParameters" : GroupParameter[]

}

export type FormData = {
  
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "sheetId": number,
  "groupId": number,
  "groupMaster": GroupMaster
}


export type RecordReading = {
        "readingId":number,
        "fieldId":number,
        "parameterId":number,
        "groupId":number,
        "id"?: number,
        "createdAt": string,
        "updatedAt": string,
        "sheetId": number,
        worksheetId:number;
        cellValue:string;
}


export type  Reccod = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  createdBy: number;
  updatedBy: number;
  documentId: number;
  groupId:number;
  readingId:number;
  shiftId: number;
  fieldId: number;
  fieldValue: string;
  transitionId: number;
  parameterId: number;
  worksheetId:number;
  cellValue:string;

}

export type SheetRaw = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "sheetName": string,
  "description": string
}

export type GroupRaw =  {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "groupName": string
}
export type ReadingRaw =  {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "readingName": string
}
export type ParameterRaw =  {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "parameterName": string
}
export type FieldRaw =  {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "fieldId": string,
  "fieldName": string,
  "fieldValue": string,
  "filedValueType": string
}