import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import AWSConfig from "./aws-exports";
import { Home } from "./scenes/home";

Amplify.configure(AWSConfig);

function App({ signOut, user }) {
  return <Home logoutFunction={signOut} user={user} />;
}

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
