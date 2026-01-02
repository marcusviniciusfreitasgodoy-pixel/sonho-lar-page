const Privacidade = () => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-luxury-navy mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p><strong>Última atualização:</strong> Janeiro de 2025</p>
          
          <h2 className="text-2xl font-semibold text-luxury-navy mt-8">1. Informações que Coletamos</h2>
          <p>
            A Godoy Prime Realty coleta informações pessoais que você nos fornece diretamente, como nome, 
            e-mail, telefone e informações sobre suas preferências imobiliárias quando você entra em contato 
            conosco ou solicita nossos serviços.
          </p>
          
          <h2 className="text-2xl font-semibold text-luxury-navy mt-8">2. Como Usamos Suas Informações</h2>
          <p>Utilizamos suas informações para:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fornecer nossos serviços de consultoria imobiliária</li>
            <li>Entrar em contato sobre oportunidades relevantes</li>
            <li>Melhorar nossos serviços e experiência do cliente</li>
            <li>Cumprir obrigações legais e regulatórias</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-luxury-navy mt-8">3. Compartilhamento de Dados</h2>
          <p>
            Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins 
            de marketing. Podemos compartilhar dados apenas com parceiros essenciais para a prestação 
            dos nossos serviços (ex: advogados, cartórios) e sempre com seu consentimento.
          </p>
          
          <h2 className="text-2xl font-semibold text-luxury-navy mt-8">4. Segurança dos Dados</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações 
            contra acesso não autorizado, alteração, divulgação ou destruição.
          </p>
          
          <h2 className="text-2xl font-semibold text-luxury-navy mt-8">5. Seus Direitos</h2>
          <p>Você tem direito a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir informações incorretas</li>
            <li>Solicitar a exclusão dos seus dados</li>
            <li>Revogar consentimento a qualquer momento</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-luxury-navy mt-8">6. Contato</h2>
          <p>
            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:<br />
            <strong>E-mail:</strong> marcus@godoyprime.com.br<br />
            <strong>Telefone:</strong> (21) 4040-0067
          </p>
        </div>
        
        <div className="mt-12">
          <a href="/" className="text-luxury-gold hover:underline">← Voltar para a página inicial</a>
        </div>
      </div>
    </div>
  );
};

export default Privacidade;
