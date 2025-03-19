import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Trip } from "@/types/itinerary";

// Register a font (optional but recommended for better styling)
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfB.ttf",
      fontWeight: "bold",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "1 solid #999",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#0a4d93",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0a4d93",
  },
  overview: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  overviewItem: {
    flex: 1,
  },
  overviewLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 3,
  },
  overviewValue: {
    fontSize: 14,
    color: "#333",
  },
  day: {
    marginBottom: 20,
    borderBottom: "1 solid #eee",
    paddingBottom: 10,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0a4d93",
    backgroundColor: "#f8f9fa",
    padding: 5,
  },
  timeBlock: {
    marginBottom: 10,
  },
  timeTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 5,
  },
  activity: {
    fontSize: 12,
    marginBottom: 3,
    color: "#333",
    paddingLeft: 10,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "#666",
    fontSize: 10,
    borderTop: "1 solid #eee",
    paddingTop: 10,
  },
  additionalInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 5,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0a4d93",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    color: "#333",
    marginBottom: 3,
  },
});

interface TripPDFProps {
  trip: Trip;
}

const TripPDF = ({ trip }: TripPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Trip to {trip.destination}</Text>
        <Text style={styles.subtitle}>Travel Itinerary by Roamy AI</Text>
      </View>

      {/* Trip Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trip Overview</Text>
        <View style={styles.overview}>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Dates</Text>
            <Text style={styles.overviewValue}>
              {new Date(trip.start_date).toLocaleDateString()} -{" "}
              {new Date(trip.end_date).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Budget Level</Text>
            <Text style={styles.overviewValue}>{trip.budget}</Text>
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
        {trip.itinerary.itinerary.map((day: any, index: number) => (
          <View key={index} style={styles.day}>
            <Text style={styles.dayTitle}>Day {day.day}</Text>

            {/* Morning */}
            <View style={styles.timeBlock}>
              <Text style={styles.timeTitle}>Morning</Text>
              {day.morning.map((activity: string, i: number) => (
                <Text key={i} style={styles.activity}>
                  • {activity}
                </Text>
              ))}
            </View>

            {/* Afternoon */}
            <View style={styles.timeBlock}>
              <Text style={styles.timeTitle}>Afternoon</Text>
              {day.afternoon.map((activity: string, i: number) => (
                <Text key={i} style={styles.activity}>
                  • {activity}
                </Text>
              ))}
            </View>

            {/* Evening */}
            <View style={styles.timeBlock}>
              <Text style={styles.timeTitle}>Evening</Text>
              {day.evening.map((activity: string, i: number) => (
                <Text key={i} style={styles.activity}>
                  • {activity}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Additional Information */}
      <View style={styles.additionalInfo}>
        <Text style={styles.infoTitle}>Weather Forecast</Text>
        <Text style={styles.infoText}>
          {trip.itinerary.additional_info.weather_forecast}
        </Text>

        <Text style={styles.infoTitle}>Packing Tips</Text>
        {trip.itinerary.additional_info.packing_tips.map(
          (tip: string, index: number) => (
            <Text key={index} style={styles.infoText}>
              • {tip}
            </Text>
          )
        )}

        <Text style={styles.infoTitle}>Transportation</Text>
        {trip.itinerary.additional_info.transportation.map(
          (transport: string, index: number) => (
            <Text key={index} style={styles.infoText}>
              • {transport}
            </Text>
          )
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Generated by Roamy AI - Your Smart Travel Companion</Text>
      </View>
    </Page>
  </Document>
);

export default TripPDF;
