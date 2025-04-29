import AiStudentInsights from '../components/AiStudentInsights'

export default function AiInsightsPage() {
  return (
    <main className="flex-grow">
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Student AI Insights</h1>
        <AiStudentInsights />
      </section>
    </main>
  )
}