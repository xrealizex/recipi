import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

// とりあえず認証済みユーザーの名前やメールアドレスを表示
export const Home: React.FC = () => {
  const { loading, isSignedIn, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isSignedIn) {
      navigate("/signin");
    }
  }, [loading, isSignedIn, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <h1>Signed in successfully!</h1>
          <h2>Email: {currentUser?.email}</h2>
          <h2>Name: {currentUser?.name}</h2>
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
    </>
  );
};
