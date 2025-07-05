// CharacterDetails.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterDetails as CharacterDetailsType } from "../../../data-access/stores/GetCharacterDetails/GetCharacterDetailsStore";
import { styles } from './Styles';

interface Props {
  data: CharacterDetailsType | null;
  loading: boolean;
  error: string | null;
}

const CharacterDetails: React.FC<Props> = ({ data, loading, error }) => {
  const navigate = useNavigate();
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!data) return null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <button
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <svg className={styles.backIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <img src={data.image} alt={data.name} className={styles.image} />
        <div className={styles.infoSection}>
          <h2 className={styles.name}>{data.name}</h2>
          <p className={styles.detail}><span className={styles.label}>Status:</span> {data.status}</p>
          <p className={styles.detail}><span className={styles.label}>Species:</span> {data.species}</p>
          <p className={styles.detail}><span className={styles.label}>Gender:</span> {data.gender}</p>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Origin</h3>
            <p>{data.origin?.name} ({data.origin?.type})</p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Location</h3>
            <p>{data.location?.name} ({data.location?.type})</p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Episodes</h3>
            <ul className={styles.episodeList}>
              {data.episode.map((ep) => (
                <li key={ep.id} className={styles.episodeItem}>
                  {ep.name} <span className={styles.episodeCode}>({ep.episode})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
