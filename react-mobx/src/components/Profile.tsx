import React from "react";
import { useStore } from "../stores/StoreHelper";
import { useObserver } from "mobx-react";
import { Grid } from "@material-ui/core";

const Profile = () => {
  const store = useStore();
  return useObserver(() => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {store.user?.email}
      </Grid>
      <Grid item xs={12}>
        {store.user?.displayName}
      </Grid>
      <Grid item xs={12}>
        <img src={store.user?.photoURL ?? ""} />
      </Grid>
    </Grid>
  ));
};

export default Profile;
