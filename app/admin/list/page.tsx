import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { logoutAdmin } from "@/actions/adminAuth";
import BookingListItem from "@/components/BookingListItem";

// Helper for formatting "Monday June 11th"
function getOrdinalSuffix(i: number) {
  const j = i % 10, k = i % 100;
  if (j == 1 && k != 11) return i + "st";
  if (j == 2 && k != 12) return i + "nd";
  if (j == 3 && k != 13) return i + "rd";
  return i + "th";
}

function formatDayHeader(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dateObj = new Date(y, m - 1, d);
  const weekday = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  const month = dateObj.toLocaleDateString("en-US", { month: "long" });
  return `${weekday} ${month} ${getOrdinalSuffix(dateObj.getDate())}:`;
}

export default async function AdminList() {
  // Security Check
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") redirect("/admin/login");

  // Fetch all bookings
  const { data: bookings } = await supabaseAdmin
    .from("bookings") 
    .select("*")
    .order("appt_time", { ascending: true });

  // Group Bookings by Date string (e.g. "2026-06-11")
  const groupedBookings = (bookings || []).reduce((acc: any, booking) => {
    if (!booking.appt_time) return acc;
    const dateStr = booking.appt_time.split("T")[0];
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(booking);
    return acc;
  }, {});

  // Sort the unique dates chronologically
  const sortedDates = Object.keys(groupedBookings).sort();

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="w-full bg-white/5 backdrop-blur-md border-b border-white/10 px-6 sm:px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-tight text-[#F9D042]">Admin Portal</h1>
        <form action={logoutAdmin}>
          <button type="submit" className="text-sm font-medium text-gray-400 hover:text-red-400 transition-colors">Log Out</button>
        </form>
      </header>

      <main className="flex-1 p-6 sm:p-8 max-w-4xl mx-auto w-full">
        
        {/* Link back to Calendar View */}
        <div className="flex justify-start mb-8">
          <Link href="/admin" className="text-[#F9D042] text-sm font-bold hover:text-white transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12"/></svg>
            See Calendar View 
          </Link>
        </div>

        {/* Display Grouped Bookings */}
        {sortedDates.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">No appointments scheduled.</div>
        ) : (
          <div className="flex flex-col gap-12">
            {sortedDates.map((dateStr) => (
              <div key={dateStr} className="flex flex-col gap-4">
                
                {/* Day Header (e.g. Monday June 11th:) */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-white tracking-tight lowercase capitalize">
                    {formatDayHeader(dateStr)}
                  </h3>
                  <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent"></div>
                </div>

                {/* The List of Bookings for this Day */}
                <div className="flex flex-col gap-3 mt-2">
                  {groupedBookings[dateStr].map((booking: any) => (
                    <BookingListItem key={booking.id} booking={booking} />
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}