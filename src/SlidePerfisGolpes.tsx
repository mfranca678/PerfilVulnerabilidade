import { Card, CardContent } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

export default function SlidePerfisGolpes() {
  return (
    <Tabs defaultValue="perfilA" className="w-full p-4">
      <TabsList className="flex flex-wrap gap-2 mb-4">
        <TabsTrigger value="perfilA">Solitário</TabsTrigger>
        <TabsTrigger value="perfilB">Ambicioso</TabsTrigger>
        <TabsTrigger value="perfilC">Superconfiante Digital</TabsTrigger>
        <TabsTrigger value="perfilD">Apressado</TabsTrigger>
        <TabsTrigger value="perfilE">Generoso</TabsTrigger>
        <TabsTrigger value="perfilF">Gestor</TabsTrigger>
      </TabsList>

      <TabsContent value="perfilA">
        <Card>
          <CardContent className="p-4 text-left">
            <h2 className="text-xl font-bold mb-2">Perfil A – Solitário (emocional)</h2>
            <p className="mb-2">Busca por afeto torna a pessoa mais suscetível a golpes emocionais como o golpe do amor ou parcerias falsas.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Desconfie de envolvimentos que evoluem rápido demais.</li>
              <li>Evite enviar dinheiro ou dados pessoais a desconhecidos online.</li>
              <li>Use o “conselho espelho”.</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="perfilB">
        <Card>
          <CardContent className="p-4 text-left">
            <h2 className="text-xl font-bold mb-2">Perfil B – Ambicioso/Inocente Financeiro</h2>
            <p className="mb-2">Desejo de ganhar dinheiro rápido pode levar a cair em pirâmides, fraudes de investimento ou promessas milagrosas.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Pesquise antes de investir.</li>
              <li>Evite confiar em promessas de retorno rápido.</li>
              <li>Cheque CNPJs e históricos de quem oferece.</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="perfilC">
        <Card>
          <CardContent className="p-4 text-left">
            <h2 className="text-xl font-bold mb-2">Perfil C – Superconfiante Digital</h2>
            <p className="mb-2">A confiança excessiva no ambiente digital pode expor a golpes como phishing, vazamento de senhas e apps falsos.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use senhas diferentes.</li>
              <li>Habilite autenticação de dois fatores.</li>
              <li>Verifique links antes de clicar.</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="perfilD">
        <Card>
          <CardContent className="p-4 text-left">
            <h2 className="text-xl font-bold mb-2">Perfil D – Apressado/Desatento</h2>
            <p className="mb-2">Tomar decisões com pressa ou sem revisar pode facilitar fraudes operacionais, boletos falsos ou cobranças indevidas.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Evite decisões sob pressão.</li>
              <li>Revise boletos e e-mails com calma.</li>
              <li>Utilize automações seguras.</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="perfilE">
        <Card>
          <CardContent className="p-4 text-left">
            <h2 className="text-xl font-bold mb-2">Perfil E – Generoso/Ingênuo Social</h2>
            <p className="mb-2">A vontade de ajudar pode ser explorada por golpistas que criam campanhas falsas ou situações de urgência.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cheque a veracidade antes de doar.</li>
              <li>Utilize canais oficiais para doações.</li>
              <li>Prudência também é generosidade.</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="perfilF">
        <Card>
          <CardContent className="p-4 text-left">
            <h2 className="text-xl font-bold mb-2">Perfil F – Gestor Ocupado/Corporativo</h2>
            <p className="mb-2">Sobrecarregado de decisões, esse perfil está mais exposto a fraudes corporativas, e-mails falsos ou engenharia social.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Adote validações e duplas conferências.</li>
              <li>Treine a equipe contra golpes digitais.</li>
              <li>Documente os fluxos críticos.</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
