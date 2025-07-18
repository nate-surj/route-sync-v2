
import 'https://deno.land/x/xhr@0.1.0/mod.ts'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { assignments } = await req.json()
    if (!assignments || !Array.isArray(assignments)) {
      return new Response(JSON.stringify({ error: 'Missing assignments data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const prompt = `
      You are an expert logistics coordinator AI for a company in Kenya.
      You have been given a set of proposed job assignments generated by an algorithm.
      Your task is to analyze the entire set of assignments holistically and provide strategic recommendations to further reduce costs and improve efficiency.

      Look for opportunities that the algorithm might have missed, such as:
      - Swapping assignments between two drivers if it creates more optimal routes for both.
      - Re-sequencing a driver's entire route for better flow.
      - Identifying drivers who are under-utilized or over-utilized.
      - Highlighting high-risk assignments (e.g., tight schedules, high-priority jobs with low confidence scores).

      Your output must be a valid JSON object.
      The JSON object must have these keys:
      - "overallSummary": A 2-3 sentence summary of the overall quality of the assignment plan and the most significant area for improvement.
      - "strategicSuggestions": An array of objects, where each object represents a specific, actionable suggestion. Each suggestion object must have:
        - "title": A short, catchy title for the suggestion (e.g., "Driver Swap for Fuel Savings").
        - "description": A detailed explanation of the suggested change and why it's beneficial. Mention specific job and driver IDs.
        - "impact": The estimated impact of this suggestion, which can be 'high', 'medium', or 'low'.

      The currency is Kenyan Shillings (KES).

      Here is the list of proposed assignments:
      ${JSON.stringify(assignments, null, 2)}
    `

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert logistics coordinator AI.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.5,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('OpenAI API error:', errorBody);
      throw new Error(`OpenAI API request failed with status ${response.status}`);
    }

    const aiData = await response.json();
    const enhancementJson = JSON.parse(aiData.choices[0].message.content);

    return new Response(JSON.stringify(enhancementJson), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error in llm-enhancement function:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
