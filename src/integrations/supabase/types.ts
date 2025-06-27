export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      address_suggestions: {
        Row: {
          address: string
          city: string
          country: string
          created_at: string | null
          id: string
          postal_code: string | null
          state: string
          updated_at: string | null
        }
        Insert: {
          address: string
          city: string
          country?: string
          created_at?: string | null
          id?: string
          postal_code?: string | null
          state: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          city?: string
          country?: string
          created_at?: string | null
          id?: string
          postal_code?: string | null
          state?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      available_jobs: {
        Row: {
          cargo: string
          created_at: string | null
          delivery: string
          delivery_time: string
          detour: string
          distance: string
          id: string
          job_id: string
          payment: string
          payment_method: string
          pickup: string
          pickup_time: string
          route: string
          urgency: string
          weight: string
        }
        Insert: {
          cargo: string
          created_at?: string | null
          delivery: string
          delivery_time: string
          detour: string
          distance: string
          id?: string
          job_id: string
          payment: string
          payment_method: string
          pickup: string
          pickup_time: string
          route: string
          urgency: string
          weight: string
        }
        Update: {
          cargo?: string
          created_at?: string | null
          delivery?: string
          delivery_time?: string
          detour?: string
          distance?: string
          id?: string
          job_id?: string
          payment?: string
          payment_method?: string
          pickup?: string
          pickup_time?: string
          route?: string
          urgency?: string
          weight?: string
        }
        Relationships: []
      }
      damage_claims: {
        Row: {
          contact_email: string
          contact_number: string
          created_at: string | null
          damage_type: string
          delivery_id: string | null
          description: string
          id: string
          images: string[] | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          contact_email: string
          contact_number: string
          created_at?: string | null
          damage_type: string
          delivery_id?: string | null
          description: string
          id?: string
          images?: string[] | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          contact_email?: string
          contact_number?: string
          created_at?: string | null
          damage_type?: string
          delivery_id?: string | null
          description?: string
          id?: string
          images?: string[] | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "damage_claims_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
        ]
      }
      deliveries: {
        Row: {
          actual_delivery: string | null
          actual_pickup: string | null
          assigned_to: string | null
          created_at: string | null
          created_by: string
          delivery_address: string
          delivery_contact_name: string
          delivery_contact_phone: string
          id: string
          package_details: string | null
          payment_amount: number | null
          payment_status: string | null
          pickup_address: string
          pickup_contact_name: string
          pickup_contact_phone: string
          scheduled_delivery: string | null
          scheduled_pickup: string
          status: Database["public"]["Enums"]["delivery_status"] | null
          updated_at: string | null
          weight_kg: number | null
        }
        Insert: {
          actual_delivery?: string | null
          actual_pickup?: string | null
          assigned_to?: string | null
          created_at?: string | null
          created_by: string
          delivery_address: string
          delivery_contact_name: string
          delivery_contact_phone: string
          id?: string
          package_details?: string | null
          payment_amount?: number | null
          payment_status?: string | null
          pickup_address: string
          pickup_contact_name: string
          pickup_contact_phone: string
          scheduled_delivery?: string | null
          scheduled_pickup: string
          status?: Database["public"]["Enums"]["delivery_status"] | null
          updated_at?: string | null
          weight_kg?: number | null
        }
        Update: {
          actual_delivery?: string | null
          actual_pickup?: string | null
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string
          delivery_address?: string
          delivery_contact_name?: string
          delivery_contact_phone?: string
          id?: string
          package_details?: string | null
          payment_amount?: number | null
          payment_status?: string | null
          pickup_address?: string
          pickup_contact_name?: string
          pickup_contact_phone?: string
          scheduled_delivery?: string | null
          scheduled_pickup?: string
          status?: Database["public"]["Enums"]["delivery_status"] | null
          updated_at?: string | null
          weight_kg?: number | null
        }
        Relationships: []
      }
      delivery_tracking: {
        Row: {
          created_at: string | null
          delivery_id: string
          driver_id: string
          id: string
          latitude: number | null
          longitude: number | null
          notes: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          delivery_id: string
          driver_id: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          delivery_id?: string
          driver_id?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_tracking_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
        ]
      }
      error_logs: {
        Row: {
          created_at: string | null
          error_message: string
          error_stack: string | null
          id: string
          page_url: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_message: string
          error_stack?: string | null
          id?: string
          page_url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string
          error_stack?: string | null
          id?: string
          page_url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      fleet_vehicles: {
        Row: {
          annual_inspection_date: string | null
          assigned_driver_id: string | null
          cargo_volume_m3: number | null
          commercial_permit_number: string | null
          communication_equipment: string | null
          company_id: string
          condition_notes: string | null
          created_at: string
          current_location: string | null
          current_mileage_km: number | null
          extended_warranty_expiry: string | null
          extended_warranty_provider: string | null
          fuel_type: Database["public"]["Enums"]["fuel_type_enum"]
          gps_tracking_enabled: boolean | null
          height_m: number | null
          id: string
          insurance_coverage:
            | Database["public"]["Enums"]["insurance_coverage_enum"]
            | null
          insurance_expiry_date: string | null
          insurance_policy_number: string | null
          insurance_provider: string | null
          iot_device_id: string | null
          known_issues: string[] | null
          last_service_date: string | null
          length_m: number | null
          make: string
          max_payload_kg: number
          model: string
          next_service_due_km: number | null
          operational_status: string | null
          registration_number: string
          safety_equipment_status: boolean | null
          service_interval_km: number | null
          updated_at: string
          vehicle_condition:
            | Database["public"]["Enums"]["vehicle_condition_enum"]
            | null
          vehicle_id: string | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type_enum"]
          vin_number: string | null
          warranty_expiry_date: string | null
          width_m: number | null
          year: number
        }
        Insert: {
          annual_inspection_date?: string | null
          assigned_driver_id?: string | null
          cargo_volume_m3?: number | null
          commercial_permit_number?: string | null
          communication_equipment?: string | null
          company_id: string
          condition_notes?: string | null
          created_at?: string
          current_location?: string | null
          current_mileage_km?: number | null
          extended_warranty_expiry?: string | null
          extended_warranty_provider?: string | null
          fuel_type?: Database["public"]["Enums"]["fuel_type_enum"]
          gps_tracking_enabled?: boolean | null
          height_m?: number | null
          id?: string
          insurance_coverage?:
            | Database["public"]["Enums"]["insurance_coverage_enum"]
            | null
          insurance_expiry_date?: string | null
          insurance_policy_number?: string | null
          insurance_provider?: string | null
          iot_device_id?: string | null
          known_issues?: string[] | null
          last_service_date?: string | null
          length_m?: number | null
          make: string
          max_payload_kg: number
          model: string
          next_service_due_km?: number | null
          operational_status?: string | null
          registration_number: string
          safety_equipment_status?: boolean | null
          service_interval_km?: number | null
          updated_at?: string
          vehicle_condition?:
            | Database["public"]["Enums"]["vehicle_condition_enum"]
            | null
          vehicle_id?: string | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type_enum"]
          vin_number?: string | null
          warranty_expiry_date?: string | null
          width_m?: number | null
          year: number
        }
        Update: {
          annual_inspection_date?: string | null
          assigned_driver_id?: string | null
          cargo_volume_m3?: number | null
          commercial_permit_number?: string | null
          communication_equipment?: string | null
          company_id?: string
          condition_notes?: string | null
          created_at?: string
          current_location?: string | null
          current_mileage_km?: number | null
          extended_warranty_expiry?: string | null
          extended_warranty_provider?: string | null
          fuel_type?: Database["public"]["Enums"]["fuel_type_enum"]
          gps_tracking_enabled?: boolean | null
          height_m?: number | null
          id?: string
          insurance_coverage?:
            | Database["public"]["Enums"]["insurance_coverage_enum"]
            | null
          insurance_expiry_date?: string | null
          insurance_policy_number?: string | null
          insurance_provider?: string | null
          iot_device_id?: string | null
          known_issues?: string[] | null
          last_service_date?: string | null
          length_m?: number | null
          make?: string
          max_payload_kg?: number
          model?: string
          next_service_due_km?: number | null
          operational_status?: string | null
          registration_number?: string
          safety_equipment_status?: boolean | null
          service_interval_km?: number | null
          updated_at?: string
          vehicle_condition?:
            | Database["public"]["Enums"]["vehicle_condition_enum"]
            | null
          vehicle_id?: string | null
          vehicle_type?: Database["public"]["Enums"]["vehicle_type_enum"]
          vin_number?: string | null
          warranty_expiry_date?: string | null
          width_m?: number | null
          year?: number
        }
        Relationships: []
      }
      frequent_routes: {
        Row: {
          created_at: string | null
          delivery_address: string
          delivery_contact_name: string
          delivery_contact_phone: string
          id: string
          name: string
          pickup_address: string
          pickup_contact_name: string
          pickup_contact_phone: string
          updated_at: string | null
          usage_count: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          delivery_address: string
          delivery_contact_name: string
          delivery_contact_phone: string
          id?: string
          name: string
          pickup_address: string
          pickup_contact_name: string
          pickup_contact_phone: string
          updated_at?: string | null
          usage_count?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          delivery_address?: string
          delivery_contact_name?: string
          delivery_contact_phone?: string
          id?: string
          name?: string
          pickup_address?: string
          pickup_contact_name?: string
          pickup_contact_phone?: string
          updated_at?: string | null
          usage_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      fuel_records: {
        Row: {
          cost_per_liter: number
          created_at: string
          distance_since_last_fillup: number | null
          fillup_date: string
          fuel_amount_liters: number
          fuel_efficiency_kmpl: number | null
          fuel_station: string | null
          id: string
          mileage_at_fillup: number | null
          total_cost: number
          vehicle_id: string
        }
        Insert: {
          cost_per_liter: number
          created_at?: string
          distance_since_last_fillup?: number | null
          fillup_date?: string
          fuel_amount_liters: number
          fuel_efficiency_kmpl?: number | null
          fuel_station?: string | null
          id?: string
          mileage_at_fillup?: number | null
          total_cost: number
          vehicle_id: string
        }
        Update: {
          cost_per_liter?: number
          created_at?: string
          distance_since_last_fillup?: number | null
          fillup_date?: string
          fuel_amount_liters?: number
          fuel_efficiency_kmpl?: number | null
          fuel_station?: string | null
          id?: string
          mileage_at_fillup?: number | null
          total_cost?: number
          vehicle_id?: string
        }
        Relationships: []
      }
      invoice_items: {
        Row: {
          amount: number
          created_at: string | null
          delivery_id: string | null
          description: string
          id: string
          invoice_id: string
          quantity: number | null
          unit_price: number
        }
        Insert: {
          amount: number
          created_at?: string | null
          delivery_id?: string | null
          description: string
          id?: string
          invoice_id: string
          quantity?: number | null
          unit_price: number
        }
        Update: {
          amount?: number
          created_at?: string | null
          delivery_id?: string | null
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          business_id: string
          created_at: string | null
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          status: string | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          due_date: string
          id?: string
          invoice_number: string
          issue_date: string
          status?: string | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          status?: string | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          created_at: string
          customer_id: string
          delivery_address: string
          height: number | null
          id: string
          length: number | null
          package_type: string
          pickup_address: string
          pickup_date: string
          pickup_time: string
          special_instructions: string | null
          status: Database["public"]["Enums"]["delivery_status"]
          updated_at: string
          vehicle_type: string
          weight: number | null
          width: number | null
        }
        Insert: {
          created_at?: string
          customer_id: string
          delivery_address: string
          height?: number | null
          id?: string
          length?: number | null
          package_type: string
          pickup_address: string
          pickup_date: string
          pickup_time: string
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["delivery_status"]
          updated_at?: string
          vehicle_type: string
          weight?: number | null
          width?: number | null
        }
        Update: {
          created_at?: string
          customer_id?: string
          delivery_address?: string
          height?: number | null
          id?: string
          length?: number | null
          package_type?: string
          pickup_address?: string
          pickup_date?: string
          pickup_time?: string
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["delivery_status"]
          updated_at?: string
          vehicle_type?: string
          weight?: number | null
          width?: number | null
        }
        Relationships: []
      }
      logistics_jobs: {
        Row: {
          assigned_driver_id: string | null
          assigned_vehicle_id: string | null
          created_at: string
          customer_email: string | null
          customer_name: string
          customer_phone: string
          delivery_address: string
          delivery_date: string | null
          delivery_time: string | null
          dimensions_height: number | null
          dimensions_length: number | null
          dimensions_width: number | null
          id: string
          job_id: string
          logistics_company_id: string
          package_type: string
          payment_amount: number | null
          pickup_address: string
          pickup_date: string
          pickup_time: string
          special_instructions: string | null
          status: string
          updated_at: string
          vehicle_type: string
          weight_kg: number | null
        }
        Insert: {
          assigned_driver_id?: string | null
          assigned_vehicle_id?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name: string
          customer_phone: string
          delivery_address: string
          delivery_date?: string | null
          delivery_time?: string | null
          dimensions_height?: number | null
          dimensions_length?: number | null
          dimensions_width?: number | null
          id?: string
          job_id: string
          logistics_company_id: string
          package_type: string
          payment_amount?: number | null
          pickup_address: string
          pickup_date: string
          pickup_time: string
          special_instructions?: string | null
          status?: string
          updated_at?: string
          vehicle_type: string
          weight_kg?: number | null
        }
        Update: {
          assigned_driver_id?: string | null
          assigned_vehicle_id?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string
          delivery_address?: string
          delivery_date?: string | null
          delivery_time?: string | null
          dimensions_height?: number | null
          dimensions_length?: number | null
          dimensions_width?: number | null
          id?: string
          job_id?: string
          logistics_company_id?: string
          package_type?: string
          payment_amount?: number | null
          pickup_address?: string
          pickup_date?: string
          pickup_time?: string
          special_instructions?: string | null
          status?: string
          updated_at?: string
          vehicle_type?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          related_entity_id: string | null
          related_entity_type: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          delivery_id: string
          id: string
          payer_id: string
          payment_date: string | null
          payment_method: string | null
          receiver_id: string
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          delivery_id: string
          id?: string
          payer_id: string
          payment_date?: string | null
          payment_method?: string | null
          receiver_id: string
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          delivery_id?: string
          id?: string
          payer_id?: string
          payment_date?: string | null
          payment_method?: string | null
          receiver_id?: string
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_type: Database["public"]["Enums"]["account_type"]
          address: string | null
          business_type: string | null
          city: string | null
          company_name: string | null
          country: string | null
          created_at: string | null
          email: string | null
          email_verification_sent_at: string | null
          email_verified: boolean | null
          fleet_size: number | null
          full_name: string | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          phone: string | null
          postal_code: string | null
          profile_image: string | null
          updated_at: string | null
          user_type: string | null
          vehicle_type: string | null
        }
        Insert: {
          account_type?: Database["public"]["Enums"]["account_type"]
          address?: string | null
          business_type?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          email_verification_sent_at?: string | null
          email_verified?: boolean | null
          fleet_size?: number | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          is_verified?: boolean | null
          phone?: string | null
          postal_code?: string | null
          profile_image?: string | null
          updated_at?: string | null
          user_type?: string | null
          vehicle_type?: string | null
        }
        Update: {
          account_type?: Database["public"]["Enums"]["account_type"]
          address?: string | null
          business_type?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          email_verification_sent_at?: string | null
          email_verified?: boolean | null
          fleet_size?: number | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          phone?: string | null
          postal_code?: string | null
          profile_image?: string | null
          updated_at?: string | null
          user_type?: string | null
          vehicle_type?: string | null
        }
        Relationships: []
      }
      shipment_tracking: {
        Row: {
          created_at: string
          current_location: string | null
          current_status: string
          customer_id: string | null
          delivery_signature_url: string | null
          dimensions: string | null
          estimated_delivery_date: string | null
          estimated_delivery_time: string | null
          id: string
          package_condition: string | null
          package_type: string
          proof_of_delivery_url: string | null
          recipient_address: string
          recipient_name: string
          recipient_phone: string
          sender_address: string
          sender_name: string
          sender_phone: string
          special_instructions: string | null
          tracking_id: string
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          created_at?: string
          current_location?: string | null
          current_status?: string
          customer_id?: string | null
          delivery_signature_url?: string | null
          dimensions?: string | null
          estimated_delivery_date?: string | null
          estimated_delivery_time?: string | null
          id?: string
          package_condition?: string | null
          package_type: string
          proof_of_delivery_url?: string | null
          recipient_address: string
          recipient_name: string
          recipient_phone: string
          sender_address: string
          sender_name: string
          sender_phone: string
          special_instructions?: string | null
          tracking_id: string
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          created_at?: string
          current_location?: string | null
          current_status?: string
          customer_id?: string | null
          delivery_signature_url?: string | null
          dimensions?: string | null
          estimated_delivery_date?: string | null
          estimated_delivery_time?: string | null
          id?: string
          package_condition?: string | null
          package_type?: string
          proof_of_delivery_url?: string | null
          recipient_address?: string
          recipient_name?: string
          recipient_phone?: string
          sender_address?: string
          sender_name?: string
          sender_phone?: string
          special_instructions?: string | null
          tracking_id?: string
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      shipments: {
        Row: {
          arrival_date: string
          created_at: string | null
          departure_date: string
          destination: string
          id: string
          items: number
          origin: string
          shipment_id: string
          status: string
          updated_at: string | null
          user_id: string
          vehicle: string
          weight: string
        }
        Insert: {
          arrival_date: string
          created_at?: string | null
          departure_date: string
          destination: string
          id?: string
          items: number
          origin: string
          shipment_id: string
          status: string
          updated_at?: string | null
          user_id: string
          vehicle: string
          weight: string
        }
        Update: {
          arrival_date?: string
          created_at?: string | null
          departure_date?: string
          destination?: string
          id?: string
          items?: number
          origin?: string
          shipment_id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
          vehicle?: string
          weight?: string
        }
        Relationships: []
      }
      tracking_updates: {
        Row: {
          created_at: string
          id: string
          location: string
          notes: string | null
          status: string
          timestamp: string
          tracking_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          location: string
          notes?: string | null
          status: string
          timestamp?: string
          tracking_id: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string
          notes?: string | null
          status?: string
          timestamp?: string
          tracking_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tracking_updates_tracking_id_fkey"
            columns: ["tracking_id"]
            isOneToOne: false
            referencedRelation: "shipment_tracking"
            referencedColumns: ["tracking_id"]
          },
        ]
      }
      vehicle_maintenance: {
        Row: {
          completed_date: string | null
          cost: number | null
          created_at: string
          description: string
          id: string
          is_completed: boolean | null
          maintenance_type: string
          mileage_at_service: number | null
          next_service_due_km: number | null
          parts_replaced: string[] | null
          scheduled_date: string | null
          service_provider: string | null
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          completed_date?: string | null
          cost?: number | null
          created_at?: string
          description: string
          id?: string
          is_completed?: boolean | null
          maintenance_type: string
          mileage_at_service?: number | null
          next_service_due_km?: number | null
          parts_replaced?: string[] | null
          scheduled_date?: string | null
          service_provider?: string | null
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          completed_date?: string | null
          cost?: number | null
          created_at?: string
          description?: string
          id?: string
          is_completed?: boolean | null
          maintenance_type?: string
          mileage_at_service?: number | null
          next_service_due_km?: number | null
          parts_replaced?: string[] | null
          scheduled_date?: string | null
          service_provider?: string | null
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: []
      }
      vehicle_telematics: {
        Row: {
          battery_voltage: number | null
          created_at: string
          engine_rpm: number | null
          engine_temperature: number | null
          external_temperature: number | null
          fuel_consumption_rate: number | null
          fuel_level_percentage: number | null
          harsh_acceleration_count: number | null
          harsh_braking_count: number | null
          heading: number | null
          humidity_percentage: number | null
          id: string
          idle_time_minutes: number | null
          latitude: number | null
          longitude: number | null
          oil_pressure: number | null
          recorded_at: string
          speed_kmh: number | null
          speed_violations: number | null
          tire_pressure_fl: number | null
          tire_pressure_fr: number | null
          tire_pressure_rl: number | null
          tire_pressure_rr: number | null
          vehicle_id: string
        }
        Insert: {
          battery_voltage?: number | null
          created_at?: string
          engine_rpm?: number | null
          engine_temperature?: number | null
          external_temperature?: number | null
          fuel_consumption_rate?: number | null
          fuel_level_percentage?: number | null
          harsh_acceleration_count?: number | null
          harsh_braking_count?: number | null
          heading?: number | null
          humidity_percentage?: number | null
          id?: string
          idle_time_minutes?: number | null
          latitude?: number | null
          longitude?: number | null
          oil_pressure?: number | null
          recorded_at?: string
          speed_kmh?: number | null
          speed_violations?: number | null
          tire_pressure_fl?: number | null
          tire_pressure_fr?: number | null
          tire_pressure_rl?: number | null
          tire_pressure_rr?: number | null
          vehicle_id: string
        }
        Update: {
          battery_voltage?: number | null
          created_at?: string
          engine_rpm?: number | null
          engine_temperature?: number | null
          external_temperature?: number | null
          fuel_consumption_rate?: number | null
          fuel_level_percentage?: number | null
          harsh_acceleration_count?: number | null
          harsh_braking_count?: number | null
          heading?: number | null
          humidity_percentage?: number | null
          id?: string
          idle_time_minutes?: number | null
          latitude?: number | null
          longitude?: number | null
          oil_pressure?: number | null
          recorded_at?: string
          speed_kmh?: number | null
          speed_violations?: number | null
          tire_pressure_fl?: number | null
          tire_pressure_fr?: number | null
          tire_pressure_rl?: number | null
          tire_pressure_rr?: number | null
          vehicle_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_job_id: {
        Args: { company_user_id: string }
        Returns: string
      }
      generate_vehicle_id: {
        Args: {
          company_user_id: string
          v_type: Database["public"]["Enums"]["vehicle_type_enum"]
        }
        Returns: string
      }
      setup_demo_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      account_type: "demo" | "regular"
      delivery_status:
        | "pending"
        | "assigned"
        | "in_transit"
        | "delivered"
        | "cancelled"
      fuel_type_enum: "diesel" | "petrol" | "electric" | "hybrid"
      insurance_coverage_enum:
        | "comprehensive"
        | "third_party"
        | "commercial"
        | "fleet"
      user_type: "logistics" | "driver" | "business"
      vehicle_condition_enum:
        | "excellent"
        | "good"
        | "fair"
        | "poor"
        | "needs_repair"
      vehicle_type: "motorbike" | "van" | "truck"
      vehicle_type_enum:
        | "truck_5t"
        | "truck_7t"
        | "truck_10t"
        | "truck_15t"
        | "truck_20t"
        | "van_1t"
        | "van_2_5t"
        | "pickup"
        | "trailer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["demo", "regular"],
      delivery_status: [
        "pending",
        "assigned",
        "in_transit",
        "delivered",
        "cancelled",
      ],
      fuel_type_enum: ["diesel", "petrol", "electric", "hybrid"],
      insurance_coverage_enum: [
        "comprehensive",
        "third_party",
        "commercial",
        "fleet",
      ],
      user_type: ["logistics", "driver", "business"],
      vehicle_condition_enum: [
        "excellent",
        "good",
        "fair",
        "poor",
        "needs_repair",
      ],
      vehicle_type: ["motorbike", "van", "truck"],
      vehicle_type_enum: [
        "truck_5t",
        "truck_7t",
        "truck_10t",
        "truck_15t",
        "truck_20t",
        "van_1t",
        "van_2_5t",
        "pickup",
        "trailer",
      ],
    },
  },
} as const
