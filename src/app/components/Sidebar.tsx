"use client";
import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PeopleIcon from "@mui/icons-material/People";

import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import {
  useRouter,
  usePathname,
  useSelectedLayoutSegment,
} from "next/navigation";
import Link from "next/link";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BadgeIcon from "@mui/icons-material/Badge";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (href: any) => {
    return pathname === href ? true : false;
  };

  const logintype = useSelector((state: RootState) => state?.user?.data);

  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch({ type: "USER_LOGOUT" });
    //setuser('')
    router.push("/", { scroll: false });
  };
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "fixed" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
        backgroundColor: "primary.800",
        // color:'var(--joy-palette-common-white)'
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "primary.800",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography sx={{ color: "#ffffff" }} level="title-lg">
          Fisheyetech.
        </Typography>
        {/* <ColorSchemeToggle sx={{ ml: 'auto' }} /> */}
      </Box>
      <Input
        size="sm"
        startDecorator={<SearchRoundedIcon />}
        placeholder="Search"
      />
      <Divider sx={{ height: "1px", backgroundColor: "#ffffff" }} />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1,
          },
        }}
      >
        {logintype?.data?.roles?.roleName === "admin" && (
          <List
            size="sm"
            sx={{
              gap: 1,
              "--List-nestedInsetStart": "30px",
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
             
            }}
          >
              <ListItem>
              <Link href="/" className="w-full">
                <ListItemButton
                  sx={{
                    color: isActive("/") ? "#000000" : "#ffffff",
                    "&:hover": {
                      "& svg": {
                        color: "#000000",
                      },
                    },
                  }}
                  className={
                    isActive("/")
                      ? "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root Mui-selected"
                      : "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root"
                  }
                >
                  <HomeRoundedIcon
                    sx={{ color: isActive("/") ? "#000000" : "#ffffff" }}
                  />
                  <ListItemContent>Home</ListItemContent>
                </ListItemButton>
              </Link>
            </ListItem>


            <ListItem>
              <Link href="/dashboards" className="w-full">
                <ListItemButton
                  sx={{
                    color: isActive("/dashboards") ? "#000000" : "#ffffff",
                    "&:hover": {
                      "& svg": {
                        color: "#000000",
                      },
                    },
                  }}
                  className={
                    isActive("/dashboards")
                      ? "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root Mui-selected"
                      : "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root"
                  }
                >
                  <DashboardRoundedIcon
                    sx={{
                      color: isActive("/dashboards") ? "#000000" : "#ffffff",
                    }}
                  />
                  <ListItemContent>Dashboard</ListItemContent>
                </ListItemButton>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="/users" className="w-full">
                <ListItemButton
                  sx={{
                    color: isActive("/users") ? "#000000" : "#ffffff",
                    "&:hover": {
                      "& svg": {
                        color: "#000000",
                      },
                    },
                  }}
                  className={
                    isActive("/users")
                      ? "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root Mui-selected"
                      : "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root"
                  }
                >
                  <PeopleIcon
                    sx={{
                      color: isActive("/users") ? "#000000" : "#ffffff",
                    }}
                  />
                  <ListItemContent>users</ListItemContent>
                </ListItemButton>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="/departmentlist" className="w-full">
                <ListItemButton
                  sx={{
                    color: isActive("/departmentlist") ? "#000000" : "#ffffff",
                    "&:hover": {
                      "& svg": {
                        color: "#000000",
                      },
                    },
                  }}
                  className={
                    isActive("/departmentlist")
                      ? "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root Mui-selected"
                      : "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root"
                  }
                >
                  <ApartmentIcon
                    sx={{
                      color: isActive("/departmentlist") ? "#000000" : "#ffffff",
                    }}
                  />
                  <ListItemContent>Department Lists</ListItemContent>
                </ListItemButton>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="/entities" className="w-full">
                <ListItemButton
                  sx={{
                    color: isActive("/entities") ? "#000000" : "#ffffff",
                    "&:hover": {
                      "& svg": {
                        color: "#000000",
                      },
                    },
                  }}
                  className={
                    isActive("/entities")
                      ? "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root Mui-selected"
                      : "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root"
                  }
                >
                  <HomeRoundedIcon
                    sx={{ color: isActive("/entities") ? "#000000" : "#ffffff" }}
                  />
                  <ListItemContent>Entities</ListItemContent>
                </ListItemButton>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="/rolelist" className="w-full">
                <ListItemButton
                  sx={{
                    color: isActive("/rolelist") ? "#000000" : "#ffffff",
                    "&:hover": {
                      "& svg": {
                        color: "#000000",
                      },
                    },
                  }}
                  className={
                    isActive("/rolelist")
                      ? "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root Mui-selected"
                      : "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root"
                  }
                >
                  <HomeRoundedIcon
                    sx={{ color: isActive("/rolelist") ? "#000000" : "#ffffff" }}
                  />
                  <ListItemContent>Role List</ListItemContent>
                </ListItemButton>
              </Link>
            </ListItem>


            <ListItem>
              <Link href="/joballocation" className="w-full">
                <ListItemButton
                  sx={{
                    color: isActive("/joballocation") ? "#000000" : "#ffffff",
                    "&:hover": {
                      "& svg": {
                        color: "#000000",
                      },
                    },
                  }}
                  className={
                    isActive("/joballocation")
                      ? "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root Mui-selected"
                      : "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root"
                  }
                >
                  <HomeRoundedIcon
                    sx={{ color: isActive("/joballocation") ? "#000000" : "#ffffff" }}
                  />
                  <ListItemContent>Job location</ListItemContent>
                </ListItemButton>
              </Link>
            </ListItem>



            <ListItem>
              <Link href="/tasks" className="w-full">
                <ListItemButton
                  sx={{
                    color: isActive("/tasks") ? "#000000" : "#ffffff",
                    "&:hover": {
                      "& svg": {
                        color: "#000000",
                      },
                    },
                  }}
                  className={
                    isActive("/tasks")
                      ? "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root Mui-selected"
                      : "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root"
                  }
                >
                  <HomeRoundedIcon
                    sx={{ color: isActive("/tasks") ? "#000000" : "#ffffff" }}
                  />
                  <ListItemContent>Tasks</ListItemContent>
                </ListItemButton>
              </Link>
            </ListItem>

            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton sx={{
                    color: "#ffffff",
                    "&:hover": {
                      "& svg": {
                        color: "#000000",
                      },
                    },
                  }}
                   onClick={() => setOpen(!open)}>
                    <AssignmentRoundedIcon sx={{ color: "#ffffff" }} />
                    <ListItemContent>
                      Reviews
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={{ transform: open ? "rotate(180deg)" : "none", color: "#ffffff" }}
                    />
                  </ListItemButton>
                )}
              >
                <List sx={{ gap: 0.5 }}>
                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton sx={{color:'#FFFFFF'}}>All Reviews</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton sx={{color:'#FFFFFF'}}>Backlog</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton sx={{color:'#FFFFFF'}}>In progress</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton sx={{color:'#FFFFFF'}}>Done</ListItemButton>
                  </ListItem>
                </List>
              </Toggler>
            </ListItem>

            <ListItem>
              <Link href="/messages" className="w-full">
                <ListItemButton
                  sx={{
                    color: isActive("/messages") ? "#000000" : "#ffffff",
                    "&:hover": {
                      "& svg": {
                        color: "#000000",
                      },
                    },
                  }}
                  className={
                    isActive("/messages")
                      ? "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root Mui-selected"
                      : "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root"
                  }
                >
                  <QuestionAnswerRoundedIcon
                    sx={{ color: isActive("/messages") ? "#000000" : "#ffffff" }}
                  />
                  <ListItemContent>Comments</ListItemContent>
                  <Chip size="sm" color="primary" variant="solid">
                  4
                </Chip>
                </ListItemButton>
              </Link>
            </ListItem>

            

            {/* <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Users</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/users/profiles"
                  >
                    My profile
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Create a new user</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Roles & permission</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem> */}
          </List>
        )}
        {logintype?.data?.roles?.roleName !== "admin" && (
          <List
            size="sm"
            sx={{
              gap: 1,
              "--List-nestedInsetStart": "30px",
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
            }}
          >
            <ListItem>
              <Link href="/" className="w-full">
                <ListItemButton
                  sx={{
                    color: isActive("/") ? "#000000" : "#ffffff",
                    "&:hover": {
                      "& svg": {
                        color: "#000000",
                      },
                    },
                  }}
                  className={
                    isActive("/")
                      ? "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root Mui-selected"
                      : "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root"
                  }
                >
                  <HomeRoundedIcon
                    sx={{ color: isActive("/") ? "#000000" : "#ffffff" }}
                  />
                  <ListItemContent>Home</ListItemContent>
                </ListItemButton>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="/dashboards" className="w-full">
                <ListItemButton
                  sx={{
                    color: isActive("/dashboards") ? "#000000" : "#ffffff",
                    "&:hover": {
                      "& svg": {
                        color: "#000000",
                      },
                    },
                  }}
                  className={
                    isActive("/dashboards")
                      ? "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root Mui-selected"
                      : "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root"
                  }
                >
                  <DashboardRoundedIcon
                    sx={{
                      color: isActive("/dashboards") ? "#000000" : "#ffffff",
                    }}
                  />
                  <ListItemContent>Dashboard</ListItemContent>
                </ListItemButton>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="/tasks/" className="w-full">
                <ListItemButton
                  sx={{
                    color: isActive("/tasks/") ? "#000000" : "#ffffff",
                    "&:hover": {
                      "& svg": {
                        color: "#000000",
                      },
                    },
                  }}
                  className={
                    isActive("/tasks/")
                      ? "MuiListItemButton-root MuiListItemButton-colorPrimary50 MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root Mui-selected"
                      : "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root"
                  }
                >
                  <PendingActionsIcon
                    sx={{ color: isActive("/tasks/") ? "#000000" : "#ffffff" }}
                  />
                  <ListItemContent>Tasks</ListItemContent>
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        )}
        <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          <ListItem>
            <Link href="/settings" className="w-full">
              <ListItemButton
                sx={{
                  color: isActive("/settings") ? "#000000" : "#ffffff",
                  "&:hover": {
                    "& svg": {
                      color: "#000000",
                    },
                  },
                }}
                className={
                  isActive("/settings")
                    ? "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root Mui-selected"
                    : "MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-1xphdof-JoyListItemButton-root"
                }
              >
                <SettingsRoundedIcon
                  sx={{ color: isActive("/settings") ? "#000000" : "#ffffff" }}
                />
                <ListItemContent>Settings</ListItemContent>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Box>
      <Divider sx={{ height: "1px", backgroundColor: "#ffffff" }} />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography sx={{ color: "#FFFFFF" }} level="title-sm">
            {logintype && logintype?.data?.name}
          </Typography>
          <Typography sx={{ color: "#FFFFFF" }} level="body-xs">
            {logintype?.data?.phone}
          </Typography>
        </Box>
        <IconButton
          size="sm"
          variant="plain"
          sx={{
            "&:hover": {
              "& svg": {
                color: "#000000",
              },
            },
          }}
        >
          <LogoutRoundedIcon
            sx={{ color: "background.body" }}
            onClick={handleLogout}
          />
        </IconButton>
      </Box>
    </Sheet>
  );
}
