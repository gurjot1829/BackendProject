import java.io.*;
import java.util.*;

public class EventManager {
    static Queue<String> eventQueue = new LinkedList<>();
    static List<String> eventList = new ArrayList<>();

    public static void loadEvents() {
        eventQueue.clear();
        try (BufferedReader br = new BufferedReader(new FileReader("data/event_data.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                eventQueue.add(line);
                eventList.add(line);
            }
            System.out.println("Loaded " + eventQueue.size() + " events.");
        } catch (IOException e) {
            System.out.println("Error loading events.");
        }
    }

    public static void showCorrelationChain() {
        if (eventQueue.isEmpty()) {
            System.out.println("No events loaded.");
            return;
        }
        System.out.println("\n--- Event Correlation Chain ---");
        for (String event : eventQueue) {
            System.out.println(event);
        }
    }

    public static void detectAnomalies(String currentUser) {
        List<String> anomalies = new ArrayList<>();
        Set<String> loggedInUsers = new HashSet<>();
        Map<String, Integer> userFileCount = new HashMap<>();

        for (String event : eventList) {
            String[] parts = event.split(",");
            if (parts.length < 5) continue;

            String type = parts[2];
            String user = parts[3];

            switch (type) {
                case "Login": {
                    if (loggedInUsers.contains(user)) {
                        anomalies.add(user + " tried multiple logins without logout.");
                    }
                    loggedInUsers.add(user);
                }
                case "Logout": {
                    if (!loggedInUsers.contains(user)) {
                        anomalies.add(user + " logged out without login.");
                    } else {
                        loggedInUsers.remove(user);
                    }
                }
                case "File_Access": {
                    if (!loggedInUsers.contains(user)) {
                        anomalies.add(user + " accessed file without login.");
                    }
                    userFileCount.put(user, userFileCount.getOrDefault(user, 0) + 1);
                    if (userFileCount.get(user) > 5) {
                        anomalies.add(user + " accessed many files in short time.");
                    }
                }
            }
        }

        writeReport(anomalies);
    }

    private static void writeReport(List<String> anomalies) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("report/anomalies_report.txt"))) {
            if (anomalies.isEmpty()) {
                writer.write("No anomalies detected.\n");
                System.out.println("No anomalies found.");
            } else {
                for (String anomaly : anomalies) {
                    writer.write(anomaly);
                    writer.newLine();
                }
                System.out.println("Anomalies detected and saved to report/anomalies_report.txt");
            }
        } catch (IOException e) {
            System.out.println("Error writing report.");
        }
    }
}
