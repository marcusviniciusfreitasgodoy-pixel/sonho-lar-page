import { useEffect, useRef, useState } from 'react';

const HeygenAvatar = () => {
  const wrapDivRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [initial, setInitial] = useState(false);

  useEffect(() => {
    const host = "https://labs.heygen.com";
    const url = host + "/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJLYXR5YV9Qcm9mZXNzaW9uYWxMb29rX3B1YmxpYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzM0OGRkZjUwM2M2NTRiOWJiYmI4YmVhOWY5MjEwZWFkXzU1ODcwL3ByZXZpZXdfdGFyZ2V0LndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6dHJ1ZSwia25vd2xlZGdlQmFzZUlkIjoiYWI2NmI1ZjNkYWRmNGQ1YmJkZTI3YmZiMDVhMzgwNjIiLCJ1c2VybmFtZSI6IjRiYjNhNThlMzlmNDQ4OTFiNzgyNWI3YzMyZWRhMDcxIn0%3D&inIFrame=1";
    
    const clientWidth = document.body.clientWidth;
    
    // Criar o wrapper div
    const wrapDiv = document.createElement("div");
    wrapDiv.id = "heygen-streaming-embed";
    wrapDivRef.current = wrapDiv;

    // Criar o container
    const container = document.createElement("div");
    container.id = "heygen-streaming-container";

    // Criar e adicionar estilos
    const stylesheet = document.createElement("style");
    stylesheet.innerHTML = `
      #heygen-streaming-embed {
        z-index: 9998;
        position: fixed;
        left: 16px;
        bottom: 80px;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
        transition: all linear 0.1s;
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
      }
      @media (min-width: 640px) {
        #heygen-streaming-embed {
          left: 24px;
          bottom: 24px;
          width: 90px;
          height: 90px;
        }
      }
      #heygen-streaming-embed.show {
        opacity: 1;
        visibility: visible;
      }
      #heygen-streaming-embed.expand {
        ${clientWidth < 540 
          ? "height: 60vh; max-height: 380px; width: 92%; left: 50%; transform: translateX(-50%); bottom: 80px;" 
          : "height: 366px; width: calc(366px * 16 / 9); bottom: 24px;"}
        border: 0;
        border-radius: 12px;
        z-index: 9999;
      }
      #heygen-streaming-container {
        width: 100%;
        height: 100%;
        pointer-events: auto;
      }
      #heygen-streaming-container iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
    `;

    // Criar iframe
    const iframe = document.createElement("iframe");
    iframe.allowFullscreen = false;
    iframe.title = "Streaming Embed";
    iframe.role = "dialog";
    iframe.allow = "microphone";
    iframe.src = url;

    // Função para lidar com mensagens
    const handleMessage = (e: MessageEvent) => {
      if (e.origin === host && e.data && e.data.type && e.data.type === "streaming-embed") {
        if (e.data.action === "init") {
          setInitial(true);
          wrapDiv.classList.toggle("show", true);
        } else if (e.data.action === "show") {
          setVisible(true);
          wrapDiv.classList.toggle("expand", true);
        } else if (e.data.action === "hide") {
          setVisible(false);
          wrapDiv.classList.toggle("expand", false);
        }
      }
    };

    // Adicionar event listener
    window.addEventListener("message", handleMessage);

    // Montar elementos
    container.appendChild(iframe);
    wrapDiv.appendChild(stylesheet);
    wrapDiv.appendChild(container);
    document.body.appendChild(wrapDiv);

    // Cleanup function
    return () => {
      window.removeEventListener("message", handleMessage);
      if (wrapDiv && document.body.contains(wrapDiv)) {
        document.body.removeChild(wrapDiv);
      }
    };
  }, []);

  // Effect para atualizar classes baseado no estado
  useEffect(() => {
    if (wrapDivRef.current) {
      wrapDivRef.current.classList.toggle("show", initial);
    }
  }, [initial]);

  useEffect(() => {
    if (wrapDivRef.current) {
      wrapDivRef.current.classList.toggle("expand", visible);
    }
  }, [visible]);

  // Este componente não renderiza nada visível, já que manipula diretamente o DOM
  return null;
};

export default HeygenAvatar;