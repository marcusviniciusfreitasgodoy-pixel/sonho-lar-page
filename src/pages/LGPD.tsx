const LGPD = () => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-luxury-navy mb-8">LGPD - Lei Geral de Proteção de Dados</h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p><strong>Última atualização:</strong> Janeiro de 2025</p>
          
          <h2 className="text-2xl font-semibold text-luxury-navy mt-8">Compromisso com a LGPD</h2>
          <p>
            A Godoy Prime Realty está comprometida com a proteção dos dados pessoais de seus clientes 
            e visitantes, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
          </p>
          
          <h2 className="text-2xl font-semibold text-luxury-navy mt-8">Base Legal para Tratamento</h2>
          <p>Tratamos seus dados pessoais com base em:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Consentimento:</strong> Quando você nos autoriza expressamente</li>
            <li><strong>Execução de contrato:</strong> Para prestação dos serviços contratados</li>
            <li><strong>Legítimo interesse:</strong> Para melhorar nossos serviços</li>
            <li><strong>Cumprimento de obrigação legal:</strong> Quando exigido por lei</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-luxury-navy mt-8">Seus Direitos (Art. 18 da LGPD)</h2>
          <p>Como titular dos dados, você tem direito a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Confirmação da existência de tratamento</li>
            <li>Acesso aos dados</li>
            <li>Correção de dados incompletos ou desatualizados</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
            <li>Portabilidade dos dados</li>
            <li>Eliminação dos dados tratados com consentimento</li>
            <li>Informação sobre compartilhamento de dados</li>
            <li>Revogação do consentimento</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-luxury-navy mt-8">Encarregado de Dados (DPO)</h2>
          <p>
            Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados pessoais, 
            entre em contato com nosso Encarregado de Proteção de Dados:
          </p>
          <p>
            <strong>Nome:</strong> Marcus Godoy<br />
            <strong>E-mail:</strong> marcus@godoyprime.com.br<br />
            <strong>Telefone:</strong> (21) 4040-0067
          </p>
          
          <h2 className="text-2xl font-semibold text-luxury-navy mt-8">Tempo de Retenção</h2>
          <p>
            Mantemos seus dados pelo tempo necessário para cumprir as finalidades para as quais foram 
            coletados, incluindo obrigações legais, contratuais, de prestação de contas ou requisição 
            de autoridades competentes.
          </p>
          
          <h2 className="text-2xl font-semibold text-luxury-navy mt-8">Autoridade Nacional</h2>
          <p>
            Caso entenda que o tratamento de dados pessoais viola a legislação, você pode apresentar 
            reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
          </p>
        </div>
        
        <div className="mt-12">
          <a href="/" className="text-luxury-gold hover:underline">← Voltar para a página inicial</a>
        </div>
      </div>
    </div>
  );
};

export default LGPD;
