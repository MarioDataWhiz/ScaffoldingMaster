import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { generateInsights } from '../lib/generateInsights'



const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default function AiStudentInsights() {
  const [students, setStudents] = useState([])
  const [insights, setInsights] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAndAnalyze() {
      setLoading(true)

      const { data, error } = await supabase
        .from('student')
        .select('name, age, gender')

      if (error) {
        console.error(error)
        setLoading(false)
        return
      }

      setStudents(data)

      const prompt = `
      Here is a list of students with their name, age, and gender: 
      ${JSON.stringify(data)}
      
      Based on their information, suggest which students might need extra support learning scaffolding and explain why.
      `
      
      const insightsText = await generateInsights(prompt)
      setInsights(insightsText)
      setLoading(false)
    }

    fetchAndAnalyze()
  }, [])

  if (loading) return <div>Loading AI Insights...</div>

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">AI Student Insights</h2>
      <p>{insights}</p>
    </div>
  )
}
