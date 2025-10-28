import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthSession, getSession, clearSession } from "@/lib/auth";

interface AuthContextType {
  session: AuthSession | null;
  setSession: (session: AuthSession | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedSession = getSession();
    setSessionState(storedSession);
    setIsLoading(false);
  }, []);

  const setSession = (newSession: AuthSession | null) => {
    setSessionState(newSession);
  };

  const logout = () => {
    clearSession();
    setSessionState(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ session, setSession, logout, isAuthenticated: !!session }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
