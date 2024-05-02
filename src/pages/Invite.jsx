import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../services/AuthReq";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useCustomGetQuery } from "../services/playmaker";

const Invite = () => {
  const { inviteString } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // check if user is logged in
  async function userLoggedIn() {
    if (!localStorage.getItem("user")) {
      console.log("USER AUTH FAILED");
      return false;
    } else if ((await getUser(localStorage.getItem("user"))) === false) {
      return false;
    }
    return true;
  }
  useEffect(() => {
    const checkUser = async () => {
      setIsLoggedIn(await userLoggedIn());
    };
    checkUser();
  }, []);

  const { data: tournament } = useCustomGetQuery(
    `/linked-tournament/${inviteString}`
  );
  console.log(tournament);
  return (
    <div>
      {/*when user is logged in*/}
      {isLoggedIn ? (
        /*if tournament data is available*/
        tournament && tournament.data ? (
          tournament && tournament.data.name
        ) : (
          /* if tournament data is not available*/
          "invalid link"
        )
      ) : (
        /*when user is not logged in*/
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Sign Up</TabsTrigger>
            <TabsTrigger value="password">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Sign Up</TabsContent>
          <TabsContent value="password">Login</TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Invite;
