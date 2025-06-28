// File: app/admin/page.tsx

"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    topic: "",
  });

useEffect(() => {
  const fetchFlashcards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "flashcards"));
      const fetchedCards: any[] = [];
      querySnapshot.forEach((doc) => {
        fetchedCards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(fetchedCards.reverse()); // Show latest first
    } catch (error) {
      console.error("Error fetching flashcards: ", error);
    }
  };

  if (isAuthenticated) {
    fetchFlashcards();
  }
}, [isAuthenticated]);

  const handleLogin = () => {
    if (password === "bestdoctorprep") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleAddFlashcard = async () => {
  if (!formData.question || !formData.answer) {
    alert("Please fill out both question and answer");

    import { deleteDoc, doc } from "firebase/firestore";

const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Are you sure you want to delete this flashcard?");
  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "flashcards", id));
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    alert("Failed to delete flashcard. Try again.");
  }
};

    const handleDelete = async (id: string) => {
  try {
    await deleteDoc(doc(db, "flashcards", id));
    setFlashcards(flashcards.filter((card) => card.id !== id));
  } catch (error) {
    console.error("Error deleting flashcard: ", error);
    alert("Failed to delete flashcard");
  }
};
    return;
  }

  const newCard = {
    id: uuidv4().slice(0, 8),
    ...formData,
    createdAt: new Date().toISOString(),
  };

  try {
    await addDoc(collection(db, "flashcards"), newCard);
    setFlashcards([newCard, ...flashcards]);
    setFormData({ question: "", answer: "", topic: "" });
  } catch (err) {
    console.error("Error adding document: ", err);
    alert("Failed to save flashcard. Try again.");
  }
};

  if (!isAuthenticated) {
    return (
      <main className="p-6 max-w-md mx-auto text-center">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          className="border rounded px-3 py-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧠 Add New Flashcard</h1>
      <div className="space-y-3 mb-6">
        <input
          type="text"
          name="question"
          placeholder="Question"
          className="border rounded px-3 py-2 w-full"
          value={formData.question}
          onChange={handleChange}
        />
        <input
          type="text"
          name="answer"
          placeholder="Answer"
          className="border rounded px-3 py-2 w-full"
          value={formData.answer}
          onChange={handleChange}
        />
        <input
          type="text"
          name="topic"
          placeholder="Topic (optional)"
          className="border rounded px-3 py-2 w-full"
          value={formData.topic}
          onChange={handleChange}
        />
        <button
          onClick={handleAddFlashcard}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ➕ Add Flashcard
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">📋 Flashcards Preview</h2>
      {flashcards.length === 0 && <p>No flashcards yet.</p>}
      <ul className="space-y-2">
{flashcards.map((card) => (
  <li key={card.id} className="border p-3 rounded shadow-sm bg-white">
    <div className="text-sm text-gray-500">ID: {card.id}</div>
    <div className="font-semibold">Q: {card.question}</div>
    <div>A: {card.answer}</div>
    <div className="text-sm italic text-gray-600">Topic: {card.topic}</div>
    <button
      onClick={() => handleDelete(card.id)}
      className="mt-2 text-sm text-red-600 underline"
    >
      🗑️ Delete
    </button>
  </li>
))}
      </ul>
    </main>
  );
}