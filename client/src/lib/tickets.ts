import { Ticket } from "@shared/schema";

const TICKETS_KEY = "ticketapp_tickets";

export interface StoredTicket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export function getTickets(userId?: string): StoredTicket[] {
  const ticketsData = localStorage.getItem(TICKETS_KEY);
  if (!ticketsData) return [];
  try {
    const allTickets = JSON.parse(ticketsData);
    if (userId) {
      return allTickets.filter((t: StoredTicket) => t.userId === userId);
    }
    return allTickets;
  } catch {
    return [];
  }
}

function saveTickets(tickets: StoredTicket[]): void {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export function createTicket(
  title: string,
  description: string,
  status: "open" | "in_progress" | "closed",
  priority: "low" | "medium" | "high",
  userId: string
): StoredTicket {
  const tickets = getTickets();
  const newTicket: StoredTicket = {
    id: crypto.randomUUID(),
    title,
    description,
    status,
    priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId,
  };

  tickets.push(newTicket);
  saveTickets(tickets);
  return newTicket;
}

export function updateTicket(
  id: string,
  updates: Partial<Omit<StoredTicket, "id" | "userId" | "createdAt">>
): StoredTicket {
  const tickets = getTickets();
  const index = tickets.findIndex(t => t.id === id);
  
  if (index === -1) {
    throw new Error("Ticket not found");
  }

  const updatedTicket = {
    ...tickets[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  tickets[index] = updatedTicket;
  saveTickets(tickets);
  return updatedTicket;
}

export function deleteTicket(id: string): void {
  const tickets = getTickets();
  const filteredTickets = tickets.filter(t => t.id !== id);
  saveTickets(filteredTickets);
}
