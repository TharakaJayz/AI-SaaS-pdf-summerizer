import React from 'react'
import { Button } from '../ui/button'

type Props = {
    title:string,
    summaryText:string,
    fileName:string,
    createdAt:string
}

const DownloadSummaryButton = (props: Props) => {
  return (
    <Button size={"sm"} className='h-8 px-3 bg-rose-100 text-rose-600 hover:text-rose-700 hover:bg-rose-50'>DownloadSummaryButton</Button>
  )
}

export default DownloadSummaryButton