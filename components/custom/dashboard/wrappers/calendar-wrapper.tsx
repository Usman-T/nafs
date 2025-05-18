import React from 'react'
import DashboardCalendar from '../calendar-dashboard'
import { fetchDailyTasks } from '@/lib/data';

const CalendarWrapper = async () => {
  const dailyTasks = await fetchDailyTasks();
  return (
      <DashboardCalendar dailyTasks={dailyTasks} />
  )
}

export default CalendarWrapper