import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useGetCharacterDetails } from '../../../data-access/apis/GetCharacterDetails/GetCharacterDetailsApi';
import { useCharacterDetailsStore } from '../../../data-access/StoreProvider/CharacterDetailsContext';
import CharacterDetails from '../../components/CharacterDetails/CharacterDetails';

const CharacterDetailsController: React.FC = observer(() => {
  const characterDetailsStore = useCharacterDetailsStore();
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useGetCharacterDetails(id || '');

  
  useEffect(() => {
    if (!id) return;
    characterDetailsStore.setCharacterId(id);
    characterDetailsStore.setLoading(loading);
    if (data && data.character) {
      characterDetailsStore.setCharacter(data.character);
    }
    if (error) {
      characterDetailsStore.setError(error.message || 'Failed to fetch character details');
    }
    return () => characterDetailsStore.clearDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data, error, loading]);

  return (
    <CharacterDetails
      data={characterDetailsStore.character}
      loading={characterDetailsStore.loading}
      error={characterDetailsStore.error}
    />
  );
});

export default CharacterDetailsController;
