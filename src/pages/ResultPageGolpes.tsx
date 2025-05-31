// src/pages/ResultPageGolpes.tsx
import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, scoreByProfile } = location.state || {};
  const resultRef = useRef<HTMLDivElement>(null);

  const perfis: Record<string, { titulo: string; descricao: string; detalhes: string }> = {
    A: {
      titulo: "Perfil A – Solitário (emocional)",
      descricao: "Você tende a valorizar conexões afetivas e pode ser suscetível a golpes emocionais.",
      detalhes:
        "Você demonstra sinais de que valoriza muito as conexões emocionais...\n\n\uD83D\uDEE1️ Cuidados recomendados:\n- Desconfie de envolvimentos que evoluem rápido demais.\n- Evite enviar dinheiro ou dados pessoais a pessoas que conheceu recentemente online.\n- Pratique o “conselho espelho”: pergunte a si mesmo o que diria a um amigo na mesma situação.",
    },
    B: {
      titulo: "Perfil B – Ambicioso ou Financeiramente Inocente",
      descricao: "Seu foco em crescimento financeiro pode ser explorado por promessas de lucros rápidos.",
      detalhes:
        "Você tem uma relação curiosa ou aberta com oportunidades financeiras...\n\n\uD83D\uDEE1️ Cuidados recomendados:\n- Nunca invista sem entender claramente o funcionamento da proposta.\n- Pesquise quem está oferecendo: CNPJ, site, histórico e reputação.\n- Lembre-se: toda oportunidade “garantida e rápida” demais deve ser vista com extrema cautela.",
    },
    C: {
      titulo: "Perfil C – Superconfiante Digital",
      descricao: "Você é ágil no uso de tecnologia, mas corre riscos ao confiar demais.",
      detalhes:
        "Você lida com o mundo digital com certa naturalidade e confiança...\n\n\uD83D\uDEE1️ Cuidados recomendados:\n- Use senhas fortes e diferentes em cada serviço.\n- Nunca clique em links sem verificar a origem.\n- Habilite autenticação de dois fatores sempre que possível.",
    },
    D: {
      titulo: "Perfil D – Apressado ou Desatento",
      descricao: "Sua rotina intensa pode levar a decisões impulsivas.",
      detalhes:
        "Sua rotina é intensa e você pode acabar tomando decisões rápidas...\n\n\uD83D\uDEE1️ Cuidados recomendados:\n- Antes de pagar qualquer informação urgente, respire e revise com calma.\n- Tenha um checklist de verificação.\n- Use aplicativos de leitura de boletos e automações.",
    },
    E: {
      titulo: "Perfil E – Generoso ou Ingênuo Social",
      descricao: "Sua empatia pode ser explorada por golpistas com histórias comoventes.",
      detalhes:
        "Você tem um perfil altruísta, empático...\n\n\uD83D\uDEE1️ Cuidados recomendados:\n- Antes de ajudar, confirme com outra fonte.\n- Não tenha receio de parecer desconfiado.\n- Procure doar sempre por canais oficiais.",
    },
    F: {
      titulo: "Perfil F – Gestor Ocupado ou Corporativo",
      descricao: "Com múltiplas tarefas, você pode delegar sem verificação.",
      detalhes:
        "Você provavelmente lida com várias decisões e responsabilidades...\n\n\uD83D\uDEE1️ Cuidados recomendados:\n- Tenha um segundo olhar para aprovações financeiras importantes.\n- Estabeleça processos claros contra urgências suspeitas.\n- Treine sua equipe sobre boas práticas de segurança.",
    },
  };

  if (!profile || !perfis[profile]) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Perfil não identificado</h1>
        <p>Não foi possível identificar seu perfil. Verifique se você completou o questionário corretamente.</p>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("resultado-perfil-golpes.pdf");
  };

  const chartData = Object.entries(scoreByProfile).map(([key, value]) => ({ perfil: key, pontuacao: value }));

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6" ref={resultRef}>
      <h1 className="text-3xl font-bold">{perfis[profile].titulo}</h1>
      <p className="text-lg mb-4">{perfis[profile].detalhes}</p>

      <h2 className="text-2xl font-semibold mt-6">Seu Mapa de Vulnerabilidade</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="perfil" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="pontuacao" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <table className="w-full border text-left mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Perfil</th>
            <th className="p-2">Pontuação</th>
            <th className="p-2">Descrição Resumida</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(scoreByProfile).map(([key, score]) => (
            <tr key={key} className={key === profile ? "bg-yellow-100 font-semibold" : ""}>
              <td className="p-2">{perfis[key]?.titulo || `Perfil ${key}`}</td>
              <td className="p-2">{score}</td>
              <td className="p-2">{perfis[key]?.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4 mt-6">
        <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Refazer o Teste
        </button>
        <button onClick={handleDownloadPDF} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Baixar PDF
        </button>
      </div>
    </div>
  );
}
