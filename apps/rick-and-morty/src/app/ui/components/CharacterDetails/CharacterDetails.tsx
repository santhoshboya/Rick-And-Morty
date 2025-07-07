import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { CharacterDetails as CharacterDetailsType } from "../../../data-access/stores/GetCharacterDetails/GetCharacterDetailsStore";
import { styles } from './Styles';

interface CharacterDetailsProps {
  data: CharacterDetailsType | null;
  loading: boolean;
  error: string | null;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ data, loading, error }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const renderBackButton = () => (
    <button
      className={styles.backButton}
      onClick={() => navigate(-1)}
      aria-label={t('characterDetails.back')}
    >
      <FiArrowLeft className={styles.backIcon} />
      {t('characterDetails.back')}
    </button>
  );

  const renderOrigin = () => (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{t('characterDetails.origin')}</h3>
      <p>{data?.origin?.name} ({data?.origin?.type})</p>
    </div>
  );

  const renderLocation = () => (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{t('characterDetails.location')}</h3>
      <p>{data?.location?.name} ({data?.location?.type})</p>
    </div>
  );

  const renderEpisodes = () => (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{t('characterDetails.episodes')}</h3>
      <ul className={styles.episodeList}>
        {data?.episode.map((ep) => (
          <li key={ep.id} className={styles.episodeItem}>
            {ep.name} <span className={styles.episodeCode}>({ep.episode})</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderInfoSection = () => (
    <div className={styles.infoSection}>
      <h2 className={styles.name}>{data?.name}</h2>
      <p className={styles.detail}><span className={styles.label}>{t('characterDetails.status')}</span> {data?.status}</p>
      <p className={styles.detail}><span className={styles.label}>{t('characterDetails.species')}</span> {data?.species}</p>
      <p className={styles.detail}><span className={styles.label}>{t('characterDetails.gender')}</span> {data?.gender}</p>
      {renderOrigin()}
      {renderLocation()}
      {renderEpisodes()}
    </div>
  );

  if (loading) return <div className={styles.loading}>{t('common.loading')}</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!data) return null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {renderBackButton()}
        <img src={data.image} alt={data.name} className={styles.image} />
        {renderInfoSection()}
      </div>
    </div>
  );
};

export default CharacterDetails;
