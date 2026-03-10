import { useState, lazy, Suspense, useEffect, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import QuickNav from "./components/QuickNav";
import { Toaster } from "./components/ui/sonner";
import { userService } from "./services/userService";
import { toast } from "sonner";

// Lazy load all page components for code splitting
const HomePage = lazy(() => import("./components/HomePage"));
const RegistrationPage = lazy(
  () => import("./components/RegistrationPage"),
);
const LoginPage = lazy(() => import("./components/LoginPage"));
const SearchPage = lazy(
  () => import("./components/SearchPage"),
);
const ProfilePage = lazy(
  () => import("./components/ProfilePage"),
);
const AboutPage = lazy(() => import("./components/AboutPage"));
const ContactPage = lazy(
  () => import("./components/ContactPage"),
);
const PaymentPage = lazy(
  () => import("./components/PaymentPage"),
);
const MeetingPaymentPage = lazy(
  () => import("./components/MeetingPaymentPage"),
);
const MatchesPage = lazy(
  () => import("./components/MatchesPage"),
);
const MyProfilePage = lazy(
  () => import("./components/MyProfilePage"),
);
const MeetingPage = lazy(
  () => import("./components/MeetingPage"),
);
const MeetingRequestResponsePage = lazy(
  () => import("./components/MeetingRequestResponsePage"),
);
const InboxPage = lazy(() => import("./components/InboxPage"));
const AdminLoginPage = lazy(() => import("./components/AdminLoginPage"));
const AdminPanel = lazy(() => import("./components/AdminPanel"));

// Simple loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    const validPages = ["home", "about", "login", "registration", "matches", "adminlogin", "admin", "inbox", "profile", "meeting", "meetingrequest", "meetingrequestresponse", "meetingpayment", "myprofile", "contact"];
    return validPages.includes(hash) ? hash : "home";
  });
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<string[]>(["home"]);

  // Initialize auth state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [isPremium, setIsPremium] = useState(() => localStorage.getItem('isPremium') === 'true');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || "");
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || "");

  const [inboxTab, setInboxTab] = useState<"requests" | "pending" | "scheduled">("requests");

  // Admin state — completely separate from user auth
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [adminEmail, setAdminEmail] = useState(() => localStorage.getItem('adminEmail') || "");

  // Shared state for managing matches, requests, and scheduled meetings
  const [sentMeetingRequests, setSentMeetingRequests] = useState<any[]>([]);
  const [receivedMeetingRequests, setReceivedMeetingRequests] = useState<any[]>([]);
  const [scheduledMeetings, setScheduledMeetings] = useState<any[]>([]);
  const [selectedMeetingDetails, setSelectedMeetingDetails] = useState<any>(null);

  // Sync session with backend on load
  useEffect(() => {
    const syncSession = async () => {
      if (isLoggedIn && userEmail) {
        try {
          const user = await userService.getUserByEmail(userEmail);
          if (user) {
            // Update premium and name from backend if available
            setIsPremium(user.membership === 'premium');
            setUserName(user.name);
            localStorage.setItem('isPremium', (user.membership === 'premium').toString());
            localStorage.setItem('userName', user.name);
          }
          // If user is null (e.g., server down), do NOT log out — keep local session alive
        } catch (error) {
          // Network error — silently ignore, keep local session intact
          console.warn('Session sync failed (server may be offline). Keeping local session.');
        }
      }
    };
    syncSession();
  }, []); // Only run once on mount — not on every page change

  // Sync meetings from backend
  useEffect(() => {
    const fetchMeetings = async () => {
      if (isLoggedIn && userEmail) {
        try {
          const meetings = await userService.getMeetings();

          const received = meetings
            .filter((m: any) => m.user2Email === userEmail && m.status === 'pending');

          const confirmed = meetings
            .filter((m: any) => (m.user1Email === userEmail || m.user2Email === userEmail) && m.status === 'confirmed');

          const sent = meetings
            .filter((m: any) => m.user1Email === userEmail && m.status === 'pending');

          setReceivedMeetingRequests(received);
          setScheduledMeetings(confirmed);
          setSentMeetingRequests(sent);
        } catch (error) {
          console.error('Error fetching meetings:', error);
        }
      }
    };
    fetchMeetings();
  }, [isLoggedIn, userEmail, currentPage]);

  const handleAdminLogin = (email: string) => {
    setIsAdmin(true);
    setAdminEmail(email);
    localStorage.setItem('isAdmin', 'true');
    localStorage.setItem('adminEmail', email);
    setCurrentPage('admin');
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminEmail("");
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    setCurrentPage('home');
    setNavigationHistory(["home"]);
  };

  const handleSendMeetingRequest = (profileId: string) => {
    // Backend handles this now, we refresh via fetchMeetings or currentPage change
  };

  const handleConfirmMeeting = async (profileId: string, selection?: any) => {
    if (selection) {
      setSelectedMeetingDetails(selection);
      return; // Payment page will call final confirm
    }

    // Final confirmation (called after payment)
    const meeting = receivedMeetingRequests.find(m => m.user1Id === profileId);
    if (meeting && selectedMeetingDetails) {
      try {
        const timeSlot = [
          { id: '1', time: '10:00 AM - 12:00 PM' },
          { id: '2', time: '12:00 PM - 2:00 PM' },
          { id: '3', time: '3:00 PM - 5:00 PM' },
          { id: '4', time: '5:00 PM - 7:00 PM' },
          { id: '5', time: '7:00 PM - 9:00 PM' },
          { id: '6', time: '9:00 PM - 11:00 PM' },
        ].find(s => s.id === selectedMeetingDetails.timeSlot)?.time || 'N/A';

        const dateObj = new Date(selectedMeetingDetails.date);
        const dateStr = dateObj.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        await userService.updateMeetingStatus(meeting._id, {
          status: 'confirmed',
          confirmedDate: dateStr,
          confirmedTime: timeSlot
        });

        toast.success('Meeting confirmed successfully!');
        // Refresh meetings
        const meetings = await userService.getMeetings();
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
          setReceivedMeetingRequests(meetings.filter((m: any) => m.user2Email === userEmail && m.status === 'pending'));
          setScheduledMeetings(meetings.filter((m: any) => (m.user1Email === userEmail || m.user2Email === userEmail) && m.status === 'confirmed'));
        }
      } catch (error) {
        console.error('Error confirming meeting:', error);
        toast.error('Failed to confirm meeting on server.');
      }
    }
  };

  const handleMeetingPaymentSuccess = () => {
    if (selectedProfileId) {
      handleConfirmMeeting(selectedProfileId);
    }
    navigateTo('inbox');
  };

  const handleDeclineRequest = (profileId: string) => {
    setReceivedMeetingRequests((prev: string[]) => prev.filter((id) => id !== profileId));
  };

  const handleSendCounterProposal = (profileId: string) => {
    setReceivedMeetingRequests((prev: string[]) => prev.filter((id) => id !== profileId));
    setSentMeetingRequests((prev: string[]) => [...prev, profileId]);
  };

  const getMatchName = (_id: string | null) => {
    return "Your Match";
  };

  const handleLogin = (email: string, name: string = "", premium: boolean = false) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserName(name);
    setIsPremium(premium);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    localStorage.setItem('isPremium', premium.toString());
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setUserName("");
    setIsPremium(false);
    setCurrentPage("home");
    setNavigationHistory(["home"]);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isPremium');
  };

  const handleSubscribe = async () => {
    if (userEmail) {
      const success = await userService.updateMembership(userEmail, 'premium');
      if (success) {
        setIsPremium(true);
        localStorage.setItem('isPremium', 'true');
        toast.success('Your premium status has been activated and saved! 💎');
      } else {
        toast.error('Failed to update premium status on server, but activated locally for this session.');
        setIsPremium(true);
        localStorage.setItem('isPremium', 'true');
      }
    } else {
      setIsPremium(true);
      localStorage.setItem('isPremium', 'true');
    }
  };

  const navigateTo = (page: string, profileId?: string) => {
    // Redirect logged-in users away from login/registration pages
    if (
      isLoggedIn &&
      (page === "login" || page === "registration")
    ) {
      page = "matches";
    }

    // Handle inbox navigation with tab
    let targetPage = page;
    let targetTab = inboxTab;
    if (page.startsWith("inbox")) {
      const parts = page.split("-");
      targetPage = "inbox";
      if (parts[1] === "scheduled" || page.includes("scheduled")) {
        targetTab = "scheduled";
      } else if (parts[1] === "pending" || page.includes("pending")) {
        targetTab = "pending";
      } else {
        targetTab = "requests";
      }
    }

    // Only push to history if it's a new page
    if (currentPage !== targetPage) {
      // Push state to browser history
      window.history.pushState(
        {
          page: targetPage,
          profileId:
            profileId !== undefined ? profileId : selectedProfileId,
          inboxTab: targetTab,
          isLoggedIn,
          isPremium,
          userEmail,
          userName,
        },
        "",
        `#${targetPage}`,
      );

      setNavigationHistory((prev: string[]) => [...prev, targetPage]);
    }

    setCurrentPage(targetPage);
    if (targetPage === "inbox") {
      setInboxTab(targetTab);
    }
    if (profileId !== undefined) {
      setSelectedProfileId(profileId);
    }
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      // Use browser's back instead of manual navigation
      window.history.back();
    } else {
      // If no history, go to appropriate default page
      const defaultPage = isLoggedIn ? "matches" : "home";
      setCurrentPage(defaultPage);
      setNavigationHistory([defaultPage]);
      window.scrollTo(0, 0);
    }
  };

  // Use ref to track if initial state has been set
  const initialStateSet = useRef(false);
  const isNavigatingRef = useRef(false);

  // Handle browser back/forward buttons and ESC key
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        isNavigatingRef.current = true;

        const {
          page,
          profileId,
          inboxTab: tab,
        } = event.state;

        // Restore the page state
        setCurrentPage(page);
        if (profileId !== undefined && profileId !== null) {
          setSelectedProfileId(profileId);
        }
        if (tab) {
          setInboxTab(tab);
        }

        // Update navigation history
        setNavigationHistory((prev) => {
          const newHistory = [...prev];
          newHistory.pop(); // Remove current page
          return newHistory.length > 0 ? newHistory : [page];
        });

        window.scrollTo(0, 0);
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const validPages = ["home", "about", "login", "registration", "matches", "adminlogin", "admin", "inbox", "profile", "meeting", "meetingrequest", "meetingrequestresponse", "meetingpayment", "myprofile", "contact"];
      if (validPages.includes(hash) && hash !== currentPage) {
        isNavigatingRef.current = true;
        setCurrentPage(hash);
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 100);
      }
    };

    // Handle ESC key press for desktop
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        goBack();
      }
    };

    // Set initial state only once
    if (!initialStateSet.current) {
      // Check for hash-based routing first
      const hash = window.location.hash.replace("#", "");
      const validPages = ["home", "about", "login", "registration", "matches", "adminlogin", "admin", "inbox", "profile", "meeting", "meetingrequest", "meetingrequestresponse", "meetingpayment", "myprofile", "contact"];
      const initialPage = validPages.includes(hash) ? hash : currentPage;

      if (initialPage !== currentPage) {
        setCurrentPage(initialPage);
      }

      window.history.replaceState(
        {
          page: initialPage,
          profileId: selectedProfileId,
          inboxTab,
        },
        "",
        `#${initialPage}`,
      );
      initialStateSet.current = true;
    }

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array - only run once

  // Update history state when page changes (but don't replace it constantly)
  useEffect(() => {
    if (initialStateSet.current && !isNavigatingRef.current) {
      // Update the current state without replacing
      const currentState = window.history.state;
      if (currentState && currentState.page === currentPage) {
        // Just update the state in place
        window.history.replaceState(
          {
            ...currentState,
            profileId: selectedProfileId,
            inboxTab,
          },
          "",
          `#${currentPage}`,
        );
      }
    }
  }, [selectedProfileId, inboxTab, currentPage]);

  // Admin pages use their own full-screen layout, no Header/Footer/QuickNav
  if (isAdmin && currentPage === "admin") {
    return (
      <div className="min-h-screen">
        <Toaster />
        <Suspense fallback={<PageLoader />}>
          <AdminPanel adminEmail={adminEmail} onAdminLogout={handleAdminLogout} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50">
      <Toaster />
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
        isAdmin={isAdmin}
      />

      <main
        className={`min-h-screen ${isLoggedIn && !["home", "about", "login", "registration"].includes(currentPage)
          ? "pb-24 md:pb-0"
          : ""
          }`}
      >
        <Suspense fallback={<PageLoader />}>
          {currentPage === "home" && (
            <HomePage
              onNavigate={navigateTo}
              isLoggedIn={isLoggedIn}
            />
          )}
          {currentPage === "about" && (
            <AboutPage onGoBack={goBack} />
          )}
          {currentPage === "registration" && (
            <RegistrationPage
              onNavigate={navigateTo}
              onGoBack={goBack}
              onSetPremium={setIsPremium}
              onLogin={handleLogin}
            />
          )}
          {currentPage === "login" && (
            <LoginPage
              onNavigate={navigateTo}
              onGoBack={goBack}
              onLogin={handleLogin}
            />
          )}
          {currentPage === "search" && (
            <SearchPage
              onNavigate={navigateTo}
              onGoBack={goBack}
            />
          )}
          {currentPage === "profile" && (
            <ProfilePage
              profileId={selectedProfileId}
              onGoBack={goBack}
              isPremium={isPremium}
              onNavigate={navigateTo}
            />
          )}
          {currentPage === "matches" && (
            <MatchesPage
              onNavigate={navigateTo}
              onGoBack={goBack}
              isPremium={isPremium}
              hasHistory={navigationHistory.length > 1}
              currentUserEmail={userEmail}
              sentRequests={sentMeetingRequests}
              receivedRequests={receivedMeetingRequests}
            />
          )}
          {currentPage === "myprofile" && (
            <MyProfilePage
              onGoBack={goBack}
              userName={userName}
              userEmail={userEmail}
            />
          )}
          {currentPage === "meeting" && (
            <MeetingPage
              onNavigate={navigateTo}
              onGoBack={goBack}
              matchId={selectedProfileId}
              matchName={getMatchName(selectedProfileId)}
              onSendRequest={handleSendMeetingRequest}
              currentUserEmail={userEmail}
              currentUserName={userName}
            />
          )}
          {(currentPage === "meetingrequest" || currentPage === "meetingrequestresponse") && (
            <MeetingRequestResponsePage
              onNavigate={navigateTo}
              onGoBack={goBack}
              matchName={getMatchName(selectedProfileId)}
              matchId={selectedProfileId}
              receivedRequest={(() => {
                const meeting = receivedMeetingRequests.find(m => m.user1Id === selectedProfileId);
                if (!meeting) return null;
                return {
                  dates: (meeting.dates || []).map((d: string) => new Date(d)),
                  timeSlots: meeting.timeSlots || [],
                  area: meeting.area || meeting.location || 'N/A',
                  familyCount: meeting.familyCount || 1
                };
              })() as any}
              onConfirmMeeting={handleConfirmMeeting}
              onSendCounterProposal={handleSendCounterProposal}
            />
          )}
          {currentPage === "inbox" && (
            <InboxPage
              onNavigate={navigateTo}
              onGoBack={goBack}
              receivedRequests={receivedMeetingRequests.map(m => m.user1Id)}
              pendingRequests={sentMeetingRequests.map(m => m.user2Id)}
              scheduledMeetings={scheduledMeetings.map(m => (m.user1Email === userEmail ? m.user2Id : m.user1Id))}
              initialTab={inboxTab}
              isPremium={isPremium}
            />
          )}
          {currentPage === "contact" && (
            <ContactPage onGoBack={goBack} />
          )}
          {currentPage === "adminlogin" && (
            <AdminLoginPage
              onAdminLogin={handleAdminLogin}
              onNavigate={navigateTo}
            />
          )}
          {currentPage === "payment" && (
            <PaymentPage
              onNavigate={navigateTo}
              onGoBack={goBack}
              onSubscribe={handleSubscribe}
              hasHistory={navigationHistory.length > 1}
            />
          )}
          {currentPage === "meetingpayment" && (
            <MeetingPaymentPage
              onNavigate={navigateTo}
              onPaymentSuccess={handleMeetingPaymentSuccess}
              meetingDetails={selectedMeetingDetails ? {
                matchName: getMatchName(selectedProfileId),
                date: new Date(selectedMeetingDetails.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
                time: [
                  { id: '1', time: '10:00 AM - 12:00 PM' },
                  { id: '2', time: '12:00 PM - 2:00 PM' },
                  { id: '3', time: '3:00 PM - 5:00 PM' },
                  { id: '4', time: '5:00 PM - 7:00 PM' },
                  { id: '5', time: '7:00 PM - 9:00 PM' },
                  { id: '6', time: '9:00 PM - 11:00 PM' },
                ].find(s => s.id === selectedMeetingDetails.timeSlot)?.time || 'N/A',
                familyCount: selectedMeetingDetails.familyCount,
              } : {
                matchName: getMatchName(selectedProfileId),
                date: "Selected Date",
                time: "Selected Time",
                familyCount: 2,
              }}
            />
          )}
        </Suspense>
      </main>

      {/* Footer - Only show on public pages (home, about, login, registration) */}
      {(!isLoggedIn || currentPage === "home" || currentPage === "about" || currentPage === "login" || currentPage === "registration") && (
        <Footer onNavigate={navigateTo} />
      )}

      {/* Quick Navigation - Mobile Bottom Bar & Desktop Sidebar */}
      <QuickNav
        currentPage={currentPage}
        onNavigate={navigateTo}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
      />
    </div>
  );
}