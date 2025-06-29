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
  const [formData, setFormData] = useState({ question: "", answer: "", topic: "" });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchFlashcards = async () => {
      try {
        const snapshot = await getDocs(collection(db, "flashcards"));
        const cards = snapshot.docs.map((docSnap) => ({
          docId: docSnap.id,
          ...docSnap.data(),
        }));
        setFlashcards(cards.reverse());
      } catch (error) {
        console.error("Error loading flashcards:", error);
      }
    };
    fetchFlashcards();
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === "bestdoctorprep") setIsAuthenticated(true);
    else alert("Incorrect password");
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    const { question, answer, topic } = formData;
    if (!question || !answer) {
      alert("Please fill in both question and answer.");
      return;
    }

    try {
      if (editId) {
        const cardRef = doc(db, "flashcards", editId);
        await updateDoc(cardRef, { question, answer, topic });
        setFlashcards((prev) =>
          prev.map((card) =>
            card.docId === editId ? { ...card, question, answer, topic } : card
          )
        );
        setEditId(null);
      } else {
        const docRef = await addDoc(collection(db, "flashcards"), {
          question,
          answer,
          topic,
        });
        setFlashcards([{ docId: docRef.id, question, answer, topic }, ...flashcards]);
      }

      setFormData({ question: "", answer: "", topic: "" });
    } catch (error) {
      console.error("Error saving flashcard:", error);
      alert("Failed to save flashcard.");
    }
  };

  const handleDelete = async (docId: string) => {
    if (!confirm("Are you sure you want to delete this flashcard?")) return;
    try {
      await deleteDoc(doc(db, "flashcards", docId));
      setFlashcards(flashcards.filter((card) => card.docId !== docId));
    } catch (err) {
      console.error("Error deleting flashcard:", err);
      alert("Delete failed.");
    }
  };

  const handleEdit = (card: any) => {
    setFormData({
      question: card.question,
      answer: card.answer,
      topic: card.topic || "",
    });
    setEditId(card.docId);
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
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        🧠 {editId ? "Edit Flashcard" : "Add New Flashcard"}
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
          onClick={handleAddOrUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editId ? "✏️ Update Flashcard" : "➕ Add Flashcard"}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">📋 Flashcards Preview</h2>
      {flashcards.length === 0 ? (
        <p>No flashcards yet.</p>
      ) : (
        <ul className="space-y-2">
          {flashcards.map((card) => (
            <li key={card.docId} className="border p-3 rounded shadow-sm bg-white">
              <div className="text-sm text-gray-500">ID: {card.docId}</div>
              <div className="font-semibold">Q: {card.question}</div>
              <div>A: {card.answer}</div>
              <div className="text-sm italic text-gray-600">Topic: {card.topic}</div>
              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => handleEdit(card)}
                  className="text-sm text-blue-600 underline"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(card.docId)}
                  className="text-sm text-red-600 underline"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}