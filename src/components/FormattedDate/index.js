import {formatDistanceToNow} from 'date-fns'

const FormattedDate = props => {
  const {date} = props
  const publishedDate = formatDistanceToNow(new Date(date))
  return <p>{publishedDate}</p>
}

export default FormattedDate
