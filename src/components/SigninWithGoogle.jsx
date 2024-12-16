import { Button } from "@mui/material";
import React from "react";
import { Google as GoogleIcon } from "@mui/icons-material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export default function SigninWithGoogle() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          lastName: "",
          photo: user.photoURL,
        });

        navigate("/profile");
      }
    });
  };
  return (
    <Button
      startIcon={<GoogleIcon sx={{ color: "#339961" }} />}
      variant="contained"
      fullWidth
      onClick={handleSubmit}
      sx={{
        bgcolor: "#000",
        color: "#FFF",
        marginTop: "10px",
        borderRadius: "12px",
        padding: "10px",
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "none",
      }}
    >
      Continue with Google
    </Button>
  );
}
