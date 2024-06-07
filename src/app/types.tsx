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

export type ShiftDetails = {

  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "docId": number,
  "shiftId": number,
  "shiftStatus": string,
  "shiftMaster": {
    "shiftType": string
  }
}

export type Remark = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "createdBy": number,
  "departmentId": number,
  "remarks": string,
  "status": string,
  "updatedBy": number,
  "createdUser": {
      "userName": string
  },
  "updatedUser": {
      "userName": string
  }
}

export type User = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "name": string,
  "userName": string,
  "address": string,
  "phone": string,
  "password": string,
  "statusId": number,
  "rolesId": number,
  "statusMaster": {
    "statusName":string,
  }
}

export type Department = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "departmentName": string
}

export type Designation = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "sheetId": number,
  "designationId": number,
  "actionId": number,
  "designationMaster": {
    "designationName": string
  }
}

export type Shift = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "sheetId": number,
  "shiftId": number,
  "shiftMaster": {
    "id": number,
    "createdAt": string,
    "updatedAt": string,
    "shiftType": string
  }
}

export type UserJob = {
  "id": number,
  "users": {
    "userName": string
  },
  "departments": {
    "id": number,
    "createdAt": string,
    "updatedAt": string,
    "departmentName": string
  },
  "sheetMaster": SheetRaw,
  "shiftMaster": {
    "id": number,
    "createdAt": string,
    "updatedAt": string,
    "shiftType": string
  },
  "designationMaster": {
    "designationName": string  }
}

export type Document = {
  id: number,
  createdAt: string,
  transitionId: string,
  updatedAt: string,
  sheetId: number,
  userId: number,
  users: { userName: string },
  "transitionMaster": {
    "transitionName": string
  }
}

export type JobAllocationDesignation =         {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "userId": number,
  "departmentId": number,
  "sheetId": number,
  "shiftId": number,
  "designationId": number,
  "designationMaster": {
    "designationName": string
  }
}

export type DesignationAction = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "sheetId": number,
  "designationId": number,
  "actionId": number,
  "actionMaster": {
    "transitionMaster": {
      "transitionName": string,
      "id": number
    },
    "buttonName": string,
    "actionName": string
  }
}

export type DocShift = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "docId": number,
  "shiftId": number,
  "shiftStatus": string,
  "shiftMaster": {
    "shiftType": string
  }
}

export type SheetDocId = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "sheetId": number,
  "userId": number,
  "transitionId": number,
  "users": {
    "userName": string
  },
  "transitionMaster": {
    "transitionName": string
  },
  "sheetMaster": {
    "sheetName": string
  }
}

export type AllowedTransitionAction = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "sheetId": number,
  "userId": number,
  "transitionId": number,
  "transitionMaster": {
    "transitionActions": [
      {
        "actionMaster": {
          "id": number,
          "actionName": string,
          "buttonName": string
        }
      },
      {
        "actionMaster": {
          "id": number,
          "actionName": string,
          "buttonName": string
        }
      }
    ]
  }
}

export type ChartAttributes = {
  "groupId": number,
  "sheetId": number,
  "parameterId": number,
  "fieldId": number,
  "readingId": number,
  "groupMaster": {
    "groupName": string,
    "id": number
  },
  "parameterMaster": {
    "parameterName": string,
    "id": number
  },
  "fieldMaster": {
    "fieldName": string,
    "id": number
  },
  "readingMaster": {
    "readingName": string,
    "id": number
  }
}