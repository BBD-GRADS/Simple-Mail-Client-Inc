import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import AWSConfig from "./aws-exports";
import { Home } from "./scenes/home";

import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import { Login } from "./scenes/login";
import { getEmailMailbox } from "./resolvers/getEmail";

function App({ signOut, user }) {
  return <Home logoutFunction={signOut} user={user} />;
}
Amplify.configure(AWSConfig);

const formFields = {
  signUp: {
    email: {
      label: "Backup email",
      placeholder: "Enter your backup email",
      required: true,
      type: "email",
    },
  },
};

export default function AppWrapper() {
  return (
    <Authenticator formFields={formFields} signUpAttributes={["username"]}>
      {({ signOut, user }) => <App signOut={signOut} user={user} />}
    </Authenticator>
  );
}
