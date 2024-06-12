"use client";
import * as React from "react";
import {
  Sheet,
  Input,
  Box,
  FormControl,
  FormLabel,
} from "@mui/joy";
import {FilterItem} from "@/app/types"
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/joy/Typography";



interface SearchProps {
    filterItems?: FilterItem[];
}

export const SearchComponent = (props:SearchProps) => {

  const userFilterItem = [
      {
          searchLabel:"Search",
          placeholder:"Search",
          startDecoration: "none",
          handleChange:()=>{},

      }
  ]

  const renderFilterItem = props.filterItems? props.filterItems.map((filterItem)=>{
      return( <FormControl sx={{ flex: 1 }} size="sm" key={filterItem.searchLabel}>
          <FormLabel> <Typography level={'title-lg'}>{filterItem.searchLabel}</Typography></FormLabel>
          <Input
              size="sm"
              placeholder={filterItem.placeholder}
              startDecorator={filterItem.startDecoration}
          />
      </FormControl>)
  }) : <>No Search Filter</>

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
            {renderFilterItem}
          {/* {renderFilters()} */}
        </Box>
      </Sheet>
    </>
  );
};
