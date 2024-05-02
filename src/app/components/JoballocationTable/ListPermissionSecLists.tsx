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

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ListPermission from "./ListPermission";
import Button from "@mui/joy/Button/Button";
import { Chip } from "@mui/joy";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function ListPermissionSecLists(props:any) {


  return (
    <>
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
              {props.alljobs &&
              props.alljobs.map((alljob: any) => (
                <List
                  key={alljob.id}
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
                        <Avatar size="sm">{alljob?.id}</Avatar>
                      </ListItemDecorator>
                      <Box component={'div'}>
                        <Typography fontWeight={600} gutterBottom>
                          {alljob?.users?.userName}
                        </Typography>
                        <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 0.5,
                    mb: 1,
                    flexDirection: 'column'
                  }}
                >
                    <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 0.5,
                    mb: 1,
                  }}>
                      <Typography level="body-xs">&bull;</Typography>
                        <Typography level="body-xs">
                          {alljob?.departments?.departmentName}
                        </Typography>
                        <Typography level="body-xs">&bull;</Typography>
                        <Typography level="body-xs">
                                                    {alljob?.permissionType?.permissionType}
                        </Typography>
                    </Box>
                    <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 0.5,
                    mb: 1,
                  }}>
                        <Typography level="body-xs">&bull;</Typography>
                        <Typography level="body-xs">
                                                    {alljob?.sheetMaster?.sheetName}
                        </Typography>
                    </Box>
                      </Box>
                      </Box>
                    </ListItemContent>
                  </ListItem>
                  <ListDivider />
                </List>
              ))
            }
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
    </>
  );
}
