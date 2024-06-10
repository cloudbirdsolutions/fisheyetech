"use client";
import * as React from "react";
import {
  Sheet,
  Input,
  IconButton,
  Modal,
  ModalDialog,
  Typography,
  ModalClose,
  Divider,
  Button,
  Box,
  FormControl,
  FormLabel,
  Table,
  Link,
  // Chip,
  // Select,
  // Option,
  // iconButtonClasses
} from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";

export const SearchComponent = () => {
  return (
    <>
      <Sheet variant="outlined" sx={{ borderRadius: "sm", width: "100%" }}>
        <Box
          className="SearchAndFilters-tabletUp"
          sx={{
            backgroundColor: "var(--joy-palette-primary-100)",
            borderRadius: "sm",
            px: 2,
            py: 2,
            display: { xs: "none", sm: "flex" },
            flexWrap: "wrap",
            gap: 1.5,
            "& > *": {
              minWidth: { xs: "120px", md: "160px" },
            },
          }}
        >
          <FormControl sx={{ flex: 1 }} size="sm">
            <FormLabel sx={{ fontSize: "12" }}>Search</FormLabel>
            <Input
              size="sm"
              placeholder="Search"
              startDecorator={<SearchIcon />}
            />
          </FormControl>
          {/* {renderFilters()} */}
        </Box>
      </Sheet>
    </>
  );
};
