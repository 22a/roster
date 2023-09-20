import Characteristics from './characteristics';

export default function Profiles({ profiles }) {
  return (
    <div className="display-inline">
      {profiles?.map((profile) => (
        <div key={profile.id}>
          <p className="font-bold text-xl mb-2">{profile.name || ''}</p>
          <Characteristics characteristics={profile.characteristics} />
        </div>
      ))}
    </div>
  );
}
