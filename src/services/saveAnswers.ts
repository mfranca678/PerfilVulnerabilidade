// src/services/saveAnswers.ts
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase";

const db = getFirestore();

export async function saveAnswers(answers: Record<string, number>) {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");

  const docRef = await addDoc(collection(db, "questionarios"), {
    uid: user.uid,
    email: user.email,
    respostas: answers,
    data: new Date().toISOString()
  });

  return docRef.id;
}
