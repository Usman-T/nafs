import React from 'react'
import DashboardCalendar from '../calendar-dashboard'

const CalendarWrapper = () => {
  const dailyTasks = await fetchDailyTasks();
  return (
      <DashboardCalendar dailyTasks={dailyTasks} />
  )
}

export default CalendarWrapper