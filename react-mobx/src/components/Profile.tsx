import React from "react";
import { useStore } from "../stores/StoreHelper";
import { useObserver } from "mobx-react";
import { Grid, List, ListItem } from "@material-ui/core";
import firebase from "firebase/app";


const Profile = () => {
  const store = useStore();
  return useObserver(() => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {store.user?.email}
      </Grid>
      <Grid item xs={12}>
        名前
        {store.user?.displayName}
      </Grid>
      <Grid item xs={12}>
        画像
        <img src={store.user?.photoURL ?? ""} alt="ユーザ画像" />
      </Grid>

      <List component="nav" aria-label="secondary mailbox folders">
        {((store.user?.providerData ?? []) as firebase.UserInfo[]).map(
          (p, index) => (
            <ListItem key={index}>
              {p.providerId}: {p.displayName}
            </ListItem>
          )
        )}
      </List>
    </Grid>
  ));
};

export default Profile;
