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
import { useAuth } from "@/app/hooks/useAuth";

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

export default function JoballocationLists(props:any) {
  const [listItems, setlistItems] = React.useState([]);

  const [order, setOrder] = React.useState<Order>("desc");


  
  // const data = await getData()
  const auth = useAuth();
  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/users/get`,
          // const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/users/get`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer "  + auth,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch user details: " + response.statusText
          );
        }

        const data = await response.json();
        console.log(data);
        setlistItems(data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getData();
  }, []);
  const jobs = React.useCallback((listItem: any) => {
    props.setListsec(true);
    props.setSelectedRow(listItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <>
      {props.listsec === false && (
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
                      <Box component={'div'}>
                        <Typography fontWeight={600} gutterBottom>
                          {listItem.name}
                        </Typography>
      
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1,}}>
                          <Button onClick={()=>jobs(listItem)}> Allocate Job</Button>
                        </Box>
                      </Box>
                      <Chip
                variant="soft"
                size="sm"
                startDecorator={
                  listItem?.statusMaster?.statusName === "ACTIVE" ? (
                    <CheckRoundedIcon />
                  ) : listItem?.statusMaster?.statusName === "PENDING" ? (
                    <AutorenewRoundedIcon />
                  ) : (
                    <BlockIcon />
                  )
                }
                color={
                  listItem?.statusMaster?.statusName === "ACTIVE"
                    ? "success"
                    : listItem?.statusMaster?.statusName === "PENDING"
                    ? "neutral"
                    : "danger"
                }
              >
                {listItem?.statusMaster?.statusName}
                      </Chip>
                    </ListItemContent>
                  </ListItem>
                  <ListDivider />
                </List>
              ))
            }
        </Box>
      )}
    </>
  );
}
