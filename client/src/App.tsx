import { Switch, Route, Redirect } from "wouter";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import BoardView from "@/pages/BoardView";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component, ...rest }: any) {
  const { user, loading } = useAuth();

  if (loading) return null; // Or a loader

  return user ? <Component {...rest} /> : <Redirect to="/login" />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={() => <Redirect to="/dashboard" />} />
      <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/board/:id">
        {(params) => (
          <ProtectedRoute component={BoardView} />
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
