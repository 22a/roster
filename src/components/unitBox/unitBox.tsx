import Card from 'react-bootstrap/Card'

export default function UnitBox({ onClick, unit }) {
  return (
    <Card onClick={onClick} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{unit.name}</Card.Title>
        <Card.Text>{unit.costs?.[0].value || ''}</Card.Text>
      </Card.Body>
    </Card>
  )
}
