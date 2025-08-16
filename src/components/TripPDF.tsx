import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Trip } from "@/types/itinerary";
import { format } from "date-fns";

// Register fonts
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/helvetica/v15/Helvetica.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/helvetica/v15/Helvetica-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: "2 solid #1a365d",
    position: "relative",
  },
  titleContainer: {
    backgroundColor: "#1a365d",
    padding: 25,
    borderRadius: 8,
    marginBottom: 15,
    border: "2 solid #ffffff",
    boxShadow: "0 4 6 rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
    opacity: 0.9,
    marginTop: 8,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#f3f4f6",
    padding: 10,
    borderRadius: 6,
  },
  dateText: {
    fontSize: 14,
    color: "#4b5563",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1a365d",
    borderBottom: "1 solid #e5e7eb",
    paddingBottom: 8,
  },
  overview: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f3f4f6",
    padding: 15,
    borderRadius: 8,
    marginBottom: 25,
  },
  overviewItem: {
    flex: 1,
    padding: 10,
  },
  overviewLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  overviewValue: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "bold",
  },
  day: {
    marginBottom: 20,
    border: "1 solid #e5e7eb",
    borderRadius: 8,
    padding: 15,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1a365d",
    backgroundColor: "#f3f4f6",
    padding: 8,
    borderRadius: 4,
  },
  timeBlock: {
    marginBottom: 12,
  },
  timeTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4b5563",
    marginBottom: 8,
    textTransform: "capitalize",
  },
  activity: {
    fontSize: 12,
    marginBottom: 4,
    color: "#374151",
    paddingLeft: 8,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#6b7280",
    fontSize: 10,
    borderTop: "1 solid #e5e7eb",
    paddingTop: 10,
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: 10,
  },
});

interface TripPDFProps {
  trip: Trip;
}

const TripPDF = ({ trip }: TripPDFProps) => {
  const hasItinerary =
    trip?.itinerary?.itinerary &&
    Array.isArray(trip.itinerary.itinerary) &&
    trip.itinerary.itinerary.length > 0;

  // Clean the destination name
  const cleanDestination = trip.destination
    .replace(/[^\w\s]/g, "") // Remove special characters
    .trim() // Remove extra spaces
    .replace(/\s+/g, " "); // Replace multiple spaces with single space

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Trip to {cleanDestination}</Text>
            <Text style={styles.subtitle}>Enjoy your Trip with Roamy AI</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              {format(new Date(trip.start_date), "MMMM d, yyyy")} -{" "}
              {format(new Date(trip.end_date), "MMMM d, yyyy")}
            </Text>
          </View>
        </View>

        {/* Trip Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Overview</Text>
          <View style={styles.overview}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Dates</Text>
              <Text style={styles.overviewValue}>
                {format(new Date(trip.start_date), "MMM d")} -{" "}
                {format(new Date(trip.end_date), "MMM d, yyyy")}
              </Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Budget</Text>
              <Text style={styles.overviewValue}>{trip.budget}</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Travelers</Text>
              <Text style={styles.overviewValue}>{trip.travelers}</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Accommodation</Text>
              <Text style={styles.overviewValue}>{trip.accommodation}</Text>
            </View>
          </View>
        </View>

        {/* Daily Itinerary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Itinerary</Text>
          {hasItinerary ? (
            trip.itinerary.itinerary.map((day, index) => {
              if (!day) return null;

              return (
                <View key={index} style={styles.day}>
                  <Text style={styles.dayTitle}>{day.day_title || `Day ${day.day}`}</Text>

                  {/* Morning */}
                  {Array.isArray(day.morning) && day.morning.length > 0 && (
                    <View style={styles.timeBlock}>
                      <Text style={styles.timeTitle}>Morning</Text>
                      {day.morning.map((activity: string | { title?: string; description?: string }, i) => (
                        <Text key={i} style={styles.activity}>
                          • {typeof activity === 'string' ? activity : activity.title || activity.description || 'Activity'}
                        </Text>
                      ))}
                    </View>
                  )}

                  {/* Afternoon */}
                  {Array.isArray(day.afternoon) && day.afternoon.length > 0 && (
                    <View style={styles.timeBlock}>
                      <Text style={styles.timeTitle}>Afternoon</Text>
                      {day.afternoon.map((activity: string | { title?: string; description?: string }, i) => (
                        <Text key={i} style={styles.activity}>
                          • {typeof activity === 'string' ? activity : activity.title || activity.description || 'Activity'}
                        </Text>
                      ))}
                    </View>
                  )}

                  {/* Evening */}
                  {Array.isArray(day.evening) && day.evening.length > 0 && (
                    <View style={styles.timeBlock}>
                      <Text style={styles.timeTitle}>Evening</Text>
                      {day.evening.map((activity: string | { title?: string; description?: string }, i) => (
                        <Text key={i} style={styles.activity}>
                          • {typeof activity === 'string' ? activity : activity.title || activity.description || 'Activity'}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              );
            })
          ) : (
            <Text style={{ color: "#6b7280", fontSize: 12 }}>
              No itinerary details available
            </Text>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Generated by Roamy AI - Your Smart Travel Companion</Text>
          <Text style={{ marginTop: 4 }}>
            {format(new Date(), "MMMM d, yyyy")}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default TripPDF;
