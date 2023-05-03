import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, RouteProps } from 'react-router-dom';
import { Home } from "./components/Home"
import { RecipeChoice } from './components/RecipeChoice';
import { RecipeList } from './components/RecipeList';
import { RecipeForm } from './components/RecipeForm';
import { RecipeDetail } from './components/RecipeDetail';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { getCurrentUser } from './lib/api/auth';
import { User } from "./types/UserType"
import { CommonLayout } from './layouts/CommonLayout';

// グローバルで扱う変数・関数
export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      // localStorageからトークンを取得する
      const token = localStorage.getItem('token');
      if (token) {
        const res = await getCurrentUser();
        if (res?.data.isLogin === true) {
          setIsSignedIn(true);
          setCurrentUser(res?.data.data);
          console.log(res?.data.data);
        } else {
          console.log("No current user");
        }
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [])

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
        <CommonLayout>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/new" element={<RecipeForm />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes/:id/edit" element={<RecipeForm />} />
          </Routes>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
