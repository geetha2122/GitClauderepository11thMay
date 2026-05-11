import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Session {
  id: number
  title: string
  time: string
  type: "event" | "task" | "reminder"
  description: string
}

function formatDate(date: Date): string {
  return format(date, "do MMM yyyy")
}

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const dateStr = format(selectedDate, "yyyy-MM-dd")
    setLoading(true)
    fetch(`/api/sessions?date=${dateStr}`)
      .then((res) => res.json())
      .then((data) => setSessions(data.sessions))
      .finally(() => setLoading(false))
  }, [selectedDate])

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="w-fit">
          <CardHeader>
            <CardTitle className="text-base">Daily View</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(day) => day && setSelectedDate(day)}
              initialFocus
            />
          </CardContent>
        </Card>

        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>
                Sessions for {formatDate(selectedDate)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading && (
                <p className="text-muted-foreground text-sm">Loading…</p>
              )}
              {!loading && sessions.length === 0 && (
                <p className="text-muted-foreground text-sm">
                  No events, tasks, or reminders for this date.
                </p>
              )}
              {!loading && sessions.length > 0 && (
                <ul className="space-y-4">
                  {sessions.map((session) => (
                    <li key={session.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                      <span className="text-sm text-muted-foreground w-12 shrink-0 pt-0.5">
                        {session.time}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{session.title}</span>
                          <Badge variant={session.type as "event" | "task" | "reminder"}>
                            {session.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{session.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
