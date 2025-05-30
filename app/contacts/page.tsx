"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const vCardContent = process.env.NEXT_PUBLIC_VCARD_CONTENT || "";

    const parsedContacts = parseVCard(vCardContent);
    setContacts(parsedContacts);
    setFilteredContacts(parsedContacts);
  }, []);

  const parseVCard = (vCardText: string) => {
    const contacts = [];
    const cards = vCardText.split("BEGIN:VCARD").slice(1);

    cards.forEach((card) => {
      const nameMatch = card.match(/FN:(.+)/);
      const telMatch = card.match(/TEL[^:]*:(.+)/);
      const emailMatch = card.match(/EMAIL[^:]*:(.+)/);

      // Handle multi-line Base64 photo
      const photoLines = [];
      const photoRegex = /PHOTO;ENCODING=BASE64;JPEG:(.+)/;
      const lines = card.split("\n");
      let isPhoto = false;

      lines.forEach((line) => {
        if (photoRegex.test(line)) {
          photoLines.push(line.match(photoRegex)[1].trim());
          isPhoto = true;
        } else if (isPhoto) {
          if (line.startsWith(" ") || line.startsWith("\t")) {
            photoLines.push(line.trim());
          } else {
            isPhoto = false; // End of photo data
          }
        }
      });

      const photoData = photoLines.length > 0 ? photoLines.join("") : null;
      console.log("Photo Data:", photoData);

      if (nameMatch || telMatch || emailMatch || photoData) {
        contacts.push({
          name: nameMatch ? nameMatch[1].trim() : "",
          phone: telMatch ? telMatch[1].trim() : "",
          email: emailMatch ? emailMatch[1].trim() : "",
          photo: photoData ? `data:image/jpeg;base64,${photoData}` : null,
        });
      }
    });

    return contacts;
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.name?.toLowerCase().includes(term) ||
          contact.phone?.toLowerCase().includes(term) ||
          contact.email?.toLowerCase().includes(term)
      )
    );
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleMessage = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-center">Contact Manager</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name, phone, or email"
            className="w-full border text-black border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Contact List */}
        <div>
          {filteredContacts.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredContacts.map((contact, index) => (
                <li
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  {contact.photo ? (
                    <img
                      src={contact.photo}
                      alt={`${contact.name}'s photo`}
                      className="w-24 h-24 rounded-full mb-4 mx-auto border border-gray-300 shadow-sm"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full mb-4 mx-auto border border-gray-300 shadow-sm bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No Photo</span>
                    </div>
                  )}
                  <p className="text-lg font-semibold text-gray-800">
                    {contact.name || "Unknown Name"}
                  </p>
                  <p className="text-gray-600">{contact.phone || "No Phone"}</p>
                  <p className="text-gray-600">{contact.email || "No Email"}</p>
                  <div className="mt-4 flex gap-2">
                    {contact.phone && (
                      <button
                        onClick={() => handleCall(contact.phone)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-blue-600 transition-colors"
                      >
                        Call
                      </button>
                    )}
                    {contact.email && (
                      <button
                        onClick={() => handleMessage(contact.email)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-green-600 transition-colors"
                      >
                        Message
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No contacts found.</p>
          )}
        </div>
      </main>
    </div>
  );
}