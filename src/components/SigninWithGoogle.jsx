import React from "react";
import { Button } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function SigninWithGoogle({ setShowLoading }) {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setShowLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user document exists
      const userDocRef = doc(db, "Users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If user doesn't exist, create new document
        await setDoc(userDocRef, {
          email: user.email,
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
          photo: user.photoURL || "",
          createdAt: new Date().toISOString(),
        });
      }

      // Navigate to dashboard after successful sign-in
      setTimeout(() => {
        setShowLoading(false);
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      setShowLoading(false);
      console.error("Error signing in with Google:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <Button
      startIcon={<GoogleIcon sx={{ color: "#339961" }} />}
      variant="contained"
      fullWidth
      onClick={handleGoogleSignIn}
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
