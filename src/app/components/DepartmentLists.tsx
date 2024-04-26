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
export default function DepartmentLists(props: any) {
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
    try {
      // const userData = Object.fromEntries();

      dispatch(deletedepartment(id)).then(() => {
        router.push("/departmentlist");
      });
    } catch (error) {
      console.error("Failed to Delete user:", error);
      // Handle error (e.g., display error message)
    }
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `http://51.79.147.139:3000/departments/get`,
          {
            // const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/departments/get`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch department details: " + response.statusText
          );
        }

        const data = await response.json();

        setlistItems(data.data);
      } catch (error) {
        console.error("Error fetching department details:", error);
      }
    };

    getData();
  }, [createdepartment, deletedepartments, editdepartment]);

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      {listItems &&
        listItems.map((listItem: any) => (
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
                <div>
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
                </div>
              </ListItemContent>
            </ListItem>
            <ListDivider />
          </List>
        ))}
      <Box
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
      </Box>
    </Box>
  );
}
