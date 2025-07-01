"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

type Flashcard = {
  docId: string;
  question: string;
  answer: string;
  topic?: string;
};

export default function FlashcardsPage() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [filtered, setFiltered] = useState<Flashcard[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const loadCards = async () => {
      const snapshot = await getDocs(collection(db, "flashcards"));
      const docs = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      })) as Flashcard[];

      const sorted = docs.reverse();
      setCards(sorted);
      setFiltered(sorted);

      const foundTopics = Array.from(
        new Set(sorted.map((c) => c.topic?.trim()).filter(Boolean))
      );
      setTopics(foundTopics as string[]);
    };
    loadCards();
  }, []);

  useEffect(() => {
    const results =
      selectedTopic === "all"
        ? cards
        : cards.filter((c) => c.topic === selectedTopic);
    setFiltered(results);
    setIndex(0);
    setFlipped(false);
  }, [selectedTopic, cards]);

  const current = filtered[index];

  return (
    <main className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🧠 Flashcard Session</h1>

      {filtered.length === 0 ? (
        <p>No flashcards found for this topic.</p>
      ) : (
        <>
          <div className="mb-4">
            <label className="text-sm mr-2">Filter by Topic:</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="all">All</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          {/* Flip Card */}
          <div className="relative w-full h-64 mb-4 perspective">
            <div
              className={`transition-transform duration-500 w-full h-full transform-style preserve-3d ${
                flipped ? "rotate-y-180" : ""
              }`}
            >
              {/* Front */}
              <div className="absolute w-full h-full backface-hidden bg-white border rounded shadow p-6 flex flex-col justify-center items-center">
                <p className="text-xs text-blue-600 uppercase tracking-wide mb-2">
                  {current.topic || "Untitled"}
                </p>
                <p className="text-[10px] text-gray-400 mb-1">
                  ID: {current.docId}
                </p>
                <h2 className="text-lg font-semibold">{current.question}</h2>
              </div>

              {/* Back */}
              <div className="absolute w-full h-full backface-hidden bg-green-100 border rounded shadow p-6 transform rotate-y-180 flex items-center justify-center">
                <p className="text-green-800 font-medium">{current.answer}</p>
              </div>
            </div>
          </div>

          {!flipped && (
            <button
              onClick={() => setFlipped(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Show Answer
            </button>
          )}

          <div className="mt-4 flex justify-between items-center">
            <button
              className="text-sm text-gray-600 underline disabled:text-gray-300"
              onClick={() => {
                setIndex((prev) => Math.max(0, prev - 1));
                setFlipped(false);
              }}
              disabled={index === 0}
            >
