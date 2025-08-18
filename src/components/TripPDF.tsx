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
  dayDescription: {
    fontSize: 12,
    color: "#4b5563",
    marginBottom: 10,
    lineHeight: 1.5,
  },
  highlightsContainer: {
    marginBottom: 10,
  },
  highlightsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a365d",
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 4,
  },
  costText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a365d",
    marginTop: 10,
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
  activityContainer: {
    marginBottom: 8,
    paddingLeft: 15,
    borderLeft: "2 solid #a0aec0",
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 11,
    color: "#4a5568",
    marginBottom: 2,
  },
  activityDetail: {
    fontSize: 10,
    color: "#6b7280",
    marginLeft: 5,
  },
  dayDescription: {
    fontSize: 12,
    color: "#4a5568",
    marginBottom: 10,
  },
  highlightsContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f7fafc",
    borderRadius: 6,
  },
  highlightsTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 5,
  },
  highlightText: {
    fontSize: 11,
    color: "#4a5568",
    marginLeft: 5,
  },
  costText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#38a169",
    marginTop: 10,
    textAlign: "right",
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
  infoItem: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 11,
    color: "#4a5568",
    marginLeft: 5,
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
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Duration</Text>
              <Text style={styles.overviewValue}>
                {trip.itinerary?.trip_overview?.duration || "N/A"}
              </Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Dietary Plan</Text>
              <Text style={styles.overviewValue}>
                {trip.itinerary?.trip_overview?.dietary_plan || "N/A"}
              </Text>
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
                  {day.day_description && (
                    <Text style={styles.dayDescription}>{day.day_description}</Text>
                  )}
                  {day.highlights && day.highlights.length > 0 && (
                    <View style={styles.highlightsContainer}>
                      <Text style={styles.highlightsTitle}>Highlights:</Text>
                      {day.highlights.map((highlight, i) => (
                        <Text key={i} style={styles.highlightText}>
                          • {highlight}
                        </Text>
                      ))}
                    </View>
                  )}
                  {day.total_estimated_cost && (
                    <Text style={styles.costText}>
                      Estimated Cost for the Day: {day.total_estimated_cost}
                    </Text>
                  )}

                  {/* Morning */}
                  {Array.isArray(day.morning) && day.morning.length > 0 && (
                    <View style={styles.timeBlock}>
                      <Text style={styles.timeTitle}>Morning</Text>
                      {day.morning.map((activity, i) => (
                        <View key={i} style={styles.activityContainer}>
                          <Text style={styles.activityTitle}>
                            {activity.time} - {activity.title}
                          </Text>
                          <Text style={styles.activityDescription}>
                            {activity.description}
                          </Text>
                          {activity.location && (
                            <Text style={styles.activityDetail}>
                              Location: {activity.location}
                            </Text>
                          )}
                          {activity.duration && (
                            <Text style={styles.activityDetail}>
                              Duration: {activity.duration}
                            </Text>
                          )}
                          {activity.cost && (
                            <Text style={styles.activityDetail}>
                              Cost: {activity.cost}
                            </Text>
                          )}
                          {activity.special_features &&
                            activity.special_features.length > 0 && (
                              <Text style={styles.activityDetail}>
                                Features: {activity.special_features.join(", ")}
                              </Text>
                            )}
                          {activity.tips && (
                            <Text style={styles.activityDetail}>
                              Tips: {activity.tips}
                            </Text>
                          )}
                          {activity.booking_info && (
                            <Text style={styles.activityDetail}>
                              Booking: {activity.booking_info}
                            </Text>
                          )}
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Afternoon */}
                  {Array.isArray(day.afternoon) && day.afternoon.length > 0 && (
                    <View style={styles.timeBlock}>
                      <Text style={styles.timeTitle}>Afternoon</Text>
                      {day.afternoon.map((activity, i) => (
                        <View key={i} style={styles.activityContainer}>
                          <Text style={styles.activityTitle}>
                            {activity.time} - {activity.title}
                          </Text>
                          <Text style={styles.activityDescription}>
                            {activity.description}
                          </Text>
                          {activity.location && (
                            <Text style={styles.activityDetail}>
                              Location: {activity.location}
                            </Text>
                          )}
                          {activity.duration && (
                            <Text style={styles.activityDetail}>
                              Duration: {activity.duration}
                            </Text>
                          )}
                          {activity.cost && (
                            <Text style={styles.activityDetail}>
                              Cost: {activity.cost}
                            </Text>
                          )}
                          {activity.special_features &&
                            activity.special_features.length > 0 && (
                              <Text style={styles.activityDetail}>
                                Features: {activity.special_features.join(", ")}
                              </Text>
                            )}
                          {activity.tips && (
                            <Text style={styles.activityDetail}>
                              Tips: {activity.tips}
                            </Text>
                          )}
                          {activity.booking_info && (
                            <Text style={styles.activityDetail}>
                              Booking: {activity.booking_info}
                            </Text>
                          )}
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Evening */}
                  {Array.isArray(day.evening) && day.evening.length > 0 && (
                    <View style={styles.timeBlock}>
                      <Text style={styles.timeTitle}>Evening</Text>
                      {day.evening.map((activity, i) => (
                        <View key={i} style={styles.activityContainer}>
                          <Text style={styles.activityTitle}>
                            {activity.time} - {activity.title}
                          </Text>
                          <Text style={styles.activityDescription}>
                            {activity.description}
                          </Text>
                          {activity.location && (
                            <Text style={styles.activityDetail}>
                              Location: {activity.location}
                            </Text>
                          )}
                          {activity.duration && (
                            <Text style={styles.activityDetail}>
                              Duration: {activity.duration}
                            </Text>
                          )}
                          {activity.cost && (
                            <Text style={styles.activityDetail}>
                              Cost: {activity.cost}
                            </Text>
                          )}
                          {activity.special_features &&
                            activity.special_features.length > 0 && (
                              <Text style={styles.activityDetail}>
                                Features: {activity.special_features.join(", ")}
                              </Text>
                            )}
                          {activity.tips && (
                            <Text style={styles.activityDetail}>
                              Tips: {activity.tips}
                            </Text>
                          )}
                          {activity.booking_info && (
                            <Text style={styles.activityDetail}>
                              Booking: {activity.booking_info}
                            </Text>
                          )}
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Meals */}
                  {Array.isArray(day.meals) && day.meals.length > 0 && (
                    <View style={styles.timeBlock}>
                      <Text style={styles.timeTitle}>Meals</Text>
                      {day.meals.map((meal, i) => (
                        <View key={i} style={styles.activityContainer}>
                          <Text style={styles.activityTitle}>
                            {meal.time} - {meal.restaurant_name} ({meal.cuisine_type})
                          </Text>
                          <Text style={styles.activityDescription}>
                            Location: {meal.location}
                          </Text>
                          {meal.cost_range && (
                            <Text style={styles.activityDetail}>
                              Cost Range: {meal.cost_range}
                            </Text>
                          )}
                          {meal.must_try_dishes &&
                            meal.must_try_dishes.length > 0 && (
                              <Text style={styles.activityDetail}>
                                Must-try Dishes: {meal.must_try_dishes.join(", ")}
                              </Text>
                            )}
                          {typeof meal.reservation_required === "boolean" && (
                            <Text style={styles.activityDetail}>
                              Reservation Required: {meal.reservation_required ? "Yes" : "No"}
                            </Text>
                          )}
                          {meal.special_features &&
                            meal.special_features.length > 0 && (
                              <Text style={styles.activityDetail}>
                                Features: {meal.special_features.join(", ")}
                              </Text>
                            )}
                          {meal.tips && (
                            <Text style={styles.activityDetail}>
                              Tips: {meal.tips}
                            </Text>
                          )}
                        </View>
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

        {/* Additional Information */}
        {trip.itinerary?.additional_info && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            {trip.itinerary.additional_info.weather_forecast && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Weather Forecast:</Text>
                <Text style={styles.infoValue}>
                  {trip.itinerary.additional_info.weather_forecast}
                </Text>
              </View>
            )}
            {trip.itinerary.additional_info.packing_tips &&
              trip.itinerary.additional_info.packing_tips.length > 0 && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Packing Tips:</Text>
                  {trip.itinerary.additional_info.packing_tips.map((tip, i) => (
                    <Text key={i} style={styles.infoValue}>
                      • {tip}
                    </Text>
                  ))}
                </View>
              )}
            {trip.itinerary.additional_info.local_currency && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Local Currency:</Text>
                <Text style={styles.infoValue}>
                  {trip.itinerary.additional_info.local_currency.code} (Exchange Rate:
                  {trip.itinerary.additional_info.local_currency.exchangeRate})
                </Text>
              </View>
            )}
            {trip.itinerary.additional_info.transportation &&
              trip.itinerary.additional_info.transportation.length > 0 && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Transportation:</Text>
                  {trip.itinerary.additional_info.transportation.map((t, i) => (
                    <Text key={i} style={styles.infoValue}>
                      • {t}
                    </Text>
                  ))}
                </View>
              )}
            {trip.itinerary.additional_info.emergency && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Emergency Contacts:</Text>
                <Text style={styles.infoValue}>
                  Police: {trip.itinerary.additional_info.emergency.police}
                </Text>
                <Text style={styles.infoValue}>
                  Ambulance:
                  {trip.itinerary.additional_info.emergency.ambulance}
                </Text>
                {trip.itinerary.additional_info.emergency.touristPolice && (
                  <Text style={styles.infoValue}>
                    Tourist Police:
                    {trip.itinerary.additional_info.emergency.touristPolice}
                  </Text>
                )}
              </View>
            )}
            {trip.itinerary.additional_info.local_customs &&
              trip.itinerary.additional_info.local_customs.length > 0 && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Local Customs:</Text>
                  {trip.itinerary.additional_info.local_customs.map((custom, i) => (
                    <Text key={i} style={styles.infoValue}>
                      • {custom}
                    </Text>
                  ))}
                </View>
              )}
            {trip.itinerary.additional_info.best_times_to_visit &&
              trip.itinerary.additional_info.best_times_to_visit.length > 0 && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Best Times to Visit:</Text>
                  {trip.itinerary.additional_info.best_times_to_visit.map((time, i) => (
                    <Text key={i} style={styles.infoValue}>
                      • {time}
                    </Text>
                  ))}
                </View>
              )}
            {trip.itinerary.additional_info.money_saving_tips &&
              trip.itinerary.additional_info.money_saving_tips.length > 0 && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Money Saving Tips:</Text>
                  {trip.itinerary.additional_info.money_saving_tips.map((tip, i) => (
                    <Text key={i} style={styles.infoValue}>
                      • {tip}
                    </Text>
                  ))}
                </View>
              )}
            {trip.itinerary.additional_info.cultural_etiquette &&
              trip.itinerary.additional_info.cultural_etiquette.length > 0 && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Cultural Etiquette:</Text>
                  {trip.itinerary.additional_info.cultural_etiquette.map((etiquette, i) => (
                    <Text key={i} style={styles.infoValue}>
                      • {etiquette}
                    </Text>
                  ))}
                </View>
              )}
            {trip.itinerary.additional_info.local_phrases &&
              trip.itinerary.additional_info.local_phrases.length > 0 && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Local Phrases:</Text>
                  {trip.itinerary.additional_info.local_phrases.map((phrase, i) => (
                    <Text key={i} style={styles.infoValue}>
                      • {phrase}
                    </Text>
                  ))}
                </View>
              )}
            {trip.itinerary.additional_info.must_know_facts &&
              trip.itinerary.additional_info.must_know_facts.length > 0 && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Must-Know Facts:</Text>
                  {trip.itinerary.additional_info.must_know_facts.map((fact, i) => (
                    <Text key={i} style={styles.infoValue}>
                      • {fact}
                    </Text>
                  ))}
                </View>
              )}
          </View>
        )}

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
