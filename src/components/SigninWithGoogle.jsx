// SigninWithGoogle.jsx
import React from "react";
import { Button } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export default function SigninWithGoogle() {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        // Save user info to Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          lastName: "", // Google doesn't provide last name separately
          photo: user.photoURL,
        });

        navigate("/profile");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      // Optionally, display an error message to the user
    }
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
        mt: 2,
        borderRadius: "12px",
        p: 1.5,
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "none",
        "&:hover": {
          bgcolor: "#333",
        },
      }}
      aria-label="Sign in with Google"
    >
      Continue with Google
    </Button>
  );
}
