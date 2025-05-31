// src/pages/QuestionnairePage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAnswers } from "../services/saveAnswers";

const questions = [
  { text: "Já compartilhei dados pessoais em sites ou apps sem verificar a segurança.", profile: "C" },
  { text: "Me comovo facilmente com histórias tristes e pedidos de ajuda.", profile: "E" },
  { text: "Tenho dificuldade para entender como funciona o mercado financeiro.", profile: "B" },
  { text: "Já aprovei pagamentos ou transferências sem checar todos os dados.", profile: "F" },
  { text: "Costumo seguir conselhos de influenciadores ou gurus sem checar fontes.", profile: "B" },
  { text: "Me sinto sozinho(a) com frequência e valorizo muito quem me escuta.", profile: "A" },
  { text: "Costumo clicar em links recebidos por mensagem sem conferir a origem.", profile: "C" },
  { text: "Já fiz transferências para ajudar pessoas em apuros sem confirmar a história.", profile: "E" },
  { text: "Gosto da ideia de enriquecer rapidamente.", profile: "B" },
  { text: "Tenho uma rotina tão intensa que delego decisões sem revisar com cuidado.", profile: "F" },
  { text: "Já tive uma relação virtual com alguém que não conhecia pessoalmente.", profile: "A" },
  { text: "Pago boletos rapidamente, sem conferir todos os detalhes.", profile: "D" },
  { text: "Já baixei arquivos ou apps sem saber se eram confiáveis.", profile: "C" },
  { text: "Evito parecer desconfiado(a) para não magoar os outros.", profile: "E" },
  { text: "Já fui enganado(a) por confiar demais em quem parecia simpático.", profile: "E" },
  { text: "Tenho muitos compromissos e pouco tempo para ler termos e contratos.", profile: "D" },
  { text: "Costumo conversar com estranhos online para desabafar.", profile: "A" },
  { text: "Uso a mesma senha em vários sites.", profile: "C" },
  { text: "Já investi em algo que prometia retorno fora da realidade.", profile: "B" },
  { text: "Tenho dificuldade em dizer “não” quando alguém me pede ajuda.", profile: "E" },
  { text: "Respondo e-mails rapidamente, mesmo sem analisar o conteúdo a fundo.", profile: "F" },
  { text: "Já transferi dinheiro por conta de uma cobrança ou pedido que depois descobri ser falso.", profile: "D" },
  { text: "Tenho medo de ficar sozinho(a) e idealizo pessoas que mostram atenção por mim.", profile: "A" },
  { text: "Não costumo verificar a veracidade de campanhas de doação ou vaquinhas.", profile: "E" },
  { text: "Acredito que minha empresa está segura mesmo sem políticas rígidas.", profile: "F" },
  { text: "Já ajudei financeiramente alguém que conheci online.", profile: "A" },
  { text: "Já recebi cobranças urgentes que depois percebi serem falsas.", profile: "D" },
  { text: "Tenho o hábito de confiar em mensagens que parecem ser de bancos ou empresas.", profile: "C" },
  { text: "Faço tudo com pressa e não paro para conferir detalhes.", profile: "D" },
  { text: "Acho que golpes acontecem com os outros, não comigo.", profile: "C" }
];

const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, number>>({ A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 5;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const [selectedValues, setSelectedValues] = useState<number[]>(Array(questions.length).fill(-1));

  const handleChange = (questionIndex: number, profile: string, value: number) => {
    const oldValue = selectedValues[questionIndex];
    const updated = [...selectedValues];
    updated[questionIndex] = value;
    setSelectedValues(updated);
    if (oldValue !== -1) {
      setAnswers((prev) => ({ ...prev, [profile]: prev[profile] - oldValue + value }));
    } else {
      setAnswers((prev) => ({ ...prev, [profile]: prev[profile] + value }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (selectedValues.includes(-1)) {
        alert("Responda todas as perguntas antes de enviar.");
        return;
      }

      console.log("Tentando salvar as respostas:", answers);

      const profile = Object.entries(answers).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
      await saveAnswers(answers);

      console.log("Respostas salvas com sucesso. Redirecionando...");

      navigate("/resultado", { state: { profile, scoreByProfile: answers } });
    } catch (err) {
      alert("Erro ao salvar respostas. Verifique sua conexão e tente novamente.");
      console.error(err);
    }
  };

  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    currentPage * questionsPerPage + questionsPerPage
  );

  const progressPercent = Math.round(((currentPage + 1) / totalPages) * 100);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Questionário</h1>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-blue-600 h-3 rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mb-4">Página {currentPage + 1} de {totalPages}</p>
      <div className="space-y-6">
        {currentQuestions.map((q, index) => {
          const globalIndex = currentPage * questionsPerPage + index;
          return (
            <div key={globalIndex} className="bg-white p-4 shadow rounded">
              <p className="mb-2 font-medium">{q.text}</p>
              <div className="flex gap-4 flex-wrap">
                {[0, 1, 2, 3].map((val) => (
                  <button
                    key={val}
                    className={`px-4 py-2 rounded border ${selectedValues[globalIndex] === val ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    onClick={() => handleChange(globalIndex, q.profile, val)}
                  >
                    {val} - {val === 0 ? "Nunca" : val === 1 ? "Raramente" : val === 2 ? "Às vezes" : "Sempre"}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            className="bg-gray-400 text-white px-6 py-2 rounded"
          >
            Voltar
          </button>
        )}

        {currentPage < totalPages - 1 ? (
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ml-auto"
          >
            Próximo
          </button>
        ) : (
          <button
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ml-auto"
            onClick={handleSubmit}
         >
            Finalizar e enviar respostas
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionnairePage;
