import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function App() {
  const weddingDetails = useQuery(api.wedding.getWeddingDetails);
  const updateWeddingDetails = useMutation(api.wedding.updateWeddingDetails);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [scrollOpened, setScrollOpened] = useState(false);

  // Edit form state
  const [editData, setEditData] = useState<{
    groomName: string;
    brideName: string;
    invitationText: string;
    ceremonies: Array<{
      name: string;
      date: string;
      time: string;
      location: string;
      address: string;
      mapLink: string;
    }>;
  }>({
    groomName: "",
    brideName: "",
    invitationText: "",
    ceremonies: []
  });

  const handleAdminAccess = () => {
    if (adminCode === "922610") {
      setIsAdmin(true);
      setShowAdminPrompt(false);
      setAdminCode("");
      toast.success("Admin access granted!");
    } else {
      toast.error("Invalid admin code");
      setAdminCode("");
    }
  };

  const startEditing = () => {
    if (weddingDetails) {
      setEditData({
        groomName: weddingDetails.groomName,
        brideName: weddingDetails.brideName,
        invitationText: weddingDetails.invitationText,
        ceremonies: weddingDetails.ceremonies
      });
      setIsEditing(true);
    }
  };

  const saveChanges = async () => {
    try {
      await updateWeddingDetails(editData);
      setIsEditing(false);
      toast.success("Wedding details updated successfully!");
    } catch (error) {
      toast.error("Failed to update details");
    }
  };

  const addCeremony = () => {
    setEditData({
      ...editData,
      ceremonies: [
        ...editData.ceremonies,
        {
          name: "",
          date: "",
          time: "",
          location: "",
          address: "",
          mapLink: ""
        }
      ]
    });
  };

  const removeCeremony = (index: number) => {
    setEditData({
      ...editData,
      ceremonies: editData.ceremonies.filter((_, i) => i !== index)
    });
  };

  const updateCeremony = (index: number, field: string, value: string) => {
    const updatedCeremonies = [...editData.ceremonies];
    updatedCeremonies[index] = { ...updatedCeremonies[index], [field]: value };
    setEditData({ ...editData, ceremonies: updatedCeremonies });
  };

  const openScroll = () => {
    setScrollOpened(true);
  };

  if (!weddingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gold-900 to-maroon-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon-900 via-gold-900 to-maroon-800 relative overflow-hidden">
      {/* Enhanced Fireworks Background */}
      <div className="fixed inset-0 z-0">
        <div className="fireworks-bg"></div>
        <div className="fireworks-particles"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-900/50 via-gold-900/30 to-maroon-800/50"></div>
      </div>

      {/* Flower Garland Border - Only when scroll is opened */}
      {scrollOpened && (
        <div className="flower-border">
          {/* Top Border */}
          <div className="flower-border-top">
            <div className="flower-border-line"></div>
            <div className="flower-border-flowers">
              {Array.from({ length: 25 }, (_, i) => (
                <span key={i} className="border-flower" style={{ animationDelay: `${i * 0.1}s` }}>
                  {['🌸', '🌺', '🌼', '🌻', '🌷', '🌹'][i % 6]}
                </span>
              ))}
            </div>
          </div>
          
          {/* Bottom Border */}
          <div className="flower-border-bottom">
            <div className="flower-border-line"></div>
            <div className="flower-border-flowers">
              {Array.from({ length: 25 }, (_, i) => (
                <span key={i} className="border-flower" style={{ animationDelay: `${i * 0.1}s` }}>
                  {['🌹', '🌷', '🌻', '🌼', '🌺', '🌸'][i % 6]}
                </span>
              ))}
            </div>
          </div>
          
          {/* Left Border */}
          <div className="flower-border-left">
            <div className="flower-border-line-vertical"></div>
            <div className="flower-border-flowers-vertical">
              {Array.from({ length: 15 }, (_, i) => (
                <span key={i} className="border-flower-vertical" style={{ animationDelay: `${i * 0.15}s` }}>
                  {['🌸', '🌺', '🌼', '🌻', '🌷', '🌹'][i % 6]}
                </span>
              ))}
            </div>
          </div>
          
          {/* Right Border */}
          <div className="flower-border-right">
            <div className="flower-border-line-vertical"></div>
            <div className="flower-border-flowers-vertical">
              {Array.from({ length: 15 }, (_, i) => (
                <span key={i} className="border-flower-vertical" style={{ animationDelay: `${i * 0.15}s` }}>
                  {['🌹', '🌷', '🌻', '🌼', '🌺', '🌸'][i % 6]}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Falling Flowers - More flowers when scroll is opened */}
      <div className="falling-flowers">
        {Array.from({ length: scrollOpened ? 30 : 10 }, (_, i) => (
          <div 
            key={i} 
            className={`flower flower-${(i % 10) + 1}`}
            style={{
              left: `${(i * 3.33) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + (i % 5)}s`
            }}
          >
            {['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '💐', '🏵️'][i % 8]}
          </div>
        ))}
      </div>

      {/* Firecrackers */}
      <div className="firecrackers">
        <div className="firecracker firecracker-1"></div>
        <div className="firecracker firecracker-2"></div>
        <div className="firecracker firecracker-3"></div>
        <div className="firecracker firecracker-4"></div>
        <div className="firecracker firecracker-5"></div>
        <div className="firecracker firecracker-6"></div>
      </div>

      {/* Royal Sparkles Animation */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="sparkle sparkle-1"></div>
        <div className="sparkle sparkle-2"></div>
        <div className="sparkle sparkle-3"></div>
        <div className="sparkle sparkle-4"></div>
        <div className="sparkle sparkle-5"></div>
        <div className="sparkle sparkle-6"></div>
        <div className="sparkle sparkle-7"></div>
        <div className="sparkle sparkle-8"></div>
      </div>

      {/* Admin Access Button */}
      <div className="fixed top-4 right-4 z-50">
        {!isAdmin ? (
          <button
            onClick={() => setShowAdminPrompt(true)}
            className="bg-maroon-700 hover:bg-maroon-800 text-gold-200 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 font-medium border border-gold-600"
          >
            Admin Access
          </button>
        ) : (
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={startEditing}
                className="bg-gold-600 hover:bg-gold-700 text-maroon-900 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 font-medium border border-maroon-600"
              >
                Edit Details
              </button>
            ) : (
              <>
                <button
                  onClick={saveChanges}
                  className="bg-maroon-600 hover:bg-maroon-700 text-gold-200 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 font-medium border border-gold-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gold-800 hover:bg-gold-900 text-gold-200 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 font-medium border border-maroon-600"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Admin Code Prompt Modal */}
      {showAdminPrompt && (
        <div className="fixed inset-0 bg-maroon-900 bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gold-100 to-gold-200 p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 border-4 border-maroon-700">
            <h3 className="text-xl font-bold text-maroon-800 mb-4 font-cursive">Enter Admin Code</h3>
            <input
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              className="w-full px-4 py-2 border-2 border-maroon-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-600 outline-none mb-4 bg-gold-50 text-maroon-800"
              placeholder="Enter code..."
              onKeyPress={(e) => e.key === 'Enter' && handleAdminAccess()}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAdminAccess}
                className="flex-1 bg-gold-600 hover:bg-gold-700 text-maroon-900 py-2 rounded-lg transition-colors font-medium"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setShowAdminPrompt(false);
                  setAdminCode("");
                }}
                className="flex-1 bg-maroon-600 hover:bg-maroon-700 text-gold-200 py-2 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-20 max-w-6xl mx-auto px-4 py-8">
        {/* Scroll Invitation */}
        {!scrollOpened ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="scroll-container">
              <div className="scroll-closed" onClick={openScroll}>
                <div className="scroll-ribbon scroll-ribbon-left"></div>
                <div className="scroll-ribbon scroll-ribbon-right"></div>
                <div className="scroll-body">
                  <div className="scroll-seal">
                    <div className="seal-wax">
                      <div className="seal-emblem">💍</div>
                    </div>
                  </div>
                  <div className="scroll-text">
                    Click to Open
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="scroll-opened">
            {/* Header with Royal Crown */}
            <div className="text-center mb-16">
              {/* Decorative Crown */}
              <div className="relative mb-8">
                <div className="royal-crown">
                  <svg viewBox="0 0 200 80" className="w-32 h-16 mx-auto text-gold-400">
                    <path
                      d="M20 60 L40 30 L60 50 L100 20 L140 50 L160 30 L180 60 L170 70 L30 70 Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="100" cy="25" r="8" fill="currentColor" />
                    <circle cx="60" cy="35" r="6" fill="currentColor" />
                    <circle cx="140" cy="35" r="6" fill="currentColor" />
                    <circle cx="40" cy="45" r="4" fill="currentColor" />
                    <circle cx="160" cy="45" r="4" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Names in Heart */}
              {!isEditing ? (
                <div className="relative">
                  {/* Heart Shape - Increased Size */}
                  <div className="heart-container">
                    <svg viewBox="0 0 400 350" className="w-[28rem] h-[24rem] mx-auto">
                      <defs>
                        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#be185d" />
                          <stop offset="50%" stopColor="#d97706" />
                          <stop offset="100%" stopColor="#be185d" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M200,320 C200,320 350,200 350,120 C350,80 320,50 280,50 C240,50 200,80 200,120 C200,80 160,50 120,50 C80,50 50,80 50,120 C50,200 200,320 200,320 Z"
                        fill="url(#heartGradient)"
                        stroke="#7c2d12"
                        strokeWidth="3"
                        opacity="0.9"
                      />
                    </svg>
                    
                    {/* Names inside heart */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gold-200">
                      <h1 className="text-5xl md:text-6xl font-cursive font-bold mb-2 text-shadow-lg">
                        {weddingDetails.groomName}
                      </h1>
                      <div className="text-4xl md:text-5xl font-cursive italic mb-2">
                        &
                      </div>
                      <h1 className="text-5xl md:text-6xl font-cursive font-bold text-shadow-lg">
                        {weddingDetails.brideName}
                      </h1>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.groomName}
                    onChange={(e) => setEditData({ ...editData, groomName: e.target.value })}
                    className="text-3xl md:text-4xl font-cursive text-center bg-gold-100 border-b-2 border-gold-600 focus:outline-none focus:border-maroon-700 text-maroon-700 w-full max-w-md rounded-lg px-4 py-2"
                    placeholder="Groom's Name"
                  />
                  <div className="text-3xl md:text-4xl text-gold-400 font-cursive italic">&</div>
                  <input
                    type="text"
                    value={editData.brideName}
                    onChange={(e) => setEditData({ ...editData, brideName: e.target.value })}
                    className="text-3xl md:text-4xl font-cursive text-center bg-gold-100 border-b-2 border-gold-600 focus:outline-none focus:border-maroon-700 text-maroon-700 w-full max-w-md rounded-lg px-4 py-2"
                    placeholder="Bride's Name"
                  />
                </div>
              )}
            </div>

            {/* Invitation Content */}
            <div className="mb-16 flex justify-center">
              <div className="max-w-4xl w-full">
                <div className="invitation-content">
                    {!isEditing ? (
                      <p className="invitation-text">
                        {weddingDetails.invitationText}
                      </p>
                    ) : (
                      <textarea
                        value={editData.invitationText}
                        onChange={(e) => setEditData({ ...editData, invitationText: e.target.value })}
                        className="w-full h-32 invitation-text bg-gold-50 border-2 border-gold-300 rounded-lg p-4 focus:outline-none focus:border-gold-600 resize-none text-maroon-800"
                        placeholder="Enter invitation text..."
                      />
                    )}
                </div>
              </div>
            </div>

            {/* Flower Garland Divider */}
            <div className="mb-16 flex justify-center">
              <div className="flower-garland">
                <div className="garland-line"></div>
                <div className="garland-flowers">
                  <span className="garland-flower">🌸</span>
                  <span className="garland-flower">🌺</span>
                  <span className="garland-flower">🌼</span>
                  <span className="garland-flower">🌻</span>
                  <span className="garland-flower">🌷</span>
                  <span className="garland-flower">🌹</span>
                  <span className="garland-flower">🌸</span>
                  <span className="garland-flower">🌺</span>
                  <span className="garland-flower">🌼</span>
                  <span className="garland-flower">🌻</span>
                  <span className="garland-flower">🌷</span>
                </div>
              </div>
            </div>

            {/* Ceremony Details Table */}
            <div className="ceremony-table">
              <div className="bg-gradient-to-br from-gold-100 to-gold-200 bg-opacity-95 rounded-lg shadow-2xl overflow-hidden border-4 border-gold-600">
                <div className="bg-gradient-to-r from-maroon-800 to-gold-700 text-gold-200 p-6">
                  <h2 className="text-3xl font-cursive font-bold text-center">Ceremony Details</h2>
                </div>
                
                {!isEditing ? (
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gold-300">
                            <th className="text-left py-4 px-6 font-cursive text-xl text-maroon-800">Event</th>
                            <th className="text-left py-4 px-6 font-cursive text-xl text-maroon-800">Date & Time</th>
                            <th className="text-left py-4 px-6 font-cursive text-xl text-maroon-800">Venue</th>
                            <th className="text-left py-4 px-6 font-cursive text-xl text-maroon-800">Location</th>
                          </tr>
                        </thead>
                        <tbody>
                          {weddingDetails.ceremonies.map((ceremony, index) => (
                            <tr key={index} className="border-b border-gold-200 hover:bg-gold-100 transition-colors">
                              <td className="py-6 px-6 font-cursive text-lg font-semibold text-maroon-800">
                                {ceremony.name}
                              </td>
                              <td className="py-6 px-6 font-cursive text-maroon-700">
                                <div>{ceremony.date}</div>
                                <div className="text-gold-700 font-medium">{ceremony.time}</div>
                              </td>
                              <td className="py-6 px-6 font-cursive text-maroon-700 font-medium">
                                {ceremony.location}
                              </td>
                              <td className="py-6 px-6">
                                <div className="text-maroon-700 font-cursive mb-2">{ceremony.address}</div>
                                <a
                                  href={ceremony.mapLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center bg-gradient-to-r from-gold-600 to-maroon-600 text-gold-200 px-4 py-2 rounded-lg hover:from-gold-700 hover:to-maroon-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                                >
                                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                  </svg>
                                  View Map
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 space-y-6">
                    {editData.ceremonies.map((ceremony, index) => (
                      <div key={index} className="bg-gold-100 p-6 rounded-lg border-2 border-gold-300">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-cursive font-bold text-maroon-800">Event {index + 1}</h3>
                          <button
                            onClick={() => removeCeremony(index)}
                            className="bg-maroon-600 hover:bg-maroon-700 text-gold-200 px-3 py-1 rounded text-sm transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={ceremony.name}
                            onChange={(e) => updateCeremony(index, 'name', e.target.value)}
                            placeholder="Event Name"
                            className="px-4 py-2 border-2 border-gold-400 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-600 outline-none bg-gold-50 text-maroon-800"
                          />
                          <input
                            type="text"
                            value={ceremony.date}
                            onChange={(e) => updateCeremony(index, 'date', e.target.value)}
                            placeholder="Date"
                            className="px-4 py-2 border-2 border-gold-400 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-600 outline-none bg-gold-50 text-maroon-800"
                          />
                          <input
                            type="text"
                            value={ceremony.time}
                            onChange={(e) => updateCeremony(index, 'time', e.target.value)}
                            placeholder="Time"
                            className="px-4 py-2 border-2 border-gold-400 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-600 outline-none bg-gold-50 text-maroon-800"
                          />
                          <input
                            type="text"
                            value={ceremony.location}
                            onChange={(e) => updateCeremony(index, 'location', e.target.value)}
                            placeholder="Venue Name"
                            className="px-4 py-2 border-2 border-gold-400 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-600 outline-none bg-gold-50 text-maroon-800"
                          />
                          <input
                            type="text"
                            value={ceremony.address}
                            onChange={(e) => updateCeremony(index, 'address', e.target.value)}
                            placeholder="Address"
                            className="px-4 py-2 border-2 border-gold-400 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-600 outline-none bg-gold-50 text-maroon-800 md:col-span-1"
                          />
                          <input
                            type="url"
                            value={ceremony.mapLink}
                            onChange={(e) => updateCeremony(index, 'mapLink', e.target.value)}
                            placeholder="Google Maps Link"
                            className="px-4 py-2 border-2 border-gold-400 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-600 outline-none bg-gold-50 text-maroon-800 md:col-span-1"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={addCeremony}
                      className="w-full bg-gradient-to-r from-gold-600 to-maroon-600 text-gold-200 py-3 rounded-lg hover:from-gold-700 hover:to-maroon-700 transition-all duration-300 font-medium"
                    >
                      Add New Event
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
