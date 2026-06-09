export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      artigo_comentarios: {
        Row: {
          artigo_id: string
          created_at: string
          email: string
          id: string
          mensagem: string
          nome: string
          status: Database["public"]["Enums"]["comentario_status"]
          updated_at: string
        }
        Insert: {
          artigo_id: string
          created_at?: string
          email: string
          id?: string
          mensagem: string
          nome: string
          status?: Database["public"]["Enums"]["comentario_status"]
          updated_at?: string
        }
        Update: {
          artigo_id?: string
          created_at?: string
          email?: string
          id?: string
          mensagem?: string
          nome?: string
          status?: Database["public"]["Enums"]["comentario_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "artigo_comentarios_artigo_id_fkey"
            columns: ["artigo_id"]
            isOneToOne: false
            referencedRelation: "artigos"
            referencedColumns: ["id"]
          },
        ]
      }
      artigo_likes: {
        Row: {
          artigo_id: string
          created_at: string
          id: string
        }
        Insert: {
          artigo_id: string
          created_at?: string
          id?: string
        }
        Update: {
          artigo_id?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "artigo_likes_artigo_id_fkey"
            columns: ["artigo_id"]
            isOneToOne: false
            referencedRelation: "artigos"
            referencedColumns: ["id"]
          },
        ]
      }
      artigos: {
        Row: {
          ativo: boolean
          autor_bio: string | null
          autor_foto: string | null
          autor_link: string | null
          autor_nome: string | null
          categoria: string | null
          conteudo: string
          created_at: string
          data_publicacao: string
          id: string
          imagem_capa: string | null
          resumo: string
          slug: string
          titulo: string
          updated_at: string
          visualizacoes: number
        }
        Insert: {
          ativo?: boolean
          autor_bio?: string | null
          autor_foto?: string | null
          autor_link?: string | null
          autor_nome?: string | null
          categoria?: string | null
          conteudo: string
          created_at?: string
          data_publicacao?: string
          id?: string
          imagem_capa?: string | null
          resumo: string
          slug: string
          titulo: string
          updated_at?: string
          visualizacoes?: number
        }
        Update: {
          ativo?: boolean
          autor_bio?: string | null
          autor_foto?: string | null
          autor_link?: string | null
          autor_nome?: string | null
          categoria?: string | null
          conteudo?: string
          created_at?: string
          data_publicacao?: string
          id?: string
          imagem_capa?: string | null
          resumo?: string
          slug?: string
          titulo?: string
          updated_at?: string
          visualizacoes?: number
        }
        Relationships: []
      }
      blog_settings: {
        Row: {
          cta_botao_texto: string
          cta_subtitulo: string
          cta_titulo: string
          id: boolean
          updated_at: string
          whatsapp_url: string
        }
        Insert: {
          cta_botao_texto?: string
          cta_subtitulo?: string
          cta_titulo?: string
          id?: boolean
          updated_at?: string
          whatsapp_url?: string
        }
        Update: {
          cta_botao_texto?: string
          cta_subtitulo?: string
          cta_titulo?: string
          id?: boolean
          updated_at?: string
          whatsapp_url?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          crm_attempts: number
          crm_last_attempt_at: string | null
          crm_response: Json | null
          crm_status: string
          dateahome_attempts: number
          dateahome_last_attempt_at: string | null
          dateahome_response: Json | null
          dateahome_status: string
          dedupe_key: string | null
          duplicate_of: string | null
          email: string | null
          id: string
          ip_hash: string | null
          is_duplicate: boolean
          landing_path: string | null
          mensagem: string | null
          momento: string | null
          nome: string
          orcamento: string | null
          origem: string | null
          referrer: string | null
          servico: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          whatsapp: string | null
        }
        Insert: {
          created_at?: string
          crm_attempts?: number
          crm_last_attempt_at?: string | null
          crm_response?: Json | null
          crm_status?: string
          dateahome_attempts?: number
          dateahome_last_attempt_at?: string | null
          dateahome_response?: Json | null
          dateahome_status?: string
          dedupe_key?: string | null
          duplicate_of?: string | null
          email?: string | null
          id?: string
          ip_hash?: string | null
          is_duplicate?: boolean
          landing_path?: string | null
          mensagem?: string | null
          momento?: string | null
          nome: string
          orcamento?: string | null
          origem?: string | null
          referrer?: string | null
          servico?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          whatsapp?: string | null
        }
        Update: {
          created_at?: string
          crm_attempts?: number
          crm_last_attempt_at?: string | null
          crm_response?: Json | null
          crm_status?: string
          dateahome_attempts?: number
          dateahome_last_attempt_at?: string | null
          dateahome_response?: Json | null
          dateahome_status?: string
          dedupe_key?: string | null
          duplicate_of?: string | null
          email?: string | null
          id?: string
          ip_hash?: string | null
          is_duplicate?: boolean
          landing_path?: string | null
          mensagem?: string | null
          momento?: string | null
          nome?: string
          orcamento?: string | null
          origem?: string | null
          referrer?: string | null
          servico?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_duplicate_of_fkey"
            columns: ["duplicate_of"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_assinantes: {
        Row: {
          data_cadastro: string
          email: string
          id: string
          nome: string | null
        }
        Insert: {
          data_cadastro?: string
          email: string
          id?: string
          nome?: string | null
        }
        Update: {
          data_cadastro?: string
          email?: string
          id?: string
          nome?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_artigo_views: { Args: { p_id: string }; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "viewer"
      comentario_status: "pendente" | "aprovado" | "rejeitado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "viewer"],
      comentario_status: ["pendente", "aprovado", "rejeitado"],
    },
  },
} as const
