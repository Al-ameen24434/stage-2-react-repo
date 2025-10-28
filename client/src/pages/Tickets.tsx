import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatusBadge } from "@/components/StatusBadge";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getTickets, createTicket, updateTicket, deleteTicket, StoredTicket } from "@/lib/tickets";
import { Plus, Edit2, Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";

function TicketsContent() {
  const { session } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<StoredTicket[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<StoredTicket | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open" as "open" | "in_progress" | "closed",
    priority: "medium" as "low" | "medium" | "high",
  });
  const [formErrors, setFormErrors] = useState<{ title?: string; description?: string }>({});

  const loadTickets = () => {
    if (session) {
      const userTickets = getTickets(session.user.id);
      setTickets(userTickets);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [session]);

  const validateForm = () => {
    const errors: { title?: string; description?: string } = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateTicket = () => {
    if (!validateForm() || !session) return;

    try {
      createTicket(
        formData.title,
        formData.description,
        formData.status,
        formData.priority,
        session.user.id
      );
      toast({
        title: "Ticket created",
        description: "Your ticket has been created successfully.",
      });
      setIsCreateDialogOpen(false);
      setFormData({ title: "", description: "", status: "open", priority: "medium" });
      setFormErrors({});
      loadTickets();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create ticket",
      });
    }
  };

  const handleUpdateTicket = () => {
    if (!validateForm() || !selectedTicket) return;

    try {
      updateTicket(selectedTicket.id, {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
      });
      toast({
        title: "Ticket updated",
        description: "Your ticket has been updated successfully.",
      });
      setIsEditDialogOpen(false);
      setSelectedTicket(null);
      setFormData({ title: "", description: "", status: "open", priority: "medium" });
      setFormErrors({});
      loadTickets();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update ticket",
      });
    }
  };

  const handleDeleteTicket = () => {
    if (!selectedTicket) return;

    try {
      deleteTicket(selectedTicket.id);
      toast({
        title: "Ticket deleted",
        description: "Your ticket has been deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
      setSelectedTicket(null);
      loadTickets();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete ticket",
      });
    }
  };

  const openEditDialog = (ticket: StoredTicket) => {
    setSelectedTicket(ticket);
    setFormData({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (ticket: StoredTicket) => {
    setSelectedTicket(ticket);
    setIsDeleteDialogOpen(true);
  };

  const openCreateDialog = () => {
    setFormData({ title: "", description: "", status: "open", priority: "medium" });
    setFormErrors({});
    setIsCreateDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold mb-2" data-testid="text-tickets-title">
                Tickets
              </h1>
              <p className="text-muted-foreground" data-testid="text-tickets-description">
                Manage and track all your support tickets
              </p>
            </div>
            <Button 
              onClick={openCreateDialog} 
              className="hover-elevate active-elevate-2"
              data-testid="button-create-ticket"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {tickets.length === 0 ? (
              <Card data-testid="card-empty-state">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">No tickets yet. Create your first ticket to get started.</p>
                  <Button onClick={openCreateDialog} variant="outline" className="hover-elevate active-elevate-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Ticket
                  </Button>
                </CardContent>
              </Card>
            ) : (
              tickets.map((ticket) => (
                <Card key={ticket.id} className="hover-elevate transition-all duration-200" data-testid={`card-ticket-${ticket.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg" data-testid={`text-ticket-title-${ticket.id}`}>
                            {ticket.title}
                          </CardTitle>
                          <StatusBadge status={ticket.status} />
                        </div>
                        <CardDescription data-testid={`text-ticket-description-${ticket.id}`}>
                          {ticket.description}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(ticket)}
                          className="hover-elevate active-elevate-2"
                          data-testid={`button-edit-${ticket.id}`}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(ticket)}
                          className="hover-elevate active-elevate-2 text-destructive"
                          data-testid={`button-delete-${ticket.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span data-testid={`text-ticket-date-${ticket.id}`}>
                          {format(new Date(ticket.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Priority:</span>
                        <span className="capitalize" data-testid={`text-ticket-priority-${ticket.id}`}>
                          {ticket.priority}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Create Ticket Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent data-testid="dialog-create-ticket">
          <DialogHeader>
            <DialogTitle>Create New Ticket</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new support ticket.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="create-title">Title</Label>
              <Input
                id="create-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief description of the issue"
                className={formErrors.title ? "border-destructive" : ""}
                data-testid="input-create-title"
              />
              {formErrors.title && (
                <p className="text-sm text-destructive" data-testid="error-create-title">
                  {formErrors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-description">Description</Label>
              <Textarea
                id="create-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed description of the issue"
                rows={4}
                className={formErrors.description ? "border-destructive" : ""}
                data-testid="input-create-description"
              />
              {formErrors.description && (
                <p className="text-sm text-destructive" data-testid="error-create-description">
                  {formErrors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="create-status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                >
                  <SelectTrigger id="create-status" data-testid="select-create-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value as any })}
                >
                  <SelectTrigger id="create-priority" data-testid="select-create-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              className="hover-elevate active-elevate-2"
              data-testid="button-cancel-create"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateTicket} 
              className="hover-elevate active-elevate-2"
              data-testid="button-confirm-create"
            >
              Create Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Ticket Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent data-testid="dialog-edit-ticket">
          <DialogHeader>
            <DialogTitle>Edit Ticket</DialogTitle>
            <DialogDescription>
              Update the ticket details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={formErrors.title ? "border-destructive" : ""}
                data-testid="input-edit-title"
              />
              {formErrors.title && (
                <p className="text-sm text-destructive" data-testid="error-edit-title">
                  {formErrors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className={formErrors.description ? "border-destructive" : ""}
                data-testid="input-edit-description"
              />
              {formErrors.description && (
                <p className="text-sm text-destructive" data-testid="error-edit-description">
                  {formErrors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                >
                  <SelectTrigger id="edit-status" data-testid="select-edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value as any })}
                >
                  <SelectTrigger id="edit-priority" data-testid="select-edit-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="hover-elevate active-elevate-2"
              data-testid="button-cancel-edit"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateTicket} 
              className="hover-elevate active-elevate-2"
              data-testid="button-confirm-edit"
            >
              Update Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent data-testid="dialog-delete-ticket">
          <DialogHeader>
            <DialogTitle>Delete Ticket</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this ticket? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="hover-elevate active-elevate-2"
              data-testid="button-cancel-delete"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteTicket}
              className="hover-elevate active-elevate-2"
              data-testid="button-confirm-delete"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

export default function Tickets() {
  return (
    <ProtectedRoute>
      <TicketsContent />
    </ProtectedRoute>
  );
}
