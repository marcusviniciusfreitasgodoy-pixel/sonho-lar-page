import { renderArticleContent } from "@/lib/renderArticleContent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import "@/styles/landing-v4.css";
import "@/styles/blog.css";

type Props = {
  open: boolean;
  onClose: () => void;
  titulo: string;
  resumo: string;
  conteudo: string;
  imagem_capa: string;
  data_publicacao: string; // yyyy-mm-dd
};

function formatDate(d: string) {
  try {
    return new Date(d + "T12:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

const ArtigoPreview = ({ open, onClose, titulo, resumo, conteudo, imagem_capa, data_publicacao }: Props) => {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>Pré-visualização</DialogTitle>
        </DialogHeader>
        <div className="landing-v4">
          <div className="article-page" style={{ padding: "20px 24px 60px", minHeight: 0 }}>
            <article className="article-wrap">
              <span className="article-date">{formatDate(data_publicacao)}</span>
              <h1 className="article-title">{titulo || "Sem título"}</h1>
              {imagem_capa && (
                <img src={imagem_capa} alt={titulo} className="article-cover" />
              )}
              {resumo && <p className="article-resumo">{resumo}</p>}
              <div className="article-content">{renderArticleContent(conteudo || "")}</div>
            </article>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtigoPreview;