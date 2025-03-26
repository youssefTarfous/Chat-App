import ThemeToggle from "./components/ThemeToggle";
import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { useAuthGoogle } from "./hooks/useLogin";
function App() {
  const { data, isLoading, isError, error } = useAuthGoogle();
  return (
    <>
      <Layout>
        <ThemeToggle />
        <h1 className="text-3xl font-bold bg-accent dark:bg-accent-content">
          Hello world!
        </h1>
        <div>
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error: {error?.message}</div>}
          {data?.user ? `Hello ${data.user.name}` : "Not logged in"}
        </div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
