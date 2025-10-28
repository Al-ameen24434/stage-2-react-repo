import { registerUser } from "./auth";
import { createTicket } from "./tickets";

export function initializeTestData() {
  try {
    // Try to register test user (will fail if already exists)
    const testUser = registerUser("test@test.com", "123456", "Test User");
    
    // Create some sample tickets for the test user
    createTicket(
      "Unable to login to account",
      "I'm getting an error message when trying to log in. The error says 'Invalid credentials' even though I'm sure my password is correct.",
      "open",
      "high",
      testUser.id
    );

    createTicket(
      "Feature request: Dark mode",
      "Would love to have a dark mode option for the application. It would be great for working late at night.",
      "in_progress",
      "medium",
      testUser.id
    );

    createTicket(
      "Bug: Dashboard not loading",
      "Dashboard page is showing a blank screen after logging in. Tried refreshing but still having the same issue.",
      "open",
      "high",
      testUser.id
    );

    createTicket(
      "Question about billing",
      "I have a question about the pricing plans and what features are included in the pro tier.",
      "closed",
      "low",
      testUser.id
    );
  } catch (error) {
    // Test user already exists, which is fine
  }
}
