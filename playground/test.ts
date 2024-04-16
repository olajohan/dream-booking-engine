import dayjs from 'dayjs'

function main() {


    const today = dayjs()
    const startOfToday = today.startOf('date')
    console.log(`Today ${today}`)
    console.log(`Start of today UTC offset ${startOfToday.utcOffset()}`)

}   

main()