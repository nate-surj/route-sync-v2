
import { supabase } from '@/integrations/supabase/client';
import type { JobAssignment } from './smartJobAssignmentService';

export interface LLMStrategicSuggestion {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

export interface LLMGlobalEnhancement {
  overallSummary: string;
  strategicSuggestions: LLMStrategicSuggestion[];
}

export class LLMAssignmentEnhancementService {
  static async getLLMEnhancements(assignments: JobAssignment[]): Promise<LLMGlobalEnhancement | null> {
    if (!assignments || assignments.length === 0) {
      return null;
    }

    console.log('🚀 Requesting LLM global enhancements for assignment plan...');

    const { data, error } = await supabase.functions.invoke('llm-enhancement', {
      body: { assignments },
    });

    if (error) {
      console.error('Error invoking llm-enhancement function:', error);
      throw new Error('Failed to get LLM enhancements.');
    }

    console.log('✅ Received LLM global enhancements:', data);

    // The function now returns the whole object.
    return data as LLMGlobalEnhancement;
  }
}
