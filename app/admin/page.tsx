// File: app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    topic: "",
  });
  const [editId, setEditId] = useState<string | null>(null);

  // 🔁 Load flashcards
  useEffect(() => {
    const fetchFlashcards = async () => {
      const querySnapshot = await getDocs(collection(db, "flashcards"));
      const cards: any[] = [];
      querySnapshot.forEach((docSnap) => {
        cards.push({ id: docSnap.id, ...docSnap.data() }); // use Firestore ID
      });
      setFlashcards(cards.reverse());
    };

    if (isAuthenticated) {
      fetchFlashcards();
    }
  }, [isAuthenticated]);

  // 🔒 Login check
  const handleLogin = () => {
    if (password === "bestdoctorprep") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  // 📥 Input form
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ➕ or ✏️ Add / Update flashcard
  const handleAddFlashcard = async () => {
    const { question, answer, topic } = formData;
    if (!question || !answer) {
      alert("Please enter both question and answer.");
      return;
    }

    if (editId) {
      // ✏️ Update
      try {
        const docRef = doc(db, "flashcards", editId);
        await updateDoc(docRef, { question, answer, topic });
        setFlashcards((prev) =>
          prev.map((card) =>
            card.id === editId ? { ...card, question, answer, topic } : card
          )
        );
        setEditId(null);
        setFormData({ question: "", answer: "", topic: "" });
      } catch (error) {
        console.error("Update failed", error);
        alert("Failed to update flashcard.");
      }
    } else {
      // ➕ Add
      try {
        const docRef = await addDoc(collection(db, "flashcards"), {
          question,
          answer,
          topic,
          createdAt: new Date().toISOString(),
        });
        setFlashcards([{ id: docRef.id, question, answer, topic }, ...flashcards]);
        setFormData({ question: "", answer: "", topic: "" });
      } catch (error) {
        console.error("Add failed", error);
        alert("Failed to save flashcard.");
      }
    }
  };

  // 🗑️ Delete
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this flashcard?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "flashcards", id));
      setFlashcards((prev) => prev.filter((card) => card.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete flashcard.");
    }
  };

  // ✏️ Start editing
  const handleEdit = (card: any) => {
    setEditId(card.id);
    setFormData({
      question: card.question,
      answer: card.answer,
      topic: card.topic,
    });
  };

  // 🔐 Login page
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

  // 🧠 Admin dashboard
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {editId ? "✏️ Edit Flashcard" : "🧠 Add New Flashcard"}
      </h1>

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
          {editId ? "✅ Update Flashcard" : "➕ Add Flashcard"}
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
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(card)}
                className="text-blue-600 text-sm underline"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="text-red-600 text-sm underline"
              >
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}