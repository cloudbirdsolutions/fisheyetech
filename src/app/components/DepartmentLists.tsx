"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Box from "@mui/joy/Box";
import Avatar from "@mui/joy/Avatar";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import RowMenu from "./RowMenu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import { useRouter } from "next/navigation";
import { deletedepartment } from "../Reducers/DeleteDepartmentSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {stableSort, getComparator} from '@/app/helper/sorting';
import { useAuth } from "../hooks/useAuth";


type Order = "asc" | "desc";

export default function DepartmentLists(props: any) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [listItems, setlistItems] = React.useState([]);
  const createdepartment = useSelector(
    (state: any) => state?.createdepartments?.data
  );
  const deletedepartments = useSelector(
    (state: any) => state?.deletedepartments?.data
  );
  const editdepartment = useSelector(
    (state: any) => state?.editdepartments?.data
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const HandleDeleteFunction = (id: any) => {
      dispatch(deletedepartment(id)).then((res) => {
        res.payload.statusCode == 200 ? (
          toast.success(res.payload.message),
        router.push("/departmentlist")
        ) : (
          toast.error(res.payload.message)
        )
      });
  };
  const auth = useAuth();
  React.useEffect(() => {
    const getData = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/departments/get`,
          {
            // const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/departments/get`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer "  + auth,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message)
        }

        const data = await response.json();
        //toast.success(data.message)
        setlistItems(data.data);
      } 
    
    getData();
  }, [createdepartment, deletedepartments, editdepartment]);

  return (
    <>
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      {listItems &&
        stableSort(listItems, getComparator(order, "id")).map((listItem: any) => (
          <List
            key={listItem.id}
            size="sm"
            sx={{
              "--ListItem-paddingX": 0,
            }}
          >
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <ListItemContent
                sx={{ display: "flex", gap: 2, alignItems: "start" }}
              >
                <ListItemDecorator>
                  <Avatar size="sm">{listItem.id}</Avatar>
                </ListItemDecorator>
                <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 1,
                      mb: 1,
                      width:"100%"
                    }}
                  >
                  <Typography fontWeight={600} gutterBottom>
                    {listItem.departmentName}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <RowMenu
                      row={listItem}
                      open={props.open}
                      setOpen={props.setOpen}
                      label={props.label}
                      setRow={props.setRow}
                      setLabel={props.setLabel}
                      parentFunction={HandleDeleteFunction}
                    />
                  </Box>
                </Box>
              </ListItemContent>
            </ListItem>
            <ListDivider />
          </List>
        ))}
      {/*<Box
        className="Pagination-mobile"
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          py: 2,
        }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography level="body-sm" mx="auto">
          Page 1 of 10
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>*/}
    </Box>
  </>
  );
}
