import { useState, useEffect } from "react";
import SideBarCandidat from "../../composants/SideBarCandidat";
import {
  format,
  isSameDay,
  parseISO,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isSameMonth,
  addDays,
  subMonths,
} from "date-fns";
import { fr } from "date-fns/locale";
import { getAllInterviews } from "../../services/interviewServices";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiClock,
  FiUser,
  FiBriefcase,
  FiInfo,
} from "react-icons/fi";
import { FaRegDotCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
const CandidatAgenda = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [interviews, setInterviews] = useState([]);

  const { user } = useSelector((state) => state.auth);

  // Fetch interviews
  useEffect(() => {
    getAllInterviews().then((result) => {
      setInterviews(result.filter((el) => el.candidate_id._id == user._id));
    });
  }, []);

  // Filter interviews for selected date
  const selectedInterviews = interviews.filter((interview) =>
    isSameDay(parseISO(interview.start_time), selectedDate)
  );

  // Generate month days
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add padding days at start (from previous month)
  const startDay = monthStart.getDay();
  const paddingDays = Array.from({ length: startDay }, (_, i) =>
    addDays(monthStart, -(startDay - i))
  );

  // Navigation functions
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBarCandidat />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Agenda des Entretiens
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={goToToday}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FiCalendar className="mr-2" />
              Aujourd'hui
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={prevMonth}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800"
              >
                <FiChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-semibold text-gray-700 min-w-[180px] text-center">
                {format(currentMonth, "MMMM yyyy", { locale: fr })}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Calendar Section */}
          <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 bg-gray-100 border-b">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                <div
                  key={day}
                  className="py-3 text-center font-medium text-gray-500 text-sm"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 auto-rows-fr">
              {/* Padding days (previous month) */}
              {paddingDays.map((day) => (
                <div
                  key={`pad-${day.toString()}`}
                  className="min-h-[100px] p-2 border-r border-b border-gray-100 bg-gray-50 text-gray-400"
                >
                  <div className="text-right">{format(day, "d")}</div>
                </div>
              ))}

              {/* Current month days */}
              {monthDays.map((day) => {
                const hasInterviews = interviews.some((interview) =>
                  isSameDay(parseISO(interview.start_time), day)
                );
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentDay = isToday(day);

                return (
                  <button
                    key={day.toString()}
                    onClick={() => setSelectedDate(day)}
                    className={`min-h-[100px] p-2 border-r border-b border-gray-100 text-left transition-colors
                      ${isSelected ? "bg-indigo-50" : "hover:bg-gray-50"}
                      ${isCurrentDay ? "border-t-2 border-t-indigo-500" : ""}
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm
                        ${isSelected ? "bg-indigo-600 text-white" : ""}
                        ${
                          isCurrentDay && !isSelected
                            ? "text-indigo-600 font-bold"
                            : ""
                        }
                      `}
                      >
                        {format(day, "d")}
                      </span>
                      {hasInterviews && (
                        <FaRegDotCircle className="text-green-500 text-xs" />
                      )}
                    </div>

                    {/* Interview indicators */}
                    {hasInterviews && (
                      <div className="mt-1 space-y-1 max-h-[60px] overflow-y-auto">
                        {interviews
                          .filter((interview) =>
                            isSameDay(parseISO(interview.start_time), day)
                          )
                          .slice(0, 2) // Show max 2 indicators
                          .map((interview) => (
                            <div
                              key={interview._id}
                              className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate"
                            >
                              {format(parseISO(interview.start_time), "HH:mm")}
                            </div>
                          ))}
                        {interviews.filter((interview) =>
                          isSameDay(parseISO(interview.start_time), day)
                        ).length > 2 && (
                          <div className="text-xs text-gray-500">+ plus</div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interview Details Section */}
          <div className="lg:w-96 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {selectedInterviews.length} entretien
                {selectedInterviews.length !== 1 ? "s" : ""}
              </p>
            </div>

            {selectedInterviews.length === 0 ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <FiInfo className="text-gray-400 text-2xl" />
                </div>
                <h4 className="text-gray-600 font-medium">
                  Aucun entretien prévu
                </h4>
                <p className="text-gray-400 text-sm mt-1">
                  Sélectionnez une autre date
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {selectedInterviews.map((interview) => (
                  <div
                    key={interview._id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center">
                          <FiUser className="mr-2 text-indigo-500" />
                          {interview.candidate_id?.nom || "Candidat"}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1 flex items-center">
                          <FiBriefcase className="mr-2 text-indigo-500" />
                          {interview.offer_id?.titre || "Offre"}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          interview.status === "scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : ""
                        }
                        ${
                          interview.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                        ${
                          interview.status === "canceled"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }
                      `}
                      >
                        {interview.status === "scheduled"
                          ? "Planifié"
                          : interview.status === "completed"
                          ? "Terminé"
                          : interview.status === "canceled"
                          ? "Annulé"
                          : interview.status}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mt-2">
                      <FiClock className="mr-2 text-indigo-500" />
                      {format(parseISO(interview.start_time), "HH:mm")} -{" "}
                      {format(parseISO(interview.end_time), "HH:mm")} •{" "}
                      {interview.duration} min
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatAgenda;
