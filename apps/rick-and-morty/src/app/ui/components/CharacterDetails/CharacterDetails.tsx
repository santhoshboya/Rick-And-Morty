import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { styles } from './Styles';
import { CharacterDetails as CharacterDetailsType } from "../../../data-access/stores/GetCharacterDetails/GetCharacterDetailsStore";

interface Props {
  data: CharacterDetailsType | null;
  loading: boolean;
  error: string | null;
}

const CharacterDetails: React.FC<Props> = ({ data, loading, error }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  if (loading) return <div className={styles.loading}>{t('common.loading')}</div>;
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
          {t('characterDetails.back')}
        </button>
        <img src={data.image} alt={data.name} className={styles.image} />
        <div className={styles.infoSection}>
          <h2 className={styles.name}>{data.name}</h2>
          <p className={styles.detail}><span className={styles.label}>{t('characterDetails.status')}</span> {data.status}</p>
          <p className={styles.detail}><span className={styles.label}>{t('characterDetails.species')}</span> {data.species}</p>
          <p className={styles.detail}><span className={styles.label}>{t('characterDetails.gender')}</span> {data.gender}</p>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('characterDetails.origin')}</h3>
            <p>{data.origin?.name} ({data.origin?.type})</p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('characterDetails.location')}</h3>
            <p>{data.location?.name} ({data.location?.type})</p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('characterDetails.episodes')}</h3>
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
