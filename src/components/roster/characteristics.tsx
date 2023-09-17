export default function Characteristics({ characteristics }) {
  return (
    <div className="display-inline">
      {characteristics?.map((characteristic) => (
        <div key={characteristic.typeId}>
          <span style={{ paddingRight: '10px' }}>
            {characteristic.name || ''}
          </span>
          <span className="">{characteristic['#text'] || ''}</span>
        </div>
      ))}
    </div>
  );
}
