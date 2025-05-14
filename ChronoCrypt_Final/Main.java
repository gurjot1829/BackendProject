import java.io.*;
import java.util.*;

public class Main {
    static final String USER_FILE = "data/users_data.txt";
    static final String EVENT_FILE = "data/event_data.txt";
    static final String REPORT_FILE = "report/anomalies_report.txt";
    static String currentUser = null;
    static LinkedList<String> sessionLog = new LinkedList<>();

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.println("\n======= Welcome to ChronoCrypt =======");
            System.out.println("1. Register");
            System.out.println("2. Login");
            System.out.println("3. Exit");
            System.out.print("Choose an option: ");
            int choice = sc.nextInt(); sc.nextLine();

            switch (choice) {
                case 1:
                    registerUser(sc);
                    break;
                case 2:
                    if (loginUser(sc)) {
                        mainMenu(sc);
                    }
                    break;
                case 3:
                    System.out.println("Exiting ChronoCrypt.");
                    return;
                default:
                    System.out.println("Invalid choice.");
            }
        }
    }

    static void registerUser(Scanner sc) {
        System.out.println("\n--- Registration ---");
        System.out.print("Enter username: ");
        String username = sc.nextLine();
        System.out.print("Enter password: ");
        String password = sc.nextLine();
        System.out.print("Enter full name: ");
        String fullName = sc.nextLine();
        System.out.print("Enter email address: ");
        String email = sc.nextLine();
        System.out.print("Enter phone number: ");
        String phone = sc.nextLine();

        try {
            BufferedReader reader = new BufferedReader(new FileReader(USER_FILE));
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts[0].equals(username)) {
                    System.out.println("Username already exists.");
                    reader.close();
                    return;
                }
            }
            reader.close();

            BufferedWriter writer = new BufferedWriter(new FileWriter(USER_FILE, true));
            writer.write(username + "," + password + "," + fullName + "," + email + "," + phone);
            writer.newLine();
            writer.close();
            System.out.println("Registration successful!");
        } catch (IOException e) {
            System.out.println("Error registering user.");
        }
    }

    static boolean loginUser(Scanner sc) {
        System.out.println("\n--- Login ---");
        System.out.print("Enter username: ");
        String username = sc.nextLine();
        System.out.print("Enter password: ");
        String password = sc.nextLine();

        try (BufferedReader reader = new BufferedReader(new FileReader(USER_FILE))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length >= 2 && parts[0].equals(username) && parts[1].equals(password)) {
                    currentUser = username;
                    System.out.println("\nLogin successful!");
                    System.out.println("Name  : " + parts[2]);
                    System.out.println("Email : " + parts[3]);
                    System.out.println("Phone : " + parts[4]);
                    sessionLog.add("Login: " + username);
                    return true;
                }
            }
        } catch (IOException e) {
            System.out.println("Error logging in.");
        }

        System.out.println("Invalid credentials.");
        return false;
    }

    static void mainMenu(Scanner sc) {
        while (true) {
            System.out.println("\n--- Main Menu ---");
            System.out.println("1. Load Events");
            System.out.println("2. Show Correlation Chains");
            System.out.println("3. Run Anomaly Detection");
            System.out.println("4. Logout");
            System.out.print("Select option: ");
            int opt = sc.nextInt(); sc.nextLine();

            switch (opt) {
                case 1:
                    EventManager.loadEvents();
                    break;
                case 2:
                    EventManager.showCorrelationChain();
                    break;
                case 3:
                    EventManager.detectAnomalies(currentUser);
                    break;
                case 4:
                    System.out.println("Logged out.");
                    sessionLog.add("Logout: " + currentUser);
                    currentUser = null;
                    System.out.println("Exiting ChronoCrypt.");
                    System.exit(0);
                    break;
                default:
                    System.out.println("Invalid option.");
            }
        }
    }
}
