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
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

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
    setShowAnswer(false);
  }, [selectedTopic, cards]);

  const current = filtered[index];

  return (
    <main className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🧠 Flashcard Session</h1>

      {filtered.length === 0 || !current ? (
        <p>Loading or no flashcards found.</p>
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

          {/* Static Card */}
          <div className="border rounded shadow p-6 bg-white relative min-h-[150px]">
            <p className="absolute top-2 right-3 text-[10px] text-gray-400">
              ID: {current.docId}
            </p>
            <p className="text-xs text-blue-600 uppercase tracking-wide mb-2">
              {current.topic || "Untitled"}
            </p>
            <h2 className="text-lg font-semibold mb-4">{current.question}</h2>

            {showAnswer && (
              <div className="text-green-800 font-medium border-t pt-4 mt-4">
                {current.answer}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowAnswer((prev) => !prev)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>

          <div className="mt-4 flex justify-between items-center">
            <button
              className="text-sm text-gray-600 underline disabled:text-gray-300"
              onClick={() => {
                setIndex((prev) => Math.max(0, prev - 1));
                setShowAnswer(false);
              }}
              disabled={index === 0}
            >
              ⬅️ Previous
            </button>

            <p className="text-sm">
              Card {index + 1} of {filtered.length}
            </p>

            <button
              className="text-sm text-gray-600 underline disabled:text-gray-300"
              onClick={() => {
                setIndex((prev) => Math.min(filtered.length - 1, prev + 1));
                setShowAnswer(false);
              }}
              disabled={index === filtered.length - 1}
            >
              Next ➡️
            </button>
          </div>
        </>
      )}
    </main>
  );
}
