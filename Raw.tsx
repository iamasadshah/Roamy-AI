{/* Trips Tab */}
            {activeTab === "trips" && (
              <div className="space-y-8">
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/30">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">My Saved Trips</h3>
                  
                  {savedTrips.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaHistory className="h-8 w-8 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">No trips saved yet</h4>
                      <p className="text-gray-600 mb-4">Start planning your next adventure!</p>
                      <Link href="/plan" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-150">
                        Plan a Trip
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedTrips.map((trip) => (
                        <div key={trip.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-150">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-bold text-gray-800 mb-2">{trip.destination}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <FaCalendar className="h-4 w-4" />
                                  <span>{format(new Date(trip.start_date), 'MMM dd')} - {format(new Date(trip.end_date), 'MMM dd, yyyy')}</span>
                                </div>
      </div>
    </div>
                            <div className="flex gap-2">
          <button
                                onClick={() => deleteTrip(trip.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-150"
                                title="Delete trip"
                              >
                                <FaTrash className="h-4 w-4" />
          </button>
        </div>
    </div>

                          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div className="flex items-center gap-2">
                              <FaUsers className="h-4 w-4 text-blue-500" />
                              <span>{trip.travelers} travelers</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaHotel className="h-4 w-4 text-green-500" />
                              <span>{trip.accommodation}</span>
        </div>
                            <div className="flex items-center gap-2">
                              <FaWallet className="h-4 w-4 text-purple-500" />
                              <span>{trip.budget}</span>
                    </div>
                            <div className="flex items-center gap-2">
                              <FaMapMarkerAlt className="h-4 w-4 text-red-500" />
                              <span>{trip.destination}</span>
              </div>
            </div>

                          <div className="flex justify-start">
                  <button
                    onClick={() => toast("This Feature is Coming Soon!")}
                    className="flex items-center font-semibold gap-2 px-12 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-150 text-md font-medium"
                  >
                    <FaDownload className="h-4 w-4" />
                    Download PDF
                  </button>
                </div>
              </div>
          ))}
        </div>
      )}
                </div>
              </div>
            )}







  // const handleSaveTrip = async () => {
  //   if (!plan) return;

  //   try {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     if (!user) {
  //       toast.custom(
  //         (t) => (
  //           <div
  //             className={`${
  //               t.visible ? "animate-enter" : "animate-leave"
  //             } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  //           >
  //             <div className="flex-1 w-0 p-4">
  //               <div className="flex items-start">
  //                 <div className="flex-shrink-0 pt-0.5">
  //                   <svg
  //                     className="h-10 w-10 text-blue-500"
  //                     fill="none"
  //                     viewBox="0 0 24 24"
  //                     stroke="currentColor"
  //                   >
  //                     <path
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth={2}
  //                       d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
  //                     />
  //                   </svg>
  //                 </div>
  //                 <div className="ml-3 flex-1">
  //                   <p className="text-sm font-medium text-gray-900">
  //                     Sign In Required
  //                   </p>
  //                   <p className="mt-1 text-sm text-gray-500">
  //                     Please sign in to save your trip.
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="flex border-l border-gray-200">
  //               <button
  //                 onClick={() => {
  //                   toast.dismiss(t.id);
  //                   router.push("/auth");
  //                 }}
  //                 className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               >
  //                 Sign In
  //               </button>
  //             </div>
  //           </div>
  //         ),
  //         {
  //           duration: 5000,
  //           position: "bottom-right",
  //         }
  //       );
  //       return;
  //     }

  //     // Parse dates properly
  //     const parseDate = (dateStr: string) => {
  //       try {
  //         const parsedDate = new Date(dateStr);
  //         if (!isNaN(parsedDate.getTime())) {
  //           return parsedDate.toISOString().split("T")[0];
  //         }
  //       } catch {
  //         // If parsing fails, use today's date
  //         console.warn(
  //           `Could not parse date: ${dateStr}, using today's date instead`
  //         );
  //         return new Date().toISOString().split("T")[0];
  //       }
  //     };

  //     const [startDate, endDate] = plan.trip_overview.dates
  //       .split(" - ")
  //       .map(parseDate);

  //     const tripData = {
  //       user_id: user.id,
  //       destination: plan.trip_overview.destination,
  //       start_date: startDate,
  //       end_date: endDate,
  //       budget: plan.trip_overview.budget_level,
  //       accommodation: plan.trip_overview.accommodation,
  //       travelers: plan.trip_overview.travelers,
  //       itinerary: plan,
  //     };

  //     const { error } = await supabase.from("trips").insert([tripData]);

  //     if (error) {
  //       console.error("Supabase error:", error);
  //       throw new Error(error.message);
  //     }

  //     toast.success("Trip saved successfully!");
  //     router.push("/profile");
  //   } catch (error) {
  //     console.error("Error saving trip:", error);
  //     toast.error(
  //       error instanceof Error
  //         ? `Failed to save trip: ${error.message}`
  //         : "Failed to save trip. Please try again."
  //     );
  //   }
  // };