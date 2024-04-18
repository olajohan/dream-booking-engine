import React from 'react'
import { render, screen } from '@testing-library/react'
import Calendar from './Calendar'
import { DateRange } from '@mui/x-date-pickers-pro';
import { Dayjs } from 'dayjs'

const setDateRange = (dateRange: DateRange<Dayjs>) => {
    return
}

describe('Calendar tests', () => {
    test('See if calendar renders month', () => {
        render(<Calendar setSelectedDateRange={setDateRange} />)
        const elem = screen.getByText('April 2024')
        expect(elem).toBeInTheDocument()

    })
})