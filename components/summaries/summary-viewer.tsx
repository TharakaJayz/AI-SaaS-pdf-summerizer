import React from 'react'

type Props = {
    summary:string
}

const SummaryViewer = ({summary}: Props) => {
  return (
    <div>
        {summary}
    </div>
  )
}

export default SummaryViewer