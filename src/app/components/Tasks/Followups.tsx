"use client";

import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import IconButton from "@mui/joy/IconButton";
import { Box, Button } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";

import Typography from "@mui/joy/Typography";
import { API_BASE_URL } from "@/app/config";
import { Stack } from "@mui/joy";
import TableSection from "../Common/TableSection";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
const jmespath = require("jmespath");
import {Department, User} from "@/app/types";

import FollowUpsModalForm from "../followUpsModelForm/followupsmodel";
import { useState } from "react";
import Modal from "@mui/joy/Modal";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FollowupModalForm from "../followUpsModelForm/followupsmodel";
import { useAuth } from "@/app/hooks/useAuth";
import { departmentnames } from "@/app/types";
import { Remarks,Remark } from "@/app/types";
import { editfollowupstatus } from "@/app/Reducers/editFolloupsstatusSlice";

interface DepartmentTable {
  departmentList:Remarks[];
}

export default function Followups(props: DepartmentTable) {
  const [userRemarks, setUserRemarks] = React.useState("");
  const [inputRemarks, setRemarkValue] = useState("");
  const [CreatedBy, setCreatedBy] = useState("");
  const [UpdatedBy, setUpdatedBy] = useState("");
  const auth = useAuth();

  const methods = useForm({
    reValidateMode: "onChange",
  });

  const [open, setOpen] = React.useState<boolean>(false);
  const [label, setLabel] = React.useState<string>("");
  // const [rows, setRows] = React.useState();
  const [selectedStatus, setSelectedStatus] = useState<string>("New");
  const [selectedRemark, setSelectedRemark] = useState<Remark>();

  const [departmentRemarks, setDepartmentRemark] = React.useState([
    {
      departments: {
        id: 1,
        createdAt: "2024-04-20T08:20:59.096Z",
        updatedAt: "2024-04-20T08:20:59.096Z",
        departmentName: "CHP",
        remarks: [
          {
            id: 1,
            createdAt: "2024-04-29T10:43:38.583Z",
            updatedAt: "2024-04-29T10:43:38.583Z",
            createdBy: 1,
            departmentId: 1,
            remarks: "Power shutdown",
            status: "Active",
            updatedBy: 2,
            createdUser: {
              userName: "Moses",
            },
            updatedUser: {
              userName: "Bharani1",
            },
          },
        ],
      },
    },
  ]);
  const [remarksDepartment, setRemarksDepartment] = React.useState(0);
  const [DepartmentOnly, setDepartmentOnly] = React.useState([
    {
      id: 278,
      createdAt: "2024-05-07T06:58:04.000Z",
      updatedAt: "2024-05-07T06:58:04.000Z",
      userId: 60,
      departmentId: 1,
      permissionId: 3,
      sheetId: 1,
      shiftId: 4,
      departments: {
        departmentName: "CHP",
      },
    },
  ]);
  const [departmentList, setDepartmentList] = React.useState([
    {
      id: 1,
      departmentName: "CHP",
    },
  ]);

  const [department, setDepartment] = React.useState([
    {
      id: 1,
      createdAt: "2024-04-20T08:20:59.096Z",
      updatedAt: "2024-04-20T08:20:59.096Z",
      departmentName: "CHP",
    },
  ]);
  const handleChange = async (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setRemarksDepartment(parseInt(newValue ? newValue : "0"));
  };

  const logintype = useSelector((state: RootState) => state?.user.data);

  const getDepartmentsByUser = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/joballocation/get-user-departments?userId=${logintype.data.id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user details: " + response.statusText);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const getDepartmentsOnly = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/joballocation/getdept?userId=${logintype.data.id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user details: " + response.statusText);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const savedepartmentRemarks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/remarks/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
        body: JSON.stringify({
          departmentId: remarksDepartment,
          remarks: userRemarks,
          createdBy: logintype.data.id,
          status: "New",
          updatedBy: logintype.data.id,
        }),
      });
      if (response.ok) {
        toast.success("Follow Up created successfully");
        // window.location.reload();
      }
      if (!response.ok) {
        toast.info("Failed to create");
        throw new Error("Failed to fetch user details: " + response.statusText);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getDepartment = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/departments/get`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details: " + response.statusText);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const handleEditClick = (remarks: Remark) => {
    setOpen(true);
    setSelectedRemark(remarks);
  };
  const handleRemarkChange = (value: string) => {
    setRemarkValue(value);
  };
  const handleFormSubmit = (value: any) => {
    // You can do something with the value received from the child component here
    // console.log("Value received from child:", value);
  };

  const followUpHeader = [
    "Department",
    "CreatedAt",
    "UpdatedAt",
    "CreatedBy",
    "UpdatedBy",
    "Remarks",
    "Status",
    
  ];

  const followUpRow = props.departmentList?.map((dep) =>
    dep?.departments?.remarks.length > 0 ? (
      dep.departments.remarks.map((rem) => (
        <tr key={`document_id_${rem.id}`}>
          <td>
            <Typography level="body-xs">{rem.id}</Typography>
          </td>
          <td>
            <Typography level="body-xs">{dep.departments.departmentName}</Typography>
          </td>
          <td>
            <Typography level="body-xs">{rem.createdAt}</Typography>
          </td>
          <td>
            <Typography level="body-xs">{rem.updatedAt}</Typography>
          </td>
          <td>
            <Typography level="body-xs">{rem.createdUser?.userName}</Typography>
          </td>
          <td>
            <Typography level="body-xs">{rem.updatedUser?.userName}</Typography>
          </td>
          <td>
            <Typography level="body-xs">{rem.remarks}</Typography>
          </td>
          <td>
            <Typography level="body-xs">{rem.status}</Typography>
          </td>
          <td>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box>
                <Button
                  slots={{ root: IconButton }}
                  slotProps={{
                    root: { variant: "plain", color: "neutral", size: "sm" },
                  }}
                >
                  <EditIcon onClick={() => handleEditClick(rem)} />
                </Button>
              </Box>
            </Box>
          </td>
        </tr>
      ))
    ) : (
      <tr key="no_data_found">
        <td colSpan={9}>No data found</td>
      </tr>
    )
  );
  

  React.useEffect(() => {
    const fetchRemarks = async () => {
      // let depRem = await getRemarksByUser()
      let department = await getDepartment();
      let departments = await getDepartmentsByUser();
      let departmentOnly = await getDepartmentsOnly();

      setDepartmentList(
        jmespath.search(
          departments.data,
          "[].departments.{id:id,departmentName:departmentName}"
        )
      );
      setDepartment(department.data);
      setDepartmentRemark(departments.data);
      setDepartmentOnly(departmentOnly.data);
    };

    fetchRemarks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editfollowupstatus]);

  return (
    <React.Fragment>
      <Stack direction={"row"} marginBottom={1}>
        <Typography level="h2">Follow Ups</Typography>
      </Stack>

      <Box component={"div"} sx={{ width: "100%" }}>
        <ToastContainer />

        {/* <Typography level="title-sm" >Add New Remarks</Typography> */}
        <Stack gap={2} flexDirection={"row"}>
          <FormControl orientation="horizontal">
            <FormLabel>Department</FormLabel>
            <Select placeholder="Select a department" onChange={handleChange}>
              {DepartmentOnly.map((dep) => (
                <Option key={dep?.id} value={dep?.departmentId}>
                  {dep?.departments?.departmentName}
                </Option>
              ))}
            </Select>
          </FormControl>
          <FormControl orientation="horizontal">
            <FormLabel>Remarks</FormLabel>
            <Input
              value={userRemarks}
              onChange={(e) => {
                setUserRemarks(e.target.value);
              }}
            ></Input>
            <Button
              variant="solid"
              sx={{ ml: 2 }}
              onClick={(e) => {
                savedepartmentRemarks();
              }}
            >
              Add New Remarks
            </Button>
          </FormControl>
        </Stack>
      </Box>

      <TableSection tableHeaders={followUpHeader} tableRows={followUpRow} action={true}/>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => {
          setOpen(false), methods.reset();
        }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <FollowupModalForm
          setOpen={setOpen}
          onFormSubmit={handleFormSubmit}
          selectedRemark={selectedRemark}
        />
      </Modal>
    </React.Fragment>
  );
}
