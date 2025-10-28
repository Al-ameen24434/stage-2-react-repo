import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "open" | "in_progress" | "closed";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    open: "bg-ticket-open-bg text-ticket-open-text border-ticket-open-border",
    in_progress: "bg-ticket-in_progress-bg text-ticket-in_progress-text border-ticket-in_progress-border",
    closed: "bg-ticket-closed-bg text-ticket-closed-text border-ticket-closed-border",
  };

  const labels = {
    open: "Open",
    in_progress: "In Progress",
    closed: "Closed",
  };

  return (
    <Badge 
      variant="outline" 
      className={`${styles[status]} border no-default-hover-elevate no-default-active-elevate`}
      data-testid={`badge-status-${status}`}
    >
      {labels[status]}
    </Badge>
  );
}
