export default function Keywords({ keywords }) {
  return (
    <div className="display-inline">
      {keywords?.map((keyword) => (
        <p key={keyword.id} className="">
          {keyword.name || ''}
        </p>
      ))}
    </div>
  );
}
