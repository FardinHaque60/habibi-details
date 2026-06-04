import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { logoutAdmin } from "@/actions/adminAuth";
import BookingBlock from "@/components/BookingBlock";

// Helper function to safely get Pacific Time YYYY-MM-DD
function getPTDateString(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date); 
}

// Helper for "June 4th" formatting
function getOrdinalSuffix(i: number) {
  const j = i % 10, k = i % 100;
  if (j == 1 && k != 11) return i + "st";
  if (j == 2 && k != 12) return i + "nd";
  if (j == 3 && k != 13) return i + "rd";
  return i + "th";
}

export default async function AdminDashboard({ searchParams }: { searchParams: Promise<{ startDate?: string }> }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") redirect("/admin/login");

  // Get Pacific Time Today
  const today = new Date();
  const todayPTStr = getPTDateString(today); // "2026-06-04"

  const params = await searchParams;
  const baseDateStr = params?.startDate || todayPTStr;
  
  // Safely parse the base date to avoid Server ISO shifts
  const [bYear, bMonth, bDay] = baseDateStr.split("-").map(Number);
  const baseDate = new Date(bYear, bMonth - 1, bDay);

  // Format "June 4th" text for the Header
  const displayMonth = baseDate.toLocaleString("en-US", { month: "long" });
  const formattedHeaderDate = `${displayMonth} ${baseDate.getFullYear()}`;

  // Next / Prev links
  const prevDate = new Date(bYear, bMonth - 1, bDay - 1);
  const prevDateStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(prevDate.getDate()).padStart(2, '0')}`;

  const nextDate = new Date(bYear, bMonth - 1, bDay + 1);
  const nextDateStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(nextDate.getDate()).padStart(2, '0')}`;

  const { data: bookings } = await supabaseAdmin
    .from("bookings") 
    .select("*")
    .order("appt_time", { ascending: true });

  // Calculate 7 Columns safely
  const next7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(bYear, bMonth - 1, bDay + i);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });

  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="w-full bg-white/5 backdrop-blur-md border-b border-white/10 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-tight text-[#F9D042]">Admin Portal</h1>
        
        <div className="flex items-center gap-6">
          
          {/* UPDATED: Month Day < > Controls */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-white tracking-wide">{formattedHeaderDate}</span>
            <div className="flex items-center gap-1 bg-white/10 rounded-full px-1 py-1">
              <a 
                href={`/admin?startDate=${prevDateStr}`} 
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                title="Previous Day"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
              </a>
              <a 
                href={`/admin?startDate=${nextDateStr}`} 
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                title="Next Day"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          <form action={logoutAdmin}>
            <button type="submit" className="cursor-pointer text-sm font-medium text-gray-400 hover:text-red-400 transition-colors">Log Out</button>
          </form>
        </div>
      </header>

      <main className="flex-1 p-8 overflow-x-auto [scrollbar-width:thin]">
        <div className="min-w-[1000px]"> 
          
          {/* Header Row */}
          <div className="flex ml-16 mb-4 border-b border-white/10 pb-4">
            {next7Days.map((dateStr, index) => {
              const [dy, dm, dd] = dateStr.split("-").map(Number);
              const dateObj = new Date(dy, dm - 1, dd);
              
              // Only Yellow if it perfectly matches Today in PT!
              const isToday = dateStr === todayPTStr;

              return (
                <div key={dateStr} className="flex-1 text-center flex flex-col items-center">
                  <span className="text-sm text-gray-500 uppercase">{dateObj.toLocaleDateString("en-US", { weekday: "short" })}</span>
                  <span className={`text-2xl font-bold mt-1 ${isToday ? "text-[#F9D042]" : "text-white"}`}>
                    {dateObj.getDate()}
                  </span>
                  {isToday && <span className="text-[10px] text-[#F9D042] uppercase tracking-wider mt-1 font-bold">Today</span>}
                </div>
              );
            })}
          </div>

          <div className="flex relative">
            {/* Time Labels */}
            <div className="w-16 flex flex-col pt-4">
              {hours.map((hour) => (
                <div key={hour} className="h-[80px] text-xs text-gray-500 font-medium text-right pr-4 relative -top-2">
                  {hour > 12 ? hour - 12 : hour} {hour >= 12 ? "PM" : "AM"}
                </div>
              ))}
            </div>

            {/* Grid Columns */}
            <div className="flex-1 flex border-l border-white/10 relative">
              <div className="absolute inset-0 pointer-events-none flex flex-col pt-4">
                {hours.map((hour) => <div key={`line-${hour}`} className="h-[80px] border-t border-white/5 w-full"></div>)}
              </div>

              {next7Days.map((dateStr) => {
                const dayBookings = (bookings || [])
                  .filter((b) => b.appt_time && b.appt_time.startsWith(dateStr))
                  .map(b => ({ ...b, colIndex: 0 })); 

                const columns: typeof dayBookings[] = [];
                dayBookings.forEach((booking) => {
                  const bStart = new Date(booking.appt_time).getTime();
                  let placed = false;
                  
                  for (let i = 0; i < columns.length; i++) {
                    const col = columns[i];
                    const lastInCol = col[col.length - 1];
                    const lastEnd = new Date(lastInCol.appt_time).getTime() + (2 * 60 * 60 * 1000); 
                    
                    if (bStart >= lastEnd) {
                      col.push(booking);
                      booking.colIndex = i;
                      placed = true;
                      break;
                    }
                  }
                  
                  if (!placed) {
                    booking.colIndex = columns.length;
                    columns.push([booking]);
                  }
                });

                const totalCols = columns.length || 1;

                return (
                  <div key={`col-${dateStr}`} className="flex-1 relative border-r border-white/10 pt-4">
                    {dayBookings.map((booking) => {
                      const timeString = booking.appt_time.split("T")[1];
                      if (!timeString) return null;
                      
                      const [bHour, bMin] = timeString.split(":").map(Number);
                      const topOffset = ((bHour - 8) + (bMin / 60)) * 80;
                      const blockHeight = 160; 

                      if (bHour < 8 || bHour > 18) return null;

                      return (
                        <BookingBlock 
                          key={booking.id} 
                          booking={booking} 
                          topOffset={topOffset} 
                          blockHeight={blockHeight} 
                          totalCols={totalCols} 
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}