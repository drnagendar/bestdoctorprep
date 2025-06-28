// File: app/admin/page.tsx
"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function AdminPage() {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [password, setPassword] = useState("");
const [flashcards, setFlashcards] = useState<any[]>([]);
const [formData, setFormData] = useState({
question: "",
answer: "",
topic: "",
});
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
const handleAddFlashcard = () => {
if (!formData.question || !formData.answer) {
alert("Please fill out both question and answer");
return;
}
const newCard = {
id: uuidv4().slice(0, 8),
...formData,
};
setFlashcards([newCard, ...flashcards]);
setFormData({ question: "", answer: "", topic: "" });
};
if (!isAuthenticated) {
return (

Admin Login
<input
type="password"
placeholder="Enter password"
className="border rounded px-3 py-2 w-full mb-3"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>

Login


);
}
return (

🧠 Add New Flashcard





➕ Add Flashcard


  <h2 className="text-xl font-semibold mb-2">📋 Flashcards Preview</h2>
  {flashcards.length === 0 && <p>No flashcards yet.</p>}
  <ul className="space-y-2">
    {flashcards.map((card) => (
      <li
        key={card.id}
        className="border p-3 rounded shadow-sm bg-white"
      >
        <div className="text-sm text-gray-500">ID: {card.id}</div>
        <div className="font-semibold">Q: {card.question}</div>
        <div>A: {card.answer}</div>
        <div className="text-sm italic text-gray-600">Topic: {card.topic}</div>
      </li>
    ))}
  </ul>
</main>

);
}
