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
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const loadCards = async () => {
      const snapshot = await getDocs(collection(db, "flashcards"));
      const docs = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      })) as Flashcard[];
      setCards(docs.reverse()); // latest first
    };
    loadCards();
  }, []);

  const current = cards[index];

  return (
    <main className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🧠 Flashcard Session</h1>

      {cards.length === 0 ? (
        <p>Loading cards...</p>
      ) : (
        <>
          <div className="border rounded p-6 shadow bg-white">
            <p className="text-sm text-gray-500 mb-2">Topic: {current.topic || "Untitled"}</p>
            <h2 className="text-lg font-semibold mb-4">{current.question}</h2>

            {showAnswer ? (
              <p className="text-green-700 font-medium">{current.answer}</p>
            ) : (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => setShowAnswer(true)}
              >
                Show Answer
              </button>
            )}
          </div>

          <div className="mt-4 flex justify-between">
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
            <button
              className="text-sm text-gray-600 underline disabled:text-gray-300"
              onClick={() => {
                setIndex((prev) => Math.min(cards.length - 1, prev + 1));
                setShowAnswer(false);
              }}
              disabled={index === cards.length - 1}
            >
              Next ➡️
            </button>
          </div>
        </>
      )}
    </main>
  );
}
