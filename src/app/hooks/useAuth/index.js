"use client" ;
import React from "react";
//import Cookies from "universal-cookie";
//import { verifyJwtToken } from "@/libs/auth";

export function useAuth() {
  const [auth, setAuth] = React.useState(localStorage.getItem('accessToken'));

  const getVerifiedtoken = async () => {
   // const cookies = new Cookies();
   const token = localStorage.getItem("accessToken") ?? null;
    //const verifiedToken = await verifyJwtToken(token);
    setAuth(token);
  };
  React.useEffect(() => {
    getVerifiedtoken();
  }, []);
  return auth;
}