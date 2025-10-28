import { User } from "@shared/schema";

const SESSION_KEY = "ticketapp_session";
const USERS_KEY = "ticketapp_users";

export interface AuthSession {
  user: User;
  token: string;
}

export interface StoredUser {
  id: string;
  email: string;
  password: string;
  name: string;
}

export function getSession(): AuthSession | null {
  const sessionData = localStorage.getItem(SESSION_KEY);
  if (!sessionData) return null;
  try {
    return JSON.parse(sessionData);
  } catch {
    return null;
  }
}

export function setSession(session: AuthSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getUsers(): StoredUser[] {
  const usersData = localStorage.getItem(USERS_KEY);
  if (!usersData) return [];
  try {
    return JSON.parse(usersData);
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(email: string, password: string, name: string): StoredUser {
  const users = getUsers();
  
  if (users.find(u => u.email === email)) {
    throw new Error("User with this email already exists");
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    email,
    password,
    name,
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function loginUser(email: string, password: string): AuthSession {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const session: AuthSession = {
    user: {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
    },
    token: crypto.randomUUID(),
  };

  setSession(session);
  return session;
}
