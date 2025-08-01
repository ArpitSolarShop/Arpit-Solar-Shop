export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_sessions: {
        Row: {
          admin_id: string
          created_at: string
          expires_at: string
          id: string
          token: string
        }
        Insert: {
          admin_id: string
          created_at?: string
          expires_at: string
          id?: string
          token: string
        }
        Update: {
          admin_id?: string
          created_at?: string
          expires_at?: string
          id?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_sessions_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          password_hash: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          password_hash: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          password_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          id: string
          question: string
        }
        Insert: {
          answer: string
          id?: string
          question: string
        }
        Update: {
          answer?: string
          id?: string
          question?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          brand: Database["public"]["Enums"]["company_brand"]
          category: string
          company_info: Json | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_published: boolean
          logo_url: string | null
          name: string
          pricing_data: Json | null
          product_type: string | null
          sort_order: number | null
          specifications: Json | null
          system_configurations: Json | null
        }
        Insert: {
          brand: Database["public"]["Enums"]["company_brand"]
          category: string
          company_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          logo_url?: string | null
          name: string
          pricing_data?: Json | null
          product_type?: string | null
          sort_order?: number | null
          specifications?: Json | null
          system_configurations?: Json | null
        }
        Update: {
          brand?: Database["public"]["Enums"]["company_brand"]
          category?: string
          company_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          logo_url?: string | null
          name?: string
          pricing_data?: Json | null
          product_type?: string | null
          sort_order?: number | null
          specifications?: Json | null
          system_configurations?: Json | null
        }
        Relationships: []
      }
      project_images: {
        Row: {
          alt_text: string | null
          id: string
          image_url: string
          project_id: string | null
        }
        Insert: {
          alt_text?: string | null
          id?: string
          image_url: string
          project_id?: string | null
        }
        Update: {
          alt_text?: string | null
          id?: string
          image_url?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: Database["public"]["Enums"]["solution_type"]
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["solution_type"]
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["solution_type"]
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          title?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          created_at: string
          customer_type: string | null
          email: string | null
          entity_type: Database["public"]["Enums"]["entity_type"] | null
          estimated_area_sqft: number | null
          id: string
          monthly_bill: number | null
          monthly_bill_range: string | null
          name: string
          phone: string
          power_demand_kw: number | null
          product_category: string | null
          product_name: string | null
          project_location: string | null
          referral: string | null
          referral_name: string | null
          referral_phone: string | null
          referral_source: string | null
          roof_area: number | null
          solution_classification:
            | Database["public"]["Enums"]["solution_type"]
            | null
          source: Database["public"]["Enums"]["quote_source"]
        }
        Insert: {
          created_at?: string
          customer_type?: string | null
          email?: string | null
          entity_type?: Database["public"]["Enums"]["entity_type"] | null
          estimated_area_sqft?: number | null
          id?: string
          monthly_bill?: number | null
          monthly_bill_range?: string | null
          name: string
          phone: string
          power_demand_kw?: number | null
          product_category?: string | null
          product_name?: string | null
          project_location?: string | null
          referral?: string | null
          referral_name?: string | null
          referral_phone?: string | null
          referral_source?: string | null
          roof_area?: number | null
          solution_classification?:
            | Database["public"]["Enums"]["solution_type"]
            | null
          source: Database["public"]["Enums"]["quote_source"]
        }
        Update: {
          created_at?: string
          customer_type?: string | null
          email?: string | null
          entity_type?: Database["public"]["Enums"]["entity_type"] | null
          estimated_area_sqft?: number | null
          id?: string
          monthly_bill?: number | null
          monthly_bill_range?: string | null
          name?: string
          phone?: string
          power_demand_kw?: number | null
          product_category?: string | null
          product_name?: string | null
          project_location?: string | null
          referral?: string | null
          referral_name?: string | null
          referral_phone?: string | null
          referral_source?: string | null
          roof_area?: number | null
          solution_classification?:
            | Database["public"]["Enums"]["solution_type"]
            | null
          source?: Database["public"]["Enums"]["quote_source"]
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          created_at: string
          customer_id: string | null
          id: string
          installation_date: string | null
          installed_company: Database["public"]["Enums"]["company_brand"] | null
          name: string
          phone: string
          problem_description: string
          solution_classification:
            | Database["public"]["Enums"]["solution_type"]
            | null
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          id?: string
          installation_date?: string | null
          installed_company?:
            | Database["public"]["Enums"]["company_brand"]
            | null
          name: string
          phone: string
          problem_description: string
          solution_classification?:
            | Database["public"]["Enums"]["solution_type"]
            | null
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          id?: string
          installation_date?: string | null
          installed_company?:
            | Database["public"]["Enums"]["company_brand"]
            | null
          name?: string
          phone?: string
          problem_description?: string
          solution_classification?:
            | Database["public"]["Enums"]["solution_type"]
            | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          icon_key: string | null
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_key?: string | null
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_key?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          customer_name: string
          feedback: string
          id: string
          project_id: string | null
        }
        Insert: {
          customer_name: string
          feedback: string
          id?: string
          project_id?: string | null
        }
        Update: {
          customer_name?: string
          feedback?: string
          id?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      company_brand: "Reliance" | "Sakti" | "Tata"
      entity_type: "Individual" | "Enterprise"
      quote_source:
        | "Quote Form"
        | "AI Chatbot"
        | "Reliance Quote Form"
        | "Shakti Quote Form"
      solution_type:
        | "Residential"
        | "Commercial"
        | "Commercial and industrial DG"
        | "BIPv"
        | "Utility-scale"
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
      company_brand: ["Reliance", "Sakti", "Tata"],
      entity_type: ["Individual", "Enterprise"],
      quote_source: [
        "Quote Form",
        "AI Chatbot",
        "Reliance Quote Form",
        "Shakti Quote Form",
      ],
      solution_type: [
        "Residential",
        "Commercial",
        "Commercial and industrial DG",
        "BIPv",
        "Utility-scale",
      ],
    },
  },
} as const
